import request from "@/util/request.js";

export function reqLogin(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

export function reqUserInfo() {
    return request({
        url: '/user/info',
        method: 'get'
    })
}
