<!-- 添加成员 -->
<template>
  <div>
    <el-dialog :title="dialogs.title" v-model="dialogs.isShowDialog" @close="closeDialog" width="769px">
      <el-form :model="form" label-width="120px" :rules="ruler" ref="Registerform">
        <el-form-item label="所属部门名称" prop="departmentname">
          <el-input v-model="form.departmentname" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="form.note" />
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
const emit = defineEmits(['depDialog-click'])
import { ElMessage } from "element-plus";
import { useDepInfo } from '@/store/modules/depmanager'
const depInfo = useDepInfo()
const Registerform = ref()
// const dialogs = ref(false)
const form = reactive({
  departmentid: '',
  departmentname: '',
  note: '',
})
const setData = (e: any) => {
  form.departmentid = e.departmentid || ''
  form.departmentname = e.departmentname || ''
  form.note = e.note || ''
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
  console.log('修改部门信息中的弹窗row', e);
  if (type === 'edit') {
    dialogs.title = '修改部门信息';
    dialogs.submitTxt = '修 改';
    setData(e)
  } else {
    dialogs.title = '添加部门信息';
    dialogs.submitTxt = '新 增';
    setData('')
  }
  dialogs.isShowDialog = true;
};
// 关闭弹窗
const closeDialog = () => {
  Registerform.value.resetFields()
  dialogs.isShowDialog = false;
};
// 取消
const onCancel = () => {
  closeDialog();
};
const ruler = ref({
  departmentname: [
    { required: true, message: '所属部门名称不能为空', trigger: 'blur' }
  ],
})

// 提交
const onSubmit = async () => {
  Registerform.value.validate(async (valid: any) => {
    if (valid) {
      console.log('点击提交信息事件被触发了中的form表单', form);
      let result: any = dialogs.title === '修改部门信息' ? await depInfo.putDep(form) : await depInfo.postDep(form)
      if (result.code === "200") {
        ElMessage({
          message: dialogs.title === '修改部门信息' ? '修改部门信息成功!' : '添加修改部门信息!',
          type: 'success',
        })
        dialogs.isShowDialog = false;
        emit('depDialog-click')
      }
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
  flex: 0 0 120px
}

::v-deep(.el-dialog__body) {
  padding: 10px 30px;
  width: 28vw;
  min-width: 300px !important;
}
</style>
<!-- // console.log(form);
// emit('dotsDialog-click', form)
// ElMessage({
//   message: dialogs.title === '修改部门信息' ? '修改部门信息成功!' : '添加修改部门信息!',
//   type: 'success',
// })
// dialogs.isShowDialog = false;
// let result = dialogs.title === '修改检查项目' ? await checkStore.upDateDots(form) : await checkStore.addDots(form)
// if (result.code === "200") {
//     ElMessage({
//         message: dialogs.title === '修改检查项目' ? '修改检查项目成功!' : '添加检查项目成功!',
//         type: 'success',
//     })
//     dialogs.isShowDialog = false;
//     emit('dotsDialog-click')
// } -->



  
  
  
  