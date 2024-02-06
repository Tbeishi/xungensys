<!-- 权限管理 -->
<template>
    <div>
      <el-dialog title="权限分配" 
      v-model="dialogs.isShowDialog" 
       width="769px"
      >
        <el-table :data="tableData" border 
         style="width: 100%;
         margin: 10px 0px" 
        >
            <el-table-column prop="name" align="center" label="菜单权限"/>
            <el-table-column align="center" label="状态">
                <template #default="{row,$index}">
                    <el-switch
                    class="ml-2"
                    v-model="menuList[$index]"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #dddfe5"
                    :active-value="row.name"
                    />
                </template>
            </el-table-column>
        </el-table>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="onCancel" size="default">取 消</el-button>
            <el-button type="primary" @click="onSubmit" size="default">确定</el-button>
          </span>
    </template>
      </el-dialog>
    </div>
  </template>
  
  <script setup lang="ts" >
  
  // defineEmits  子传父
  import { reactive, ref, defineExpose, defineEmits } from 'vue';
  const emit = defineEmits(['roleDialogClose'])
  import { ElMessage } from "element-plus";
  import { useSilders } from '@/store/modules/asilder'
  import { useRoleInfo } from '@/store/modules/rolemanage'
  const SilderStore = useSilders()
  const RoleStore = useRoleInfo()
  const tableData = ref()
  //提交给后端的数据
  const submitData = reactive({
    roleid:'',
    menuid:[]
  }) 
 
  const menuList = <any>ref([])
  // 弹窗的标题和底部的按钮 --- 动态绑定
  const dialogs = reactive({
    isShowDialog: false,
    type: '',
    title: '',
    submitTxt: '',
  })
  // 打开弹窗
  const openDialog = async (e:any) => {
    menuList.value = []
    const result = await SilderStore.getMenu(0)
    tableData.value = result.data.info_list
    tableData.value.forEach((item:any) => {
        menuList.value.push(e.menuid && e.menuid.includes(item.name) ? item.name : false)
    })
    submitData.roleid = e.roleid
    dialogs.isShowDialog = true;
  };

  // 取消
  const onCancel = () => {
    dialogs.isShowDialog = false;
  };
  
  // 提交
  const onSubmit = async () => {
        let data = menuList.value
        data = menuList.value.filter((item:any)=>item).map((items:any) => {
            const res = tableData.value.find((item:any)=>item.name === items)
            return res.selfid
        })
        submitData.menuid = data
        let result = await RoleStore.RoleMessage(submitData)
          ElMessage({
            message: result ? result.msg : '权限分配失败，请重新分配！',
            type: result && result.code === '200' ? 'success' : 'error',
          })
          if(result){
            dialogs.isShowDialog = false;
            emit('roleDialogClose',true)
          }
  };
  // 暴露变量
  defineExpose({
    openDialog
  });
  
  </script>
  
  <style scoped lang="scss">
  ::v-deep(.el-dialog) {
    width: 50vw;
    min-width: 400px !important;
  }
  
  ::v-deep(.el-form-item__label) {
    flex: 0 0 80px
  }
  
  ::v-deep(.el-dialog__body) {
    padding: 10px 30px;
    width: 50vw;
    min-width: 400px !important;
  }
  </style>
    
    