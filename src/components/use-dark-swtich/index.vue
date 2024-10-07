<script setup>
import {useDark} from '@vueuse/core'

const isDark = useDark()
</script>

<template>
  <el-switch v-model="isDark" inactive-action-icon="Sunny" active-action-icon="Moon"></el-switch>
</template>

<style lang="scss" scoped>

</style>
