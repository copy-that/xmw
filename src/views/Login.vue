<template>
    <div class="page">
        <Header title="title"></Header>
        
        <div class="login-box">
            <img class="login-logo" src="@/assets/images/LOGO.png" alt="" srcset="">
            <cube-input class="logon-input" v-model="phone" :maxlength="11" placeholder="请输入手机号"></cube-input>
            <cube-input  class="logon-input" v-model="pass" :maxlength="11" :eye="true" placeholder="请输入密码"></cube-input>
            <cube-button  class="form-primary-btn" :primary="true" type="password">Primary Button</cube-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'Login',
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
    
}
</script>
<style lang="stylus" scoped>
.login-logo
    margin-top 68px
    height 47px
    width 167px
.login-box
    padding 0 50px
.logon-input
    margin-top 25px
.cube-input.logon-input::after
    border-color #FF6B00
    border-radius 4px
</style>
