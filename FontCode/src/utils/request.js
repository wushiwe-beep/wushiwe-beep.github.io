import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from '../vuex/store';
import router from "../router/index"

let loading;
//内存中正在请求的数量
let loadingNum = 0;
function startLoading() {
  if (loadingNum == 0) {
    loading = Loading.service({
      lock: true,
      text: '拼命加载中...',
      background: 'rgba(0,0,0,0.5)',
    })
  }
  //请求数量加1
  loadingNum++;
}
function endLoading() {
  //请求数量减1
  loadingNum--
  if (loadingNum <= 0) {
    loading.close()
  }
}

axios.defaults.withCredentials = true

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15*1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token;
    }

    startLoading()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data
    endLoading()
    return res
  },
  error => {
    endLoading()
    if (error && error.response) {
      if (error.response.status == 401) {
        Message({
          message: "登陆失效,请重新登陆!",
          type: "error",
          duration: 2 * 1000
        })
        store.commit('logout');
        router.push("/login");
        return Promise.reject(error)

      }
    }

    Message({
      message: "错误" + error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service