<!--需要根据后端返回结构修改的函数：onPreview onRemove onSuccess -->
<script setup>
import {computed, onMounted, onUpdated, ref} from "vue";
import {ElMessage} from "element-plus";

const prop = defineProps({
  // 文件列表
  initFileUrls: {
    type: Array,
    default: []
  },
  // 展示格式
  listType: {
    type: String,
    default: 'picture-card'
  },
  // 上传文件的默认接口
  action: {
    type: String,
    default: 'http://localhost:9090/upload/file'
  },
  // 请求头（添加token等）
  headers: {
    type: Object,
    default: {}
  },
  // 上传时的文件名（需要与后端接收时的字段保持一致）
  name: {
    type: String,
    default: 'file'
  },
  // 默认支持cookie凭证信息
  withCredentials: {
    type: Boolean,
    default: true
  },
  // 默认展示上传文件列表
  showFileList: {
    type: Boolean,
    default: true
  },
  // 可接受文件的类型
  accept: {
    type: String,
    default: '.jpg,.jpeg,.png'
  },
  // 允许上传的最大文件数量
  limit: {
    type: Number,
    default: 5
  },
  // 单位MB
  maxSize: {
    type: Number,
    default: 5
  },
  // 提示前缀
  tipPrefix: {
    type: String,
    default: ''
  },
  // 是否展示提示
  showTip: {
    type: Boolean,
    default: true
  },
  // tip过长使用省略号显示
  showOverflowTooltip: {
    type: Boolean,
    default: true
  },
  // 可以多选文件
  multiple: {
    type: Boolean,
    default: true
  },
  // 默认自动上传
  autoUpload: {
    type: Boolean,
    default: true
  },
  // picture-card尺寸大小
  size: {
    type: String,
    default: '6.25rem'
  }
})

const emit = defineEmits(['onProgress', 'change'])
defineExpose({
  clearFiles,
  submit
})

// el-upload使用的文件列表
const fileList = ref(prop.initFileUrls.map(item => {
  return {
    name: getFileName(item),
    url: item
  }
}))

const uploadRef = ref()

// 存放后端返回的url，及初始化url
const urls = ref([...prop.initFileUrls])

// 如果允许上传视频，则默认只能使用text显示上传列表
const listTypeCmp = computed(() => {
  return prop.accept.indexOf('mp4') !== -1 ? 'text' : prop.listType
})

// 提示信息
const tip = computed(() => {
  return `${prop.tipPrefix ? prop.tipPrefix + '，' : ''}文件类型：
  ${prop.accept.replaceAll(',', '/').replaceAll('.', '')}
  ，文件大小不能超过：${prop.maxSize}MB`
})

// 文件上传之前的钩子
function beforeUpload(e) {
  const MB = e.size / (1024 * 1024)
  if (MB > prop.maxSize) {
    ElMessage.error(`文件的大小不能超过:${prop.maxSize}MB`)
    return false
  }
}

// 上传成功的回调(根据后端返回值不同需要略作修改)
function onSuccess(e, file) {
  urls.value.push(e)
  emit('change', urls.value)
}

const dialogFileUrl = ref()
const dialogVisible = ref(false)

// 预览图片(根据后端返回值不同需要略作修改)
function onPreview(e) {
  dialogFileUrl.value = e.response || e.url
  dialogVisible.value = true
}

// 移除文件(根据后端返回值不同需要略作修改)
function onRemove(e) {
  urls.value = urls.value.filter(item => item !== (e.response || e.url))
  emit('change', urls.value)
}

// 超出最大文件限制时，执行的钩子函数
function onExceed(e) {
  ElMessage.error(`超出要求的文件最大数量:${prop.limit}`)
}

// 文件上传失败时的回调
function onError() {
  ElMessage.error('文件上传失败')
}

// 上传进度回调
function onProgress(e, file, fileList) {
  emit('onProgress', e, file, fileList)
}

// 清空文件列表
function clearFiles() {
  uploadRef.value.clearFiles()
  urls.value = []
  emit('change', urls.value)
}

// 手动提交
function submit() {
  uploadRef.value.submit()
}

// 获取后缀
function getSuffix(url) {
  return url.substring(url.lastIndexOf('.') + 1)
}

// 获取文件名
function getFileName(url) {
  return url.substring(url.lastIndexOf('/') + 1)
}

// 阻止点击tip时触发的上传行为
function preventClick(event) {
  event.stopPropagation()
}

// 初始化picture-card大小
function initSize() {
  const uploadListItem = document.querySelector('.el-upload-list--picture-card')
  const uploadPictureCard = document.querySelector('.el-upload--picture-card')
  if (uploadListItem) {
    uploadListItem.style.setProperty('--el-upload-list-picture-card-size', prop.size)
  }
  if (uploadPictureCard) {
    uploadPictureCard.style.setProperty('--el-upload-picture-card-size', prop.size)
    if (listTypeCmp.value==='picture-card'){
      uploadPictureCard.style['margin-bottom']='1.56rem'
    }
  }
}

// 动态处理展示样式
function handleStyle() {
  initSize()
}

onUpdated(() => {
  handleStyle()
})
onMounted(() => {
  handleStyle()
})

</script>

<template>
  <el-upload
      ref="uploadRef"
      class="upload-box"
      v-model:file-list="fileList"
      :list-type="listTypeCmp"
      :action="action"
      :headers="headers"
      :with-credentials="withCredentials"
      :name="name"
      :show-file-list="showFileList"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :accept="accept"
      :limit="limit"
      :on-exceed="onExceed"
      :on-error="onError"
      :on-progress="onProgress"
      :auto-upload="autoUpload"
      :multiple="multiple"
  >
    <template #default v-if="autoUpload">
      <div class="upload">
        <div class="upload-default">
          <slot>
            <el-icon v-if="listTypeCmp==='picture-card'"
                     style="width: 100%;height: 100%;font-size: 1.88rem;color: #888888">
              <Plus/>
            </el-icon>
            <el-button v-else>上传文件</el-button>
          </slot>
        </div>

        <div v-if="listTypeCmp==='picture-card' && showTip" class="upload-tip abs-tip" @click="preventClick">
          <div class="tip-div" :title="tip"
               :class="{'text-overflow-ellipsis':showOverflowTooltip}">
            <span>{{ tip }}</span>
          </div>
        </div>
      </div>
    </template>
    <template #tip v-if="listTypeCmp!=='picture-card' && showTip">
      <div class="upload-tip" @click="preventClick">
        <div class="tip-div" :title="tip"
             :class="{'text-overflow-ellipsis':showOverflowTooltip}">
          <span>{{ tip }}</span>
        </div>
      </div>
    </template>
    <!--    自定义缩略图-->
    <template #file="{file}">
      <slot name="file" :file="file"></slot>
    </template>
    <template #trigger v-if="!autoUpload">
      <slot name="trigger"></slot>
    </template>
  </el-upload>
  <!--文件预览-->
  <el-dialog v-model="dialogVisible" width="80%">
    <video style="height: 100%;width: 100%" v-if="getSuffix(dialogFileUrl)==='mp4'" :src="dialogFileUrl" controls/>
    <el-image v-else style="height: 80vh" w-full :src="dialogFileUrl" alt="Preview Image"/>
  </el-dialog>
</template>

<style lang="scss" scoped>

.upload-box {
  box-sizing: border-box;

  .upload {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .abs-tip{
      position: absolute;
      bottom: -1.88rem;
      left: 0;
    }
  }

  .upload-tip {
    width: 100%;

    .tip-div {
      width: 100%;
      cursor: pointer;
      color: red;
      font-weight: 200;
      font-size: 0.75rem;
    }

    .text-overflow-ellipsis {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap; /* 不换行 */
      text-overflow: ellipsis; /* 超出部分显示为省略号 */
    }
  }
}
</style>
