<template>
    <div class="page">
        <Header :back-icon="false" title="历史记录"/>
        <div class="history">
            <div class="prod">
                <div class="prod-icon">
                    <img class="prod-img" src="@/assets/images/item-icon.png" alt>
                    <span class="prod-img-pages">7张</span>
                </div>
                <div class="prod-info">
                <div class="prod-name">和悦华锦
                    <img class="prod-enjoy" src="@/assets/images/icon-2-b.png" alt="" srcset="">
                </div>
                <div class="prod-value">
                    <span>户型:3室1厅</span>
                    <span>面积120㎡</span>
                </div>
                <div class="prod-time">发布时间:2018-11-20</div>
                <div class="prod-tags">
                    <span>个人</span>
                    <span>简单装修</span>
                    <span>在售</span>
                </div>
                <div class="prod-price">¥3000万</div>
                </div>
            </div>
        </div>
        <Tabbar active-tab-item="history" />
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Tabbar from "@/components/Tabbar.vue";
export default {
    name: "history",
    components: {
        Tabbar,
        Header
    }
}
</script>
<style lang="stylus">
@import '~@/assets/css/style.styl'
.history{
    padding: 10px 15px;
}
</style>
