<template>
  <div class="login-container">
    <div class="login-left">
    </div>
    <div class="login-right">
      <div class="login-right-warp">
        <div class="login-right-warp-main-form">
          <h2>登录</h2>
          <el-tabs v-model="state.tabsActiveName" stretch>
            <el-tab-pane label="账号密码登录" name="account">
              <Account />
            </el-tab-pane>
            <el-tab-pane label="扫码登录" name="mobile">
              <QRcode />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="loginIndex">
import { reactive, } from 'vue';
// 引入组件
import Account from './account.vue'
import QRcode from './QRcode.vue'

const state = reactive({
  tabsActiveName: 'account',
});


</script>

<style scoped lang="scss">
h2{
  text-align: center;
  margin: 40px 0 10px;
  font-weight: 700;
  font-size: 20px;
}
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .login-left{
    width: 60vw;
    height: 100vh;
    background-image: url('../../assets/loginbg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
  }

  .login-right{
    flex:1;
    height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-right-warp {
    border: 1px solid var(--el-color-primary-light-3);
    border-radius: 3px;
    width: 380px;
    height: 100%;
    .login-right-warp-main-form {
      flex: 1;
      padding: 0 50px;
    }
  }
}
</style>
