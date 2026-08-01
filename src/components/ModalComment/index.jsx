import { useRef, useState } from "react";
import { IconButton } from "../IconButton";
import { Modal } from "../Modal";
import { Textarea } from "../Textarea";
import { Subheading } from "../Subheading";
import { IconChat } from "../icons/IconChat";
import { IconArrowFoward } from "../icons/IconArrowFoward";
import { Spinner } from "../Spinner";
import styles from "./commentmodal.module.css";
import { Button } from "../Button";
import { http } from "../../api";
import { useAuth } from "../../hooks/useAuth";

// Adicionado um onSuccess como callback em caso de sucesso.
export const ModalComment = ({ isEditing, onSuccess, postId, defaultValue = "", commentId }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const onSubmit = async (formData) => {
    const text = formData.get("text");
    const token = localStorage.getItem("access_token");

    if (!text.trim()) return;

    if (isEditing) {
      http
        .patch(
          `/comments/${commentId}`,
          { text },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          modalRef.current.closeModal();
          onSuccess(response.data);
          setLoading(false);
        });
    } else {
      try {
        setLoading(true);
        // Enviar essa requisição
        http
          .post(
            `comments/post/${postId}`,
            // Como estamos enviando um post, precisamos enviar o corpo da requisição (o que será alterado)
            {
              text,
            },
            // E os cabeçalhos de autorização.
            // Dica para o Matheus do futuro com dor de cabeça: Copia e cola daqui o bloco de autorização que está funcionando e não me enche o saco.
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then((response) => {
            modalRef.current.closeModal();
            onSuccess(response.data);
            setLoading(false);
          });
        modalRef.current.closeModal();
      } catch (error) {
        console.error("Erro ao criar/atualizar comentário:", error);
      }
    }
  };
  return (
    <>
      <Modal ref={modalRef}>
        <form action={onSubmit}>
          <Subheading>{isEditing ? "Editar comentário:" : "Deixe seu comentário sobre o post:"}</Subheading>
          <Textarea required rows={8} name="text" placeholder="Digite aqui..." defaultValue={defaultValue} />
          <div className={styles.footer}>
            <Button disabled={loading} type="submit">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {isEditing ? "Atualizar" : "Comentar"} <IconArrowFoward />
                </>
              )}
            </Button>
          </div>
        </form>
      </Modal>
      <IconButton onClick={() => modalRef.current.openModal()} disabled={!isAuthenticated}>
        <IconChat fill={isEditing ? "#000" : "#888888"} />
      </IconButton>
    </>
  );
};
