import axios from "axios";

export const http = axios.create({ baseURL: "http://localhost:3000/" });

http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // Queremos pegar o token que estamos enviando com frequência e, para evitar erros de 'esqueci de enviar o token' colocar pra fazer automaticamente
    // Fazendo isso evitamos de "esquecer o token nas requisições que ele é necessário"
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
