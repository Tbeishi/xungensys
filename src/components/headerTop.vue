<template>
  <div class="homeTop">
    <div class="homeLeft">
      <img src="../assets/icon.png" alt="">
      <h3 style="color: #d7d7d7;" class="headerTitle">巡检卫士应用管理中心</h3>
    </div>
    <div class="homeRight">
      <el-dropdown>
        <el-button type="primary" class="btns" style="background-color: #ff0000; margin-left:20px">
          <!-- <el-icon class="el-icon--right"><arrow-down /></el-icon> -->
          个人中心
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="changePassword">修改密码</el-dropdown-item>
            <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <!-- 这里是修改密码的弹窗组件 -->
  <el-dialog v-model="dialogVisible" title="修改密码" width="500" :before-close="handleClose">
    <el-form :model="form" label-width="120px" :rules="rules" ref="Registerform">
      <el-form-item label="修改密码" prop="password">
        <el-input v-model="form.password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="Cancel">取消</el-button>
        <el-button type="primary" @click="confirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

import { computed, ref, reactive, watch, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
import { useUserInfo } from '@/store/modules/login'
let userInfo = useUserInfo()

const Registerform = ref()
const loginOut = () => {
  $router.push({ path: '/login' })
}

const form = reactive({
  password: '',
})
// 将仓库中存储的账号密码赋值给form 里面的password
form.password = userInfo.password
// 这里是校验规则
const rules = ref({
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ],
})

const dialogVisible = ref(false)
// 点击取消修改密码的时候
const Cancel = () => {
  Registerform.value.resetFields()
  dialogVisible.value = false
}
// 点击修改密码的时候
const changePassword = () => {
  dialogVisible.value = true
}
// 点击确认修改密码的时候
const confirm = async () => {
  let result: any = await userInfo.changePas(form.password)
  console.log('修改秘密的方法执行了', result);
  if (result.code == '200') {
    ElMessage({
      message: '修改密码成功！',
      type: 'success',
    })
  } else {
    ElMessage({
      message: '修改密码失败！',
      type: 'error',
    })
  }
  dialogVisible.value = false
}

// 点击弹出框上面的取消按钮的时候
const handleClose = () => {
  dialogVisible.value = false
}


</script>


<style lang="scss" scoped>
.homeTop {
  display: flex;
  justify-content: space-between;
  background-image: url('../assets/homeTop.png');
  width: 100%;
  height: 60px;
  padding: 0 20px;


  .homeLeft {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
    }
  }

  .homeRight {
    display: flex;
    align-items: center;

    .btns {
      font-weight: 400;
      background-color: #ccfc;
      color: #fff;
      border: none;
    }
  }
}
</style>