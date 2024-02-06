<!-- 菜单管理 -->
<template>
  <div>
    <el-button type="primary" size="default" @click="onAddMenus('add')">增加</el-button>
    <!-- 这里需要传入一个参数就是对应的id  -->
    <el-tooltip content="请先选择数据!" :disabled="!isButtonDisabled" effect="light" placement="top">
      <el-button type="primary" size="default" :disabled="isButtonDisabled">删除</el-button>
    </el-tooltip>
    <el-tooltip content="请先选择数据!" :disabled="!isButtonDisabled" effect="light" placement="top">
      <el-button type="primary" size="default" @click="onChange('edit')" :disabled="isButtonDisabled">修改</el-button>
    </el-tooltip>
    <div>
      <el-table :data="menus" style="width: 100%; margin-bottom: 20px" row-key="selfid" border default-expand-all
        @selection-change="selectionData" :tree-props="{ childs: 'childs', hasChilds: 'hasChilds' }">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="pid" label="根菜单" />
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="url" label="菜单路径" />
      </el-table>
    </div>
    <dialogMenu ref="menusDialogRef" @menusDialog-click="addMenus"></dialogMenu>
    <!-- <test></test> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMenuInfo } from '@/store/modules/menus'
import dialogMenu from './dialogMenu.vue'
import test from './test.vue'
let menuInfo = useMenuInfo()
const menus = ref([])
const curData = ref(null)
const isButtonDisabled = ref(true)  // 默认处于禁用状态
// 动态绑定弹窗组件
const menusDialogRef = ref();
const getMenus = async () => {
  console.log('999999999999', menuInfo.getMenu());
  let result = await menuInfo.getMenu()
  menus.value = result.data.info_list
  console.log('menus.value', menus.value);
}
onMounted(() => {
  getMenus()
})
const addMenus = (form: Object) => {
  getMenus()
}
//选中表格数据
const selectionData = (rows: any) => {
  isButtonDisabled.value = rows.length === 0
  curData.value = rows[rows.length - 1]
}
// 打开新增巡检点页面--dialog
const onAddMenus = (type: string) => {
  menusDialogRef.value.openDialog(type, curData.value);
};
// 打开编辑巡检点页面  编辑彩电页面点击选中之后需要传入选中的name 或者id
const onChange = (type: string) => {
  menusDialogRef.value.openDialog(type, curData.value);
};


















</script>

<style lang="scss" scoped></style>