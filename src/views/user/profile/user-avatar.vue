<script setup>
import {useUserStore} from "@/store/modules/user.js";
import {reqUpdateProfile} from "@/api/profile.js";

const userStore = useUserStore()

function result(url) {
  console.log(url)
  userStore.setUserInfo({avatar: url})
  // 发起请求，更新用户信息
  reqUpdateProfile(userStore.userInfo)
}
</script>

<template>
  <wuyu-cropper :src="userStore.userInfo.avatar" @result="result" action="/file/upload">
    <div class="p">
      <el-avatar class="avatar" v-if="userStore.userInfo.avatar" :src="userStore.userInfo.avatar" :size="100"/>
      <el-avatar class="avatar" v-else :size="100">{{ userStore.userInfo.nickname || userStore.userInfo.username }}
      </el-avatar>
      <div class="mask"></div>
    </div>
  </wuyu-cropper>
</template>

<style lang="scss" scoped>
.p {
  position: relative;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .5);
    cursor: pointer;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      opacity: 1;
    }

    &:after {
      content: '点击上传头像';
    }
  }
}
</style>
