<script setup>
import {useDark} from '@vueuse/core'
import {useElementPlusTheme} from "use-element-plus-theme";
import {useSettingStore} from "@/store/modules/setting.js";
import {reactive} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
useDark()
useElementPlusTheme(useSettingStore().setting.themeColor)
const config = reactive({
  max: 1,
})
</script>

<template>
  <div>
    <el-config-provider :message="config">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style lang="scss">

</style>
