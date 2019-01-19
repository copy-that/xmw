<template>
    <div class="page">
        <div class="navtitle">
            <img class="back-icon" @click="goback" src="@/assets/images/icon-16.png" alt="" srcset="">
            <span>{{questionDetail.question}}</span>
        </div>
        <div class="quest-detail">
            <div>{{questionDetail.answer}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'QuestionDetail',
    data(){
        return{
            questionDetail:{
                answer:'',
                question:''
            }
        }
    },
    mounted(){
        this.getQuestionDetail()
    },
    methods:{
        getQuestionDetail(){
            this.$http('/api/otherInfo/getQuestionById','get',{id:this.$route.params.id},this.$store.state.token).then(res=>{
          
                if(res.data.code==100){
                    this.questionDetail = res.data.data
                }else{
                    this.$createDialog({
                        type: 'alert',
                        title: res.data.msg,
                        icon: 'cubeic-warn'
                    }).show()
                }
            })
        },
        goback(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="stylus" >
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
