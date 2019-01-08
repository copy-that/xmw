<template>
    <div class="page">
        <Header title="修改密码"/>
        <div class="edite-pass-box">
            <input class="form-input" type="text" placeholder="请输入旧密码">
            <input class="form-input" type="text" placeholder="请设置新密码（6-20位数字或字母）">
            <input class="form-input" type="text" placeholder="请再次输入密码">
            <cube-button class="form-primary-btn" @click="editePass" :primary="true">确定</cube-button>
        </div>
        
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    name:'EidtePass',
    components:{
        Header
    },
    methods:{
        editePass(){
            this.$router.back()
        }
    }
}
</script>
<style lang="stylus" >
@import '../assets/css/style.styl'
.edite-pass-box
    padding: 0 45px
    .form-input
        padding 0 10px
        box-sizing border-box
        outline none
        width 100%
        height 35px
        font-size 13px
        color #666666
        border 1px solid #ff6b00
        margin-top 20px

</style>
