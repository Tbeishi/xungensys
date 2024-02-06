<!-- 添加成员 -->
<template>
    <div>
        <el-dialog :title="dialogs.title" v-model="dialogs.isShowDialog" @close="closeDialog" width="769px">
            <el-form :model="form" label-width="120px" :rules="ruler" ref="Registerform">
                <el-form-item label="点名称" prop="dotname">
                    <el-input v-model="form.dotname" />
                </el-form-item>
                <el-form-item label="经度" prop="Longitude">
                    <el-input v-model="form.Longitude" />
                </el-form-item>
                <el-form-item label="维度" prop="Latitude">
                    <el-input v-model="form.Latitude" />
                </el-form-item>
                <el-form-item label="固定地点" prop="address">
                    <el-input v-model="form.address" />
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
import { useDotsStore } from '@/store/modules/storeDots'
import type { FormRules } from 'element-plus'
const Registerform = ref()
let dotsStore = useDotsStore()
// const dialogs = ref(false)
const form = reactive({
    id:'',
    dotname: '',   // 编号
    Longitude: '',  // 经度
    Latitude: '',   // 维度
    address: '',   // 地址
    note: '',    // 类似备注
})
const setData = (e:any)=>{
   form.id = e.id || ''
   form.dotname = e.dotname || ''
   form.Longitude = e.Longitude || ''
   form.Latitude = e.Latitude || ''
   form.address = e.address || ''
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
        dialogs.title = '修改巡检点';
        dialogs.submitTxt = '修 改';
        setData(e) 
    } else {
        dialogs.title = '新增巡检点';
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
    dotname: [
        { required: true, message: '点编号不能为空', trigger: 'blur' }
    ],
    Longitude: [
        { required: true, message: '经度不能为空', trigger: 'blur' }
    ],
    Latitude: [
        { required: true, message: '维度不能为空', trigger: 'blur' }
    ],
    address: [
        { required: true, message: '固定地点不能为空', trigger: 'blur' }
    ]
})

// 提交
const onSubmit = async () => {
    Registerform.value.validate(async(valid:any)=>{
        if(valid){
        let result = dialogs.title === '修改巡检点' ? await dotsStore.upDateDots(form) : await dotsStore.addDots(form)
        if (result.code === "200") {
            ElMessage({
                message: dialogs.title === '修改巡检点' ? '修改巡检点成功!' : '添加巡检点成功!',
                type: 'success',
            })
            dialogs.isShowDialog = false;
            emit('dotsDialog-click')
        }
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
    flex: 0 0 80px
}

::v-deep(.el-dialog__body){
    padding: 10px 30px;
    width: 28vw;
    min-width: 300px !important;
}
</style>
  
  
  
  
    
    
    
    