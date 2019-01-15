<template>
  <div class="page">
    <Header title="注册"></Header>
    <div class="register2-box">
      <template v-if="step==1">
        <div class="cell">
          <div class="cell-label">机构名称</div>
          <input type="text" v-model="params.organizationName" class="cell-input" placeholder="请输入机构名称">
        </div>
        <div class="cell" @click="showIndustrySheet">
          <div class="cell-label">所属行业</div>
          <div class="cell-value">{{industry?industry:'请选择'}}</div>
          <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt srcset>
        </div>
        <div class="cell" @click="showAddressPicker">
          <div class="cell-label">所属区域</div>
          <div class="cell-value">{{areatext?areatext:'请选择'}}</div>
          <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt srcset>
        </div>
        <div class="cell">
          <div class="cell-label">联系地址</div>
          <input type="text" v-model="params.address" class="cell-input" placeholder="请输入你的联系地址">
        </div>
        <div class="block">
          <div style="font-size:15px">机构简介</div>
          <textarea class="textarea" v-model="params.organizationMsg" placeholder="请输入机构简介" maxlength="140" rows="6" id></textarea>
        </div>
        <div class="cell">
          <div class="cell-label">联&ensp;系&ensp;人:</div>
          <input type="text" v-model="params.organizationPerson" class="cell-input" placeholder="请输入联系人姓名">
        </div>
        <div class="cell">
          <div class="cell-label">手&ensp;机&ensp;号</div>
          <input type="text" v-model="params.phone" class="cell-input" placeholder="请输入你的手机号">
        </div>
        <div class="cell">
          <div class="cell-label">验&ensp;证&ensp;码</div>
          <input type="text" v-model="params.phoneCode" class="cell-input" placeholder="请输入验证码">
          <cube-button style="position: absolute;right: 0;" :inline="true" @click="getCode" :disabled="disable" :primary="true">{{validtext}}</cube-button>
        </div>
        <cube-button class="form-primary-btn" :primary="true" @click="nextStep">下一步</cube-button>
      </template>
      <template v-else>
        <img class="login-logo" src="@/assets/images/LOGO.png" alt srcset>
        <cube-input
          class="login-input"
          v-model="params.password"
          :maxlength="20"
          placeholder="请设置密码（6-20位数字或字母）"
        ></cube-input>
        <cube-input
          class="login-input"
          v-model="passwordv"
          :maxlength="20"
          :eye="true"
          placeholder="请再次输入密码"
        ></cube-input>
        <cube-button class="form-primary-btn" :primary="true" @click="viewRegister"> 注册</cube-button>
      </template>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import { provinceList, cityList, areaList } from "@/area.js";
import {addressData} from '@/area1.js'
export default {
  name: "Register2",
  components: {
    Header
  },
  data() {
    return {
      step:1,
      areatext:'',
      industry:'',
      passwordv:'',
      validtext: "获取验证码",
      wait: 60,
      disable: false,
      params: {
        organizationName:'',
        industryId:'',
        provinceId: "",
        cityId:'',
        areaId:'',
        organizationMsg:'',
        organizationPerson:'',
        address:'',
        phone:'',
        password:'',
        phoneCode:''
      }
    };
  },
  mounted() {
    // const addressData = provinceList;
    // addressData.forEach(province => {
    //   province.children = cityList[province.value];
    //   province.children.forEach(city => {
    //     city.children = areaList[city.value];
    //   });
    // });
    console.log(addressData)
    this.addressPicker = this.$createCascadePicker({
      title: "选择地区",
      data: addressData,
      onSelect: this.selectHandle,
      onCancel: this.cancelHandle
    });
  },
  methods: {
    showAddressPicker() {
      this.addressPicker.show();
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.areatext = selectedText.join('/')
      this.params.provinceId = selectedVal[0];
      this.params.cityId = selectedVal[1];
      this.params.areaId = selectedVal[2]
      // console.log(selectedVal,
      //   `Selected Item: <br/> - value: ${selectedVal.join(
      //     ", "
      //   )} <br/> - index: ${selectedIndex.join(
      //     ", "
      //   )} <br/> - text: ${selectedText.join(" ")}`
      // );
    },
    cancelHandle() {
      this.$createToast({
        type: "correct",
        txt: "Picker canceled",
        time: 1000
      }).show();
    },
    showIndustrySheet() {
      this.$http('/api/otherInfo/getIndustryList','get',{},'').then(res=>{
        if(res.data.code==100){
          let total = res.data.data.map(item=>{
            return {id:item.id,content:item.industryName}
          })
          this.$createActionSheet({
            title: "所属行业",
            data: total,
          onSelect: (item, index) => {
            this.params.industryId = item.id;
            this.industry = item.content
          }
        }).show();
        }else{
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      }) 
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
    },
    validPhone(phone) {
      var myreg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$$/;
      return myreg.test(phone);
    },
    getCode() {
      if (!this.validPhone(this.params.phone)) {
        this.$createToast({ txt: "手机号码不合法", type: "txt" }).show();
        return;
      }
      this.startTimer();
      const that = this;
      this.$http(
        "/api/otherInfo/sendSmsCode",
        "post",
        this.$qs.stringify({ phone: this.params.phone, type: "1" }),
        ""
      ).then(res => {
        if (res.data.code == 100) {
          this.params.phoneCode = res.data.data;
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      });
    },
    nextStep(){
      const areatext = this.areatext;
      
      const {address,industryId,organizationMsg,organizationName,organizationPerson,password,phone,phoneCode} = this.params;
      if(organizationName==''){
        this.$createToast({ txt: '机构名称不能为空', type: "txt" }).show();
        return;
      }
      if(industryId==''){
        this.$createToast({ txt: '所属行业不能为空', type: "txt" }).show();
        return;
      }
      if(address==''){
        this.$createToast({ txt: '地址不能为空', type: "txt" }).show();
        return;
      }
      if(areatext==''){
        this.$createToast({ txt: '所属区域不能为空', type: "txt" }).show();
        return;
      }
      if(organizationMsg==''){
        this.$createToast({ txt: '机构简介不能为空', type: "txt" }).show();
        return;
      }
      if(organizationPerson==''){
        this.$createToast({ txt: '机构联系人不能为空', type: "txt" }).show();
        return;
      }
      
      if(this.params.password==''){
        this.$createToast({ txt: '密码不能为空', type: "txt" }).show();
        return;
      }
      if(this.passwordv==''){
        this.$createToast({ txt: '确认密码不能为空', type: "txt" }).show();
        return;
      }
      if(phone==''){
        this.$createToast({ txt: '手机号不能为空', type: "txt" }).show();
        return;
      }
      if(phoneCode==''){
        this.$createToast({ txt: '验证码不能为空', type: "txt" }).show();
        return;
      }
      this.$http(
        "/api/otherInfo/checkSmsCode",
        "post",
        this.$qs.stringify({ phone: this.params.phone, type: "1", code: this.params.phoneCode }),
        ""
      ).then(res => {
        if (res.data.code == 100) {
          this.step = 2
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      });
    },
    viewRegister(){
      
      const token = this.$store.state.token;
      this.$http('/api/app/commonUser/registBroker','post',this.$qs.stringify({...this.params}),token).then(res=>{
      
        if(res.data.code==100){
          // console.log(res.data)
          this.$router.back()
        }else{
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      })
       
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../assets/css/style.styl';

.register2-box {
  padding: 15px 15px 40px;
  .login-logo{
    margin-bottom 50px;  
  }
}
</style>
