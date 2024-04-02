import axios from "axios";

const URL = 'http://14.241.244.112:5234/api/'
export const https = axios.create({
    baseURL: URL
})