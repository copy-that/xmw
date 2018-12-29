<template>
    <div class="page">
        <div class="navtitle">
            <img class="back-icon" @click="goback" src="@/assets/images/icon-16.png" alt="" srcset="">
            <span>如何发布卖房信息？</span>
        </div>
        <div class="quest-detail">
            <div>是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。
                白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'QuestionDetail',
    methods:{
        goback(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="stylus" scoped>
.navtitle
    position fixed
    width 100%
    background-color #ffffff
    top 0
    display flex
    align-items center
    font-size 15px
    height 45px
.back-icon
    padding 10px 10px 10px 15px
    height 13px
    width 13px
.quest-detail
    padding 0 15px
    font-size 13px
    color #666666
    line-height 20px
    text-align left 
</style>
