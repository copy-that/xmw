<template>
    <div class="page">
        <Header  title="提现"/>
        <div class="withdraw-box">
            <div class="withdraw-input">
                <label class="withdraw-name" for="">提现金额：<span class="withdraw-num-before">￥</span></label>
                <input class="withdraw-num" type="tel" placeholder="请输入提现金额">
            </div>
            <div class="withdraw-max">最多可提现7500元</div>
            <div class="type-name" >提现到：</div>
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
            <cube-button class="primary-btn" :primary="true" @click="viewWiSucess">确认提现</cube-button>
            <div class="withdraw-rule">7个自然日到账</div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    name:'Withdraw',
    components:{
        Header
    },
    methods:{
        viewWiSucess(){
            this.$router.push({name:'WiSuccess'})
        }
    }
}
</script>
<style lang="stylus" >
@import '../assets/css/style.styl'
.withdraw-box
    border-top 1px solid #f2f2f2
    padding 10px 15px
.radio-item
    display flex
    align-items center
    height 50px
.withdraw-input
    display flex
    border-bottom 1px solid #f2f2f2
    padding 25px 0
.withdraw-name
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
.withdraw-num
    flex 1
    outline none 
    border none
    line-height 20px
    font-size 20px
    color #FF6B00
.withdraw-num-before
    color #FF6B00
    font-size 20px
    line-height 23px
    height 23px
    display inline-block
input.withdraw-num::-webkit-input-placeholder
    color: #d8d8d8
.radio-type-img
    margin 0 15px 0 30px
    height 25px
    width 25px
.withdraw-rule
    color rgba(34,34,34,1)
    margin-top 15px
    font-size 12px 
.withdraw-max
    text-align left 
    color #666666
    padding 15px 0
    font-size 12px 
</style>
