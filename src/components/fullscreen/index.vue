<template>
  <div>
    <span @click="toggle" class="fullscreen" :class="isFullscreen?'iconfont icon-tuichuquanping':'iconfont icon-quanping'"></span>
  </div>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, enter, exit, toggle } = useFullscreen();
</script>

<style lang='scss' scoped>
.fullscreen{
  cursor: pointer;
  font-size: 1.9rem;
  color: slategrey;
}
</style>
