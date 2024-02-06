<!-- 系统配置 -->
<template>
  <div class="system">
    <!-- <el-card class="box-card"> -->
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
    <!-- </el-card> -->
  </div>
</template>

<script setup lang="ts">
import { UploadProps, ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
// import type { UploadProps, ElMessage } from 'element-plus'
import { useConfigInfo } from '@/store/modules/sysconfig'
import { ref, reactive, onMounted } from 'vue'
const ConfigStore = useConfigInfo()
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

const beforeAvatarUpload: UploadProps['beforeUpload'] = (file) => {
  const isImage = file.type.startsWith('image/');
      if (!isImage) {
        ElMessage.error('只能上传图片!')
         return false
      }
      if(file.size / 1024 / 1024 > 2) {
        ElMessage.error('图片大小不能超过2MB!')
        return false
      }
      imageUrl.value = URL.createObjectURL(file);
      console.log(imageUrl.value);
      ElMessage.success('更换头像成功!')
      return isImage;
}

onMounted(async ()=>{
   const result = (await ConfigStore.getConfig()).data
   form.sysinfo = result.sysinfo
   console.log(result);
   imageUrl.value = result.url
})
</script>

<style lang="scss" scoped>
.system {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>