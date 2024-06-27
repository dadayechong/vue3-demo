<script setup>
import { id } from 'element-plus/es/locales.mjs';
import { ref, reactive } from 'vue'
//列表数据listData
const listData = ref([
  {
  id: 1,
  name: "刘小虎",
  phone: "18888888888",
  address: "上海市普陀区金沙江路 1518 弄"
  },
  {
  id: 2,
  name: "王大明",
  phone: "17777777777",
  address: "北京市朝阳区建国路 99 号"
  },
  {
  id: 3,
  name: "李美丽",
  phone: "16666666666",
  address: "广州市天河区珠江新城华穗路 263 号"
  },
  {
  id: 4,
  name: "赵小强",
  phone: "15555555555",
  address: "深圳市南山区粤海街道科兴科学园 A4 栋"
  },
  {
  id: 5,
  name: "孙彩霞",
  phone: "14444444444",
  address: "杭州市滨江区江南大道 588 号"
  }
])

//获取搜索框的输入值
const searchValue = ref('')

//基于listData进行前端搜索功能
const searchData = () => {
  console.log('搜索')
  const filterData = listData.value.filter(item => item.name.includes(searchValue.value))
  listData.value = filterData
}

//表单数据 addForm
const addForm = reactive({
  //listData中id的值加1
  id : listData.value.length + 1,
  name : '',
  phone : '',
  address: ''
})

//编辑列表行编辑
const row_edit = () => {
  console.log('编辑')
}
//编辑列表行删除
const row_delete = () => {
  console.log('删除')
  //删除当前选中行的数据
  listData.value.splice(listData.value.findIndex(item => item.id === row.id), 1)
}

//添加列表行操作
const row_add = () => {
  console.log('添加')
  console.log(addForm)
  dialogFormVisible.value = false
  listData.value.push(addForm)
}

//列表弹窗是否展示
const dialogFormVisible = ref(false)

</script>
<template>
  
 <div class="container">
   <!-- 标题区域布局 -->
  <div class="title">
    <h2>CRUD</h2>
  </div>

  <!-- 操作区域布局:搜索+添加+批量删除 -->
  <div class="operation">
    <el-input  class="search" v-model="searchValue"  @change="searchData"  @clear="" placeholder="🔍请输入内容" />
    <el-button plain @click="dialogFormVisible = true">添加</el-button>
  </div>

  <!-- 表单区域布局 -->
  <el-dialog v-model="dialogFormVisible" title="添加数据" width="500">
    <el-form :model="addForm">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input v-model="addForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="addForm.address" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="row_add">确认</el-button>
      </div>
    </template>
  </el-dialog>

 <!-- 列表区域布局 -->
  <div>
    <el-table :data="listData" style="width: 100%" border>
      <el-table-column fixed prop=id label=id width="150" />
      <el-table-column fixed prop=name label="姓名" width="150" />
      <el-table-column prop=phone label="电话" width="150" />
      <el-table-column prop=address label="地址" width="300" />
      <el-table-column fixed="right" label="操作" min-width="20">
        <template #default>
          <el-button link type="primary" size="small" @click="row_edit">编辑</el-button>
          <el-button link type="danger" size="small" @click="row_delete">删除</el-button>
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