import axios from "axios";
import {useUserStore} from "@/store/modules/user.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {Constants} from "@/setting.js";
import router from "@/router"

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000,
})

request.interceptors.request.use(
    config => {
        const userStore = useUserStore()
        config.headers.set('token', userStore.token)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    async response => {
        switch (response.data.code) {
            case 200:
                return response.data
            case 401:
                try {
                    await ElMessageBox.confirm('登录状态已过期，是否重新登录?', '提示', {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    await router.push({path:Constants.Login_Path})
                } catch {
                    ElMessage.info({message: '已取消', duration: 1500})
                }
                return Promise.reject(response.data.message)
            default:
                ElMessage.error(response.data.message)
                return Promise.reject(response.data.message)
        }
    },
    async error => {
        if (error && error.response) {
            let message = '系统繁忙，请稍后...'
            switch (error.response.status) {
                case 401:
                    message = '未授权，请重新登录'
                    try {
                        await ElMessageBox.confirm('登录状态已过期，是否重新登录?', '提示', {
                            confirmButtonText: '确认',
                            cancelButtonText: '取消',
                            type: 'warning'
                        })
                        location.href = Constants.Login_Path
                    } catch {
                        ElMessage.info({message: '已取消', duration: 1500})
                    }
                    break;
                default:
                    ElMessage.error(message)
            }
            return Promise.reject(message)
        }
        ElMessage.error(error.message)
        return Promise.reject(error)
    }
)

export default request
