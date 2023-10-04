import axios from 'axios'
require('dotenv').config();
export const API = () => {
    // const baseUrl = process.env.VUE_APP_SERVER_API_URL;
    const baseUrl = 'http://16.171.197.176:3000';
    return axios.create({
        baseURL: baseUrl,
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "*/*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type",
        }
    })
}