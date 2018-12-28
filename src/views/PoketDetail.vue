<template>
    <div class="page">
        <Header title="收支明细" />
        <div class="poket-debox">
            <div class="order">
                <div class="order-top">
                    <div class="order-type">夏禾路夏禾裕景（新房）</div>
                    <div class="order-bill">-20元</div>
                </div>
                <div class="order-bottom">
                    <div class="order-time">8月12日  17:25</div>
                    <div class="order-state">提现中</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    name:'PoketDetail',
    components:{
        Header
    },
    data(){
        return{

        }
    }
}
</script>
<style lang="stylus" scoped>
.poket-debox
    border-top 1px solid #f2f2f2
    .order
        height 68px
        padding 15px
        box-sizing border-box
        border-bottom 0.5px solid #f2f2f2
        .order-top
            display flex
            justify-content space-between
            margin-bottom 10px
            .order-type
                font-size 13px
                font-weight bold 
            .order-bill
                color #FF6B00
                font-size 15px
        .order-bottom
            display flex
            justify-content space-between
            .order-time
                color #666666
                font-size 12px
            .order-state
                font-size 12px
                color #FF6B00
</style>
