<script setup>
import {ref} from "vue";
import {useUserStore} from "@/store/modules/user.js";

const userStore = useUserStore()
const baseInfoFormRef = ref()
const userInfoForm = ref(JSON.parse(JSON.stringify(userStore.userInfo)))
const userInfoRule = {
  nickname: [{required: true, message: '请输入用户昵称', trigger: 'blur'}],
  phone: [{required: true, message: '请输入手机号', trigger: 'blur'}],
  email: [{required: true, message: '请输入用户邮箱', trigger: 'blur'}],
}

// 重置基本信息表单
function resetBaseInfo() {
  baseInfoFormRef.value.resetFields()
}

function saveBaseInfo() {
  baseInfoFormRef.value.validate()
}
</script>

<template>
  <el-form ref="baseInfoFormRef" label-width="80" :model="userInfoForm" :rules="userInfoRule">
    <el-form-item label="用户昵称" prop="nickname">
      <el-input v-model="userInfoForm.nickname"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="userInfoForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="userInfoForm.email"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="userInfoForm.sex">
        <el-radio label="男" :value="1"></el-radio>
        <el-radio label="女" :value="0"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveBaseInfo">保存</el-button>
      <el-button type="default" @click="resetBaseInfo">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>

</style>
