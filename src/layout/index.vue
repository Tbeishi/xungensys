<!--  -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <headerTop></headerTop>
      </el-header>
      <el-container>
        <el-aside background-color="#001529" text-color="black">
          <!-- // router 表示启动vue-router 模式 启动的时候会以 index.path 为路径进行路由的跳转 -->
          <el-menu unique-opened>
            <subMenuList v-for="(item, index) in Silders.menuRoutes" :key="item.selfid" :data="item"
              :iconClass="iconList[index]" @breadcrumbData="getBreadcrumb">
            </subMenuList>
          </el-menu>
        </el-aside>
        <el-main style="height: 90vh;position: relative;">
          <div style="width: 100%; padding: 12px 20px; margin-bottom: 5px;background-color: #f4f1f1;">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item v-if="breadcrumb.par">{{ breadcrumb.par }}</el-breadcrumb-item>
              <el-breadcrumb-item v-if="breadcrumb.child">{{ breadcrumb.child }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import subMenuList from './subMenuList.vue'
import headerTop from "../components/headerTop.vue"
import Main from "./main.vue"
//获取路由对象
import { useRoute } from "vue-router";
//获取侧边栏相关的小仓库
import { useSilders } from "../store/modules/asilder";
const Silders = useSilders()
const breadcrumb = reactive({
  par: null,
  child: ''
})


const iconList = [
  'icon-chaxuntongji',
  'icon-qingdan',
  'icon-ziyuan',
  'icon-dingwei',
  'icon-jihua',
  'icon-renwu',
  'icon-shezhi'
]

const getBreadcrumb = (e: any) => {
  breadcrumb.par = e.par
  breadcrumb.child = e.child
}
onMounted(() => {
  Silders.getRoutes()
  axios
})
</script>
<script lang="ts">
export default {
  name: "Layout",
};
</script>
<style lang="scss" scoped>
.el-main {
  padding: 0;
}

.el-header {
  padding: 0;
}

.el-aside {
  width: 10vw;
  min-width: 100px;
  border-right: 1px solid rgb(214, 214, 214);
}

::v-deep(.el-menu.el-menu--vertical) {
  border-right: 0;
}

::v-deep(.el-sub-menu .el-menu-item) {
  justify-content: center;
  padding: 0 !important;
}

::v-deep(.el-sub-menu__icon-arrow) {
  right: 15px;
}

/* 通过媒体查询对菜单栏进行移动适配 */
@media screen and (max-width: 1142px) {
  ::v-deep(.el-sub-menu__icon-arrow) {
    display: none;
  }

  ::v-deep(.el-sub-menu .el-menu-item) {
    justify-content: center;
    padding: 0 !important;
  }
}
</style>