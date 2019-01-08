<template>
  <div class="page">
    <Header title="个人认证"/>
    <div class="auth-box">
        <div class="auth-name">姓名：</div>
        <input class="auth-input" type="text" placeholder="请输入您的姓名">
        <div class="auth-name">身份证正反面照片：</div>
        <div class="upload-box">
            <cube-upload
            ref="face"
            v-model="face"
            :action="action"
            @files-added="faceHandler"
            @file-error="errHandler"
            >
            <cube-upload-file v-for="(file, i) in face" :file="file" :key="i"></cube-upload-file>
            <cube-upload-btn :multiple="false">
                <div>
                <i>＋</i>
                <p>点击上传身份证正面照</p>
                </div>
            </cube-upload-btn>
            </cube-upload>
            <cube-upload
            ref="back"
            v-model="back"
            :action="action"
            @files-added="backHandler"
            @file-error="errHandler"
            >
            <cube-upload-file v-for="(file, i) in back" :file="file" :key="i"></cube-upload-file>
            <cube-upload-btn :multiple="false">
                <div>
                <i>＋</i>
                <p>点击上传身份证正面照</p>
                </div>
            </cube-upload-btn>
            </cube-upload>
        </div>
        <div class="auth-name">房产证照片：</div>
        <div class="upload-box">
            <cube-upload
            ref="house"
            v-model="house"
            :action="action"
            @files-added="houseHandler"
            @file-error="errHandler"
            >
            <cube-upload-file v-for="(file, i) in house" :file="file" :key="i"></cube-upload-file>
            <cube-upload-btn :multiple="false">
                <div>
                <i>＋</i>
                <p>点击上传身份证正面照</p>
                </div>
            </cube-upload-btn>
            </cube-upload>
        </div>
        <cube-button :primary="true" class="primary-btn" @click="submitForm">提交</cube-button>
    </div>

  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  name: "Issues",
  components: {
    Header
  },
  data() {
    return {
      action: "//jsonplaceholder.typicode.com/photos/",
      face: [],
      back:[],
      house:[]
    };
  },
  methods: {
    faceHandler() {
      const face = this.face[0];
      face && this.$refs.face.removeFile(face);
    },
    backHandler() {
      const back = this.back[0];
      back && this.$refs.back.removeFile(back);
    },
    houseHandler() {
      const house = this.house[0];
      house && this.$refs.house.removeFile(house);
    },
    errHandler(file) {
      // const msg = file.response.message
      this.$createToast({
        type: "warn",
        txt: "Upload fail",
        time: 1000
      }).show();
    },
    submitForm(){
      this.$router.go(-1)
    }
  }
};
</script>
<style lang="stylus" >
@import '../assets/css/style.styl';
.auth-box{
    padding: 0 15px;
    text-align center;
}
.auth-name{
    text-align left ;
    font-size 15px;
    margin 30px 0 12px;
}
.auth-input{
    margin 0 15px
   width: calc(100% - 30px);
   box-sizing:border-box;
   padding: 0px 15px;
   border: 1px solid #f1f1f1;
   outline: none;
   background-color: #f9f9f9;
   border-radius:4px;
   height 30px;
   font-size 15px;
   color #A1A1A1;
}
.upload-box {
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .cube-upload {
    border: 1px solid #f1f1f1;
    height: 85px;
    width: 150px;
    background-color: #f9f9f9;
    border-radius: 4px;

    .cube-upload-file, .cube-upload-btn {
      margin: 0;
    }

    .cube-upload-file {
      margin: 0;
      height: 100%;

      + .cube-upload-btn {
        margin-top: -85px;
        opacity: 0;
      }
    }

    .cube-upload-file-def {
      width: 100%;
      height: 100%;

      .cubeic-wrong {
        display: none;
      }
    }

    .cube-upload-btn {
      display: flex;
      align-items: center;
      justify-content: center;

      > div {
        text-align: center;
      }

      i {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        font-size: 32px;
        line-height: 1;
        font-style: normal;
        color: #666666;
      }

      p {
        font-size: 10px;
        color: #666666;
      }
    }
  }
}
</style>