<script setup>
import {ref} from "vue";
import edit from '@/views/sys/user/edit.vue'

const queryModel = ref({
  pageNum: 1,
  pageSize: 5,
  keyword: ''
})
const tableData = ref({
  total: 100,
  data: [
    {
      id: 1,
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
      tag: 'Home',
    },
    {
      id: 2,
      date: '2016-05-02',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
      tag: 'Office',
    },
    {
      id: 3,
      date: '2016-05-04',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
      tag: 'Home',
    },
    {
      id: 4,
      date: '2016-05-01',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
      tag: 'Office',
    },
  ]
})
const showSearch = ref(true)
const columns = ref([
  {key: 0, label: 'Date', visible: true},
  {key: 1, label: 'Name', visible: true},
  {key: 2, label: 'State', visible: true},
  {key: 3, label: 'City', visible: true},
  {key: 4, label: 'Address', visible: true},
  {key: 5, label: 'Zip', visible: true},
])
const editModel = ref({
  id: 1,
  showEdit: false
})

// 分页查询，加载新数据
function loadData() {
  console.log(queryModel.value.pageNum, queryModel.value.pageSize)
}

const handleClick = () => {
  console.log('click')
}

function handleEdit(row) {
  editModel.value.showEdit = true
  editModel.value.id = row.id
}
</script>

<template>
  <el-card>
    <el-form inline v-if="showSearch">
      <el-form-item label="角色名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <el-button>搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <el-row justify="space-between" align="middle" style="margin-bottom: 0.63rem">
      <el-col :sm="12">
        <el-button>新增</el-button>
        <el-button>导入</el-button>
        <el-button>导出</el-button>
      </el-col>
      <el-col :sm="12" style="text-align: right">
        <SearchToolbar v-model:showSearch="showSearch" @queryTable="loadData" :columns="columns"/>
      </el-col>
    </el-row>
    <el-table :data="tableData.data">
      <el-table-column prop="date" label="Date" width="150" v-if="columns[0].visible"/>
      <el-table-column prop="name" label="Name" width="120" v-if="columns[1].visible"/>
      <el-table-column prop="state" label="State" width="120" v-if="columns[2].visible"/>
      <el-table-column prop="city" label="City" width="120" v-if="columns[3].visible"/>
      <el-table-column prop="address" label="Address" min-width="220" v-if="columns[4].visible"/>
      <el-table-column prop="zip" label="Zip" width="120" v-if="columns[5].visible"/>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="{row}">
          <el-button link type="primary" size="small" @click="handleClick">
            Detail
          </el-button>
          <el-button link type="primary" size="small" @click="handleEdit(row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row justify="end" style="margin-top: 0.63rem">
      <el-scrollbar>
        <Pagination
            @loadData="loadData"
            v-model:pageNum="queryModel.pageNum"
            v-model:pageSize="queryModel.pageSize"
            :total="tableData.total"
        />
      </el-scrollbar>
    </el-row>
  </el-card>
  <edit :id="editModel.id" v-model="editModel.showEdit"></edit>
</template>

<style lang="scss" scoped>

</style>
