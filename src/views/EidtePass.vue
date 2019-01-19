<template>
  <div class="page">
    <Header title="修改密码"/>
    <div class="edite-pass-box">
      <input class="form-input" v-model="oldPassword" type="text" placeholder="请输入旧密码">
      <input class="form-input" v-model="password" type="text" placeholder="请设置新密码（6-20位数字或字母）">
      <input class="form-input" v-model="rePassword" type="text" placeholder="请再次输入密码">
      <cube-button class="form-primary-btn" @click="editePass" :primary="true">确定</cube-button>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  name: "EidtePass",
  components: {
    Header
  },
  data() {
    return {
      oldPassword: "",
      password: "",
      rePassword: ""
    };
  },
  methods: {
    editePass() {
      if (this.oldPassword == "") {
        this.$createToast({ txt: "旧密码不能为空", type: "txt" }).show();
        return;
      }
      if (this.password == "") {
        this.$createToast({ txt: "新密码不能为空", type: "txt" }).show();
        return;
      }
      if (this.rePassword !== this.password) {
        this.$createToast({ txt: "两次密码不一致", type: "txt" }).show();
        return;
      }
      this.$http(
        "/api/app/commonUser/updatePassword",
        "post",
        this.$qs.stringify({
            oldPassword:this.oldPassword,
            password:this.password,
            rePassword:this.rePassword
        }),
        this.$store.state.token
      ).then(res => {
        if (res.data.code == 100) {
         this.$createDialog({
            type: "alert",
            title: res.data.msg,
            icon: "cubeic-info",
            onConfirm: () => {
              this.$router.back();
            }
          }).show();
        } else if (res.data.code == 102) {
          this.$createDialog({
            type: "alert",
            title: res.data.msg,
            icon: "cubeic-warn",
            confirmBtn: "去登陆",
            onConfirm: () => {
              this.$router.push({ name: "Login" });
            }
          }).show();
        } else {
          this.$createDialog({
            type: "alert",
            title: res.data.msg,
            icon: "cubeic-warn"
          }).show();
        }
      });
    }
  }
};
</script>
<style lang="stylus" >
@import '../assets/css/style.styl';

.edite-pass-box {
  padding: 0 45px;

  .form-input {
    padding: 0 10px;
    box-sizing: border-box;
    outline: none;
    width: 100%;
    height: 35px;
    font-size: 13px;
    color: #666666;
    border: 1px solid #ff6b00;
    margin-top: 20px;
  }
}
</style>
