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
      <cube-input class="login-input" v-model="phone" :maxlength="11" placeholder="请输入手机号"></cube-input>
      <div style="display:flex">
        <cube-input
          class="login-input valid-code"
          v-model="valid"
          :maxlength="6"
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
      <cube-input class="login-input" v-model="nickname" :maxlength="8" placeholder="请输入昵称"></cube-input>
      <cube-input
        class="login-input"
        v-model="pass"
        :maxlength="20"
        placeholder="请设置密码（6-20位数字或字母）"
      ></cube-input>
      <cube-input
        class="login-input"
        v-model="passv"
        :maxlength="20"
        :eye="true"
        placeholder="请再次输入密码"
      ></cube-input>
      <cube-button class="form-primary-btn" :primary="true" @click="goRegister">确认注册</cube-button>
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
      unionid:'',
      step: 1,
      choosetype: 1,
      nickname:"",
      phone: "",
      pass: "",
      passv: "",
      valid: "",
      codevalid: "",
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
  mounted() {
    this.unionid = this.$route.query.unionid;
  },
  methods: {
    checkType(type) {
      this.choosetype = type;
    },
    chooseType() {
      // if (this.choosetype == 2) {
      //   this.$router.replace({ name: "Register2" });
      // }
      this.step = 2;
    },
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
        this.$qs.stringify({ phone: this.phone, type: "1" }),
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

      // if (this.nickname == "") {
      //   this.$createToast({ txt: "昵称不能为空", type: "txt" }).show();
      //   return;
      // }
      if (this.phone == "") {
        this.$createToast({ txt: "手机号不能为空", type: "txt" }).show();
        return;
      }
      if (this.valid == "") {
        this.$createToast({ txt: "验证码不能为空", type: "txt" }).show();
        return;
      }
      // this.$http(
      //   "/api/otherInfo/checkSmsCode",
      //   "post",
      //   this.$qs.stringify({ phone: this.phone, type: "1", code: this.valid }),
      //   ""
      // ).then(res => {
      //   if (res.data.code == 100) {
      //     this.step = 3;
      //   } else {
      //     this.$createToast({ txt: res.data.msg, type: "txt" }).show();
      //   }
      // });
      this.$http(
        "/api/app/commonUser/bangdingWxQq",
        "post",
        this.$qs.stringify({ phone: this.phone, wxOpenId: this.$route.query.unionid, phoneCode: this.valid }),
        ""
      ).then(res => {
        if (res.data.code == 100) {
          if(this.choosetype==1){
            this.step = 3;
          }else{
            
          }
          
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      });
    },
    goRegister() {
      if (this.nickname == "") {
        this.$createToast({ txt: "昵称不能为空", type: "txt" }).show();
        return;
      }
      var regpa = /^[0-9a-zA-Z]{6,20}$/;
      if (!regpa.test(this.pass)) {
        this.$createToast({
          txt: "密码长度为（6-20位数字或字母）",
          type: "txt"
        }).show();
        return;
      } else if (this.pass != this.passv) {
        this.$createToast({ txt: "密码和确认密码不一致", type: "txt" }).show();
        return;
      } else {
        this.$http(
            "/api/app/commonUser/registUser",
            "post",
            this.$qs.stringify({nickName:this.nickname, phone: this.phone, password: this.pass, phoneCode: this.valid }),
            ""
          ).then(res => {
            if (res.data.code == 100) {
              this.$router.replace({name:'Login'})
              
            } else {
              this.$createToast({ txt: res.data.msg, type: "txt" }).show();
            }
          });
      }
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
