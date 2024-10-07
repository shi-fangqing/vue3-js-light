<script setup>
import MenuItem from "./menu-item.vue";
import {useRoutesStore} from '@/store/modules/routes.js'
import {useRoute} from "vue-router";
import Logo from "@/views/layout/conponents/aside-menu/logo.vue";

const route = useRoute()
const routesStore = useRoutesStore()
defineProps({
  isCollapse: {
    type: Boolean,
    default: true
  }
})
let menuList = routesStore.routes

//通过递归过滤掉hidden为true的菜单及其子菜单
function filterHiddenMenu(menuList) {
  return menuList.filter(menu => {
    if (menu.children) {
      menu.children = filterHiddenMenu(menu.children)
    }
    return !menu?.meta?.hidden
  })
}

menuList = filterHiddenMenu(menuList)

</script>

<template>
  <el-menu
      :default-active="route.path"
      :collapse="isCollapse"
      :collapse-transition="false"
  >
    <Logo :is-collapse="isCollapse"></Logo>
    <MenuItem :menu-list="menuList"></MenuItem>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  width: 100%;
}
</style>
