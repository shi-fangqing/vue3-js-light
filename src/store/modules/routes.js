import {defineStore} from 'pinia'
import {ref} from "vue";
import router from '@/router/index.js'
import {constantRoutes} from "@/router/routes/index.js";
import {reqRoutes} from "@/api/routes.js";

const modules = import.meta.glob('../../views/**/*.vue')

export const useRoutesStore = defineStore('routesStore', () => {
    const routes = ref([])

    // 向后端请求路由列表
    async function reqGetRoutes() {
        const {data} = await reqRoutes()
        routes.value = [...constantRoutes, ...data]
        let tempRoutes = JSON.parse(JSON.stringify(data))
        tempRoutes = filterLinkRoutes(tempRoutes)
        convertPathToComponent(tempRoutes)
        addDynamicRoutes(tempRoutes)
    }

    return {routes, reqGetRoutes}
})

// 递归过滤掉link为true的路由
export function filterLinkRoutes(routeList) {
    return routeList.filter(item => {
        if (item.children) {
            item.children = filterLinkRoutes(item.children)
        }
        return !item?.meta?.link
    })
}

// 使用递归将routeList中每个对象及其子对象中的component路径转换为组件（在component不为空的情况下）
export function convertPathToComponent(routeList) {
    routeList.forEach(item => {
        if (item.component && typeof (item.component) === 'string') {
            item.component = modules['../..' + item.component + '.vue'] || modules['../../views/404/index.vue']
        }
        if (item.children && item.children.length > 0) {
            convertPathToComponent(item.children)
        }
    })
}

// 添加动态路由
export function addDynamicRoutes(routeList) {
    routeList.forEach(item => {
        router.addRoute(item)
    })
}

