import axios from "axios";
import { getCookie } from "./api/auth";
import { useEffect } from "react";


export const normalAxios = axios.create({
  baseURL: 'https://openmarket.weniv.co.kr/',
  timeout: 5000,
  headers: {}
});

// 요청 인터셉터 추가하기
normalAxios.interceptors.request.use(function (config) {
  // 요청이 전달되기 전에 작업 수행
  config.headers.Authorization = getCookie('accessToken') ? getCookie('accessToken') : null;
  return config;
}, function (error) {
  // 요청 오류가 있는 작업 수행
  return Promise.reject(error);
});

// 응답 인터셉터 추가하기
normalAxios.interceptors.response.use(function (response) {
  // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
  // 응답 데이터가 있는 작업 수행
  console.log(response)
  return response;
}, function (error) {
  // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
  // 응답 오류가 있는 작업 수행
  console.log(error.response) 
  return error.response;
});