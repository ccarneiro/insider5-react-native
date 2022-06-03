import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.185:1337',
});

export default api;
