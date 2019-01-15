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
  methods: {
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
