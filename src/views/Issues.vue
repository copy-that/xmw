<template>
    <div class="page">
        <Header title="问题反馈"/>
        <div class="issues-box">
            <textarea class="textarea" name="" id="" rows="6" maxlength="140" placeholder="请输入您宝贵的意见"></textarea>
            <cube-button class="primary-btn" :primary="true">提交意见</cube-button>
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    name: "Issues",
    components: {
        Header,
    }
}
</script>
<style lang="stylus" scoped>
@import '../assets/css/style.styl';
.issues-box
    border-top 1px solid #f1f1f1
    padding 0 15px
</style>
