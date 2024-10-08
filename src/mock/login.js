import Mock from "@/mock/index.js";

Mock.onPost('/mock/login').reply(function (config) {
    console.log(config)
    return [200, {code: 200, data: 'token'}]
})
Mock.onGet('/mock/user/info').reply(function (config) {
    console.log(config)
    return [
        200,
        {
            code: 200,
            data: {
                username: 'admin',
                nickname: '超级管理员',
                phone: '12345678910',
                email: 'xxxxx@xx.com',
                sex: 1,
                // avatar: 'https://avatars.githubusercontent.com/u/14963606?v=4',
                avatar: '',
                roles: ['admin'],
                permission: ['*']
            }
        }
    ]
})
