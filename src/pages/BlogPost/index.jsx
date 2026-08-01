import styles from "./blogpost.module.css";
import { ThumbsUpButton } from "../../components/CardPost/ThumbsUpButton";
import { Author } from "../../components/Author";
import Typography from "../../components/Typography";
import { CommentList } from "../../components/CommentList";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { ModalComment } from "../../components/ModalComment";
import { http } from "../../api";

export const BlogPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  const handleNewComment = (comment) => {
    // Ele adiciona o comentário novo e reescreve o array de comments adicionando o comentário no topo do array. (validar o comportamento depois)
    setComments([comment, ...comments]);
  };

  useEffect(() => {
    // Pegando os posts por slug
    http
      .get(`blog-posts/slug/${slug}`)
      //transforma a resposta em um JSON.
      .then((response) => {
        // tratativa de Not-Found redirecionando para o Not-Found
        // No AXIOS os erros devem ser tratados no .catch
        if (response.status === 404) {
          navigate("/not-found");
          return;
        }
        setPost(response.data);
        setComments(response.data.comments);
      })
      // No AXIOS os erros devem ser tratados no .catch
      .catch((error) => {
        if (error.status === 404) {
          navigate("/not-found");
          return;
        }
      });
  }, [slug, navigate]);

  if (!post) {
    return null;
  }

  return (
    <main className={styles.main}>
      <article className={styles.card}>
        <header className={styles.header}>
          <figure className={styles.figure}>
            <img src={post.cover} alt={`Capa do post de titulo: ${post.title}`} />
          </figure>
        </header>
        <section className={styles.body}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </section>
        <footer className={styles.footer}>
          <div className={styles.actions}>
            <div className={styles.action}>
              <ThumbsUpButton loading={false} />
              <p>{post.likes}</p>
            </div>
            <div className={styles.action}>
              <ModalComment onSuccess={handleNewComment} postId={post?.id} />
              <p>{comments.length}</p>
            </div>
          </div>
          <Author author={post.author} />
        </footer>
      </article>
      <Typography variant="h3">Código:</Typography>
      <div className={styles.code}>
        <ReactMarkdown>{post.markdown}</ReactMarkdown>
      </div>
      <CommentList comments={comments} />
    </main>
  );
};
