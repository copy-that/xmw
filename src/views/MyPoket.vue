<template>
    <div class="page">
        <Header title="我的钱包"/>
        <div class="poket">
            <div class="card-poket">
                <div class="card-label">
                    <img src="@/assets/images/icon-8.png" alt="" srcset="">
                    <span>我的金币（个）</span>
                </div>
                <div class="card-value">
                    <div class="total">{{moneyTotal?moneyTotal:0}}</div>
                    <div class="detail-btn" @click="viewPoketDetail">收支明细&emsp;›</div>
                </div>
            </div>
            <div class="cell" @click="viewRecharge">
                <div class="cell-label">去充值</div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell" @click="viewWithdraw">
                <div class="cell-label">去提现</div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    name:'MyPoket',
    components: {
        Header
    },
    data(){
        return{
            moneyTotal:0
        }
    },
    mounted(){
        this.$http('/api/app/commonUser/getMoney','post',{},this.$store.state.token).then(res=>{
            console.log(res)
            if(res.data.code==100){
                this.moneyTotal = res.data.data
            }else{
                this.$createToast({ txt: res.data.msg, type: "txt" }).show();
            }
            
        })
    },
    methods:{
        viewRecharge(){
            this.$router.push({name:'Recharge'})
        },
        viewWithdraw(){
            this.$router.push({name:'Withdraw'})
        },
        viewPoketDetail(){
            this.$router.push({name:'PoketDetail'})
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../assets/css/style.styl';
.poket
    padding 0 15px
.card-poket
    text-align left 
    display flex
    flex-direction column
    justify-content center
    position relative
    box-sizing border-box
    height 150px
    border-radius 8px
    margin 10px 0
    background-color #FF6B00
    color #ffffff
    padding 15px
    .card-label
        margin-bottom 15px
        font-size 12px
        display flex
        align-items center
        img 
            width 13px
            height 15px
            margin-right 10px
    .card-value
        display flex
        align-items center
        justify-content space-between
        .total
            flex 1
            font-size 24px
        .detail-btn
            font-size 12px
</style>