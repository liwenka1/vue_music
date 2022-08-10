//二次封装axios
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入样式
import 'nprogress/nprogress.css'


//利用create创建一个axios实例
const requests = axios.create({
  //配置对象
  //基础路径
  //本地路径
  //baseURL: 'http://localhost:3000',
  //vercel部署后端路径
  baseURL: 'https://netease-cloud-music-api-five-rosy.vercel.app/',
  timeout: 3000
})
//请求拦截器
requests.interceptors.request.use((config) => {
  nprogress.start()
  return config
})
//相应拦截器
requests.interceptors.response.use(
  (res) => {
    nprogress.done()
    return res.data
  },
  (error) => {
    console.log(error.message);
    return Promise.reject(new Error('faile'))
  }
)

//对外暴露
export default requests