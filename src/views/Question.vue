<template>
    <div class="page">
        <Header title="常见问题"></Header>
        <div class="question-box">
            <div class="cell" @click="viewQuestionDetail">
                <div class="cell-label">如何发布卖房信息？</div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell">
                <div class="cell-label">如何发布卖房信息？</div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell">
                <div class="cell-label">如何发布卖房信息？</div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
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
    methods:{
        viewQuestionDetail(){
            this.$router.push({name:'QuestionDetail'})
        }
    }
}
</script>
<style lang="stylus" >
@import '../assets/css/style.styl';
.question-box
    padding 0 15px
</style>
