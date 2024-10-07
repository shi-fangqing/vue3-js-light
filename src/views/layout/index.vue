<script setup>
import {onMounted, ref} from "vue";
import AsideMenu from "@/views/layout/conponents/aside-menu/index.vue";
import Header from "@/views/layout/conponents/header/index.vue"
import {useUserStore} from '@/store/modules/user.js'
import {useSettingStore} from "@/store/modules/setting.js";
import {Constants} from "@/setting.js"
import {getClientWidth} from "@/util/system.js";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const settingStore = useSettingStore()
const screenWidth = ref(getClientWidth())

// 是否折叠菜单，默认折叠
const isCollapse = ref(false)

// 窗口大小变化时触发
function handleWindowWidth() {
  screenWidth.value = getClientWidth()
}

onMounted(() => {
  // 监听窗口大小
  window.addEventListener('resize', handleWindowWidth)
})
</script>

<template>
  <el-container>
    <el-aside v-if="screenWidth<Constants.XS_WIDTH" style="width: 0">
      <el-drawer :with-header="false" v-model="isCollapse" direction="ltr" size="auto">
        <el-scrollbar>
          <AsideMenu :isCollapse="false"></AsideMenu>
        </el-scrollbar>
      </el-drawer>
    </el-aside>
    <el-aside v-else>
      <el-scrollbar>
        <AsideMenu :isCollapse="isCollapse"></AsideMenu>
      </el-scrollbar>
    </el-aside>
      <el-container>
        <Header v-model:isCollapse="isCollapse"></Header>
        <el-main :style="{overflow: settingStore.setting.isFixedHeader?'auto':'visible'}">
          <router-view></router-view>
        </el-main>
      </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.el-container {
  width: 100vw;
  height: 100vh;

  .el-aside {
    height: 100%;
    width: auto;

    :deep(.el-drawer__body) {
      padding: 0;
      width: 100%;
    }

    :deep(.el-scrollbar__view ) {
      height: 100%;
    }
  }

  .el-container {
    height: 100%;
    width: 100%;
    flex-direction: column;
    overflow: auto;
    .el-main{

    }
  }
}
</style>
