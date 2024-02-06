<!--  -->
<template>
    <div>
      <el-table style="margin: 10px 0px" border 
      :data="tableData" 
      ref="tableRef"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="记录单号" align="center" prop="recId" show-overflow-tooltip></el-table-column>
        <el-table-column label="点名称" align="center" prop="pName" show-overflow-tooltip></el-table-column>
        <el-table-column label="点编号" align="center" prop="pId" show-overflow-tooltip></el-table-column>
        <el-table-column label="巡检人员" align="center" prop="patrolPer" show-overflow-tooltip></el-table-column>
        <el-table-column width="200" label="巡检时间" align="center" prop="patrolTime" show-overflow-tooltip></el-table-column>
        <el-table-column width="200" label="上报时间" align="center" prop="escalTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="巡检路线" align="center" prop="patrolPath" show-overflow-tooltip></el-table-column>
        <el-table-column label="巡检计划" align="center" prop="patrolPlan" show-overflow-tooltip></el-table-column>
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
  </template>
  <script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue'
  import { useSearchInfo } from "@/store/modules/searchList"
  import dayjs from 'dayjs'
  //分页数据
  const PageData = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  })
  let searchStore = useSearchInfo()
  // 这里定义一个数组来存储后端返回的数据
  const getDotsRef = ref([])
  const tableData = ref()
  // 这里是编辑菜单的表格数据
  const tableRef = ref('')
  const curData = ref(null)
  
  // 获取所有的巡检点
  const getDots = async () => {
    // 调用仓库中的方法获取所有的巡检点
    let result = await searchStore.getList()    
    // 将时间戳转为 2011-10-17 00:17:56
    // dayjs(1706945872909).format('YYYY-MM-DD HH:mm:ss'); 
    const data = result.data.list
    if(data) data.forEach((item:any) => {
      item.patrolTime = dayjs(item.patrolTime).format('YYYY-MM-DD HH:mm:ss')
      item.escalTime = dayjs(item.escalTime).format('YYYY-MM-DD HH:mm:ss')
    })     
    getDotsRef.value = data
    PageData.total = result.data.list.length
    tableData.value = getDotsRef.value.slice((PageData.currentPage - 1) * PageData.pageSize, PageData.currentPage * PageData.pageSize)
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