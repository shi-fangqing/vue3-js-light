import request from "@/util/request.js";

export function reqRoutes() {
    return request({
        url: '/routes',
        method: 'get'
    })
}
