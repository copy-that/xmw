<template>
    <div class="page">
        <Header title="问题反馈"/>
        <div class="issues-box">
            <textarea class="textarea" v-model="content" rows="6" maxlength="140" placeholder="请输入您宝贵的意见"></textarea>
            <cube-button class="primary-btn" :primary="true" @click="submitIssue">提交意见</cube-button>
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    name: "Issues",
    components: {
        Header,
    },
    data(){
        return{
            content:''
        }
    },
    methods:{
        submitIssue(){
            const content = this.content;
            if(!content){
                this.$createDialog({
                    type: 'alert',
                    title: '提交的反馈意见不能为空哦~'
                }).show()
                return
            }
            this.$http('/api/app/commonUser/saveOpinion','post',this.$qs.stringify({content:content}),this.$store.state.token).then(res=>{
          
                if(res.data.code==100){
                    this.$createDialog({
                    type: 'alert',
                    confirmBtn: {
                        text: '我知道了',
                        active: true
                    },
                    title: '你的反馈意见，已成功提交!',
                    onConfirm: () => {
                        this.$router.back()
                    },
                }).show()
                }else{
                     this.$createToast({ txt: res.data.msg, type: "txt" }).show();
                }
            })
        }
    }
}
</script>
<style lang="stylus" >
@import '../assets/css/style.styl';
.issues-box
    border-top 1px solid #f1f1f1
    padding 0 15px
</style>
