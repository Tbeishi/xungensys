<!-- 添加成员 -->
<template>
  <div>
    <el-dialog 
    :title="dialogs.title" v-model="dialogs.isShowDialog"
     @close="closeDialog" 
     align-center
     width="769px">
      <el-form :model="form" label-width="120px" :rules="ruler" ref="Registerform">
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="form.rolename" />
        </el-form-item>
      </el-form>
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
import { reactive, ref, defineExpose, onMounted, defineEmits } from 'vue';
const emit = defineEmits(['roleDialog-click'])
import { ElMessage } from "element-plus";
import { useRoleInfo } from '@/store/modules/rolemanage'
const RoleStore = useRoleInfo()
const Registerform = ref()
const form = reactive({
  roleid: '',
  rolename: '',
})
const setData = (e: any) => {
  form.roleid = e.roleid || ''
  form.rolename = e.rolename || ''
}

// 弹窗的标题和底部的按钮 --- 动态绑定
const dialogs = reactive({
  isShowDialog: false,
  type: '',
  title: '',
  submitTxt: '',
})
// 打开弹窗
const openDialog = (type: string, e: Object) => {
  if (type === 'edit') {
    dialogs.title = '修改角色';
    dialogs.submitTxt = '修 改';
    setData(e)
  } else {
    dialogs.title = '新增角色';
    dialogs.submitTxt = '新 增';
    setData('')
  }
  dialogs.isShowDialog = true;
};
// 关闭弹窗
const closeDialog = () => {
  // 重置表单
  Registerform.value.resetFields()
  Registerform.value.resetFields()
  dialogs.isShowDialog = false;
};
// 取消
const onCancel = () => {
  closeDialog();
};
const ruler = ref({
  rolename: [
    { required: true, message: '角色名字不能为空', trigger: 'blur' }
  ],
})

// 提交
const onSubmit = async () => {
  Registerform.value.validate(async (valid: any) => {   // true
    if (valid) {
        // 触发自定义事件将新增的数据传递给父组件
        const result = dialogs.title === '新增角色' ? await RoleStore.addRole({rolename: form.rolename}) : await RoleStore.updRole(form)
        ElMessage({
          message: result.msg,
          type: result.code === '200' ? 'success' : 'error',
        })
        dialogs.isShowDialog = false;
        emit('roleDialog-click')
    }
  })
};
// 暴露变量
defineExpose({
  openDialog
});

</script>

<style scoped lang="scss">
::v-deep(.el-dialog) {
  width: 30vw;
  min-width: 300px !important;
}

::v-deep(.el-form-item__label) {
  flex: 0 0 80px
}

::v-deep(.el-dialog__body) {
  padding: 10px 30px;
  width: 28vw;
  min-width: 300px !important;
}
</style>




  <!-- 
     // 将数据都绑定在了form表单里面 直接传入form 表单
        // const result=await roleMessages.changeRole(form)
  // let result = dialogs.title === '修改角色' ? await roleMessages.changeRole(form) : await roleMessages.addRole(form)
      // if (result.code === "200") {
      //   ElMessage({
      //     message: dialogs.title === '修改角色' ? '修改角色成功!' : '添加角色成功!',
      //     type: 'success',
      //   })
      //   dialogs.isShowDialog = false;
      //   emit('roleDialog-click')
      // }

   -->
  
  
  