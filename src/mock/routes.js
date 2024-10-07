import Mock from 'mockjs2'

Mock.mock('/mock/routes', 'get', () => {
    return {
        code: 200,
        data: dynamicRoutes
    }
})

const dynamicRoutes = [
    {
        path: '/',
        name: 'Layout',
        redirect: '/home',
        component: '/views/layout/index',
        meta: {
            title: '',
            icon: 'HomeFilled',
            hidden: false
        },
        children: [
            {
                path: '/home',
                name: 'Home',
                component: '/views/home/index',
                meta: {
                    title: '首页',
                    icon: 'HomeFilled',
                    hidden: false
                }
            }
        ]
    },
    {
        path: '/user',
        name: 'User',
        redirect: '/user/profile',
        component: '/views/layout/index',
        meta: {
            title: '用户信息',
            icon: 'HomeFilled',
            hidden: true
        },
        children: [
            {
                path: '/user/profile',
                name: 'UserProfile',
                component: '/views/user/profile/index',
                meta: {
                    title: '个人信息',
                    icon: 'HomeFilled',
                    hidden: true
                }
            }
        ]
    },
    {
        path: '/sys',
        name: 'Sys',
        component: '/views/layout/index',
        redirect: '/sys/user',
        meta: {
            title: '系统管理',
            icon: 'document',
            hidden: false
        },
        children: [
            {
                path: '/sys/user',
                name: 'SysUser',
                component: '/views/sys/user/index',
                meta: {
                    title: '用户管理',
                    icon: 'document',
                    hidden: false
                }
            },
            {
                path: '/sys/role',
                name: 'SysRole',
                component: '/views/sys/role/index',
                meta: {
                    title: '角色管理',
                    icon: 'document',
                    hidden: false
                },
                children: []
            },
            {
                path: '/sys/permission',
                name: 'SysPermission',
                component: '/views/sys/permission/index',
                meta: {
                    title: '权限管理',
                    icon: 'document',
                    hidden: false
                }
            }
        ]
    },
    {
        path: 'https://www.baidu.com',
        name: 'Baidu',
        meta: {
            title: '百度',
            icon: 'document',
            link: true,
            hidden: false
        }
    },
    {
        path: '/404',
        name: 404,
        component: '/views/404/index',
        meta: {
            title: '404',
            icon: 'document',
            link: false,
            hidden: false
        }
    }
]
