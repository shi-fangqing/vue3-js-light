import {createApp} from 'vue'
import '@/style/base.scss'
import '@/style/iconfont/index.css'
import 'element-plus/theme-chalk/display.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/style/element/variables.scss'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from '@/router'
import pinia from '@/store'
import globalComponent from '@/components'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import {useRoute, useRouter} from "vue-router";
import request from "@/util/request.js";
import '@/mock/login.js'
import '@/mock/routes.js'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.config.globalProperties.$route = useRoute()
app.config.globalProperties.$router = useRouter()
app.config.globalProperties.$request = request
app.use(ElementPlus, {
    locale: zhCn,
})
//
app.use(globalComponent)
app.use(ContextMenu)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
