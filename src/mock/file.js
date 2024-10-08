import Mock from "@/mock/index.js";

Mock.onPost('/mock/file/upload').reply(function (config) {
    // 默认头像
    let avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    return [200, {code: 200, data: avatar}]
})

