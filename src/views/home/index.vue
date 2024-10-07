<script setup>
import {computed, ref} from "vue";

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
  <el-collapse>
    <el-collapse-item>
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="scss" scoped>

</style>
