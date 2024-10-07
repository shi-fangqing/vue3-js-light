<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {getClientWidth} from "@/util/system.js";
import {Constants} from "@/setting.js";
import {useDebounceFn} from "@vueuse/core";

const emit = defineEmits(['loadData', 'update:pageNum', 'update:pageSize'])
const prop = defineProps({
  pageNum: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pagerCount: {
    type: Number,
    default: 5
  },
  pageSizes: {
    type: Array,
    default: [5, 10, 15, 20]
  },
  layout: {
    type: String,
    default: ''
  },
  total: {
    type: Number,
    default: 0
  }
})

// 窗口宽度
const clientWidth = ref(getClientWidth())

// 窗口大小改变回调
function handleClientWidth() {
  clientWidth.value = getClientWidth()
}

const pageNum1 = ref(prop.pageNum)
const pageSize1 = ref(prop.pageSize)
const pagerCount1 = computed(() => prop.pagerCount)
const pageSizes1 = computed(() => prop.pageSizes)
const layout1 = computed(() => {
  if (!prop.layout) {
    // 可视宽度是否小于768px
    return clientWidth.value < Constants.XS_WIDTH ? 'prev, pager, next, total' : 'prev, pager, next, jumper,total,sizes'
  } else {
    return prop.layout
  }
})
const total1 = computed(() => prop.total)

// 监听pageNum和pageSize的变化
watch([pageNum1, pageSize1], ([newPageNum, newPageSize]) => {
  emit('update:pageNum', newPageNum)
  emit('update:pageSize', newPageSize)
  // 节流函数，加载新数据
  loadData()
})

// 防抖函数，处理页大小改变导致页号改变，连续发送两次请求的情况
const loadData = useDebounceFn(() => {
  emit('loadData')
}, 800)

onMounted(() => {
  window.addEventListener("resize", handleClientWidth)
})
</script>
<template>
  <el-pagination
      v-model:current-page="pageNum1"
      v-model:page-size="pageSize1"
      :page-sizes="pageSizes1"
      :layout="layout1"
      :pager-count="pagerCount1"
      :total="total1"
      hide-on-single-page
  />
</template>

<style lang="scss" scoped>

</style>
