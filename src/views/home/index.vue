<script setup>
import {computed, onUpdated, ref, watch} from "vue";

const value = ref()

const result = computed(() => isPrime(value.value))

// 判断质数
function isPrime(num) {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++)
    if (num % i === 0) return false;
  return num > 1;
}
</script>

<template>
  <el-image src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"></el-image>
</template>

<style lang="scss" scoped>

</style>
