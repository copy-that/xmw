<template>
  <div class="page">
    <Header title="注册"></Header>
    <div class="choose-box" v-if="step==1">
      <div class="choose-name">请先选择身份</div>
      <div class="choose-btn" :class="choosetype==1?'choosed':''" @click="checkType(1)">我是个人</div>
      <div class="choose-btn" :class="choosetype==2?'choosed':''" @click="checkType(2)">我是经纪人</div>
      <cube-button class="form-primary-btn" :primary="true" @click="chooseType">确定</cube-button>
    </div>
    <div class="login-box" v-else-if="step==2">
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
        <cube-button  class="form-primary-btn" :primary="true" @click="goRegister">确认注册</cube-button>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  name: "Register",
  components: {
    Header
  },
  data() {
    return {
      step: 1,
      choosetype: 1,
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
    checkType(type){
      this.choosetype = type
    },
    chooseType() {
      this.step = 2;
    },
    getCode() {},
    nextStep() {
        this.step = 3;
    },
    goRegister(){
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

.choose-box {
  padding: 35px 50px;

  .choose-name {
    color: #666666;
    font-size: 15px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    margin-bottom: 25px;
  }

  .choose-btn {
    color: #666666;
    width: 150px;
    height: 35px;
    line-height: 35px;
    font-size: 15px;
    text-align: center;
    border: 1px solid #f2f2f2;
    border-radius: 4px;
    margin: 0 auto 25px;

    &.choosed {
      border-color: #FF6B00;
      color: #111111;
    }
  }
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
