<!-- 修改成员 -->
<template>
  <div>
    <el-dialog title="修改成员" v-model="addDialogs" width="769px" @close="onCancel">
      <el-form :model="form" label-width="120px" :rules="refRuler" ref="Registerform">
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="form.telephone" />
        </el-form-item>
          <el-form-item label="用户角色" prop="username">
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
                        v-for="item in depList"
                        :key="item"
                        :label="item.departmentname"
                        :value="item.departmentid"
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
          <el-button type="primary" @click="onSubmitChange" size="default">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" >
import { reactive, ref, defineExpose, defineEmits } from 'vue';
const emit = defineEmits(['changePer-click'])
import { ElMessage } from "element-plus";
import { usePersonMessage } from "@/store/modules/personal"
import { useRoleInfo } from '@/store/modules/rolemanage'
import { useDepInfo } from '@/store/modules/depmanager'
const depInfo = useDepInfo()
const RoleStore = useRoleInfo()
defineProps(["roleList","depList"])
let PersonMessage = usePersonMessage()
const addDialogs = ref(false)
const Registerform = ref()
const form = reactive({
  userid:'',
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
  username:[{ required: true, message: '角色不能为空', trigger: 'blur' }],
  telephone:[
        { required: true, message: '手机不能为空', trigger: 'blur' },
        {validator: checkTele, trigger: 'blur'}
    ],
  roleid:[{ required: true, message: '用户权限不能为空', trigger: 'blur' }],
  departmentid:[{ required: true, message: '部门不能为空', trigger: 'blur' }],
})

const getData = async (data: any) => {
    form.telephone = data.telephone || '',   // 将接受过来的数据展示在页面上--双向绑定
    form.username = data.username || '',
    form.userid = data.userid
    let roleList = data.roleid
    let depList = data.departmentid
    const list = (await RoleStore.getRole()).data.info_list
    const list2 = (await depInfo.getDep()).data.info_list
    roleList =  roleList.map((item:any)=>{
      const res = list.find((info:any)=>info.rolename === item)
      return res ? res.roleid : ''
     }
    )
    depList = depList.map((item:any)=>{
      const res2 = list2.find((info:any)=>info.departmentname === item) 
      return res2 ? res2.departmentid : ''
     }
    )
    form.roleid = roleList || null
    form.departmentid = depList || null
}

// 打开弹窗
const openChangeDialog = () => {
  addDialogs.value = true;
};
// 关闭弹窗
const closeDialog = () => {
  addDialogs.value = false;
};
// 取消
const onCancel = () => {
  closeDialog();
  Registerform.value.resetFields()
};
// 提交
const onSubmitChange = async () => {
  Registerform.value.validate(async(valid:any)=>{
        if(valid){
          let result: any = await PersonMessage.changePer(form)
          console.log(result);
          console.log(form.roleid);
          // 这里显示undefined ？？？
            ElMessage({
              message: result ? result.msg : '更新失败',
              type: result && result.code === '200' ? 'success' : 'error',
            })
            addDialogs.value = false;
            emit('changePer-click')
          }
    })
};

// 暴露变量
defineExpose({
  openChangeDialog,
  getData
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




  
  
  
  