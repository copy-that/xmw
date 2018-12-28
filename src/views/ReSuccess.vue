<template>
    <div class="page">
        <Header title="充值成功" />
        <Success title="充值成功"/>
    </div>
</template>
<script>
import Success from "@/components/Success.vue";
import Header from "@/components/Header.vue";
export default {
    name:'ReSuccess',
    components:{
        Header,
        Success
    }
}
</script>