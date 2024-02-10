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
          <el-upload class="avatar-uploader" action="#"
            :show-file-list="false" 
            :before-upload="beforeAvatarUpload"
            >
            <el-image fit="contain" v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
     <div style="display: flex">
        <el-upload class="avatar-uploader" action="#"
            :on-success="handleAvatarSuccess" 
            :before-upload="beforeAvatarUpload"
            >
            <el-button type="primary">更换图片</el-button>
        </el-upload>
      <el-button type="success" style="margin-left: 10px !important;" @click="savePic">保存</el-button>
     </div>
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
  syslog:<any>File
})
const ruler = ref({
  sysinfo: [
    { required: true, message: '系统配置名称不能为空', trigger: 'blur' }
  ],
})

const imageUrl = ref('')

const handleAvatarSuccess = (res:any, file:any)=>{
  console.log(res,file);
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
      form.syslog = file
      return isImage;
}

const savePic = async ()=>{
  if(form.syslog instanceof Function) ElMessage.error('请先上传图片文件!')
 else{
    const result = await ConfigStore.updataConfig(form)
    ElMessage({
      type: result && result.msg === '已保存' ? 'success' : 'error',
      message: result.msg
    })
  }
}

onMounted(async ()=>{
   const result = (await ConfigStore.getConfig()).data
   form.sysinfo = result.sysinfo
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
  flex-direction: column;
}

.avatar{
  height: 500px;
  width: 500px;
}
</style>