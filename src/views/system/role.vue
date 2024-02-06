<!-- 角色设置 -->
<template>
  <div>
    <el-button type="primary" size="default" @click="addRole('add',)">添加</el-button>
    <el-tooltip content="请先选择数据!" :disabled="!isButtonDisabled" effect="light" placement="top">
      <el-button type="primary" size="default" @click="changeRole('edit')" :disabled="isButtonDisabled">修改</el-button>
    </el-tooltip>
    <el-tooltip content="请先选择数据!" :disabled="!isButtonDisabled" effect="light" placement="top">
      <el-button type="primary" size="default" :disabled="isButtonDisabled" @click="delRole">删除</el-button>
    </el-tooltip>
    <el-tooltip content="请先选择数据!" :disabled="!isButtonDisabled" effect="light" placement="top">
      <el-button type="primary" size="default" :disabled="isButtonDisabled" @click="openAuth">权限管理</el-button>
    </el-tooltip>
    <!-- style="margin: 10px 0px" border :data="perMessage"  -->
    <el-table :data="roleData" border style="width: 100%;margin: 10px 0px" @selection-change="selectionData">
      <el-table-column type="selection" />
      <el-table-column prop="roleid" label="角色ID"/>
      <el-table-column prop="rolename" label="角色名称"/>
      <el-table-column prop="menuid" label="角色权限"/>
    </el-table>
    <roleDialog ref="roleDia" @roleDialog-click="changeRol"></roleDialog>
    <authDialog ref="authDia" @roleDialogClose="authDiaClose"></authDialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import roleDialog from './roleDialog.vue'
import authDialog from './authDialog.vue'
// 引入新增 修改弹窗组件  
import { useSilders } from '@/store/modules/asilder'
import { useRoleInfo } from '@/store/modules/rolemanage'
import { ElMessage } from "element-plus";
// 动态绑定弹窗组件
const roleDia = ref()
const curData = ref(null)
const RoleStore = useRoleInfo()
const silderStore = useSilders()
const isButtonDisabled = ref(true)  // 默认处于禁用状态
const roleData = ref() //角色名称列表
const authDia = ref()
const getRoles = async ()=>{
  let result
  try{
    result = await RoleStore.getRole()
    }
    catch(e){
        console.log(e);
    }
  const data = result.data.info_list
  const menu = localStorage.getItem('routes') ? JSON.parse(localStorage.getItem('routes')||'') : (await silderStore.getRoutes()).data.info_list
  data.forEach((info:any)=>{
    if(info.menuid){
      info.menuid = info.menuid.map((item:any) => {
      const res = menu.find((e:any) => e.selfid === item)
      if(res) {
        return res['name']
        }
      })
    }
  })
  roleData.value = data
}

// 点击新增
const addRole = (type: string) => {
  roleDia.value.openDialog(type, curData.value)
}
// 点击修改
const changeRole = (type: string) => {
  roleDia.value.openDialog(type, curData.value)
}
const changeRol = () => {
  getRoles()
}



// 实现删除功能
// const delRole = async () => {
//   if (curData.value) {
//     let result = await RoleStore.delRole(curData.value['id'])
//     ElMessage({
//       message: result ? '删除成功！' : '删除失败！',
//       type: result ? 'success' : 'error'
//     })
//     getRoles()
//   }
// }

const selectionData = (rows: any) => {
  isButtonDisabled.value = rows.length === 0
  curData.value = rows[rows.length - 1]
}

const openAuth = ()=>{
  authDia.value.openDialog(curData.value)
}

const authDiaClose = ()=>{
  getRoles()
}

const delRole = async ()=>{
  if(curData.value){
    let result = await RoleStore.delRole(curData.value['roleid'])
    ElMessage({
      message: result.msg ,
      type: result && result.code === '200' ? 'success' : 'error',
  })
  getRoles()
  }
}

onMounted(() => {
  getRoles()
})
// 使用数据监听监听数据的变化

</script>

<style lang="scss" scoped></style>