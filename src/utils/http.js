
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
  // 参数验证
  if (!url || typeof url !== 'string') {
    throw new TypeError('URL must be a non-empty string.');
  }
  if (typeof params !== 'object' || params === null) {
    throw new TypeError('Params must be a non-null object.');
  }

  try {
    // 发起PUT请求
    const response = await http({
      //url接收id
      url: `${url}/${params.id}`,
      method: 'PUT', // 使用大写方法名以符合HTTP标准
      data: params,
    });

    // 可以考虑更详细的响应状态码处理
    if (response.status >= 200 && response.status < 300) {
      console.log('PUT request successful:', response.data);
      return response.data;
    } else {
      throw new Error(`Unexpected status code ${response.status}`);
    }
  } catch (error) {
    // 错误处理细化，区分网络错误和其他错误
    if (error instanceof TypeError || error instanceof SyntaxError) {
      console.error('Data processing error:', error.message);
      ElMessage.error('数据处理出错，请稍后重试。');
    } else {
      console.error('PUT request failed:', error.message);
      ElMessage.error('请求失败，请检查网络或稍后重试。');
    }
    throw error; // 重新抛出错误，以便调用者决定如何处理
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
