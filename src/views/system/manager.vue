<!--部门管理  -->
<template>
  <div class="manager">
    <el-button type="primary" size="default" @click="onAddDep('add')">增加</el-button>
    <!-- 这里需要传入一个参数就是对应的id  -->
    <!-- <el-tooltip content="请先选择数据!" :disabled="!isButtonDisabled" effect="light" placement="top">
      <el-button type="primary" size="default" @click="delDots" :disabled="isButtonDisabled">删除</el-button>
    </el-tooltip> -->
    <!-- <el-tooltip content="请先选择数据!" :disabled="!isButtonDisabled" effect="light" placement="top">
      <el-button type="primary" size="default" @click="onChange('edit')" :disabled="isButtonDisabled">修改</el-button>
    </el-tooltip> -->
    <!-- table展示用户信息 -->
    <!-- :data="perMessage" 获取数据之后才能动态绑定 @selection-change="selectionData"-->
    <el-table style="margin: 10px 0px" border :data="tableData" ref="tableRef">
      <!-- <el-table-column type="selection" align="center"></el-table-column> -->
      <el-table-column label="部门编号" align="center" prop="departmentid" show-overflow-tooltip></el-table-column>
      <el-table-column label="部门名称" align="center" prop="departmentname" show-overflow-tooltip></el-table-column>
      <el-table-column label="备注" align="center" prop="note" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button size="small" @click="onChange('edit', scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="delDots(scope.row.departmentid)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 实现分页器 -->
    <el-pagination v-model:current-page="PageData.currentPage" v-model:page-size="PageData.pageSize"
      :page-sizes="[6, 8, 10, 12]" layout="total, sizes, prev, pager, next, jumper" :total="PageData.total" background
      @current-change="currentHandle" @size-change="sizeHandle" />
  </div>
  <!-- 引入组件 -->
  <depDialog ref="dotsDialogRef" @depDialog-click="addDep"></depDialog>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { useDepInfo } from '@/store/modules/depmanager'
let depInfo = useDepInfo()
import { ElMessage } from 'element-plus'
import depDialog from './depDialog.vue'
//分页数据
const PageData = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
})
// 这里定义一个数组来存储获取巡检点之后后端返回的数据
const getDepRef = ref([])
const tableData = ref()
// 这里是编辑菜单的表格数据
const tableRef = ref('')
// 动态绑定弹窗组件
const dotsDialogRef = ref();
// 获取所有的巡检点
const getDeps = async () => {
  // 调用仓库中的方法获取所有的巡检点
  let result = await depInfo.getDep()
  getDepRef.value = result.data.info_list
  PageData.total = result.data.info_list.length
  tableData.value = getDepRef.value.slice((PageData.currentPage - 1) * PageData.pageSize, PageData.currentPage * PageData.pageSize)
}
// 增加测试点
const addDep = () => {
  getDeps()
  // console.log(form);
  // tableData.value.push(form)
}

// 打开新增巡检点页面--dialog
const onAddDep = (type: string) => {
  dotsDialogRef.value.openDialog(type);
};
// 打开编辑巡检点页面  编辑彩电页面点击选中之后需要传入选中的name 或者id
const onChange = (type: string, row: any) => {
  dotsDialogRef.value.openDialog(type, row);
};
// 删除巡检点
const delDots = async (departmentid: any) => {
  console.log('执行删除的时候传入的参数', departmentid);
  if (departmentid) {
    let result: any = await depInfo.delDep(departmentid)
    if (result.code === '200') {
      ElMessage({
        message: "删除成功！",
        type: "success"
      })
    } else {
      ElMessage({
        message: "删除失败！",
        type: "error"
      })
    }
    getDeps()
  }
}
//选中表格数据
// const selectionData = (rows: any) => {
//   isButtonDisabled.value = rows.length === 0
//   curData.value = rows[rows.length - 1]
// }

//当前页改变时触发
const currentHandle = (currentPage: number) => {
  tableData.value = getDepRef.value.slice((currentPage - 1) * PageData.pageSize, currentPage * PageData.pageSize)
}

//每页数量改变时触发
const sizeHandle = (pageSize: number) => {
  PageData.currentPage = 1
  tableData.value = getDepRef.value.slice((PageData.currentPage - 1) * pageSize, PageData.currentPage * pageSize)
}
onMounted(() => {
  getDeps()
})


</script>

<style lang="scss" scoped>
.manager {
  width: 100%;
  height: 100%;
}

.el-pagination.is-background {
  position: absolute;
  margin-top: 30px;
  bottom: 10px;
}
</style>@/store/modules/depmanager