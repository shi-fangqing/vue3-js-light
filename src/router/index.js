import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import {constantRoutes} from '@/router/routes/index.js'
import {useRoutesStore} from '@/store/modules/routes.js'
import {useUserStore} from '@/store/modules/user.js'
import {useSettingStore} from "@/store/modules/setting.js";
import {Constants} from "@/setting.js";

const router = createRouter({
    history: createWebHistory(),
    // history:createWebHashHistory(),
    routes: [...constantRoutes]
})

const whitelist = [Constants.Login_Path]

router.beforeEach(async (to, from, next) => {
    const routesStore = useRoutesStore()
    const userStore = useUserStore()
    if (userStore?.token) {
        if (userStore.userInfo?.username) {
            if (routesStore.routes && routesStore.routes.length > 0) {
                next()
            } else {
                await routesStore.reqGetRoutes()
                next({...to, replace: true})
            }
        } else {
            await userStore.reqGetUserInfo()
            next({...to, replace: true})
        }
    } else {
        if (whitelist.includes(to.path)) {
            next()
        } else {
            next(Constants.Login_Path)
        }
    }
})
router.afterEach((to, from, failure) => {
    const settingStore = useSettingStore()
    if (settingStore.setting?.showDynamicTitle) {
        document.title = to.meta?.title || settingStore.setting.title
    }
})
export default router
