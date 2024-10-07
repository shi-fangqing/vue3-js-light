                                                                              --><script setup>
const prop = defineProps({
  // 是否显示搜索表单
  showSearch: {
    type: Boolean,
    default: true
  },
  // 控制搜索按钮的显示
  search: {
    type: Boolean,
    default: true
  },
  // 控制刷新按钮的显示
  refresh: {
    type: Boolean,
    default: true
  },
  // 形如：[{key:1,label:'名称',visible:true}]
  columns: {
    type: Array,
    default: []
  }
})
const emit = defineEmits(['update:showSearch', 'queryTable'])

// 是否显示搜索表单
function toggleSearchSwitch() {
  emit('update:showSearch', !prop.showSearch)
}

// 刷新table数据
function refresh() {
  emit('queryTable')
}

// 勾选
function checkboxChange(event, key) {
  prop.columns.filter(item => item.key === key)[0].visible = event;
}

</script>

<template>
  <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top" v-if="search">
    <el-button circle icon="Search" @click="toggleSearchSwitch"></el-button>
  </el-tooltip>
  <el-tooltip class="item" effect="dark" content="刷新" placement="top">
    <el-button circle icon="Refresh" @click="refresh()"/>
  </el-tooltip>
  <el-tooltip class="item" effect="dark" content="显隐列" placement="top" v-if="columns && columns.length>0">
    <el-dropdown trigger="click" :hide-on-click="false" style="padding-left: 0.75rem">
      <el-button circle icon="Menu"/>
      <template #dropdown>
        <el-dropdown-menu>
          <template v-for="item in columns" :key="item.key">
            <el-dropdown-item>
              <el-checkbox :checked="item.visible" @change="checkboxChange($event,item.key)" :label="item.label"/>
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>
</template>

<style lang="scss" scoped>
.search {
  cursor: pointer;
}
</style>
