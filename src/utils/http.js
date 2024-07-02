
// http.js 或 api.js
import { ElMessage } from 'element-plus';
import axios from 'axios';

// 创建 axios 实例
const http = axios.create({
    baseURL: 'http://127.0.0.1:8080', // API 基础地址
    timeout: 500, // 请求超时时间
  });

//get请求,使用try catch捕获异常
export async function get(url, params) {
  try {
    const res = await http({
      url: url,
      method: 'get',
      params: params
    });
    console.log(res);
    return res;
  } catch (error) {
    //使用ElMessage抛出异常
    ElMessage.error(error.message);
  }
}
export async function post(url, params) {
  try {
    const res = await http({
      url: url,
      method: 'post',
      data: params
    });
    console.log(res);
    return res;
  } catch (error) {
    //使用ElMessage抛出异常
    ElMessage.error(error.message);
  }
}

/**
 * 异步执行HTTP PUT请求。
 * @param {string} url 请求的URL。
 * @param {Object} params 请求携带的数据对象。
 * @returns {Promise<Object>} 返回一个包含服务器响应的Promise对象。
 */
export async function put(url, params) {
  //
  const res = await http({
    url: url,
    method: "put",
    data: params,
  });
  if (res.code === 200) {
    ElMessage.success("修改成功");
    return res;
  } else {
    ElMessage.error(res.message);
  }
}



export async function del(url, params) {
  try {
    const res = await http({
      url: url,
      method: 'delete',
      data: params
    });
    console.log(res);
    return res;
  } catch (error) {
    //使用ElMessage抛出异常
    ElMessage.error(error.message);
  }
}
