<!-- 添加成员 -->
<template>
    <div>
        <el-dialog v-model="DiaValue" @opened="creatQrCode" @closed="onDialogClosed">
            <div style="display: flex; flex-direction: column; align-items: center;">
                <canvas ref="QRref"></canvas>
                <el-button type="primary" style="width: 150px;  margin:0 0 20px !important;"
                    @click="downloadQRCode">下载二维码</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import QRCode from 'qrcode'
const QRCodeMsg = ref()
const DiaValue = ref(false)
const QRref = ref()
const curData = ref()
const openDialog = (e: any) => {
    setTimeout(() => {
        creatQrCode();
    }, 50)
    curData.value = e
    DiaValue.value = true
}

const creatQrCode = () => {
    let opts = {
        errorCorrectionLevel: "H",//容错级别
        type: "xunjian",//生成的二维码类型
        quality: 0.3,//二维码质量
        margin: 6,//二维码留白边距
        width: 250,//宽
        height: 200,//高
        text: curData.value,//二维码内容
        color: {
            dark: "#333333",//前景色
            light: "#fff"//背景色
        }

    };
    QRCodeMsg.value = "https://www.baidu.com/"; //生成的二维码为URL地址js
    // 将获取到的数据（val）画到msg（canvas）上
    QRCode.toCanvas(QRref.value, QRCodeMsg.value, opts, function (error: any) {
        console.log(error)
    });
}

const onDialogClosed = () => {
    QRCodeMsg.value = '';
}
// 实现下载功能
const downloadQRCode = () => {
    const canvas = QRref.value; // 获取 canvas 元素
    const url = canvas.toDataURL("image/png",1.0); // 将 canvas 内容转换为图片 URL  图片质量    
    const link = document.createElement("a"); // 创建一个 <a> 元素
    link.download = "qrcode.png"; // 设置下载文件的名称
    link.href = url; // 设置 <a> 元素的链接地址为图片 URL
    document.body.appendChild(link); // 将 <a> 元素添加到 DOM 树中
    link.click(); // 模拟点击 <a> 元素进行下载
    document.body.removeChild(link); // 下载完成后移除 <a> 元素
}
// 暴露变量
defineExpose({
    openDialog,
});

</script>
  
<style scoped lang="scss">
::v-deep(.el-dialog__body) {
    padding: 0;
    min-width: 300px !important;
}

::v-deep(.el-dialog) {
    width: 250px;
    min-width: 300px !important;
}
</style>
  
  
  
  
    
    
    
    