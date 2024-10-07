<script setup>
import {ref} from "vue";

const updatePasswordFormRef = ref()
const updatePasswordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const updatePasswordRule = {
  oldPassword: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
  newPassword: [{required: true, message: '请输入新密码', trigger: 'blur'}],
  confirmPassword: [{required: true, message: '请再次确认密码', trigger: 'blur'}],
}

// 重置更新密码表单
function resetUpdatePassword() {
  updatePasswordFormRef.value.resetFields()
}

function saveUpdatePassword() {
  updatePasswordFormRef.value.validate()
}
</script>

<template>
  <el-form ref="updatePasswordFormRef" :model="updatePasswordForm" :rules="updatePasswordRule"
           label-width="80">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input v-model="updatePasswordForm.oldPassword"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="updatePasswordForm.newPassword"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="updatePasswordForm.confirmPassword"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveUpdatePassword">保存</el-button>
      <el-button type="default" @click="resetUpdatePassword">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>

</style>
