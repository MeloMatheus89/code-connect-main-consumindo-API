import { useState } from "react";
import { Author } from "../Author";
import { ModalComment } from "../ModalComment";
import styles from "./cardpost.module.css";

import { ThumbsUpButton } from "./ThumbsUpButton";
import { Link } from "react-router";

export const CardPost = ({ post }) => {
  //Vamos criar um estado local para o Like

  const [likes, setLikes] = useState(post.likes);

  const handleLikeButton = () => {
    //Estrutura do fecth copiada do BlogPost e editada para o endpoint de likes
    fetch(`http://localhost:3000/blog-posts/${post.id}/like`, {
      method: "POST",
    })
      //Coleta uma resposta e...
      .then((response) => {
        // Se a resposta for válida para o like, então...
        if (response.ok) {
          setLikes((oldState) => oldState + 1);
          console.log("incrementar Like");
        }
      });
  };

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <figure className={styles.figure}>
          <img src={post.cover} alt={`Capa do post de titulo: ${post.title}`} />
        </figure>
      </header>
      <section className={styles.body}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <Link to={`/blog-post/${post.slug}`}>Ver detalhes</Link>
      </section>
      <footer className={styles.footer}>
        <div className={styles.actions}>
          <div className={styles.action}>
            <ThumbsUpButton loading={false} onClick={handleLikeButton} />
            {/* Alterado para buscar do hook ao invés do banco de dados direto */}
            <p>{likes}</p>
          </div>
          <div className={styles.action}>
            <ModalComment />
            <p>{post.comments.length}</p>
          </div>
        </div>
        <Author author={post.author} />
      </footer>
    </article>
  );
};
