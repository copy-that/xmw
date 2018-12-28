<template>
    <div class="page">
        <Header  title="充值"/>
        <div class="charge-box">
            <div class="charge-input">
                <label class="charge-name" for="">充值金额：<span class="charge-num-before">￥</span></label>
                <input class="charge-num" type="text" placeholder="请输入充值金额">
            </div>
            <div class="type-name" >支付方式：</div>
            <div class="radio-type">
                <div class="radio-item is_check">
                    <span class="form_item_radio"></span>
                    <img class="radio-type-img" src="@/assets/images/icon-9.png" alt="" srcset="">
                    <span>支付宝支付</span>
                </div>
                <div class="radio-item">
                    <span class="form_item_radio"></span>
                    <img class="radio-type-img" src="@/assets/images/icon-10.png" alt="" srcset="">
                    <span>微信支付</span>
                </div>
            </div>
            <cube-button class="primary-btn" :primary="true" @click="viewReSucess">确认充值</cube-button>
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    name:'Recharge',
    components:{
        Header
    },
    methods:{
        viewReSucess(){
            this.$router.push({name:'ReSuccess'})
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../assets/css/style.styl'
.charge-box
    border-top 1px solid #f2f2f2
    padding 10px 15px
.radio-item
    display flex
    align-items center
    height 50px
.charge-input
    display flex
    border-bottom 1px solid #f2f2f2
    padding 25px 0
.charge-name
    text-align left 
    line-height 20px
    height 20px
    font-size 15px
    width 120px
.type-name
    text-align left 
    line-height 20px
    height 20px
    font-size 15px
    margin 30px 0 20px
.charge-num
    flex 1
    outline none 
    border none
    line-height 20px
    font-size 20px
    color #FF6B00
.charge-num-before
    color #FF6B00
    font-size 20px
    line-height 23px
    height 23px
    display inline-block
input.charge-num::-webkit-input-placeholder
    color: #d8d8d8
.radio-type-img
    margin 0 15px 0 30px
    height 25px
    width 25px
</style>
