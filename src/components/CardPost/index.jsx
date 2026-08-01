// import { useState } from "react";
import { Author } from "../Author";
import { ModalComment } from "../ModalComment";
import styles from "./cardpost.module.css";

import { ThumbsUpButton } from "./ThumbsUpButton";
import { Link } from "react-router";
// import { http } from "../../api";
import { useAuth } from "../../hooks/useAuth";
import { usePostInteractions } from "../../hooks/usePostInteractions";

export const CardPost = ({ post }) => {
  const { likes, comments, handleNewComment, handleLikeButton } = usePostInteractions(post);

  const { isAuthenticated } = useAuth();

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
            <ThumbsUpButton loading={false} onClick={handleLikeButton} disabled={!isAuthenticated} />
            {/* Alterado para buscar do hook ao invés do banco de dados direto */}
            <p>{likes}</p>
          </div>
          <div className={styles.action}>
            <ModalComment onSuccess={handleNewComment} postId={post.id} />
            <p>{comments.length}</p>
          </div>
        </div>
        <Author author={post.author} />
      </footer>
    </article>
  );
};
