<script setup>
import {computed, ref} from "vue";
import {useSettingStore} from "@/store/modules/setting.js";

const prop = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const settingStore = useSettingStore()
// 主题色
const themeColor = ref(settingStore.setting?.themeColor)
// 是否固定菜单
const isFixedHeader = ref(settingStore.setting?.isFixedHeader)
// 是否开启动态标题
const showDynamicTitle = ref(settingStore.setting?.showDynamicTitle)
// 是否开启tabView
const showTabView = ref(settingStore.setting?.showTabView)
// 是否开启面包屑
const showBreadCrumb = ref(settingStore.setting?.showBreadCrumb)
const isOpen = computed(() => {
  return prop.modelValue
})

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

function saveSetting() {
  settingStore.setSetting({
    themeColor: themeColor.value,
    isFixedHeader: isFixedHeader.value,
    showDynamicTitle: showDynamicTitle.value,
    showTabView: showTabView.value,
    showBreadCrumb: showBreadCrumb.value,
  })
}

function resetSetting() {
  settingStore.resetSetting()
}

function closeDrawer() {
  emit('update:modelValue', false)
  themeColor.value = settingStore.setting?.themeColor
  isFixedHeader.value = settingStore.setting?.isFixedHeader
  showDynamicTitle.value = settingStore.setting?.showDynamicTitle
  showTabView.value = settingStore.setting?.showTabView
  showBreadCrumb.value = settingStore.setting?.showBreadCrumb
}
</script>

<template>
  <el-drawer v-model="isOpen" @close="closeDrawer" :with-header="false">
    <el-scrollbar>
      <el-row>
        <el-col>系统布局配置</el-col>
      </el-row>
      <el-row justify="space-between" align="middle" class="setting-item">
        <el-col :sm="20">
          主题色
        </el-col>
        <el-col :sm="4">
          <el-color-picker v-model="themeColor" show-alpha :predefine="predefineColors"></el-color-picker>
        </el-col>
      </el-row>
      <el-row justify="space-between" align="middle" class="setting-item">
        <el-col :sm="20">
          固定顶部
        </el-col>
        <el-col :sm="4">
          <el-switch v-model="isFixedHeader"></el-switch>
        </el-col>
      </el-row>
      <el-row justify="space-between" align="middle" class="setting-item">
        <el-col :sm="20">
          动态标题
        </el-col>
        <el-col :sm="4">
          <el-switch v-model="showDynamicTitle"></el-switch>
        </el-col>
      </el-row>
      <el-row justify="space-between" align="middle" class="setting-item">
        <el-col :sm="20">
          开启TabView
        </el-col>
        <el-col :sm="4">
          <el-switch v-model="showTabView"></el-switch>
        </el-col>
      </el-row>
      <el-row justify="space-between" align="middle" class="setting-item hidden-xs-only">
        <el-col :sm="20">
          开启面包屑
        </el-col>
        <el-col :sm="4">
          <el-switch v-model="showBreadCrumb"></el-switch>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :sm="12" style="margin-bottom: 0.63rem">
          <el-button type="primary" plain @click="saveSetting">保存设置</el-button>
        </el-col>
        <el-col :sm="12">
          <el-button type="default" plain @click="resetSetting">重置配置</el-button>
        </el-col>
      </el-row>
    </el-scrollbar>
  </el-drawer>
</template>

<style lang="scss" scoped>
.setting-item {
  margin: 0.63rem 0;
  font-weight: 200;
  font-size: 0.81rem;
}
</style>
