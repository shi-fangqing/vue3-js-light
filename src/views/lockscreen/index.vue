<script setup>
import {computed, ref, watch} from "vue";
import {formatDate, TimeFormat} from '@/util/time.js'
import {useUserStore} from "@/store/modules/user.js";
import {useRoute, useRouter} from "vue-router";
import defaultAvatar from '/public/default_avatar.jpg'
import {Constants} from "@/setting.js";
const userStore = useUserStore()
const username=computed(()=>userStore.userInfo?.username)
const nickname=computed(()=>userStore.userInfo?.nickname)
const avatar=computed(()=>userStore.userInfo?.avatar)
const router = useRouter()
const route = useRoute()
const currentTime = ref(formatDate(Date.now(), TimeFormat["HH:mm:ss"]))
setInterval(() => {
  currentTime.value = formatDate(Date.now(), TimeFormat["HH:mm:ss"])
}, 1000)

// 退出重新登陆
async function logout() {
  await userStore.logout()
  if (route.query.redirect) {
    await router.push({path: Constants.Login_Path, query: {redirect: route.query.redirect}})
  } else {
    await router.push({path: Constants.Login_Path})
  }
}

// 解除锁屏
function unlock(){
  router.push({path:route.query?.redirect || Constants.Index_Path})
}

</script>

<template>
  <div class="layout">
    <div class="content">
      <div class="time">{{ currentTime }}</div>
      <div class="username-and-nickname">{{nickname || '' }} {{nickname && username ? ' / ' :''}} {{ username || ''}} </div>
      <div class="avatar-and-password">
        <el-image class="avatar" :src="avatar || defaultAvatar"/>
        <el-input class="password">密码</el-input>
        <el-button style="margin-left: -0.06rem;" @click="unlock">
          <template #icon>
            <span class="iconfont icon-denglu"></span>
          </template>
        </el-button>
      </div>
      <div class="tip">系统锁屏，请输入密码登录</div>
      <div class="logout" @click="logout">退出重新登录</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  width: 100vw;

  .content {
    height: 80%;
    display: flex;
    flex-direction: column;

    .time {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 4.38rem;
      transform: translateY(4.39rem);
    }

    .username-and-nickname {
      transform: translateY(2.5rem);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      font-size: 1.13rem;
      color: #6b6d6f;
    }

    .avatar-and-password {
      height: 11.25rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .avatar {
        height: 40%;
        aspect-ratio: 1/1;
        border-radius: 50%;
        border: 0.31rem solid #ffffff;
      }

      .password {
        width: 14.38rem;
      }

      .icon-denglu {
        font-weight: 700;
        font-size: 1.25rem;
        color: #67c23a;
      }
    }

    .tip {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #737373;
    }

    .logout {
      height: 3.13rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #227ed3;
      cursor: pointer;
    }
  }
}
</style>
