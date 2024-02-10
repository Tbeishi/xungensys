<!-- 添加成员 -->
<template>
    <div>
        <el-dialog :title="dialogs.title" v-model="dialogs.isShowDialog" @close="closeDialog" width="769px">
            <el-form :model="form" label-width="120px" :rules="ruler" ref="Registerform">
                <el-form-item label="检查项目名称" prop="proname">
                    <el-input v-model="form.proname" />
                </el-form-item>
                <el-form-item label="检查项目类型" prop="protype">
                    <el-input v-model="form.protype" />
                </el-form-item>
                <el-form-item label="是否必填" prop="required">
                    <el-radio-group v-model="form.required">
                          <el-radio :label="0">是</el-radio>
                          <el-radio :label="1">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="所属部门" prop="department">
                    <el-select
                          v-model="form.department"
                          class="m-2"
                          placeholder="请选择所属部门"
                          style="width: 100%"
                      >
                          <el-option
                          v-for="item in ['安保部','后勤部','技术部']"
                          :key="item"
                          :label="item"
                          :value="item"
                          />
                      </el-select>
                </el-form-item>
                <el-form-item label="所属人员" prop="personnel">
                    <el-input v-model="form.personnel" />
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
  const emit = defineEmits(['dotsDialog-click'])
  import { ElMessage } from "element-plus";
  import { usecheckInfo } from '@/store/modules/check'
  import type { FormRules } from 'element-plus'
  const Registerform = ref()
  let checkStore = usecheckInfo()
  // const dialogs = ref(false)
  const form = reactive({
    id:'',
    proname: '',   
    protype: '',  
    required: '',   
    department: '',  
    personnel: '',    
  })
  const setData = (e:any)=>{
   form.id = e.id || ''
   form.proname = e.proname || ''
   form.protype = e.protype || ''
   form.required = e.required || ''
   form.department = e.department || ''
   form.personnel = e.personnel || ''
  }
  
  // 弹窗的标题和底部的按钮 --- 动态绑定
  const dialogs = reactive({
    isShowDialog: false,
    type: '',
    title: '',
    submitTxt: '',
  })
  // 打开弹窗
  const openDialog = (type: string,e: Object) => {
    if (type === 'edit') {
        dialogs.title = '修改检查项目';
        dialogs.submitTxt = '修 改';
        setData(e) 
    } else {
        dialogs.title = '添加检查项目';
        dialogs.submitTxt = '新 增';
        setData('') 
    }
    console.log(66);
    
    dialogs.isShowDialog = true;
  };
  // 关闭弹窗
  const closeDialog = () => {
    // Registerform.value.resetFields()
    dialogs.isShowDialog = false;
  };
  // 取消
  const onCancel = () => {
    closeDialog();
  };
  const ruler = ref({
    proname: [
        { required: true, message: '检查项目名称不能为空', trigger: 'blur' }
    ],
    protype: [
        { required: true, message: '检查项目类型不能为空', trigger: 'blur' }
    ],
    required: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    department: [
        { required: true, message: '所属部门不能为空', trigger: 'blur' }
    ],
    personnel: [
        { required: true, message: '所属人员不能为空', trigger: 'blur' }
    ]
  })
  
  // 提交
  const onSubmit = async () => {
    Registerform.value.validate(async(valid:any)=>{
        if(valid){
            console.log(form);
            
            emit('dotsDialog-click',form)
            ElMessage({
                message: dialogs.title === '修改检查项目' ? '修改检查项目成功!' : '添加检查项目成功!',
                type: 'success',
            })
            dialogs.isShowDialog = false;
        // let result = dialogs.title === '修改检查项目' ? await checkStore.upDateDots(form) : await checkStore.addDots(form)
        // if (result.code === "200") {
        //     ElMessage({
        //         message: dialogs.title === '修改检查项目' ? '修改检查项目成功!' : '添加检查项目成功!',
        //         type: 'success',
        //     })
        //     dialogs.isShowDialog = false;
        //     emit('dotsDialog-click')
        // }
    }})
  };
  // 暴露变量
  defineExpose({
    openDialog
  });
  
  </script>
  
  <style scoped lang="scss">
  ::v-deep(.el-dialog ){
    width: 30vw;
  }
  
  ::v-deep(.el-form-item__label){
    flex: 0 0 120px
  }
  
  ::v-deep(.el-dialog__body){
    padding: 10px 30px;
    width: 28vw;
  }
  </style>
  
  
  
  
    
    
    
    