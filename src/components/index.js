import Breadcrumb from '@/components/breadcrumb/index.vue'
import FullScreen from '@/components/fullscreen/index.vue'
import Pagination from '@/components/pagination/index.vue'
import SearchToolbar from '@/components/search-toolbar/index.vue'
import UseDarkSwitch from '@/components/use-dark-swtich/index.vue'
import AutoUploadFile from '@/components/auto-upload-file/index.vue'
const components = {
    Breadcrumb,
    FullScreen,
    Pagination,
    SearchToolbar,
    UseDarkSwitch,
    AutoUploadFile
}
export default {
    install(app) {
        Object.keys(components).forEach(key => {
            app.component(key, components[key])
        })
    }
}
