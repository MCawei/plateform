'use strict'
import Axios from 'axios';
import { Message } from 'element-ui'

// Axios.defaults.withCredentials = true
// Axios.defaults.baseURL = '/api';

const host = process.env.NODE_ENV === 'development' ? '/api' : 'http://172.31.27.15:8080'; // 根据 process.env.NODE_ENV 的值判断当前是什么环境
// const host = process.env.url;
const axios = Axios.create({
  baseURL: host
});

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.timeout =  6000;

export const apiGet = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    })
  })
};

export const apiPost = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    })
  })
};


export const apiPut = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    })
  })
};

export const apiDelete = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.delete(url, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    })
  })
};

// http请求拦截器 请求之前的一些操作
Axios.interceptors.request.use(config => {
  if(config.method=='post'){
    config.data=QS.stringify(config.data); //防止post请求参数无法传到后台
  }
  return config
}, error => {
  Message.error({
    message: '加载超时'
  });
  return Promise.reject(error)
});
// http响应拦截器  请求之后的操作
Axios.interceptors.response.use(data => {
  return data
}, error => {
  Message.error({
    message: '加载失败'
  });
  return Promise.reject(error)
});

