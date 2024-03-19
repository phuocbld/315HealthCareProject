import axios from "axios";

const URL = 'http://localhost:5234/api/Auth'
const https = axios.create({
    baseURL: URL
})
export const authService = {
    login: (form) => https.post('login',form),
}