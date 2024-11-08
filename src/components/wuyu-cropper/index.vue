<!--可能需要修改 submit函数，根据后端返回值做处理 -->
<script setup>
import {ref} from "vue";
import 'vue-cropper/dist/index.css'
import {VueCropper} from "vue-cropper";
import {useDebounceFn} from "@vueuse/core";
import {ElMessage} from "element-plus";
import request from "@/util/request.js";

const emit = defineEmits(['result'])
const prop = defineProps({
  // 单位: MB
  maxSize: {
    type: Number,
    default: 5
  },
  fixedNumber: {
    type: Array,
    default: () => [1, 1]
  },
  src: {
    type: String,
    default: ''
  },
  action: {
    type: String,
    default: '#'
  },
  headers: {
    type: Object,
    default: () => {
    }
  }
})
const cropperRef = ref()
const uploadRef = ref()
const visible = ref(false)
const options = ref({
  img: prop.src, // 图片url
  fixed: true,    // 固定裁剪框大小
  fixedNumber: prop.fixedNumber, // 裁剪框比例
  autoCrop: true,
  filename: getFileName(prop.src) || 'file.png'
})
const preview = ref({})
const realTime = useDebounceFn((e) => {
  preview.value = e
}, 500)

// 获取文件名
function getFileName(url) {
  return url.substring(url.lastIndexOf('/') + 1)
}

function open() {
  visible.value = true
  options.value.img = prop.src
  options.value.fixedNumber = prop.fixedNumber
  options.value.filename = getFileName(prop.src) || 'file.png'
}

function close() {
  preview.value = {}
  uploadRef.value.clearFiles()
  visible.value = false
}

// 选择文件之前
function beforeUpload(file) {
  if (file.size / 1024 / 1024 > prop.maxSize) {
    ElMessage.error(`文件的大小不能超过:${prop.maxSize}MB`)
    return false
  }
}

// 选择文件之后
function httpRequest({file, filename}) {
  options.value.filename = file.name
  options.value.img = URL.createObjectURL(file)
}

// 提交裁剪文件
function submit() {
  cropperRef.value.getCropBlob(async (data) => {
    const formData = new FormData()
    formData.append('file', data, options.value.filename)
    // 上传文件
    const res = await request.post(prop.action, formData, {headers: {...prop.headers}})
    // 提交成功，触发result事件，传递url
    emit('result', res.data)
    visible.value = false
  })
}

function rotateRight() {
  cropperRef.value.rotateRight()
}

function rotateLeft() {
  cropperRef.value.rotateLeft()
}

function zoomIn() {
  cropperRef.value.changeScale(1)
}

function zoomOut() {
  cropperRef.value.changeScale(-1)
}
</script>

<template>
  <div @click="open">
    <slot>
      <el-button>上传</el-button>
    </slot>
  </div>
  <el-drawer :model-value="visible"
             direction="ttb"
             append-to-body
             size="100%"
             @close="close">
    <template #default>
      <el-row style="height: 80%">
        <el-col :sm="12" class="cropper-box">
          <VueCropper
              ref="cropperRef"
              v-if="visible"
              :img="options.img"
              :fixed="options.fixed"
              :fixed-number="options.fixedNumber"
              :autoCrop="options.autoCrop"
              @realTime="realTime"
          ></VueCropper>
        </el-col>
        <el-col :sm="12" class="preview">
          <div :style="preview.div" class="preview-box">
            <img v-if="preview.url" class="img" :src="preview.url" :style="preview.img"/>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top: 1rem">
        <el-col :sm="1">
          <el-upload action="#"
                     :limit="1"
                     ref="uploadRef"
                     :http-request="httpRequest"
                     :before-upload="beforeUpload"
                     accept=".jpg,.jpeg,.png"
                     :show-file-list="false">
            <template #default>
              <el-button circle type="primary" icon="UploadFilled" title="上传"/>
            </template>
          </el-upload>
        </el-col>
        <el-col :sm="1">
          <el-button circle :disabled="!preview.url" @click="rotateRight" icon="RefreshRight" title="右转"/>
        </el-col>
        <el-col :sm="1">
          <el-button circle :disabled="!preview.url" @click="rotateLeft" icon="RefreshLeft" title="左转"/>
        </el-col>
        <el-col :sm="1">
          <el-button circle :disabled="!preview.url" @click="zoomIn" icon="ZoomIn" title="放大"/>
        </el-col>
        <el-col :sm="3">
          <el-button circle :disabled="!preview.url" @click="zoomOut" icon="ZoomOut" title="缩小"/>
        </el-col>
        <el-col :sm="2">
          <el-button type="success" @click="submit" :disabled="!preview.url">提交</el-button>
        </el-col>
      </el-row>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.cropper-box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .preview-box {
    height: 100%;
    overflow: hidden;

    .img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
