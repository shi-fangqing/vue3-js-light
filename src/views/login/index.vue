<script setup>
import {getCurrentInstance, reactive, ref} from "vue";
import {useUserStore} from '@/store/modules/user.js'
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import {ElLoading, ElMessage} from "element-plus";
import {useSettingStore} from "@/store/modules/setting.js";
import {Constants} from "@/setting.js";
import {useThrottleFn} from "@vueuse/core";

const {proxy} = getCurrentInstance()
const settingStore = useSettingStore()
const userStore = useUserStore()
const route = useRoute()
const formRef = ref()
const loading = ref(false)
const formModel = reactive({
  username: 'admin',
  password: 'admin123'
})
const formRules = reactive({
  username: [
    {required: true, message: '请输入账号', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'}
  ]
})

// 登录按钮
const login = useThrottleFn(async () => {
  if (loading.value) {
    return
  }
  loading.value = true
  const loadingService = ElLoading.service({text: '加载中...'})
  try {
    // 校验登录表单
    await formRef.value.validate()
    await userStore.login(formModel)
    ElMessage.success({message: '登陆成功', duration: 1500})
    await router.push({path: route.query.redirect || Constants.Index_Path})
  } finally {
    loadingService.close()
    loading.value = false
  }
})

// 重置按钮
function reset() {
  formRef.value.resetFields()
}

</script>

<template>
  <div class="layout">
    <el-card>
      <el-form ref="formRef" :model="formModel" :rules="formRules">
        <el-form-item prop="username">
          <el-input placeholder="账号" clearable v-model="formModel.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码" clearable v-model="formModel.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-loading="loading" type="primary" style="width: 100%" @click="login()">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain type="default" style="width: 100%" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  width: 100vw;
  background-image: url("/public/login-bg.png");
  opacity: 1;
  background-repeat: no-repeat;
  background-size: cover;

  .el-card {
    width: 18.75rem;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: .7;
  }
}

.dark-background {
  background-image: none;
}
</style>
