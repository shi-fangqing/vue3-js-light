<script setup>
import {useSettingStore} from "@/store/modules/setting.js";
import {useUserStore} from "@/store/modules/user.js";
import {ref} from "vue";
import LayoutSetting from "@/views/layout/conponents/header/dropdown/layout-setting.vue";
import {useRoute, useRouter} from "vue-router";
import {Constants} from "@/setting.js";

const route = useRoute()
const router = useRouter()
const settingStore = useSettingStore()
const userStore = useUserStore()

// 是否打开布局设置抽屉
const isOpenLayoutSetting = ref(false)

// 退出登录
async function logout() {
  await userStore.logout()
  await router.push({path: Constants.Login_Path, query: {redirect: route.path}})
}

// 个人中心
function profile() {
  router.push('/user/profile')
}

// 打开布局设置
function layoutSetting() {
  isOpenLayoutSetting.value = true
}
</script>

<template>
  <el-dropdown>
    <div class="avatar">
      <el-avatar class="img" v-if="userStore.userInfo.avatar" :src="userStore.userInfo.avatar" :size="30"/>
      <el-avatar class="img" v-else :size="100">{{
          userStore.userInfo.nickname?.substring(0, 1) || userStore.userInfo.username?.substring(0, 1)
        }}
      </el-avatar>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="profile">个人信息</el-dropdown-item>
        <el-dropdown-item v-if="settingStore.setting.showSetting" @click="layoutSetting">布局设置
        </el-dropdown-item>
        <el-dropdown-item @click="logout" divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <LayoutSetting v-model="isOpenLayoutSetting"></LayoutSetting>
</template>

<style lang="scss" scoped>
.avatar {
  height: 1.88rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
