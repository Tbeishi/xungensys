<!--  -->
<template>
  <div>
    <el-button type="primary" size="default" @click="onAddDots('add')">增加</el-button>
    <!-- 这里需要传入一个参数就是对应的id  -->
    <el-tooltip content="请先选择数据!" :disabled="!isButtonDisabled" effect="light" placement="top">
    <el-button type="primary" size="default" :disabled="isButtonDisabled" @click="delItems">删除</el-button>
    </el-tooltip>
    <el-tooltip content="请先选择数据!" :disabled="!isButtonDisabled" effect="light" placement="top">
    <el-button type="primary" size="default" @click="onChange('edit')" :disabled="isButtonDisabled">修改</el-button>
    </el-tooltip>
    <!-- table展示用户信息 -->
    <!-- :data="perMessage" 获取数据之后才能动态绑定 -->
    <el-table style="margin: 10px 0px" border 
    :data="tableData" 
    @selection-change="selectionData"
    ref="tableRef"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="编号" align="center" prop="id" show-overflow-tooltip></el-table-column>
      <el-table-column label="项目名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="检查项" align="center" prop="checkitem" show-overflow-tooltip>
        <el-table-column label="检查项名称" align="center" show-overflow-tooltip>
          <template #default="{ row }">
            <span v-for="item in row.checkitem" :key="item.itemname">{{item.itemname}}&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center" show-overflow-tooltip>
          <template #default="{ row }">
            <span v-for="item in row.checkitem" :key="item.itemname">{{item.type}}&nbsp;</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="note" show-overflow-tooltip></el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="PageData.currentPage"
      v-model:page-size="PageData.pageSize"
      :page-sizes="[6, 8, 10, 12]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="PageData.total"
      background
      @current-change="currentHandle"
      @size-change="sizeHandle"
    />
  </div>
  <!-- 引入组件 -->
  <checkDialog ref="dotsDialogRef" @dotsDialog-click="addDots"></checkDialog>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { usecheckInfo } from "@/store/modules/check"
import { ElMessage } from 'element-plus';
import checkDialog from './checkDialog.vue'
//分页数据
const PageData = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
})
const isButtonDisabled = ref(true)  // 默认处于禁用状态
let checkStore = usecheckInfo()
// 这里定义一个数组来存储获取巡检点之后后端返回的数据
const getDotsRef = ref([])
const tableData = ref()
// 这里是编辑菜单的表格数据
const tableRef = ref('')
const curData = ref(null)

// 动态绑定弹窗组件
const dotsDialogRef = ref();
// 获取所有的检查项目
const getItems = async () => {
  const data = {
    pagesize: PageData.pageSize, //pagenum代表每一页多少条数据
    pagenum: PageData.currentPage  //pagenum代表第几页数据
  }
  // 调用仓库中的方法获取所有的检查项目
  let result = (await checkStore.getItem(data)).data.info_list
  result.forEach((items:any)=> items.checkitem = items.checkitem.map((item:any)=> eval("(" + item + ")")))
  getDotsRef.value = result
  // tableData.value = getDotsRef.value
  tableData.value = getDotsRef.value.slice((PageData.currentPage - 1) * PageData.pageSize, PageData.currentPage * PageData.pageSize)
}
// 增加
const addDots = () => {
  getItems()
}

// 打开新增检查项目页面--dialog
const onAddDots = (type: string) => {
  dotsDialogRef.value.openDialog(type,curData.value);
};
// 打开编辑巡检点页面  编辑彩电页面点击选中之后需要传入选中的name 或者id
const onChange = (type: string) => {
  dotsDialogRef.value.openDialog(type,curData.value);
};

// 删除
const delItems = async () => {
  if(curData.value){
  let result = await checkStore.delItem(curData.value['id'])  
  ElMessage({ 
    message: result ? result.msg : '删除失败',
    type: result && result.code === '200' ? 'success' : 'error'})
    getItems()
  }
}

//选中表格数据
const selectionData = (rows:any)=>{
  isButtonDisabled.value = rows.length === 0
  curData.value = rows[rows.length-1]
}

//当前页改变时触发
const currentHandle = (currentPage: number)=>{
  tableData.value = getDotsRef.value.slice((currentPage - 1) * PageData.pageSize, currentPage * PageData.pageSize)
}

//每页数量改变时触发
const sizeHandle = (pageSize: number)=>{
  PageData.currentPage = 1
  tableData.value = getDotsRef.value.slice(( PageData.currentPage - 1) * pageSize,  PageData.currentPage * pageSize)
}
onMounted(() => {
  getItems()
})


</script>

<style lang="scss" scoped>
.el-pagination.is-background{
  position: absolute;
  margin-top: 30px;
  bottom: 10px;
}

::v-deep(.el-table thead.is-group th.el-table__cell){
  background-color: #ffffff;
}
</style>