import request from "@/util/request.js";

export function reqUploadFile(data) {
    return request({
        url: '/file/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}
