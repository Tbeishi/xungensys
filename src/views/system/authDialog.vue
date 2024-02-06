<!-- 权限管理 -->
<template>
    <div>
      <el-dialog title="权限分配" 
      v-model="dialogs.isShowDialog" 
       width="769px"
      >
      <el-scrollbar height="59vh">
        <el-table :data="tableData" border 
         style="width: 100%;
         margin: 10px 0px" 
         row-key="selfid"
         :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
         :indent="21"
        >
            <el-table-column prop="name" align="center" label="菜单权限">
              <template #default="{row}">
                   <span class="text">{{row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态">
                <template #default="{row,$index}">
                    <el-switch
                    v-if="menuList[$index]"
                    class="ml-2"
                    v-model="menuList[$index]['name']"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #dddfe5"
                    :active-value="row.name"
                    @change="handle($index,row,$event)"
                    />
                </template>
            </el-table-column>
        </el-table>
      </el-scrollbar>
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
  import { reactive, ref, defineExpose, defineEmits,watch } from 'vue';
  const emit = defineEmits(['roleDialogClose'])
  import { ElMessage } from "element-plus";
  import { useMenuInfo } from '@/store/modules/menus'
  import { useRoleInfo } from '@/store/modules/rolemanage'
  const MenuStore = useMenuInfo()
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
    const result = await MenuStore.getMenu()
    tableData.value = result.data.info_list
    copyTransFun(tableData.value)
    searchMenu(e,tableData.value,'','')
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
        data = menuList.value.filter((item:any)=>item.name).map((items:any) => {
            return items.selfid
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

  function copyTransFun(arr:any) {
      arr.forEach((item:any, value:any) => {
        if (item.childs) {
          item.children = item.childs;
          delete item.childs;
          if (item.children.length > 0) {
            copyTransFun(item.children);
          }
        }
      });
    }
  
    function searchMenu(params:any,data:any,fatItem:any,items:any) {
        data.forEach((item:any) => {
        let length = menuList.value.length
        const flag = params.menuid && params.menuid.includes(item.name)
        menuList.value.push(flag === true ? {
          name: item.name,
          selfid: item.selfid,
          farIndex: fatItem,
          farName: items ? items.name : ''
        } : {
          name: '',
          selfid: '',
          farIndex: fatItem,
          farName: items ? items.name : ''
        })
        if(item.children && item.children.length > 0){
          searchMenu(params,item.children,length,item)
        }
      })
    }

    const handle =(index:any,item:any, e:any)=>{
      const selected = menuList.value[index]
      if(e) {
        selected.selfid = item.selfid;
        const farIndex = selected.farIndex
        if(farIndex){
          menuList.value[farIndex].name = selected.farName
          menuList.value[farIndex].selfid = item.pid
        }
      }
      else{
        if(!selected.farName){
          menuList.value.forEach((info:any)=>{
          if(info.farName === item.name){
            info.name = ''
            info.selfid = ''
          }
        })
        }
      }
    }
      
  // 暴露变量
  defineExpose({
    openDialog
  });
  
  </script>
  
  <style scoped lang="scss">
  ::v-deep(.el-dialog) {
    width: 50vw;
    min-width: 400px !important;
    height: 75vh !important;
  }
  
  ::v-deep(.el-form-item__label) {
    flex: 0 0 80px
  }
  
  ::v-deep(.el-dialog__body) {
    padding: 10px 30px 0;
    width: 50vw;
    height: 59vh;
    min-width: 400px !important;
  }

  ::v-deep(.el-dialog__footer){
    padding: 0;
    text-align: center;
  }

  ::v-deep(.el-table .cell){
    display: flex;
    align-items: center;
    justify-content: center;
    .text{
      width: 80px;
      text-align: left;
    }
  }

  ::v-deep(.el-table__expand-icon){
    margin-left: 20px;
    margin-right: 15px;
  }
  </style>
    
    