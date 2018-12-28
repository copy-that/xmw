<template>
    <div class="page">
        <Header title="提现成功" />
        <Success title="提现成功"/>
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