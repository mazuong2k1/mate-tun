import axios from 'axios'
require('dotenv').config();
export const API = () => {
    const baseUrl = 'http://localhost:3000';
    // const baseUrl = 'http://api.adsearch.tech/';
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