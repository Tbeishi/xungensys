<!-- 添加成员 -->
<template>
  <div>
    <el-dialog title="新增" v-model="dialogs" width="769px" @close="closeDialog">
      <el-form :model="form" label-width="120px" :rules="refRuler" ref="Registerform">
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="form.telephone" />
        </el-form-item>
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="所属部门" prop="departmentid">
                  <el-select
                        v-model="form.departmentid"
                        class="m-2"
                        placeholder="请选择所属部门"
                        style="width: 100%"
                        multiple
                    >
                        <el-option
                        v-for="item in [1,2,3,4,5,6]"
                        :key="item"
                        :label="item"
                        :value="item"
                        />
                    </el-select>
            </el-form-item>
            <el-form-item label="用户角色" prop="roleid">
                  <el-select
                        v-model="form.roleid"
                        class="m-2"
                        placeholder="请选择用户角色"
                        style="width: 100%"
                        multiple
                    >
                        <el-option
                        v-for="item in roleList"
                        :key="item"
                        :label="item.rolename"
                        :value="item.roleid"
                        />
                    </el-select>
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
import { reactive, ref, defineExpose, defineEmits } from 'vue';
import { ElMessage } from "element-plus";
import { usePersonMessage } from "@/store/modules/personal"
import { useRoleInfo } from '@/store/modules/role'
let PersonMessage = usePersonMessage()
const RoleStore = useRoleInfo()
const emit = defineEmits(['addPer-click'])
const dialogs = ref(false)
const roleList = ref()
const Registerform = ref()
const form = reactive({
  telephone: '',
  username: '',
  departmentid:null,
  roleid:null
})

const checkTele = (rule:any,value:any,cb:any)=>{
    const rules = /^(13[0-9]|14[1579]|15[0-3,5-9]|16[6]|17[0123456789]|18[0-9]|19[89])\d{8}$/
	  if(rules.test(value)){
	    //合法的邮箱号
	    return cb();
	  }
	  //邮箱不合法
	cb(new Error('请输入正确的手机号'));
}

//准备规则对象
const refRuler = ref({
  username:[{ required: true, message: '账号不能为空', trigger: 'blur' }],
  telephone:[
        { required: true, message: '手机不能为空', trigger: 'blur' },
        {validator: checkTele, trigger: 'blur'}
    ],
  roleid:[{ required: true, message: '用户角色不能为空', trigger: 'blur' }],
  departmentid:[{ required: true, message: '部门不能为空', trigger: 'blur' }],
})


// 打开弹窗
const openDialog = async () => {
  let result
  try{
    result = (await RoleStore.reqRole()).data.info_list
    }
    catch(e){
        console.log(e);
        
    }
    console.log(result);
    
  roleList.value = result
  dialogs.value = true;
};
// 关闭弹窗
const closeDialog = () => {
  dialogs.value = false;
  Registerform.value.resetFields()
};
// 取消
const onCancel = () => {
  closeDialog();
};
// 提交
const onSubmit = async () => {
   Registerform.value.validate(async(valid:any)=>{
        if(valid){          
      let result: any = await PersonMessage.addPer(form)
        ElMessage({
          message: result ? result.msg : '添加失败',
          type: result && result.code === '200' ? 'success' : 'error',
        })
        dialogs.value = false;
        emit('addPer-click')
  }})
};
// 暴露变量
defineExpose({
  openDialog,
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




  
  
  
  