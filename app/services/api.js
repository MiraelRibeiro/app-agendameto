import axios from "axios";
// se ao usar "localhost" não funcionar busque o Ipv4 da sua maquina
const api = axios.create({
    baseURL: 'http://192.168.15.163:3333/'
});

export default api;