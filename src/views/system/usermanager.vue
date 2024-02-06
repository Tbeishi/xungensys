<!--  -->
<template>
  <div>
    <div>
      <el-button type="primary" size="default" @click="getHasUser">全部</el-button>
      <el-button type="primary" size="default" @click="onOpenAddRole('add')">添加</el-button>
      <el-tooltip content="请先选择数据!" :disabled="!isButtonDisabled" effect="light" placement="top">
        <el-button type="primary" size="default" @click="change" :disabled="isButtonDisabled">修改</el-button>
      </el-tooltip>
      <el-tooltip content="请先选择数据!" :disabled="!isButtonDisabled" effect="light" placement="top">
        <el-button type="primary" size="default" @click="del" :disabled="isButtonDisabled">删除</el-button>
      </el-tooltip>
      <el-button type="primary" size="default" @click="search">搜索</el-button>
      <el-input placeholder="请输入搜索用户角色" style="width: 150px;margin-top: 10px;" v-model="searchValue"
        @keydown.enter="search"></el-input>
      <!-- table展示用户信息 -->
      <el-table style="margin: 10px 0px" border :data="perMessage" @selection-change="onSelectionChange">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="ID" align="center" prop="userid"></el-table-column>
        <el-table-column label="账号" align="center" prop="username" show-overflow-tooltip></el-table-column>
        <el-table-column label="手机号" align="center" prop="telephone" show-overflow-tooltip></el-table-column>
        <el-table-column label="所属部门" align="center" prop="departmentid" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户角色" align="center" prop="roleid" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <!-- 传递数据 -->
    <addPer ref="roleDialogRef" @addPer-click="transmitData" :roleList="roleList" />
    <changePer ref="changeDialogRef" @changePer-click="transmitData" :roleList="roleList"/>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

// 通过仓库实现添加 删除 修改功能
import { usePersonMessage } from "@/store/modules/personal"
let PersonMessage = usePersonMessage()
// 引入添加用户的弹窗组件
import addPer from './addPer.vue'
import changePer from './changePer.vue'
import { onMounted, ref } from 'vue'
import { useRoleInfo } from '@/store/modules/rolemanage'
const RoleStore = useRoleInfo()
// 定义变量内容
const roleDialogRef = ref();
const roleList = ref() //角色名称列表
const changeDialogRef = ref()   // 改变数据的响应式弹窗组件
//  定义响应式的数据---去存储服务器返回的数据在模版当中进行展示
// 存储人员管理的用户信息---数组
let perMessage = ref<any>([])
const curData = ref()
// 添加角色
// 打开新增角色弹窗
const onOpenAddRole = (type: string) => {
  roleDialogRef.value.openDialog(type);
};
const searchValue = ref('') //搜索值
const isButtonDisabled = ref(true)  // 默认处于禁用状态
const transmitData = async () => {
  getHasUser()
}

// 当修改事件触发的时候，去孩子组件里面调用getData 方法
const change = () => {
  changeDialogRef.value.getData(curData.value)
  changeDialogRef.value.openChangeDialog();
};
const selectedRows = ref();

const onSelectionChange = (selection: any) => {
  selectedRows.value = selection;
  isButtonDisabled.value = selection.length === 0;
  const data = selection[selection.length - 1]
  curData.value = data;
}
// 删除操作
const del = async () => {
    const result = await PersonMessage.delPer(curData.value.userid);
    ElMessage({
        message: result ? result.msg : '删除失败',
        type: result && result.code === '200' ? 'success' : 'error',
    })
  getHasUser()
}
// 获取所有的用户信息
const getHasUser = async () => {
  let result: any = (await PersonMessage.getPersonal()).data
  roleList.value = (await RoleStore.getRole()).data.info_list
  result.forEach((info:any)=>{
    if(info.roleid){
      info.roleid = info.roleid.map((item:any) => {
      const res = roleList.value.find((e:any) => e.roleid === item)
      if(res) {
        return res['rolename']
        }
      })
    }
  })
  perMessage.value = result
}

const search = async () => {
  if (searchValue.value) {
    let result: any = await PersonMessage.getPersonal()    
    perMessage.value = result.data.filter((item: any) => item.username.includes(searchValue.value))
  }
}
//组件挂载完毕
onMounted(() => {
  getHasUser(); // 这里加一个获取用户的方法
});

</script>

<style lang="scss" scoped>
@media screen and (max-width: 460px) {
  .el-button {
    height: 30px;
    width: 50px;
    font-size: 13px;
  }
}
// .el-pagination.is-background{
//   position: absolute;
//   margin-top: 30px;
//   bottom: 10px;
// }
</style>
<style lang="scss" scoped>
@media screen and (max-width: 460px) {
  .el-button {
    height: 30px;
    width: 50px;
    font-size: 13px;
  }
}
// .el-pagination.is-background{
//   position: absolute;
//   margin-top: 30px;
//   bottom: 10px;
// }
</style>