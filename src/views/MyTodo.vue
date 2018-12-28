<template>
  <div class="page">
    <Header title="我的预约"/>
    <div class="todo-box">
      <div class="prod">
        <div class="prod-icon">
          <img class="prod-img" src="@/assets/images/item-icon.png" alt>
          <span class="prod-img-pages">7张</span>
        </div>
        <div class="prod-info">
          <div class="prod-name">
            和悦华锦
            <img class="prod-enjoy" src="@/assets/images/icon-2-b.png" alt srcset>
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
          <cube-button class="btn-com" :inline="true" :outline="true" :primary="true">写评价</cube-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";

export default {
  name: "MyTodo",
  components: {
    Header
  }
};
</script>
<style lang="stylus">
@import '~@/assets/css/style.styl';

.todo-box {
  padding: 10px 15px;
}

.btn-com {
  position: absolute;
  right: 0px;
  padding: 6px 10px;
  top: 75px
  font-size 13px
}
</style>