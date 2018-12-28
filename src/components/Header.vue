<template>
    <div class="header">
        <img class="back-icon" v-if="backIcon" @click="goback" src="@/assets/images/back-icon.png" alt="">
        <div class="header-name">{{title}}</div>
    </div>
</template>
<script>
export default {
    props:{
        backIcon:{
            type:Boolean,
            default:true
        },
        title:{
            type:String,
        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="stylus" scoped>
.header
    position fixed
    top 0
    width 100%
    background-color #ffffff
    display flex
    z-index 10
    align-items center
    height 45px
    line-height 45px
    border-bottom 1px solid #f2f2f2
    .header-name
        text-align center
        font-size 17px
        color #111111
        flex 1
    .back-icon
        position absolute
        left 9px
        height 13px
        width 13px
</style>
