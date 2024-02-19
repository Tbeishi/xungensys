<template>
    <el-sub-menu :index="data.url">
        <template #title>
        <i v-if="iconClass" class="iconfont" :class="iconClass"></i>
        <span class="title">{{ data.name }}</span>
        </template>
        <div v-for="item in data.childs" :key="item.selfid">
            <subMenuList v-if="item.childs && item.childs.length > 0" :data="item"></subMenuList>
            <el-menu-item v-else :index="item.url" @click="goRoute(item,data.name)">
                <template #title>
                    <i class="iconfont icon-yuandian"></i>
                    <span style="font-size: 13px;">{{ item.name }}</span>
                </template>
            </el-menu-item>
        </div>
   </el-sub-menu>
</template>

<script lang="ts" setup>
defineProps(["data","iconClass"])
const emit = defineEmits(["breadcrumbData"])
import { useRouter } from "vue-router";

//获取路由器对象
let $router = useRouter();
//点击菜单的回调
const goRoute = (item:any,name:any) => {
  emit('breadcrumbData',{
    par:name,
    child:item.name
  })
  //路由跳转
  $router.push(item.url);
};
</script>

<style scoped lang="scss">
.iconfont {
  font-size: 20px;
  margin-right: 10px;
  flex: 0 0 20px;
}

.icon-yuandian{
    margin: 0;
    flex: 0 0 16px;
    color: rgb(124, 124, 124);
    font-size: 14px;
    margin-right: 5px;
}

/* 通过媒体查询对菜单栏进行移动适配 */
@media screen and (max-width: 1142px) {
  ::v-deep(.el-sub-menu__icon-arrow) {
    display: none;
  }

  ::v-deep(.el-sub-menu__title) {
    padding: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ::v-deep(.el-sub-menu .el-menu-item) {
    justify-content: center;
    padding: 0 !important;
  }
}

@media screen and (max-width: 950px) {
  .title {
    display: none;
  }
}
</style>

