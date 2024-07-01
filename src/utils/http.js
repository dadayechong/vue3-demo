// http.js 或 api.js
import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建 axios 实例
const http = axios.create({
    baseURL: 'http://127.0.0.1:8080/', // API 基础地址
    timeout: 10000, // 请求超时时间
  });

  // 请求拦截器
http.interceptors.request.use(
    config => {
      // 在发送请求之前做些什么
      console.log('请求拦截器', config);
      return config;
    },
    error => {
      // 对请求错误做些什么
      console.log('请求拦截器', error);
      return Promise.reject(error);
    }
  );
  
  // 响应拦截器
  http.interceptors.response.use(
    response => {
      // 对响应数据做点什么
      if (response.data && response.data.code !== 0) {
        // 根据业务进行错误处理，例如提示信息
        ElMessage.error(response.data.message);
        return Promise.reject(new Error(response.data.message));
      }
      return response.data;
    },
    error => {
      // 对响应错误做点什么
      ElMessage.error('网络错误，请稍后再试');
      return Promise.reject(error);
    }
  );
  //封装post请求、get请求、put请求、delete请求
  export function post(url, data) {
    return http({
      url: url,
      method: 'post',
      data: data
    });
  }

  export function get(url, params) {
    return http({
      url: url,
      method: 'get',
      params: params
    });
  }

  export function put(url, data) {
    return http({
      url: url,
      method: 'put',
      data: data
    });
  }

  export function del(url, params) {
    return http({
      url: url,
      method: 'delete',
      params: params
    });
  }

  export default http;