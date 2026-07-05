import { useEffect, useState } from "react";
import { CardPost } from "../../components/CardPost";
import styles from "./feed.module.css";

// estado local com os posts
// Usaremos useEffect para montar um componente quando algo for mudado
// usaremos a função dentro do hook pra pegar os posts da API. ( http://localhost:3000/blog-posts )

export const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //Promessa de que vai ir lá pegar algo, não é possível garantir que vai dar certo e nem que vai terminar cedo.
    fetch("http://localhost:3000/blog-posts")
      //transforma a resposta em um JSON.
      .then((response) => {
        return response.json();
      })
      // Pega o resultado obtido e armazena ele usando o useState com essas informações.
      .then((data) => setPosts(data));
    // Array vazio significa que ele vai executar essa função apenas 1 única vez. (No ambiente de dev irá duas vezes, culpa do StrictMode.)
  }, []);

  return (
    <main className={styles.grid}>
      {posts.map((post) => (
        <CardPost key={post.slug} post={post} />
      ))}
    </main>
  );
};
