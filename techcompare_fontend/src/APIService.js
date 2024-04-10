import axios from 'axios';

const BOOK_API_REST_URL = "http://localhost:3000/User/getUser";

class APIService {
    
    getUser(){
        return axios.get(BOOK_API_REST_URL);
    }

}

export default new APIService();