<template>
    <div class="page">
        <Header title="常见问题"></Header>
        <div class="question-box">
            <cube-scroll
                ref="scroll"
                :data="questionList"
                :options="options"
                @pulling-down="onPullingDown"
                @pulling-up="onPullingUp">
                <div v-for="ques in questionList" class="cell" :key="ques.id" @click="viewQuestionDetail(ques.id)">
                    <div class="cell-label">{{ques.question}}</div>
                    <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
                </div>
            </cube-scroll>
   
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    name: "Question",
    components: {
        Header
    },
    data(){
        return{
            params:{
                page:1,
                pageSize:15
            },
            options: {
                pullDownRefresh: {
                    threshold: 60,
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
            questionList:[]
        }
    },
    mounted(){
        this.getCommentQuestion()
    },
    methods:{
        getCommentQuestion(){
            this.$http('/api/otherInfo/getQuestionList','get',this.params,this.$store.state.token).then(res=>{
                console.log(res.data)
                if(res.data.code==100){
                    this.questionList = this.questionList.concat(...res.data.data)
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
            this.questionList = []
            this.getCommentQuestion()
        },
        onPullingUp() {
            this.params.page = this.params.page + 1;
            this.getCommentQuestion()
        },
        viewQuestionDetail(id){
            this.$router.push({name:'QuestionDetail',params:{id:id}})
        }
    }
}
</script>
<style lang="stylus" >
@import '../assets/css/style.styl';
.question-box
    padding 0 15px
    height calc(100vh - 45px)
.cube-pulldown-loaded{
    font-size: 13px; 
}
</style>
