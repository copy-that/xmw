<template>
    <div class="page">
        <Header title="资讯详情"></Header>
        <div class="name">鑫苑国际新城项目现有房源在售</div>
        <div class="time">2018-11-20</div>
        <div class="richbox">
            <div>是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。</div>
            <img src="@/assets/images/ban-1.png" alt="" srcset="">
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    name: "NewsDetail",
    components:{
        Header
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
.richbox{
    padding 20px 15px
    color #666666
    font-size 13px
    line-height 20px
}
.richbox img{
    margin 10px 0
    width 100%
}
</style>
