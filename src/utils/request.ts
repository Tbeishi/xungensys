import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

// 创建axios实例对象
let requests = axios.create({
  // 基础路径
  baseURL: '/api',
  timeout: 3000,
});

// 设置全局默认的头部信息
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// 请求拦截器
requests.interceptors.request.use((config) => {
  console.log('触发请求拦截');

  config.headers['Content-Type'] = 'multipart/form-data';
  // 需要携带token带给服务器
  if (localStorage.getItem('token')) {
    console.log('Bearer');

    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 成功的回调函数：服务器响应的数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data;
  },
  (error) => {
    // 响应失败的回调函数
    // return Promise.reject(new Error('faile'))
  }
);

// 对外暴露
export default requests;