<template>
  <div class="page">
    <Header :back-icon="false" title="登录"></Header>

    <div class="login-box">
      <img class="login-logo" src="@/assets/images/LOGO.png" alt srcset>
      <cube-input class="login-input" v-model="phone" :maxlength="11" placeholder="请输入手机号"></cube-input>
      <cube-input
        class="login-input"
        v-model="pass"
        :maxlength="16"
        :eye="true"
        placeholder="请输入密码"
      ></cube-input>
      <cube-button
        class="form-primary-btn"
        style="margin-top:25px"
        :primary="true"
        @click="goLogin"
      >登录</cube-button>
      <div class="btn-box">
        <router-link class="line-item" to="/forgot">忘记密码</router-link>
        <router-link class="line-item" to="/register">注册</router-link>
      </div>
      <div class="three-part">
        <div class="three-part-tittle">第三方登录</div>
        <div class="three-part-box">
          <img src="@/assets/images/icon-10.png" alt="" >
          <img src="@/assets/images/icon-19.png" id="qlogin" @click="threePartQQ"  alt="" >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Header from "@/components/Header.vue";
export default {
  name: "Login",
  components: {
    Header
  },
  data() {
    return {
      type: "login",
      phone: "",
      pass: "",
      list: [
        {
          name: "登录",
          back: false
        },
        {
          name: "注册",
          back: true
        },
        {
          name: "注册",
          back: true
        }
      ]
    };
  },
  mounted(){
    
  },
  methods: {
    threePartQQ(){
      window.location.href = 'https://graph.qq.com/oauth2.0/authorize?client_id=100229030&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fqzonestyle.gtimg.cn%2Fqzone%2Fopenapi%2Fredirect-1.0.1.html', 'oauth2Login_10634' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes'
      // this.http('/threePartLogin/bindQQ','get',{},this.$store.state.token).then(res=>{
      //   console.log(res)
      // })
    },
    threePartWX(){
      this.$router.push({name:'Home'})
    },
    goLogin() {
      if (this.phone == "") {
        this.$createToast({ txt: "手机号不能为空", type: "txt" }).show();
        return;
      }
      if (this.pass == "") {
        this.$createToast({ txt: "密码不能为空", type: "txt" }).show();
        return;
      }

      this.$http(
        "/api/app/commonUser/login",
        "post",
        this.$qs.stringify({ 'account': this.phone, 'password': this.pass }),
        ""
      ).then(res => {
        if (res.data.code == 100) {
          this.$store.commit("setUserToken", res.data.data);
          console.log()
          if(this.$route.matched.length>1){
            this.$router.back();
          }else{
            this.$router.push({name:'home'})
          }
          
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      });
    }
  }
};
</script>
<style lang="stylus">
@import '../assets/css/style.styl';

.three-part-tittle{
  font-size 15px;
  position relative
  text-align center;
  height 40px
  line-height 40px
  width 115px
  margin 0 auto
}
.three-part-tittle:after,.three-part-tittle:before{
  content '';
  position absolute;
  width 50px
  height 2px
  background-color #dbdbdb
  top:19px
}
.three-part-tittle:after{
  left -80px
}
.three-part-tittle:before{
  right -80px
}
.three-part-box{
  display flex;
  align-items center;
  justify-content space-around;
}
.three-part-box img{
  display block;
  height 50px;
  width 50px;

}
.cube-input.login-input::after {
  border-color: #FF6B00;
  border-radius: 4px;
}

.btn-box {
  display: flex;
  justify-content: space-between;

  .line-item {
    display: inline-block;
    font-size: 13px;
    padding: 13px 0;
  }
}
</style>
