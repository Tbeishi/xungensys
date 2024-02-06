<template>
  <!-- <div> -->
  <div class="login_all">
    <div class="login_box">
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginForms" hide-required-asterisk>
        <el-form-item prop="phone" label="手机号">
          <el-input class="custom-input" type="text" placeholder="请输入电话" v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item class="input_box" prop="passwd" label="密&nbsp;&nbsp;&nbsp;码">
          <!-- <svg-icon name="cipher" style="padding-right: 8px; margin-top: 15px; font-weight: bold;" width="22px"
            height="22px"></svg-icon> -->
          <el-input class="custom-input" placeholder="请输入密码" type="passwd" show-password v-model="loginForm.passwd">
          </el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="onSignIn" class="btn">登录</el-button>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useUserInfo } from "../../store/modules/login"
import { ElMessage } from 'element-plus'
const router = useRouter();
let userInfo = useUserInfo()
const loginForms = ref()
// 使用 ref 创建响应式对象
const loginForm = reactive({
  phone: '',
  passwd: '',
})

// 账号密码登录表单的校验规则
const loginFormRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' },
  ],
  passwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

// 提交账号密码登录表单
const onSignIn = async () => {
  loginForms.value.validate(async(valid:any)=>{
        if(valid){
          let result = await userInfo.loginIn(loginForm.phone, loginForm.passwd)
            // 登录成功之后存储token
            if (result.code === '200') {
                localStorage.setItem('token', result.data.token)
                router.push({ path: '/system/usermanager' })
                ElMessage({
                  message: result.msg,
                  type: 'success',
                })
              } else {
                ElMessage({
                  message: result.msg,
                  type: 'error',
                })
              }
          }
    })
}
</script>

<style lang="scss" scoped>
.login_all {
  margin-top: 20px;
}

.el-form-item {
  margin-bottom: 28px;
}

.btn {
  margin-top: 20px;
  height: 40px;
  width: 100%;
}
</style>
