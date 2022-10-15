import axios from "axios";
import config from "../config";
import { Loading, Message } from 'element-ui'
import router from '../router'
// 
let loading;
//内存中正在请求的数量
let loadingNum = 0;
function startLoading() {
    if (loadingNum == 0) {
        loading = Loading.service({
            lock: true,
            text: '拼命加载中...',
            background: 'rgba(255,255,255,0.5)',
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



// 判断当前运行环境
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro


// 类实例
class HttpRequest {
    // 初始化方法
    constructor (baseUrl) {
        this.baseUrl = baseUrl
    }

    // 初始化配置
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {
                "Content-Type": 'application/json'
            }
        }
    }

    // 拦截器
    interceptors (instance) {
       // 添加请求拦截器
       instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
           startLoading();
            const token = localStorage.getItem('token')
            if (token) {
                config.headers['X-Token'] = token 
            } 

            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            endLoading();
            return response;
        }, function (error) {
            // 对响应错误做点什么
            endLoading();
            // switch (error.response.status) {
            //     // 401 权限不足，退出登录
            //     case 401:
            //         localStorage.removeItem('token');
            // }
            if (error && error.response) {
                switch (error.response.status) {
                    case 400: error.message = '请求错误(400),请刷新重试~~~' + error.response.data.msg; break;
                    case 401: localStorage.removeItem('token'); router.push('/login'); break;
                    case 403: error.message = '拒绝访问(403) ' + error.response.data.msg; break;
                    case 404: error.message = '请求出错(404) ' + error.response.data.msg; break;
                    case 408: error.message = '请求超时(408) ' + error.response.data.msg; break;
                    case 500: error.message = '服务器错误(500) ' + error.response.data.msg; break;
                    case 501: error.message = '服务未实现(501) ' + error.response.data.msg; break;
                    case 502: error.message = '网络错误(502) ' + error.response.data.msg; break;
                    case 503: error.message = '服务不可用(503) ' + error.response.data.msg; break;
                    case 504: error.message = '网络超时(504) ' + error.response.data.msg; break;
                    case 505: error.message = 'HTTP版本不受支持(505) ' + error.response.data.msg; break;
                    default: error.message = `连接出错(${error.response.status})!`;
                }
            } else {
                error.message = '连接服务器失败!'
            }
            Message.error(error.message);
            return Promise.reject(error);
        }); 
    }

    // 接口请求调用函数
    request(options) {
        const instance = axios.create()
        options = {...this.getInsideConfig(), ...options}
        // 调用
        this.interceptors(instance)
        // 返回
        return instance(options)
    }
}


// 暴露出去
export default new HttpRequest(baseUrl)