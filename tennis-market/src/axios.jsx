import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://openmarket.weniv.co.kr/',
  timeout: 5000,
  // headers: {
  //   Authorization: userAccessToken? userAccessToken : null,
  //   withCredentials: true,
  // },
});

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;