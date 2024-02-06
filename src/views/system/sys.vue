<!-- 系统配置 -->
<template>
  <div class="system">
    系统配置
    <el-card class="box-card">
      <el-form :model="form" label-width="120px" :rules="ruler" ref="Registerform">
        <el-form-item label="系统配置名称" prop="sysinfo">
          <el-input v-model="form.sysinfo" />
        </el-form-item>
        <el-form-item label="系统配置图片" prop="url">
          <!-- <el-input v-model="form.url" /> -->
          <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>

        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { UploadProps, ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
// import type { UploadProps, ElMessage } from 'element-plus'

import { ref, reactive } from 'vue'
let form = reactive({
  sysinfo: "",
  url: ""
})
const ruler = ref({
  sysinfo: [
    { required: true, message: '系统配置名称不能为空', trigger: 'blur' }
  ],
})

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response: any,
  uploadFile: any
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<style lang="scss" scoped>
.system {
  display: flex;
  height: 100%;
  width: 100%;

  .box-card {
    width: 480px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>


