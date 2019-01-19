<template>
  <div class="page">
    <Header title="修改资料"/>
    <div class="edite-box">
      <div class="cell avatar-box">
        <label class="cell-label" for>头&emsp;&emsp;像</label>
        <div class="cube-upload cell-upload">
          <div class="cube-upload-btn">
            <img v-if="myInfo.avatar" :src="myInfo.avatar" alt class="cell-avatar">
            <img v-else src="@/assets/images/icon-4.png" alt class="cell-avatar">
            <input ref="avatar" type="file" @change="avatarChange" accept="image/*" class="cube-upload-input">
          </div>
        </div>
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt srcset>
      </div>
      <div class="cell">
        <div class="cell-label">昵&emsp;&emsp;称</div>
        <input class="cell-input" v-model="myInfo.nickName" type="text" placeholder="请输入您的昵称">
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="cell">
        <div class="cell-label">手&ensp;机&ensp;号</div>
        <input class="cell-input" readonly type="text" :value="myInfo.account" placeholder="请输入您的手机号">
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="cell">
        <div class="cell-label">性&emsp;&emsp;别</div>
        <div class="radio-box">
          <div class="radio-item" :class="myInfo.sex=='1'?'is_check':''" @click="handleClick('1')">
            <span class="form_item_radio"></span>男
          </div>
          <div class="radio-item" :class="myInfo.sex=='0'?'is_check':''" @click="handleClick('0')">
            <span class="form_item_radio"></span>女
          </div>
        </div>
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="cell" @click="viewEidtePass">
        <div class="cell-label">修改密码</div>
        <span class="change-text">更改&emsp;</span>
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <cube-button class="primary-btn" :primary="true" @click="saveInfo">保存</cube-button>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header
  },
  data() {
    return {
        myInfo:{
            account:'',
            avatar:'',
            nickName:'',
            sex: "",
            id:''
        }
    };
  },
  mounted(){
      this.getMyInfo()
  },
  methods: {
    getMyInfo(){
        this.$http('/api/app/commonUser/getInfo','post',{},this.$store.state.token).then(res=>{
            console.log(res.data)
            if(res.data.code==100){
                const { account ,atavar,nickName,sex='' } = res.data.data
                this.myInfo.account =  account;
                this.myInfo.nickName =  nickName;
                this.myInfo.avatar =  atavar;
                this.myInfo.sex =  sex;
          
            }else{
                 this.$createDialog({
                    type: 'alert',
                    title: res.data.msg,
                    icon: 'cubeic-warn'
                }).show()
            }
            
        })
    },
    avatarChange(e){
        const that = this
        var file = e.target.files[0]
        var reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = function(){
            that.myInfo.avatar = this.result; 
        };
    },
    handleClick(value){
        this.myInfo.sex = value;
       
        console.log(this.myInfo.sex)
    },
    viewEidtePass() {
      this.$router.push({ name: "EidtePass" });
    },
    saveInfo() {

        const {avatar,nickName,sex} = this.myInfo
        if(avatar==''){
            this.$createToast({ txt: '头像不能为空', type: "txt" }).show();
            return;
        }
        if(sex==''){
            this.$createToast({ txt: '请选择性别', type: "txt" }).show();
            return
        }
        if(nickName==''){
            this.$createToast({ txt: '昵称不能为空', type: "txt" }).show();
            return
        }

      let from = new FormData();
      from.append('image',this.$refs.avatar.files[0])
      from.append('nickName',nickName)
      from.append('sex',sex)
      
      // this.$router.go(-1)
      this.$http('/api/app/commonUser/updateUserInfo','post',from,this.$store.state.token).then(res=>{

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

.edite-box {
  box-sizing: border-box;
  padding: 0 15px;
  width: 100%;
}

.avatar-box {
  position: relative;
  height: 75px !important;
  .cell-upload {
    position: absolute;
    top: 13px;
    right: 30px;
    height: 50px;
    width: 50px;
    .cube-upload-btn{
        border-radius:50%;
        overflow hidden;
        height: 50px;
        width: 50px;
    }
  }

  .cell-avatar {
    height: 50px;
    width: 50px;
  }
}

.change-text {
  position: absolute;
  right: 0;
  top: 21px;
  color: #717171;
  text-align: right;
  font-size: 13px;
}
</style>
