import axios from "axios"; // importando o axios para instalar comando  npm install axios

const api = axios.create({
  baseURL: 'https://api.github.com'  // base de url para fazer a requisição
})

export default api;