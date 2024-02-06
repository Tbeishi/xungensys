<!-- 添加成员 -->
<template>
    <div>
        <el-dialog 
        :title="dialogs.title" 
        v-model="dialogs.isShowDialog" 
        @close="closeDialog" 
        draggable
        top="50px"
        default-time
        width="769px">
            <el-form :model="form" label-width="120px" :rules="ruler" ref="Registerform">
                <el-form-item label="巡检点编号" prop="dotsId">
                    <el-input v-model="form.dotsId" />
                </el-form-item>
                <el-form-item label="巡检计划编号" prop="planId">
                    <el-input v-model="form.planId" />
                </el-form-item>
                <el-form-item width="200" label="开始时间" prop="startTime">
                    <el-date-picker
                        v-model="form.startTime"
                        type="datetime"
                        placeholder="请选择开始时间"
                    />
                </el-form-item>
                <el-form-item width="200" label="截止时间" prop="endTime">
                    <el-date-picker
                        v-model="form.endTime"
                        type="datetime"
                        placeholder="请选择截止时间"
                    />
                </el-form-item>
                <el-form-item width="200" label="时间完成时间" prop="finishTime">
                    <el-date-picker
                        v-model="form.finishTime"
                        type="datetime"
                        placeholder="请选择完成时间"
                    />
                </el-form-item>
                <el-form-item label="责任人" prop="head">
                    <el-input v-model="form.head" />
                </el-form-item>
                <el-form-item label="所属部门" prop="department">
                    <el-input v-model="form.department" />
                </el-form-item>
                <el-form-item label="文件地址" prop="fileAddress">
                    <el-input v-model="form.fileAddress" />
                </el-form-item>
                <el-form-item label="完成标识" prop="mark">
                    <el-input v-model="form.mark" />
                </el-form-item>
                <el-form-item label="备注">
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
const emit = defineEmits(['dotsDialog-click'])
import { ElMessage } from "element-plus";
import { useTaskInfo } from '@/store/modules/task'
import dayjs from 'dayjs'
const Registerform = ref()
let TaskStore = useTaskInfo()
// const dialogs = ref(false)
const dotsList = ref()
const form = reactive({
    dotsId:'',
    planId: '',   
    head: '',  
    department: '',   
    startTime: 0,
    endTime: 0,
    finishTime: 0,
    fileAddress:'',
    mark:'',
    note:''  
})
const setData = (e:any)=>{
   form.dotsId = e.dotsId || ''
   form.planId = e.planId || ''
   form.head = e.head || ''
   form.department = e.department || ''
   form.startTime = e.startTime || 0
   form.endTime = e.endTime || 0
   form.finishTime = e.finishTime|| 0
   form.fileAddress = e.fileAddress || ''
   form.mark = e.mark || ''
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
const openDialog = (type: string,e: Object) => {
    console.log(e);
    
    if (type === 'edit') {
        dialogs.title = '修改巡检任务';
        dialogs.submitTxt = '修 改';
        setData(e) 
    } else {
        dialogs.title = '添加巡检任务';
        dialogs.submitTxt = '新 增';
        setData('') 
    }
    dialogs.isShowDialog = true;
};
// 关闭弹窗
const closeDialog = () => {
    // Registerform.value.resetFields()
    dialogs.isShowDialog = false;
    console.log(dotsList.value);
    
};
// 取消
const onCancel = () => {
    closeDialog();
};
const ruler = ref({
    dotsId: [
        { required: true, message: '巡检点编号不能为空', trigger: 'blur' }
    ],
    planId: [
        { required: true, message: '巡检计划编号不能为空', trigger: 'blur' }
    ],
    head: [
        { required: true, message: '责任人不能为空', trigger: 'blur' }
    ],
    department: [
        { required: true, message: '所属部门不能为空', trigger: 'blur' }
    ],
    startTime: [
        { required: true, message: '开始时间不能为空', trigger: 'blur' }
    ],
    endTime: [
        { required: true, message: '截止时间不能为空', trigger: 'blur' }
    ],
    finishTime: [
        { required: true, message: '时间完成时间不能为空', trigger: 'blur' }
    ],
    fileAddress: [
        { required: true, message: '文件地址不能为空', trigger: 'blur' }
    ],
    mark: [
        { required: true, message: '完成标识不能为空', trigger: 'blur' }
    ],
})

// 提交
const onSubmit = async () => {
    Registerform.value.validate(async(valid:any)=>{
        if(valid){
            form.startTime = dayjs(form.startTime).valueOf()
            form.endTime = dayjs(form.endTime).valueOf()
            form.finishTime = dayjs(form.finishTime).valueOf()
            // dayjs(form.taskTime).valueOf() 将时间转为时间戳
            emit('dotsDialog-click',form)
            ElMessage({
                message: dialogs.title === '修改巡检任务' ? '修改巡检任务成功!' : '添加巡检任务成功!',
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
    width: 43vw;
    min-width: 500px !important;
}

::v-deep(.el-form-item__label){
    flex: 0 0 120px
}

::v-deep(.el-range-editor.el-input__wrapper){
    min-width: 100px !important;
    width: 100% !important;
}

::v-deep(.el-dialog__body){
    padding: 10px 30px;
    width: 40vw;
    min-width: 500px !important;
}

::v-deep(.el-picker-panel__body){
    background-color: red !important;
}

::v-deep(.el-date-editor.el-input){
    width: 100% !important;
}

::v-deep(.el-icon.el-input__icon.el-range__icon){
   margin-right: 8px;
}
</style>
  
  
  
  
    
    
    
    