<!--  -->
<template>
  <div>
    <el-tooltip content="请先选择数据!" :disabled="!isButtonDisabled" effect="light" placement="top">
    <el-button type="primary" size="default" @click="look()" :disabled="isButtonDisabled">查看二维码</el-button>
    </el-tooltip>
    <el-button type="primary" size="default" @click="onAddDots('add')">增加</el-button>
    <!-- 这里需要传入一个参数就是对应的id  -->
    <el-tooltip content="请先选择数据!" :disabled="!isButtonDisabled" effect="light" placement="top">
    <el-button type="primary" size="default" @click="delDots" :disabled="isButtonDisabled">删除</el-button>
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
      <el-table-column label="点编号" align="center" prop="id" show-overflow-tooltip></el-table-column>
      <el-table-column label="点名称" align="center" prop="dotname" show-overflow-tooltip></el-table-column>
      <el-table-column label="经度" align="center" prop="Longitude" show-overflow-tooltip></el-table-column>
      <el-table-column label="纬度" align="center" prop="Latitude" show-overflow-tooltip></el-table-column>
      <el-table-column label="地址" align="center" prop="address" show-overflow-tooltip></el-table-column>
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
  <dotsDialog ref="dotsDialogRef" @dotsDialog-click="addDots"></dotsDialog>
  <QRcode ref="QRdialog"></QRcode>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import dotsDialog from './dotsDialog.vue'
import { useDotsStore } from "@/store/modules/storeDots"
import QRcode from './QRcode.vue';
import { ElMessage } from 'element-plus';
const QRdialog = ref()
//分页数据
const PageData = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
})
const isButtonDisabled = ref(true)  // 默认处于禁用状态
let dotsStore = useDotsStore()
// 这里定义一个数组来存储获取巡检点之后后端返回的数据
const getDotsRef = ref([])
const tableData = ref()
// 这里是编辑菜单的表格数据
const tableRef = ref('')
const curData = ref(null)

// 动态绑定弹窗组件
const dotsDialogRef = ref();
// 获取所有的巡检点
const getDots = async () => {
  // 调用仓库中的方法获取所有的巡检点
  let result = await dotsStore.getDots()
  console.log('vue--巡检点页面，获取所有的巡检点', result);
  getDotsRef.value = result.data.info_list
  PageData.total = result.data.info_list.length
  tableData.value = getDotsRef.value.slice((PageData.currentPage - 1) * PageData.pageSize, PageData.currentPage * PageData.pageSize)
}
// 增加测试点
const addDots = () => {
  getDots()
}

// 打开新增巡检点页面--dialog
const onAddDots = (type: string) => {
  dotsDialogRef.value.openDialog(type,curData.value);
};
// 打开编辑巡检点页面  编辑彩电页面点击选中之后需要传入选中的name 或者id
const onChange = (type: string) => {
  dotsDialogRef.value.openDialog(type,curData.value);
};
// 删除巡检点
const delDots = async () => {
  if(curData.value){
  let result = await dotsStore.delDots(curData.value['id'])  
  ElMessage({ 
    message: result ? '删除成功！' : '删除失败！',
    type: result ? 'success' : 'error'})
  getDots()
  }
}
//查看二维码
const look = ()=>{
  QRdialog.value.openDialog(curData.value)
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
  getDots()
})


</script>

<style lang="scss" scoped>
.el-pagination.is-background{
  position: absolute;
  margin-top: 30px;
  bottom: 10px;
}
</style>