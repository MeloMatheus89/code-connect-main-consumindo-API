import styles from "./comment.module.css";
import { Avatar } from "../Avatar";
import { ModalComment } from "../ModalComment";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

export const Comment = ({ comment }) => {
  const [text, setText] = useState(comment.text);
  const { user } = useAuth();

  const handleEdit = (newComment) => {
    setText(newComment.text);
  };

  const isOwner = user && user.id == comment.author.id;
  return (
    <div className={styles.comment}>
      <Avatar author={comment.author} />
      <strong>@{comment.author.name}</strong>
      <p>{comment.text}</p>
      <div className={styles.divider} />
      {isOwner && <ModalComment isEditing onSuccess={handleEdit} defaultValue={text} commentId={comment.id} />}
    </div>
  );
};
