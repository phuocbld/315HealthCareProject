import axios from "axios";

const URL = 'http://localhost:5234/auth/Auth/'
const https = axios.create({
    baseURL: URL
})
export const authService = {
    login: (form) => {
      return  https.get('login',form)
    }
}