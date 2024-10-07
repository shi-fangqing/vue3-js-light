<script setup>
import "vue-cropper/dist/index.css";
import {VueCropper} from 'vue-cropper'
// import { uploadAvatar } from "@/api/system/user";
import {useUserStore} from "@/store/modules/user";
import {getCurrentInstance, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {useDebounceFn} from "@vueuse/core";

const userStore = useUserStore();
const {proxy} = getCurrentInstance();

const open = ref(false);
const visible = ref(false);
const title = ref("修改头像");

//图片裁剪数据
const options = reactive({
  img: userStore.userInfo.avatar,     // 裁剪图片的地址
  autoCrop: true,            // 是否默认生成截图框
  autoCropWidth: 200,        // 默认生成截图框宽度
  autoCropHeight: 200,       // 默认生成截图框高度
  fixedBox: true,            // 固定截图框大小 不允许改变
  outputType: "png",         // 默认生成截图为PNG格式
  filename: 'avatar',        // 文件名称
  previews: {}               //预览数据
});

/** 编辑头像 */
function editCropper() {
  open.value = true;
}

/** 打开弹出层结束时的回调 */
function modalOpened() {
  visible.value = true;
}

/** 覆盖默认上传行为 */
function requestUpload() {
}

/** 向左旋转 */
function rotateLeft() {
  proxy.$refs.cropper.rotateLeft();
}

/** 向右旋转 */
function rotateRight() {
  proxy.$refs.cropper.rotateRight();
}

/** 图片缩放 */
function changeScale(num) {
  num = num || 1;
  proxy.$refs.cropper.changeScale(num);
}

/** 上传预处理 */
function beforeUpload(file) {
  if (file.type.indexOf("image/") == -1) {
    ElMessage.error("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。")
    // proxy.$modal.msgError("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
  } else {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      options.img = reader.result;
      options.filename = file.name;
    };
  }
}

/** 上传图片 */
function uploadImg() {
//   proxy.$refs.cropper.getCropBlob(data => {
//     let formData = new FormData();
//     formData.append("avatarfile", data, options.filename);
//     uploadAvatar(formData).then(response => {
//       open.value = false;
//       options.img = import.meta.env.VITE_APP_BASE_API + response.imgUrl;
//       userStore.avatar = options.img;
//       ElMessage.success({message: '修改成功', duration: 1500})
//       visible.value = false;
//     });
//   });
}

/** 实时预览 */
const realTime = useDebounceFn((data) => {
  options.previews = data;
}, 500)

/** 关闭窗口 */
function closeDialog() {
  options.img = userStore.userInfo.avatar;
  options.visible = false;
}
</script>

<template>
  <div class="user-info-head" @click="editCropper()">
    <template v-if="options.img">
      <el-image :src="options.img" fit="cover" class="img"/>
    </template>
    <template v-else>
      <div class="img">
        <el-icon class="add-icon">
          <Plus/>
        </el-icon>
      </div>
    </template>
    <div class="mask">
      <el-icon class="icon">
        <Plus/>
      </el-icon>
    </div>
  </div>
  <el-dialog :title="title" v-model="open" width="80%" append-to-body @opened="modalOpened" @close="closeDialog">
    <el-row :gutter="30">
      <el-col :sm="12" style="height: 21.88rem">
        <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            :outputType="options.outputType"
            @realTime="realTime"
            v-if="visible"
        />
      </el-col>
      <el-col :sm="12" style="height:21.88rem; display: flex;justify-content: center;align-items: center">
        <div :style="options.previews.div"
             style="overflow:hidden;border-radius: 50%;border: 0.06rem solid var(--el-border-color)">
          <img :src="options.previews.url" :style="options.previews.img"/>
        </div>
      </el-col>
    </el-row>
    <br/>
    <el-row>
      <el-col :sm="12" style="margin-bottom: 0.63rem">
        <el-row :gutter="10">
          <el-col :span="7">
            <el-upload
                action="#"
                :http-request="requestUpload"
                :show-file-list="false"
                :before-upload="beforeUpload"
            >
              <el-button>
                选择
                <el-icon class="el-icon--right">
                  <Upload/>
                </el-icon>
              </el-button>
            </el-upload>
          </el-col>
          <el-col :span="4">
            <el-button icon="Plus" @click="changeScale(1)"></el-button>
          </el-col>
          <el-col :span="4">
            <el-button icon="Minus" @click="changeScale(-1)"></el-button>
          </el-col>
          <el-col :span="4">
            <el-button icon="RefreshLeft" @click="rotateLeft()"></el-button>
          </el-col>
          <el-col :span="4">
            <el-button icon="RefreshRight" @click="rotateRight()"></el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :sm="12" style="text-align: center">
        <el-button type="primary" @click="uploadImg()">提 交</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<style lang='scss' scoped>

.user-info-head {
  position: relative;
  height: 7.5rem;
  cursor: pointer;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;

    .icon {
      font-size: 2rem;
    }
  }

  &:hover .mask {
    opacity: 1;
  }

  .add-icon {
    font-size: 2rem;
    color: grey;
  }

  .img {
    border-radius: 50%;
    border: 0.06rem solid var(--el-border-color);
    height: 7.5rem;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
