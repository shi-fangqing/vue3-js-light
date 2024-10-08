import request from "@/util/request.js";

export function reqUpdateProfile(data) {
    return request({
        url: '/profile',
        method: 'put',
        data
    })
}
