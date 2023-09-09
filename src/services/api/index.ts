import axios from "axios";
import {getCookie, removeCookie} from "utils/cookie";


export const requestWithoutAuth = axios.create({
    baseURL: "http://165.22.80.138/v1",
    timeout: 30000,
});

export const request = axios.create({
    baseURL: "http://165.22.80.138/v1",
    timeout: 30000,
    headers: {
        // common: {
        Authorization: "Bearer " + getCookie("token")
        // }
    }
});

request.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            removeCookie("token");
            removeCookie("user");
            // window.location.reload();
            // window.location.pathname = "/";
        }
        return Promise.reject(error);
    }
);

request.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        // common: {
        Authorization: "Bearer " + getCookie('token')
        // }
    }
    return config;
}, error => Promise.reject(error));