<template>
    <div class="page">
        <Header title="资讯详情"></Header>
        <div class="name">{{article&&article.msgName}}</div>
        <div class="time">{{article&&article.createTime}}</div>
        <div class="richbox" v-html="article&&article.msgContent">
    
            <!-- <img src="@/assets/images/ban-1.png" alt="" srcset=""> -->
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    name: "NewsDetail",
    components:{
        Header
    },
    data(){
        return{
            article:null
        }
    },
    mounted(){
        const id = this.$route.params.id;
        const token = this.$store.state.token;
        console.log(id)
        this.$http('/api/app/homeMsg/msgInfo','post',this.$qs.stringify({'msgId':id}),token).then(res=>{
            console.log(res)
            if(res.data.code==100){
                this.article = res.data.data
            }else{
                this.$createToast({ txt: res.data.msg, type: "txt" }).show();
            }
        })
    }
}
</script>
<style lang="stylus">
.page{
    text-align left 
}
.name{
    padding 0 15px
    margin-top 10px
    font-size 15px
    color #111111
}
.time{
    padding 0 15px
    margin-top 10px
    font-size 12px
    color #9F9F9F
}
.richbox {
      padding 20px 15px
}
.richbox p{
    background-color #fff !important
    color #666666 !important
    font-size 13px !important
    line-height 20px !important
}
.richbox img{
    margin 10px 0
    width 100%
}
</style>
