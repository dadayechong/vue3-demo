<script setup>
import { id } from 'element-plus/es/locales.mjs';
import { ref, reactive } from 'vue'
// ****************数据定义****************
//列表数据listData
const listData = ref([
  {
    id: 1,
    name: '张三',
    phone: '444',
    address: '北京市'
  },
  {
    id: 2,
    name: '李四',
    phone: '555',
    address: '成都市'
  },
  {
    id: 3,
    name: '王五',
    phone: '666',
    address: '上海市'
}
])

//获取搜索框的输入值
const searchValue = ref('')


//表单数据 FormData
const FormData = reactive({
  //listData中id的值加1
  id : listData.value.length + 1,
  name : '',
  phone : '',
  address: ''
})

//选中的id数组
const selectionIdArr = ref([])

//列表弹窗是否展示
const dialogFormVisible = ref(false)
const dialogType = ref('add')



// ****************方法定义****************
// 搜索相关方法
const recoveryData = () => {
  console.log('恢复数据')
  //列表数据恢复初始状态
}

//基于listData进行前端搜索功能
const searchData = () => {
  console.log('搜索')
  //通过id、姓名、手机号、地址进行搜索
  const filterData = listData.value.filter(item => {
    return item.name.includes(searchValue.value) || item.phone.includes(searchValue.value) || item.id.toString().includes(Number(searchValue.value))
  })
  listData.value = filterData
}

//添加1行
const handleRowAdd = () => {
  //清空表单数据
  FormData.name = ''
  FormData.phone = ''
  FormData.address = ''
  dialogFormVisible.value = true
  dialogType.value = 'add'
}

//提交表单数据
const handleSubmit = (row) => {
  console.log('提交表单数据')
  //若是新增表单，则获取表单数据，id为listData.length + 1，提交到列表中
  if(dialogType.value === 'add'){
    listData.value.push({
      id: listData.value.length + 1,
      name: FormData.name,
      phone: FormData.phone,
      address: FormData.address
    })
    dialogFormVisible.value = false
  }
  //若是编辑表单，则通过row获取到id，根据编辑内容更新当前id的数据
  else if(dialogType.value === 'edit'){
    const index = listData.value.findIndex(row => row.id === FormData.id)
    listData.value[index] = {
      id: FormData.id,
      name: FormData.name,
      phone: FormData.phone,
      address: FormData.address
    }
    dialogFormVisible.value = false
  }
}

//删除1行
const handleRowDelete = ({id}) => {
  console.log('删除')
  console.log(id)
  //1.通过id获取对应条目的索引值
  const index = listData.value.findIndex(item => item.id === id)
  //2.通过索引值  splice删除该行数据
  listData.value.splice(index, 1)

}

//批量删除
const handleRowListDel = () => {
  console.log('批量删除')
  //遍历selectionIdArr，并使用handleRowDelet批量删除数据
  selectionIdArr.value.forEach(id => {
    handleRowDelete({id})
  })
  
  


}

//编辑该行
const handleRowEdit = (row) => {
  //修改编辑弹窗title
  dialogFormVisible.value = true
  dialogType.value = 'edit'
  //将获取到的改行数据row赋值给FormData
  FormData.id = row.id
  FormData.name = row.name
  FormData.phone = row.phone
  FormData.address = row.address
}

//列表批量选中
const handleSelectionChange = (val) => {
  console.log(val)
  //遍历val，并将遍历出来的id值放在数组idArr中
  selectionIdArr.value = []
  val.forEach(item => {
    selectionIdArr.value.push(item.id)
  })
  console.log(selectionIdArr.value)
}

</script>


<template>
 <div class="container">
   <!-- 标题区域布局 -->
  <div class="title">
    <h2>CRUD</h2>
  </div>

  <!-- 操作区域布局:搜索+添加+批量删除 -->
  <div class="operation">
    <el-input  
      class="search" 
      v-model="searchValue"  
      @change="searchData"  
      @clear="recoveryData" 
      clearable 
      placeholder="请输入搜索内容" />
      <div>
        <el-button plain type="primary" @click="handleRowAdd">添加</el-button>
        <el-button plain type="danger" @click="handleRowListDel()">批量删除</el-button>
      </div>

  </div>

  <!-- 新增或者编辑弹窗 -->
   <!-- 若dialogType为add时，title为添加数据，否则为编辑数据 -->
  <el-dialog v-model="dialogFormVisible" :title="dialogType === 'add' ? '添加数据' : '编辑数据'" width="500" >
    <el-form :model="FormData">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="FormData.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input v-model="FormData.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="FormData.address" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer="scope">
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit(scope.row)">确认</el-button>
      </div>
    </template>
  </el-dialog>

 <!-- 列表区域布局 -->
  <div>
    <el-table :data="listData" style="width: 100%" border @select="handleSelectionChange" @select-all="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column fixed prop=id label=id width="150" />
      <el-table-column prop=name label="姓名" width="150" />
      <el-table-column prop=phone label="电话" width="150" />
      <el-table-column prop=address label="地址" width="200" />
      <el-table-column fixed="right" label="操作" min-width="100">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleRowEdit(scope.row)">编辑</el-button>
          <!-- 拿到当前行的数据，取出id值，传给handleRowDelete删除接口 -->
           <el-button link type="danger" size="small" @click="handleRowDelete(scope.row)">删除</el-button>
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