<script setup>
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  
 <div class="container">
   <!-- 标题区域布局 -->
  <div class="title">
    <h2>CRUD</h2>
  </div>

  <!-- 操作区域布局:搜索+添加+批量删除 -->
  <div class="operation">
    <el-input  class="search" v-model="search" placeholder="🔍请输入内容" />
    <el-button type="primary">添加</el-button>
  </div>

 <!-- 列表区域布局 -->
  <div>
    <el-table :data="filterTableData" style="width: 100%" border>
      <el-table-column label="Date" prop="date" />
      <el-table-column label="Name" prop="name" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            Edit
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
 
</template>

<style scoped>

.search{
  width: 200px;
  
}

.title{
  text-align: center;
  margin-bottom: 20px;
}

.operation{
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.container{
  width: 60%;
  margin: 0 auto;
  margin-top: 200px;
  
  
}

</style>

<script>

//列表数据listData
const listData = ref([
  {
    ID:1,
    姓名: '王小虎',
    电话: '188888888888',
    住址: '上海市普陀区金沙江路 1518 弄'
  },]
)
//搜索数据
const search = ref('')

//表单数据 formData
const formData = reactive({
  date: '',
  name: '',
  address: ''
})
</script>