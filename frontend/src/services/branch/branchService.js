import axios from "axios";

const URL = 'http://localhost:5234/api/'
const https = axios.create({
    baseURL: URL
})
export const branchService = {
    getListBranch: () => https.get('chinhanh')
}