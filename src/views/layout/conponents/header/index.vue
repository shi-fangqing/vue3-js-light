<script setup>
import {useUserStore} from "@/store/modules/user.js";
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useSettingStore} from "@/store/modules/setting.js";
import Dropdown from "@/views/layout/conponents/header/dropdown/index.vue";
import TabView from "@/views/layout/conponents/header/tab-view/index.vue"
import {Constants} from "@/setting.js"
import {getClientWidth} from "@/util/system.js";

const settingStore = useSettingStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const prop = defineProps({
  isCollapse: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:isCollapse'])
// 是否展开侧边栏
const isExpand = computed(() => {
  return !prop.isCollapse
})

function lockscreen() {
  router.push({path: '/lockscreen', query: {redirect: route.path}})
}

const screenWidth = ref(getClientWidth())

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
  <el-header class="header"
             style="width: 100%"
             :style="{height:settingStore.setting.showTabView?Constants.Breadcrumb_Height+Constants.Tabview_Height+'rem':Constants.Breadcrumb_Height + 'rem'}">
    <el-row class="header-top" align="middle" justify="space-between"
            :style="{height:Constants.Breadcrumb_Height+'rem'}">
      <el-col :span="16" style="cursor: pointer;display: flex;align-items: center;">
        <div style="display: flex;align-items: center;margin-right: 0.63rem">
          <template v-if="screenWidth<Constants.XS_WIDTH">
            <el-icon v-show="isExpand" @click="emit('update:isCollapse', true)" style="font-size: 1.38rem">
              <Expand/>
            </el-icon>
            <el-icon v-show="!isExpand" @click="emit('update:isCollapse', false)" style="font-size: 1.38rem">
              <Fold/>
            </el-icon>
          </template>
          <template v-else>
            <el-icon v-show="!isExpand" @click="emit('update:isCollapse', false)" style="font-size: 1.38rem">
              <Expand/>
            </el-icon>
            <el-icon v-show="isExpand" @click="emit('update:isCollapse', true)" style="font-size: 1.38rem">
              <Fold/>
            </el-icon>
          </template>
        </div>
        <div v-if="settingStore.setting.showBreadCrumb" class="hidden-xs-only">
          <Breadcrumb></Breadcrumb>
        </div>
        <div v-else class="hidden-xs-only"></div>
      </el-col>
      <el-col :span="8" style="display: flex;align-items: center;justify-content: flex-end">
        <span class="iconfont icon-suoping lock hidden-xs-only" style="margin-right: 0.63rem" @click="lockscreen"></span>
        <FullScreen class="hidden-xs-only" style="margin-right: 0.63rem"></FullScreen>
        <UseDarkSwitch style="margin-right: 1.25rem"></UseDarkSwitch>
        <Dropdown></Dropdown>
      </el-col>
    </el-row>
    <el-row v-if="settingStore.setting.showTabView"
            class="header-bottom" align="middle" :gutter="20"
            style="margin-left: 0;overflow-x: auto;overflow-y: hidden;"
            :style="{height:settingStore.setting.showTabView?Constants.Tabview_Height + 'rem':0}"
    >
      <TabView></TabView>
    </el-row>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  background-color: var(--el-bg-color);

  .header-top {
    padding: 0.31rem 0.93rem;
    box-shadow: 0 0.13rem 0.25rem rgba(0, 0, 0, 0.1);

    .lock {
      cursor: pointer;
      color: slategrey;
      font-size: 1.44rem;
    }
  }

  .header-bottom {
    width: 100%;
    padding:0.31rem 0.94rem;
    box-shadow: 0 0.13rem 0.25rem rgba(0, 0, 0, 0.3);

  }
}
</style>
