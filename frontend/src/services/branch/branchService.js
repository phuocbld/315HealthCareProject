import axios from "axios";

//local
// const URL = 'http://localhost:5234/api/Auth'
// server
const URL = 'http://14.241.244.112:5234/api/'
const https = axios.create({
    baseURL: URL
})
export const branchService = {
    getListBranch: () => https.get('chinhanh')
}