<!-- 添加成员 -->
<template>
    <div>
        <el-dialog :title="dialogs.title" v-model="dialogs.isShowDialog" @close="closeDialog" width="769px">
            <el-form :model="form" label-width="120px" :rules="ruler" ref="Registerform">
                <el-form-item label="路线名称" prop="pathName">
                    <el-input v-model="form.pathName" />
                </el-form-item>
                <el-form-item label="所属部门" prop="department">
                    <el-input v-model="form.department" />
                </el-form-item>
                <el-form-item label="负责人" prop="head">
                    <el-input v-model="form.head" >
                    </el-input>
                </el-form-item>
                <el-form-item label="巡检点列表" prop="dosList">
                    <el-select
                        v-model="form.dosList"
                        class="m-2"
                        placeholder="请选择"
                        style="width: 240px"
                        multiple
                    >
                        <el-option
                        v-for="item in list"
                        :key="item"
                        :label= "item"
                        :value="item"
                        v-model="dotsList"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="备注说明">
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
import { useLuXianInfo } from '@/store/modules/luxian'
const Registerform = ref()
let LuXianStore = useLuXianInfo()
const list = ['巡检点1','巡检点2','巡检点3','巡检点4','巡检点5','巡检点6','巡检点7','巡检点8']
// const dialogs = ref(false)
const dotsList = ref()
const form = reactive({
    pathName:'',
    department: '',   
    head: '',  
    dosList: '',   
    note: '',  
})
const setData = (e:any)=>{
   form.pathName = e.pathName || ''
   form.department = e.department || ''
   form.head = e.head || ''
   form.dosList = e.dosList|| ''
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
    if (type === 'edit') {
        dialogs.title = '修改路线';
        dialogs.submitTxt = '修 改';
        setData(e) 
    } else {
        dialogs.title = '添加路线';
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
    pathName: [
        { required: true, message: '路线名称不能为空', trigger: 'blur' }
    ],
    department: [
        { required: true, message: '所属部门不能为空', trigger: 'blur' }
    ],
    head: [
        { required: true, message: '负责人不能为空', trigger: 'blur' }
    ],
    dosList: [
        { required: true, message: '巡检点列表不能为空', trigger: 'blur' }
    ]
})

// 提交
const onSubmit = async () => {
    Registerform.value.validate(async(valid:any)=>{
        if(valid){
            console.log(JSON.stringify(form.dosList) );
            
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
    min-width: 300px !important;
}

::v-deep(.el-form-item__label){
    flex: 0 0 120px
}

::v-deep(.el-dialog__body){
    padding: 10px 30px;
    width: 28vw;
    min-width: 300px !important;
}
</style>
  
  
  
  
    
    
    
    