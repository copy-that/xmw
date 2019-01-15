<template>
    <div class="page">
        <Header title="关于我们"></Header>
        <div class="aboutus">
            <img class="logo-icon" :src="logo" alt="" srcset="">
            <div class="title">平台介绍</div>
            <div class="message-box">
                {{article}}
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
    data(){
        return{
            logo:'',
            article:''
        }
    },
    mounted(){
        const token = this.$store.state.token;
        this.$http('/api/otherInfo/getAboutUs','get',{},token).then(res=>{
                if(res.data.code==100){
                    const {content,appImgUrl} = res.data.data
                    this.logo = appImgUrl
                    this.article = content
                }else{
                    this.$createToast({ txt: res.data.data.msg, type: "txt" }).show();
                }
               
            })
    }
}
</script>
<style lang="stylus" scoped>
.page{
    text-align center
}
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
