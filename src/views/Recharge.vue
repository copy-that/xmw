<template>
    <div class="page">
        <Header  title="充值"/>
        <div class="charge-box">
            <div class="charge-input">
                <label class="charge-name" for="">充值金额：<span class="charge-num-before">￥</span></label>
                <input class="charge-num" v-model="charge" @input="handleInput" type="text" placeholder="请输入充值金额">
            </div>
            <span class="charge-valide">{{ iligal?'输入金额不合法':''}}</span>
            <div class="type-name" >支付方式：</div>
            <div class="radio-type">
                <div class="radio-item" :class="this.type==1?'is_check':''" @click="handleSelectPayType(1)">
                    <span class="form_item_radio"></span>
                    <img class="radio-type-img" src="@/assets/images/icon-9.png" alt="" srcset="">
                    <span>支付宝支付</span>
                </div>
                <div class="radio-item"  :class="this.type==2?'is_check':''" @click="handleSelectPayType(2)">
                    <span class="form_item_radio"></span>
                    <img class="radio-type-img" src="@/assets/images/icon-10.png" alt="" srcset="">
                    <span>微信支付</span>
                </div>
            </div>
            <cube-button class="primary-btn" :primary="true" @click="viewReSucess">确认充值</cube-button>
        </div>
        <div class="" v-html="aliPayForm" v-if="showAliPayForm"></div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    name:'Recharge',
    components:{
        Header
    },
    data(){
        return{
            charge:0,
            type:1,
            iligal:false,
            showAliPayForm:true,
            aliPayForm:''
        }
    },
    methods:{
        handleInput(e){
            if(isNaN(e.target.value)){
                this.iligal = true
            }else{
                 this.iligal = false
            }
         
        },
        handleSelectPayType(type){
            this.type = type;
        },
        viewReSucess(){
            if(this.charge<=0){
                return;
            }
            if(!isNaN(this.charge)){
                this.$http('/api/payapi/appRecharge','post',this.$qs.stringify({type:this.type,money:this.charge}),this.$store.state.token).then(res=>{
                   
                    if(res.data.code==100){
                        console.log(res.data)
                        if(this.type==1){
                            this.aliPayForm= res.data.data.date;
                            this.showAliPayForm = true
                            this.$nextTick(()=>{
                                document.forms['alipaysubmit'].submit();
                            })
                        }else{
                            const ff = res.date
                            console.log(ff)
                        }
                        
                    }else{
                        this.$createToast({ txt: res.data.msg, type: "txt" }).show();
                    }
                })
            }
             
            
            // this.$router.push({name:'ReSuccess'})
        }
    }
}
</script>
<style lang="stylus" >
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
.charge-valide
    font-size 13px
    color red
</style>
