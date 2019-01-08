<template>
  <div class="page">
    <Header title="忘记密码"></Header>
    <div class="login-box" v-if="step==1">
      <img class="login-logo" src="@/assets/images/LOGO.png" alt srcset>
      <cube-input class="logon-input" v-model="phone" :maxlength="11" placeholder="请输入手机号"></cube-input>
      <div style="display:flex">
        <cube-input
          class="logon-input valid-code"
          v-model="valid"
          :maxlength="4"
          :eye="true"
          placeholder="请输入验证码"
        ></cube-input>
        <cube-button
          class="form-primary-btn valid-btn"
          :disabled="disable"
          :primary="true"
          @click="startTimer"
        >{{validtext}}</cube-button>
      </div>
      <cube-button class="form-primary-btn" :primary="true" @click="nextStep">下一步</cube-button>
    </div>
    <div class="login-box" v-else>
        <img class="login-logo" src="@/assets/images/LOGO.png" alt srcset>
        <cube-input class="logon-input" v-model="pass" :maxlength="20" placeholder="请设置密码（6-20位数字或字母）"></cube-input>
        <cube-input  class="logon-input" v-model="passv" :maxlength="20" :eye="true" placeholder="请再次输入密码"></cube-input>
        <cube-button  class="form-primary-btn" :primary="true" @click="goForgot">确定</cube-button>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  name: "Forgot",
  components: {
    Header
  },
  data() {
    return {
      step: 1,
      phone: "",
      pass: "",
      passv:'',
      valid: "",
      validtext: "获取验证码",
      wait: 60,
      disable: false,
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
    chooseType() {
      this.step = 2;
    },
    getCode() {},
    nextStep() {
        this.step = 2;
    },
    goForgot(){
        this.$store.commit('setUserToken','token:123456')
        this.$router.go(-2)
    },
    startTimer() {
      var that = this;
      if (this.wait == 0) {
        this.disable = false;
        this.validtext = "获取验证码";
        this.wait = 60;
      } else {
        this.disable = true;
        this.validtext = "重新发送(" + this.wait + ")";
        this.wait--;
        setTimeout(function() {
          that.startTimer();
        }, 1000);
      }
    }
  }
};
</script>
<style lang="stylus">
@import '../assets/css/style.styl';

.login-logo {
  margin: 68px auto 0;
  height: 47px;
  width: 167px;
}

.login-box {
  padding: 0 50px;
}

.logon-input {
  margin-top: 25px;
  flex 1;
}

.cube-input.logon-input::after {
  border-color: #FF6B00;
  border-radius: 4px;
}

.valid-code {
  .cube-input-field {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
}

.valid-btn {
  margin-top: 25px;
  width: 110px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

</style>
