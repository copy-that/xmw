<template>
    <div class="page">
        <Header title="收支明细" />
        <div class="poket-debox">
            <cube-scroll
                ref="scroll"
                :data="poketDetailList"
                :options="options"
                @pulling-down="onPullingDown"
                @pulling-up="onPullingUp">
                <div class="order" v-for="(item, index) in poketDetailList" :key="index">
                    <div class="order-top">
                        <div class="order-type">{{item.detailName}}</div>
                        <div class="order-bill">{{item.detailPrice}}</div>
                    </div>
                    <div class="order-bottom">
                        <div class="order-time">{{item.createTime}}</div>
                        <div class="order-state">{{item.detailStatus}}</div>
                    </div>
                </div>
            </cube-scroll>

            
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
             params:{
                page:1,
                pageSize:5
            },
            options: {
                pullDownRefresh: {
                    threshold: 60,
                    // stop: 44,
                    stopTime: 1000,
                    txt: '更新成功'
                },
                pullUpLoad: {
                    threshold:60,
                    txt	:{
                        more:'加载更多',
                        noMore:'没有更多'
                    }
                },
            },
            poketDetailList:[]
        }   
    },
    mounted(){
        this.getPoketDetailList()
    },
    methods:{
        getPoketDetailList(){
            const query = this.$qs.stringify(this.params) 
            this.$http('/api/app/commonUser/getDetailsList','post',query,this.$store.state.token).then(res=>{
           
                if(res.data.code==100){
                     if(res.data.data.length>0){
                        this.poketDetailList = this.poketDetailList.concat(...res.data.data)
                    }
                    else{
                        this.$refs.scroll.forceUpdate()
                    }
                }else{
                    this.$createToast({ txt: res.data.msg, type: "txt" }).show();
                }
            })
        },
        onPullingDown() {
            this.params.page = 1;
            this.poketDetailList = []
            this.getPoketDetailList()
        },
        onPullingUp() {
            this.params.page = this.params.page + 1;
            this.getPoketDetailList()
           
        },
    }
}
</script>
<style lang="stylus" >
.poket-debox
    height calc(100vh - 45px)
    border-top 1px solid #f2f2f2
    .cube-pulldown-loaded
        font-size: 13px
    .before-trigger
        font-size: 13px
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
