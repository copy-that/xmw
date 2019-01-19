<template>
    <div class="page">
        <Header title="消息"/>
        <div class="message-box">
            <cube-scroll
                ref="scroll"
                :data="messageList"
                :options="options"
                @pulling-down="onPullingDown"
                @pulling-up="onPullingUp">
        
                <div class="message" v-for="(item, index) in messageList" :key="index">
                    <div class="message-time">{{item&&item.createTime}}</div>
                    <div class="message-info">
                        <div class="message-type">{{item&&item.msgTitle}}</div>
                        <div class="message-text">{{item&&item.msgContent}}</div>
                    </div>
                </div>
            </cube-scroll>
            
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    name: "MyMessage",
    components: {
        Header
    },
    data(){
        return{
            messageList:[],
            params:{
                page:1,
                pageSize:15
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
        }
    },
    mounted(){
        this.getMessage()
    },
    methods:{
        getMessage(){
            this.$http('/api/app/commonUser/getMessageList','post',this.$qs.stringify(this.params),this.$store.state.token).then(res=>{
                if(res.data.code==100){
                    
                    // this.messageList=res.data.
                    if(res.data.data.length>0){
                        this.messageList = this.messageList.concat(...res.data.data)
                    }
                    else{
                        this.$refs.scroll.forceUpdate()
                    }
                }else{
                    this.$createDialog({
                        type: 'alert',
                        title: res.data.msg,
                        icon: 'cubeic-warn'
                    }).show()
                }
                
            })
        },
        onPullingDown() {
            this.params.page = 1;
            this.messageList = []
            this.getMessage()
        },
        onPullingUp() {
            this.params.page = this.params.page + 1;
            this.getMessage()
           
        },
    }
}
</script>
<style lang="stylus" >

.message-box{

    background-color #F4F4F4
    height calc(100vh - 45px)
    .cube-pulldown-loaded,.before-trigger{
        font-size: 13px; 
    }
}

.message
    padding 10px 15px
    .message-time
        font-size 12px
        color #717171
        margin-bottom 10px 
    .message-info
        text-align left
        border-radius 4px
        background-color #fff;
        border 1px solid #D7D7D7
        padding 10px
        .message-type
            margin-bottom 10px
            font-size 14px
            color #111111
        .message-text
            color #666666
            font-size 12px
            line-height 20px
</style>
