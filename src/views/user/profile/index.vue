<script setup>
import {useUserStore} from "@/store/modules/user.js";
import UserAvatar from "@/views/user/profile/user-avatar.vue";
import UpdatePassword from "@/views/user/profile/update-password.vue";
import UpdateBaseinfo from "@/views/user/profile/update-baseinfo.vue";

const userStore = useUserStore()

</script>

<template>
  <el-row :gutter="15" class="layout">
    <el-col :sm="8" class="info">
      <el-card>
        <template #header>
          <span>个人信息</span>
        </template>
        <template #default>
          <div class="avatar-box">
            <UserAvatar/>
          </div>
          <div class="info-item">
            <span>用户名称</span>
            <span>Admin</span>
          </div>
          <div class="info-item">
            <span>手机号码</span>
            <span>12345678910</span>
          </div>
          <div class="info-item">
            <span>用户邮箱</span>
            <span>xxxxx@xx.com</span>
          </div>
          <div class="info-item">
            <span>所属角色</span>
            <span>Admin</span>
          </div>
          <div class="info-item">
            <span>注册时间</span>
            <span>2024-10-01 00:00:00</span>
          </div>
        </template>
      </el-card>
    </el-col>
    <el-col :sm="16">
      <el-card>
        <template #header>
          <span>基本资料</span>
        </template>
        <template #default>
          <el-tabs model-value="baseInfo">
            <el-tab-pane label="基本资料" name="baseInfo">
              <update-baseinfo/>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="updatePassword">
              <update-password/>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.layout {
  .info {
    margin-bottom: 0.63rem;

    .avatar-box {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 1.25rem;
      border-bottom: 0.06rem solid var(--el-border-color);
      cursor: pointer;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      padding: 0.63rem 0;
      font-size: 0.81rem;
      border-bottom: 0.06rem solid var(--el-border-color);
    }
  }
}
</style>
