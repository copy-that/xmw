<template>
  <div class="page">
    <Header title="忘记密码"></Header>
    <div class="login-box" v-if="step==1">
      <img class="login-logo" src="@/assets/images/LOGO.png" alt srcset>
      <cube-input class="login-input" v-model="phone" :maxlength="11" placeholder="请输入手机号"></cube-input>
      <div style="display:flex">
        <cube-input
          class="login-input valid-code"
          v-model="valid"
          :maxlength="4"
          :eye="true"
          placeholder="请输入验证码"
        ></cube-input>
        <cube-button
          class="form-primary-btn valid-btn"
          :disabled="disable"
          :primary="true"
          @click="getCode"
        >{{validtext}}</cube-button>
      </div>
      <cube-button class="form-primary-btn" :primary="true" @click="nextStep">下一步</cube-button>
    </div>
    <div class="login-box" v-else>
        <img class="login-logo" src="@/assets/images/LOGO.png" alt srcset>
        <cube-input class="login-input" v-model="pass" :maxlength="20" placeholder="请设置密码（6-20位数字或字母）"></cube-input>
        <cube-input  class="login-input" v-model="passv" :maxlength="20" :eye="true" placeholder="请再次输入密码"></cube-input>
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
      passv: "",
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
    validPhone(phone) {
      var myreg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$$/;
      return myreg.test(phone);
    },
    getCode() {
      if (!this.validPhone(this.phone)) {
        this.$createToast({ txt: "手机号码不合法", type: "txt" }).show();
        return;
      }
      this.startTimer();
      const that = this;
      this.$http(
        "/api/otherInfo/sendSmsCode",
        "post",
        this.$qs.stringify({ phone: this.phone, type: "2" }),
        ""
      ).then(res => {
        if (res.data.code == 100) {
          this.valid = res.data.data;
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      });
    },
    nextStep() {
      if (this.phone == "") {
        this.$createToast({ txt: "手机号不能为空", type: "txt" }).show();
        return;
      }
      if (!this.validPhone(this.phone)) {
        this.$createToast({ txt: "手机号码不合法", type: "txt" }).show();
        return;
      }
      if (this.valid == "") {
        this.$createToast({ txt: "验证码不能为空", type: "txt" }).show();
        return;
      }
      this.$http(
        "/api/otherInfo/checkSmsCode",
        "post",
        this.$qs.stringify({ phone: this.phone, type: "2", code: this.valid }),
        ""
      ).then(res => {
        if (res.data.code == 100) {
          this.step = 2;
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      });
    },
    goForgot(){
      this.$http(
        "/api/app/commonUser/updateForgetPassword",
        "post",
        this.$qs.stringify({ phone: this.phone, password: this.pass, repassword: this.passv, phoneCode: this.valid }),
        ""
      ).then(res => {
        if (res.data.code == 100) {
          console.log(res.data)
          this.$router.replace({name:'Login'})
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      });
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

.cube-input.login-input::after {
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
