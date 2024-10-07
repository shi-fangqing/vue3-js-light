import Mock from 'mockjs2'

Mock.mock('/mock/login', 'post', (event) => {
    console.log(event)
    const {username,password}=JSON.parse(event.body)
    if (username==='admin' && password==='admin123'){
        return {
            code: 200,
            data: 'token'
        }
    }else{
        return {
            code: 500,
            message:'用户名或密码错误'
        }
    }
})

Mock.mock('/mock/user/info', 'get', () => {
    return {
        code: 200,
        data: {
            username: 'admin',
            nickname: '超级管理员',
            phone:'12345678910',
            email:'xxxxx@xx.com',
            sex:1,
            avatar: 'https://avatars.githubusercontent.com/u/14963606?v=4',
            // avatar: '',
            roles: ['admin'],
            permission: ['*']
        }
    }
})
