const constantRoutes = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            hidden: true
        },
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/lockscreen',
        name: 'Lockscreen',
        meta: {
            title: '锁定屏幕',
            hidden: true
        },
        component: () => import('@/views/lockscreen/index.vue')
    }
]


export {
    constantRoutes
}
