<template>
    <div class="page">
        <Header title="消息"/>
        <div class="message-box">
            <div class="message">
                <div class="message-time">2018-08-27     17：32</div>
                <div class="message-info">
                    <div class="message-type">充值成功</div>
                    <div class="message-text">是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事</div>
                </div>
            </div>
            <div class="message">
                <div class="message-time">2018-08-27     17：32</div>
                <div class="message-info">
                    <div class="message-type">充值成功</div>
                    <div class="message-text">是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事</div>
                </div>
            </div>
            <div class="message">
                <div class="message-time">2018-08-27     17：32</div>
                <div class="message-info">
                    <div class="message-type">充值成功</div>
                    <div class="message-text">是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事</div>
                </div>
            </div>
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
}
</script>
<style lang="stylus" >

.message-box{
    background-color #F4F4F4
    min-height calc(100vh - 45px)
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
