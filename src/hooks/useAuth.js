import { useState, useEffect } from "react";
import { http } from "../api";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao carregar usuário do localStorage:", error);
        localStorage.removeItem("auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  //Transformar esse método em um método assíncrono.
  const register = async (name, email, password) => {
    try {
      // Com o Axios é basicamente um POST com um objeto como segundo parâmetro.
      await http.post("auth/register", {
        name,
        email,
        password,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await http.post("auth/login", {
        email,
        password,
      });

      // Se passar o login precisamos definir o usuário logado.

      const data = response.data;

      // O backend envia um token e um user então...
      setUser(data.user);
      // É importante lembrar que a local Storage é a menos segura, uma boa prática seria salvar na sessionstorage (confirmar como digita)
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      localStorage.setItem("access_token", data.access_token);

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    //alteramos o logou para ele também limpar o access_token.
    setUser(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("access_token");
  };

  const isAuthenticated = !!user;

  return {
    user,
    isLoading,
    isAuthenticated,
    register,
    login,
    logout,
  };
};
