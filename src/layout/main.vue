<!--  -->
<template>
 <div class="main">
   <!-- // Component 当前路由对应的组件 -->
   <router-view v-slot="{ Component }">
    <!-- 渲染layout一级路由组件的子路由  当监听到之后可以销毁及逆行重新的创建实现刷新功能 -->
    <component :is="Component" />
  </router-view>
 </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.main{
  padding: 0 20px;
}
</style>