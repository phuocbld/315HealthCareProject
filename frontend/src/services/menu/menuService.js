import axios from "axios";

//local
// const URL = 'http://localhost:5234/api/'
// server
const URL = 'http://14.241.244.112:5234/api/'
const https = axios.create({
    baseURL: URL
})

export const menuService = {
    getlistMenu: (username) => https.get(`Menu/${username}`)
}