<template>
    <div class="page">
       <Header  title="修改资料"/>
        <div class="cell">
            <label for=""></label>
            <input type="file">
            <img src="" alt="">
            <img src="" alt="" srcset="">
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    components:{
        Header
    }
}
</script>
<style lang="stylus" scoped>
.cell
    display flex
    align-items center

</style>
