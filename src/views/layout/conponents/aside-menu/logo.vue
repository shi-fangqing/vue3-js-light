<script setup>
import {useSettingStore} from "@/store/modules/setting.js";
import {useRouter} from "vue-router";
import {Constants} from "@/setting.js";
import Logo from '/public/vite.svg'
defineProps(['isCollapse'])
const settingStore = useSettingStore()
const router=useRouter()
function toIndex(path){
  router.push(path)
}
</script>

<template>
  <div class="layout" @click="toIndex(Constants.Index_Path)">
    <el-image class="logo-image" :src="Logo"/>
    <span class="title" v-show="!isCollapse">{{settingStore.setting.title}}</span>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  padding: 0.6rem 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .logo-image {
    height: 1.56rem;
    aspect-ratio: 1/1;
    margin-right: 0.63rem;
  }

  .title{
    font-weight: 700;
  }
}
</style>
