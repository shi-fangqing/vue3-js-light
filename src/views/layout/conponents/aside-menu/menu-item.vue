<script setup>
import router from "@/router/index.js";

defineOptions({name: 'MenuItem'})
defineProps({menuList: Array})

function go(path) {
  if (path.startsWith('http')) {
    window.open(path)
  } else {
    router.push(path)
  }
}
</script>

<template>
  <template v-for="menu of menuList">
    <!-- 如果当前有子菜单，且子菜单只有一个时 -->
    <el-menu-item v-if="menu.children && menu.children.length === 1" @click="go(menu.children[0].path)"
                  :index="menu.children[0].path">
      <el-icon>
        <component :is="menu.children[0]?.meta?.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ menu.children[0]?.meta?.title }}</span>
      </template>
    </el-menu-item>
    <!-- 如果当前有子菜单，且子菜单大于一个时 -->
    <el-sub-menu v-if="menu.children && menu.children.length > 1" :index="menu.path">
      <template #title>
        <el-icon>
          <component :is="menu?.meta?.icon"></component>
        </el-icon>
        <span>{{ menu?.meta?.title }}</span>
      </template>
      <!-- 调用自身  此处是重点-->
      <MenuItem :menuList="menu.children"></MenuItem>
    </el-sub-menu>
    <!-- 如果没有子菜单，则显示当前内容 -->
    <el-menu-item v-if="!menu.children || menu.children.length===0" @click="go(menu.path)" :index="menu.path">
      <el-icon>
        <component :is="menu?.meta?.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ menu?.meta?.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<style lang="scss" scoped>

</style>
