'use strict'
import Axios from 'axios';
import QS from 'qs';
import { Message } from 'element-ui'

// Axios.defaults.withCredentials = true
// Axios.defaults.baseURL = '/api';

const host = process.env.NODE_ENV === 'development' ? '/api' : 'http://172.31.27.15:8080'; // 根据 process.env.NODE_ENV 的值判断当前是什么环境
// const host = process.env.url;
const axios = Axios.create({
  baseURL: host
});

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout =  10000;

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

// http请求拦截器 请求之前的操作
Axios.interceptors.request.use(
  config => {
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    return config;
  }, error => {
    Message.error({
      message: '响应超时'
    });
    return Promise.reject(error)
  });

// http响应拦截器  请求响应之后的操作
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          });
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message.error({
            message: '登录过期，请重新登录'
          });
          // 清除token
          localStorage.removeItem('token');
          // store.commit('loginSuccess', null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;
        // 404请求不存在
        case 404:
          Message.error({
            message: '网络请求不存在'
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          Message.error({
            message: error.response.data.message
          });
      }
      return Promise.reject(error.response);
    }
  }
);
