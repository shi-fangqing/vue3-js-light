<script setup>
function isPrime(num) {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++)
    if (num % i === 0) return false;
  return num > 1;
}
</script>

<template>
  <div style="background-color: #efefef;">
    <auto-upload-file accept=".mp4" :maxSize="100" :showTip="true"/>
  </div>
  <div style="background-color: #67c23a;height: 30px"></div>
</template>

<style lang="scss" scoped>

</style>
