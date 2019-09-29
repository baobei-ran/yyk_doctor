
import axios from 'axios';
// 动态获取 域名
// var baseURL = window.location.protocol+"//"+window.location.host; 
// axios.defaults.baseURL = window.location.protocol + "//" + window.location.host;

if (window.location.protocol === 'http:') {
  var baseURL = 'http://test99.yunyikang.cn'; // 测试
  axios.defaults.baseURL = 'http://test99.yunyikang.cn'; // 测试
} else {
  var baseURL = 'https://www.yunyikang.cn'; // 正式
  axios.defaults.baseURL = 'https://www.yunyikang.cn';
}

var http = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
  transformRequest: [function (data) {
    let newData = '';
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
    }
    newData = newData.substr(0, newData.length - 1);
    return newData;
  }]
});

function apiAxios(method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(function (res) {
    response(res);
  }).catch(function (err) {
    console.log(err);
  })
}


export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  },
  postJson: function (url, data, response) {  // SetTime组件，调用设置时间的
    axios.post(url, data)
    .then(function (res) {  
      response(res)
    })
    .catch(function (error) {
      console.log(error);
    })
  },
  baseURL: baseURL
}
