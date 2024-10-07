<script setup>
import {watch} from "vue";

const prop = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  id: Number,
})
const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}

watch(() => prop.modelValue, (newValue) => {
  if (newValue) {
    console.log(prop.id)
  }
})

</script>

<template>
  <el-dialog :model-value="prop.modelValue" @close="close">
    {{ id }}
  </el-dialog>
</template>

<style lang="scss" scoped>

</style>
