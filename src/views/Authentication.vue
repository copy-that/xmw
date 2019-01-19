<template>
  <div class="page">
    <Header title="个人认证"/>
    <div class="auth-box">
      <div class="auth-name">姓名：</div>
      <input class="auth-input" v-model="name" type="text" placeholder="请输入您的姓名">
      <div class="auth-name">身份证正反面照片：</div>
      <div class="upload-box">
         <div class="cube-upload">
          <img class="cube-upload-pic"  :src="face" alt="" srcset="">
          <div class="cube-upload-btn">
            <div v-if="face==''">
              <i>＋</i>
              <p>点击上传身份证正面照</p>
            </div>
            <input type="file" ref="face" accept="image/*" @change="faceHandler" class="cube-upload-input">
          </div>
        </div>
        <div class="cube-upload">
          <img class="cube-upload-pic"  :src="back" alt="" srcset="">
          <div class="cube-upload-btn">
            <div v-if="back==''">
              <i>＋</i>
              <p>点击上传身份证背面照</p>
            </div>
            <input type="file" ref="back" accept="image/*" @change="backHandler" class="cube-upload-input">
          </div>
        </div>
      </div>
      <div class="auth-name">房产证照片：</div>
      <div class="upload-box">
        <div class="cube-upload">
          <img class="cube-upload-pic" :src="house" alt="" srcset="">
          <div class="cube-upload-btn">
            <div v-if="house==''">
              <i>＋</i>
              <p>点击上传房产证照片</p>
            </div>
            <input type="file" ref="house" accept="image/*" @change="houseHandler" class="cube-upload-input">
          </div>
          
        </div>
      </div>
      <cube-button :primary="true" class="primary-btn" @click.stop="submitForm">提交</cube-button>
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
      name:"",
      face: "",
      back: "",
      house: "",
    };
  },
  methods: {
    faceHandler(e) {
    const that = this
    var file = e.target.files[0]
     var reader = new FileReader();
     reader.readAsDataURL(file)
     reader.onload = function(){
          that.face = this.result; 
      };
    },
    backHandler(e) {
      const that = this
      var file = e.target.files[0]
      var reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = function(){
            that.back = this.result; 
        };
    },
    houseHandler(e) {
      const that = this
    var file = e.target.files[0]
     var reader = new FileReader();
     reader.readAsDataURL(file)
     reader.onload = function(){
          that.house = this.result; 
      };
    },
    submitForm() {
      if(this.name==''){
        this.$createToast({ txt: '名字不能为空', type: "txt" }).show();
        return;
      }
      if(this.$refs.face.files.length==0){
        this.$createToast({ txt: '请添加身份证正面照', type: "txt" }).show();
        return;
      }
      if(this.$refs.back.files.length==0){
        this.$createToast({ txt: '请添加身份证背面照', type: "txt" }).show();
        return;
      }
      if(this.$refs.house.files.length==0){
        this.$createToast({ txt: '请添加房产证照片', type: "txt" }).show();
        return;
      }
      let from = new FormData();
      from.append('image1',this.$refs.face.files[0])
      from.append('image2',this.$refs.back.files[0])
      from.append('image3',this.$refs.house.files[0])
      from.append('certificationName',this.name)
      
      // this.$router.go(-1)
      this.$http('/api/app/commonUser/userCertification','post',from,this.$store.state.token).then(res=>{

          this.$createDialog({
            type: 'alert',
            title: res.data.msg,
            icon: res.data.code==100?'cubeic-right':'cubeic-warn',
            onConfirm: () => {
              this.$router.back()
            },
          }).show()
      
      })
    }
  }
};
</script>
<style lang="stylus" >
@import '../assets/css/style.styl';

.auth-box {
  padding: 0 15px;
  text-align: center;
}

.auth-name {
  text-align: left;
  font-size: 15px;
  margin: 30px 0 12px;
}

.auth-input {
  margin: 0 15px;
  width: calc(100% - 30px);
  box-sizing: border-box;
  padding: 0px 15px;
  border: 1px solid #f1f1f1;
  outline: none;
  background-color: #f9f9f9;
  border-radius: 4px;
  height: 30px;
  font-size: 15px;
  color: #A1A1A1;
}

.upload-box {
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .cube-upload {
    position relative
    border: 1px solid #f1f1f1;
    height: 85px;
    width: 150px;
    background-color: #f9f9f9;
    border-radius: 4px;
    
    .cube-upload-pic{
      position absolute
      top: 0px
      left: 0px
      height: 85px;
      width: 150px;
    }

    .cube-upload-file, .cube-upload-btn {
      margin: 0;
    }

    .cube-upload-file {
      margin: 0;
      height: 100%;
    }

    .cube-upload-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height 100%
      width 100%
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