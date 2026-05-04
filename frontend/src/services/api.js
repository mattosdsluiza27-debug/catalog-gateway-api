import axios from 'axios'; 

const api = axios.create({
    baseURL: 'http://localhost:8080/api/filmes', 
}); 

export default api; 