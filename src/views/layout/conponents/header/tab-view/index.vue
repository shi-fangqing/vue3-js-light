<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";
import {Constants} from "@/setting.js";
import ContextMenu from "@imengyu/vue3-context-menu";
import {useDark} from "@vueuse/core";

const route = useRoute()
const router = useRouter()

const tabs = ref([])
const tabValue = ref(route.path)

const menuList = ref()

function rightClick(e, path) {
  e.preventDefault()
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    theme: useDark().value ? 'default dark' : 'default',
    items: [
      {
        label: '关闭',
        hidden: path === Constants.Index_Path,
        onClick: () => {
          removeTab(path)
        }
      },
      {
        label: '关闭右侧',
        hidden: path === tabs.value[tabs.value.length - 1].name,
        onClick: () => {
          removeRight(path)
        }
      },
      {
        label: '关闭其他',
        onClick: () => {
          removeOther(path)
        }
      },
      {
        label: '关闭所有',
        onClick: () => {
          removeAll()
        }
      }
    ]
  })
}

// 移除右侧
function removeRight(path) {
  if (path === Constants.Index_Path) {
    removeAll()
    return
  }
  for (let i = 0; i < tabs.value.length; i++) {
    if (tabs.value[i].name === path) {
      tabs.value = tabs.value.slice(0, i + 1)
      break
    }
  }
  for (let item of tabs.value) {
    if (item.name === tabValue.value) {
      return;
    }
  }
  tabValue.value = tabs.value[tabs.value.length - 1].name
  router.push(tabValue.value)
}

// 移除其他
function removeOther(path) {
  tabs.value = tabs.value.filter(item => item.name === path)
  tabValue.value = path
  router.push(path)
}

// 移除所有
function removeAll() {
  tabs.value = []
  tabValue.value = Constants.Index_Path
  router.push(Constants.Index_Path)
}

// 移除tab
function removeTab(name) {
  tabs.value = tabs.value.filter(item => item.name !== name)
  // 如果移除tab和当前路由不同就无需跳转，直接返回
  if (name !== tabValue.value) {
    return
  }
  if (tabs.value && tabs.value.length > 0) {
    tabValue.value = tabs.value[tabs.value.length - 1].name
    router.push(tabs.value[tabs.value.length - 1].name)
  } else {
    tabValue.value = Constants.Index_Path
    router.push(Constants.Index_Path)
  }
}

// 点击tab跳转
function tabClick(tab) {
  if (tab.paneName !== route.path) {
    router.push(tab.paneName)
  }
}

// 监听路由添加tab
watch(route, (newValue) => {
  // 首页不添加到tabs数组
  if (newValue.path === Constants.Index_Path) {
    return;
  }
  tabValue.value = newValue.path
  for (let item of tabs.value) {
    if (item.name === newValue.path) {
      return
    }
  }
  tabs.value.push({
    title: newValue.meta.title,
    name: newValue.path
  })
}, {immediate: true})

function handleRight(e) {
  rightClick(e, e.target.id.replace('tab-', ''))
}
</script>

<template>
  <el-scrollbar>
    <el-tabs
        v-model="tabValue"
        type="card"
        @tab-remove="removeTab"
        @tab-click="tabClick"
        @contextmenu="handleRight"
    >
      <el-tab-pane
          :closable="false"
          :key="Constants.Index_Path"
          label="首页"
          :name="Constants.Index_Path"
      >
      </el-tab-pane>
      <el-tab-pane
          closable
          v-for="item in tabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </el-scrollbar>
</template>

<style lang="scss" scoped>

.el-scrollbar{
  height: auto;
  width: 100%;
}
.el-scrollbar__wrap{
  overflow: hidden;
}
:deep(.el-tabs__nav-scroll) {
  overflow: auto;
}

.el-tabs {
  --el-tabs-header-height: 1.56rem;
}

:deep(.el-tabs__item) {
  padding: 0 0.5rem;
}

:deep(.el-tabs__nav-next) {
  line-height: 1.88rem;
}

:deep(.el-tabs__nav-prev) {
  line-height: 1.88rem;
}
</style>
