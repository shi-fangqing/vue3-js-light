import {defineStore} from 'pinia'
import {ref} from "vue";
import {reqLogin, reqUserInfo} from "@/api/login.js";

export const useUserStore = defineStore('userStore', () => {
    const token = ref(localStorage.getItem('token') || '')
    const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')) || {})

    function setToken(newToken) {
        token.value = newToken
        localStorage.setItem('token', newToken)
    }

    function setUserInfo(newUserInfo) {
        userInfo.value = {...userInfo.value, ...newUserInfo}
        localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    }

    function clearToken() {
        token.value = ''
        localStorage.removeItem('token')
    }

    function clearUserInfo() {
        userInfo.value = {}
        localStorage.removeItem('userInfo')
    }

    async function reqGetUserInfo() {
        const {data} = await reqUserInfo()
        setUserInfo(data)
    }

    async function login(data) {
        const res = await reqLogin(data)
        setToken(res.data)
    }

    async function logout() {
        clearToken();
        clearUserInfo();
    }

    return {token, userInfo, setToken, setUserInfo, clearToken, clearUserInfo, reqGetUserInfo, login, logout}
})
