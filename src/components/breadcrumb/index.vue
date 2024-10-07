<script setup>
import {ArrowRight} from "@element-plus/icons-vue";
import {computed} from "vue";
import {useRoute} from "vue-router";
const route = useRoute()

// 面包屑数据
const breadcrumbList = computed(() => {
  // 过滤掉只有一个children的
  return route.matched.filter(item => (item.children && item.children.length !== 1) || !item.children)
})
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: item.path }" v-for="(item,index) of breadcrumbList" :key="index">
      {{ item?.meta?.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>

</style>
