<!--  -->
<template>
  <div class="homeTop">
    <div class="homeLeft">
      <img src="../assets/icon.png" alt="">
      <h3 style="color: #d7d7d7;" class="headerTitle">巡检卫士应用管理中心</h3>
    </div>
    <div class="homeRight">
      <!-- <h3 style="padding-right: 10px; color: #fff;">客服电话:400-009-6678</h3> -->
      <!-- <el-button class="btns" style="background-color: #ff9900;">官方商城</el-button> -->
      <!-- <el-button class="btns" style="background-color: #55dd88;">帮助文档</el-button> -->
      <el-button class="btns" style="background-color: #33bbdd;">修改密码</el-button>
      <!-- <el-button class="btns" style="background-color: #ff0000;" @click="loginOut"> 退出登录</el-button> -->
      <el-dropdown>
        <el-button type="primary" class="btns" style="background-color: #ff0000; margin-left:20px">
          头像<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
// const $route = useRoute()
const loginOut = () => {
  $router.push({ path: '/login' })
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