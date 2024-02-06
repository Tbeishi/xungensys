<!-- 添加成员 -->
<template>
  <div>
    <el-dialog :title="dialogs.title" v-model="dialogs.isShowDialog" @close="closeDialog" width="769px">
      <el-form :model="form" label-width="120px" :rules="ruler" ref="Registerform">
        <el-form-item label="跟菜单id" prop="pid">
          <el-input v-model="form.pid" />
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="菜单路径" prop="url">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="子菜单id" prop="selfid">
          <el-input v-model="form.selfid" />
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
import { ElMessage } from "element-plus";
import { useMenuInfo } from '@/store/modules/menus'
const emit = defineEmits(['menusDialog-click'])

const Registerform = ref()
let menuInfo = useMenuInfo()
// const dialogs = ref(false)
const form = reactive({
  pid: '',
  name: '',
  url: '',
  selfid: '',
})
const setData = (e: any) => {
  form.pid = e.pid || ''
  form.name = e.name || ''
  form.url = e.url || ''
  form.selfid = e.selfid || ''
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
    dialogs.title = '修改菜单';
    dialogs.submitTxt = '修 改';
    setData(e)
  } else {
    dialogs.title = '新增菜单';
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
  pid: [
    { required: true, message: '跟菜单id不能为空', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '菜单名称不能为空', trigger: 'blur' }
  ],
  url: [
    { required: true, message: '菜单路径不能为空', trigger: 'blur' }
  ],
  selfid: [
    { required: true, message: '子菜单id不能为空', trigger: 'blur' }
  ]
})

// 提交
const onSubmit = async () => {
  Registerform.value.validate(async (valid: any) => {
    if (valid) {
      let result = dialogs.title === '修改菜单' ? await menuInfo.updmenus(form) : await menuInfo.addmenus(form)
      if (result.code === "200") {
        ElMessage({
          message: dialogs.title === '修改菜单' ? '修改菜单成功!' : '添加菜单成功!',
          type: 'success',
        })
        dialogs.isShowDialog = false;
        emit('menusDialog-click')
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
  flex: 0 0 80px
}

::v-deep(.el-dialog__body) {
  padding: 10px 30px;
  width: 28vw;
  min-width: 300px !important;
}
</style>




  
  
  
  