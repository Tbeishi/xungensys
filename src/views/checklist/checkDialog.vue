<!-- 添加成员 -->
<template>
    <div>
        <el-dialog :title="dialogs.title" v-model="dialogs.isShowDialog" @close="closeDialog" width="769px">
            <el-form :model="form" label-width="120px" :rules="ruler" ref="Registerform">
                <el-form-item label="项目名称" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-table border 
                      :header-cell-style="headerStyle"
                      style="width: 100%;
                      margin: 30px 0px" 
                      :data="form.checkitem" 
                      >
                      <el-table-column label="检查项" align="center">
                          <el-table-column>
                            <template #header>
                              <el-button class="mt-4" style="width: 100%;margin: 0 !important;border: none;height: 40px;">
                              <i class="iconfont icon-tianjia" style="font-size: 14px;" @click="addData">添加检查项</i>
                              </el-button>
                            </template>
                          <el-table-column width="50" align="center">
                            <template #default="{ $index }">
                              <span>{{ $index + 1 }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="检查项名称" align="center" >
                            <template #default="{ row,$index }">
                              <el-form ref="inputform1" :model="inputData" label-width="120px" :rules="ruler" v-if="inputData.index === $index">
                                <el-form-item prop="itemname" label-width="0">
                                  <el-input @blur="handleBlur($index,1)" v-model="inputData.itemname" style="padding: 0 10px"/>
                                </el-form-item>
                              </el-form>
                              <span v-else>{{ row.itemname }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="类型" align="center" >
                            <template #default="{ row,$index }">
                              <el-form ref="inputform2" :model="inputData" label-width="120px" :rules="ruler" v-if="inputData.index === $index">
                                <el-form-item prop="type" label-width="0">
                                  <el-input @blur="handleBlur($index,2)" v-model="inputData.type" style="padding: 0 10px"/>
                                </el-form-item>
                              </el-form>
                              <span v-else>{{ row.type }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作" align="center">
                            <template #default="{row,$index}">
                              <el-button type="primary" size="large" class="btn" @click="updData(row,$index)">
                                <i class="iconfont icon-bianji1"></i>
                              </el-button>
                              <el-button type="primary" size="large" class="btn" color="#ff1e00" @click="delData($index)">
                                <i class="iconfont icon-shanchu"></i>
                              </el-button>
                            </template>
                          </el-table-column>
                          </el-table-column>
                      </el-table-column>
                </el-table>

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
  import { usecheckInfo } from '@/store/modules/check'
  import type { FormRules } from 'element-plus'
  const Registerform = ref()
  let checkStore = usecheckInfo()
  // const dialogs = ref(false)
  const inputform1 = ref()
  const inputform2 = ref()
  const Boolflag1 = ref(false)
  const Boolflag2 = ref(false)

  const form :{ id:string, name:string,checkitem:{itemname:string,type:string}[],note:string } = reactive({
    id:'',
    name: '',   
    checkitem: [], 
    note:'',
  })

  const inputData = reactive({
    index: -1,
    itemname:'',
    type:''
  })
  const setData = (e:any)=>{
   form.id = e.id || ''
   form.name = e.name || ''
   form.checkitem = e.checkitem || []
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
        dialogs.title = '修改检查项目';
        dialogs.submitTxt = '修 改';
        setData(e) 
    } else {
        dialogs.title = '添加检查项目';
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
    name: [
        { required: true, message: '项目名称不能为空', trigger: 'blur' }
    ],
    itemname:[
        { required: true, message: '检查项名称不能为空', trigger: 'blur' }
    ],
    type: [
        { required: true, message: '检查项目类型不能为空', trigger: 'blur' }
    ],
  })

  const validateForm1 = async ()=>{
      await inputform1.value.validate((valid:any)=>{
        if(valid){
          Boolflag1.value = true;
        }
        else{
          Boolflag1.value = false;
        }
      })
    }
  
    const validateForm2 = async ()=>{
      await inputform2.value.validate((valid:any)=> {
          if(valid){
            Boolflag2.value = true;
          }
          else{
            Boolflag2.value = false;
          }
        })
    }

  const handleBlur = async(index:any,flag:any)=>{
    flag === 1 ? await validateForm1() : await validateForm2()
    if(Boolflag2.value && Boolflag1.value){
      inputData.index = -1
      if(form.checkitem[index]){
        form.checkitem[index].itemname = inputData.itemname
        form.checkitem[index].type = inputData.type
      }
    }
    else{
      Boolflag2.value ? await validateForm1() : await validateForm2()
    }
  }

  const addData = async()=>{
    Boolflag1.value = false 
    Boolflag2.value = false 
    const index = form.checkitem.findIndex((item:any)=> item.itemname === '' && item.type === '')
    if(index !== -1  && inputData.itemname && inputData.type) {
      inputData.index = index
      inputData.itemname = ''
      inputData.type = ''
      await validateForm1();
      await validateForm2();
    };
    if(inputform2.value && inputform1.value){
      await validateForm1();
      await validateForm2();
      if(Boolflag1.value && Boolflag2.value){
        form.checkitem.push({
          itemname:'',
          type:'',
        })
        inputData.itemname = ''
        inputData.type = ''
        inputData.index = form.checkitem.length-1
      }
      }
    else{
        form.checkitem.push({
        itemname:'',
        type:'',
      })
        inputData.itemname = ''
        inputData.type = ''
        inputData.index = form.checkitem.length-1
      }
  }

  const delData = (index:any)=>{
    form.checkitem.splice(index,1)
    if(index < inputData.index){
      inputData.index --
    }
  }

  const updData = (row:any,index:any)=>{
    inputData.index = index
    inputData.itemname = row.itemname,
    inputData.type = row.type
  }
  
  // 提交
  const onSubmit = async () => {
    Registerform.value.validate(async(valid:any)=>{
        const res = form.checkitem.find((item:any)=> item.itemname === '' && item.type === '')
        if(res !== undefined) {
          await validateForm1();
          await validateForm2();
        };
        if(valid){
        if(form.checkitem.length === 0){
          ElMessage({
            message: '请添加检查项',
            type: 'error',
          })
        }
        if(Boolflag1.value && Boolflag2.value || dialogs.title === '修改检查项目'){
          let result =  dialogs.title === '修改检查项目' ? await checkStore.updItem(form) : await checkStore.addItem(form)
            emit('dotsDialog-click')
            ElMessage({
                message: result ? result.msg : '操作失败',
                type: result && result.code === '200' ? 'success' : 'error',
            })
            closeDialog()
        }
    }})
  };

  const headerStyle = ({ rowIndex }:any)=>{
    if(rowIndex === 0)
    return {
      background: '#c9c9c9',
      color:'#606266'
    }
    if(rowIndex === 1)
    return {
      padding: 0
    }
  }


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

  ::v-deep(.el-dialog__body){
    padding: 10px 30px;
    width: 100%;
    min-width: 500px !important;
}
  
  ::v-deep(.el-form-item__label){
    flex: 0 0 120px
  }

  ::v-deep(.el-table .cell){
    padding: 0 !important;
  }

  .icon-tianjia:before{
    margin-right: 5px;
  }

  .btn{
    height: 26px;
    width: 45px;
    border-radius: 13px;
    padding: 0 !important;
    margin: 0 10px 0 0 !important;
    i{
      font-size: 15px;
    }
  }

  .el-form-item{
    margin: 15px 0;
  }

  ::v-deep(.el-form-item__error){
    margin-left: 10px;
  }
  </style>
  
  
  
  
    
    
    
    