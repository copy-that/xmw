<template>
    <div class="page">
        <Header title="关于我们"></Header>
        <div class="aboutus">
            <img class="logo-icon" src="@/assets/images/LOGO.png" alt="" srcset="">
            <div class="title">平台介绍</div>
            <div class="message-box">
                是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。
                滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    components: {
        Header
    },
}
</script>
<style lang="stylus" scoped>
.aboutus{
    padding 0 15px;
}
.logo-icon{
    margin-top 70px
    width 157px
}
.title{
    margin-top 50px
    font-size 15px
    height 25px
    border-bottom 1px solid #f1f1f1
}
.message-box{
    margin-top 20px
    font-size 13px
    line-height 20px
    color #666666
    text-align left 
}
</style>
