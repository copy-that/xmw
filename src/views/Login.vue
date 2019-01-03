<template>
    <div class="page">
        <Header :back-icon="false" title="登录"></Header>
        
        <div class="login-box">
            <img class="login-logo" src="@/assets/images/LOGO.png" alt="" srcset="">
            <cube-input class="logon-input" v-model="phone" :maxlength="11" placeholder="请输入手机号"></cube-input>
            <cube-input  class="logon-input" v-model="pass" :maxlength="16" :eye="true" placeholder="请输入密码"></cube-input>
            <cube-button  class="form-primary-btn" style="margin-top:25px" :primary="true" @click="goLogin">登录</cube-button>
            <div class="btn-box">
                <router-link class="line-item" to="/forgot">忘记密码</router-link>
                <router-link class="line-item" to="/register">注册</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    name:'Login',
    components:{
        Header
    },
    data(){
        return{
            type:'login',
            phone:'',
            pass:'',
            list:[
                {
                    name:'登录',
                    back:false
                },
                {
                    name:'注册',
                    back:true
                },
                {
                    name:'注册',
                    back:true
                }
            ]
        }
    },
    methods:{
        goLogin(){
            this.$store.commit('setUserToken','token:123456');
            this.$router.go(-1)
        }
    }
    
}
</script>
<style lang="stylus">
@import '../assets/css/style.styl';  
.login-logo
    display block
    margin 68px auto 0
    height 47px
    width 167px
.login-box
    padding 0 50px
    text-align center
.logon-input
    margin-top 25px
.cube-input.logon-input::after
    border-color #FF6B00
    border-radius 4px
.btn-box

    display flex
    justify-content space-between
    .line-item
        font-size 13px
        padding 13px 0

</style>
