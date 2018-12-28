<template>
    <div class="success">
        <img class="success-icon" src="@/assets/images/icon-11.png" alt="" srcset="">
        <div class="success-title">{{dataTitle}}</div>
        <div class="success-desc">喜买屋衷心祝您早日找到心仪的的房子！</div>
        <cube-button :primary="true" class="primary-btn success-btn">确定</cube-button>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type: String,
            require:true
        }
    },
    data(){
        return{
            dataTitle:''
        }
    },
    mounted(){
        this.dataTitle = this.title
    }
}
</script>
<style lang="stylus" scoped>
.success
    display flex
    flex-direction column
    align-items center
    padding 0 15px
    border-top 1px solid #f2f2f2
    .success-icon
        margin-top 75px
        width 75px
        height 75px
    .success-title
        margin-top 27px
        font-size 18px 
        font-weight bold
    .success-desc
        font-size 15px
        margin-top 20px
        color #666666
    .success-btn
        margin-top 27px
        padding 12px 15px
</style>
