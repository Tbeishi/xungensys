<!-- 添加成员 -->
<template>
    <div>
        <el-dialog 
        :title="dialogs.title" 
        v-model="dialogs.isShowDialog" 
        @close="closeDialog" 
        draggable
        default-time
        width="769px">
            <el-form :model="form" label-width="120px" :rules="ruler" ref="Registerform">
                <el-form-item label="计划名称" prop="planName">
                    <el-input v-model="form.planName" />
                </el-form-item>
                <el-form-item label="计划状态" prop="planState">
                    <el-radio-group v-model="form.planState">
                        <el-radio :label="0">启用</el-radio>
                        <el-radio :label="1">非启用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="完成时间范围" prop="finishTime">
                    <div class="block">
                        <el-date-picker
                        v-model="form.finishTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        />
                    </div>
                </el-form-item>
                <el-form-item label="任务生成时间" prop="taskTime">
                    <el-time-picker
                    v-model="form.taskTime"
                    placeholder="选择时间"
                    />
                </el-form-item>
                <el-form-item label="计划周期" prop="planCycle">
                    <el-select
                        v-model="form.planCycle"
                        class="m-2"
                        placeholder="请选择计划周期"
                        style="width: 100%"
                    >
                        <el-option
                        v-for="item in ['日','周','月']"
                        :key="item"
                        :label="item"
                        :value="item"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="巡检路线" prop="patrolPath">
                    <el-input v-model="form.patrolPath" />
                </el-form-item>
                <el-form-item label="所属部门" prop="department">
                    <el-input v-model="form.department" />
                </el-form-item>
                <el-form-item label="所属人员" prop="personnel">
                    <el-input v-model="form.personnel" />
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
import { usePlanInfo } from '@/store/modules/plan'
import dayjs from 'dayjs'
const Registerform = ref()
let PlanStore = usePlanInfo()
// const dialogs = ref(false)
const dotsList = ref()
const form = reactive({
    planName:'',
    planState: '',   
    planCycle: '',  
    taskTime: 0,   
    finishTime: [0],
    patrolPath:'',
    department:'',
    personnel:'',
    note:''  
})
const setData = (e:any)=>{
   form.planName = e.planName || ''
   form.planState = e.planState
   form.planCycle = e.planCycle || ''
   form.taskTime = e.taskTime || 0
   form.finishTime = e.finishTime || []
   form.patrolPath = e.patrolPath || ''
   form.department = e.department || ''
   form.personnel = e.personnel || ''
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
        dialogs.title = '修改巡检计划';
        dialogs.submitTxt = '修 改';
        setData(e) 
    } else {
        dialogs.title = '添加巡检计划';
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
    planName: [
        { required: true, message: '计划名称不能为空', trigger: 'blur' }
    ],
    planState: [
        { required: true, message: '计划状态不能为空', trigger: 'blur' }
    ],
    planCycle: [
        { required: true, message: '计划周期不能为空', trigger: 'blur' }
    ],
    taskTime: [
        { required: true, message: '任务生成时间不能为空', trigger: 'blur' }
    ],
    finishTime: [
        { required: true, message: '完成时间范围不能为空', trigger: 'blur' }
    ],
    patrolPath: [
        { required: true, message: '巡检路线不能为空', trigger: 'blur' }
    ],
    department: [
        { required: true, message: '所属部门不能为空', trigger: 'blur' }
    ],
    personnel: [
        { required: true, message: '所属人员不能为空', trigger: 'blur' }
    ],
})

// 提交
const onSubmit = async () => {
    Registerform.value.validate(async(valid:any)=>{
        if(valid){
            form.taskTime = dayjs(form.taskTime).valueOf()
            form.finishTime = form.finishTime.map((item:any)=>item = dayjs(item).valueOf())
            // dayjs(form.taskTime).valueOf() 将时间转为时间戳
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
    width: 45vw;
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
  
  
  
  
    
    
    
    