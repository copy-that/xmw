<template>
  <div class="page paddbo">
    <Header :back-icon="false" title="历史记录"/>
    <div class="history">
      <div class="prod" v-for="prod in historyList&&historyList" @click="viewProdDetail(prod.id)" :key="prod.id">
        <div class="prod-icon">
          <img class="prod-img" v-lazy="prod.picUrls&&prod.picUrls.split(',')[0]" alt>
          <span class="prod-img-pages">{{prod.picUrls&&prod.picUrls.split(',').length}}张</span>
        </div>
        <div class="prod-info">
          <div class="prod-name">{{prod.title.length>12?prod.title.slice(0,10)+'...':prod.title}}
            <img
              class="prod-enjoy"
              v-if="historyList[0].isenjoy"
              @click.prevent.stop="enjoyProd('0')"
              src="@/assets/images/icon-2.png"
              alt
              srcset
            >
            <img
              class="prod-enjoy"
              v-else
              @click.prevent.stop="enjoyProd('0')"
              src="@/assets/images/icon-2-b.png"
              alt
              srcset
            >
          </div>
          <div class="prod-value">
            <span v-if="prod.classify">户型:{{prod.classify}}</span>
            <span v-if="prod.area">面积:{{prod.area}}㎡</span>
            <span v-if="prod.grade">档次:{{prod.grade}}</span>
            <span v-if="prod.mating">配套:{{prod.mating}}</span>
          </div>
          <div class="prod-time">发布时间:{{prod.createTime&&prod.createTime.substring(0,10)}}</div>
          <div class="prod-tags">
            <span v-if="prod.identityMsg">{{prod.identityMsg}}</span>
            <span v-if="prod.dicorationNumMsg">{{prod.dicorationNumMsg}}</span>
            <span v-if="prod.statusMsg">{{prod.statusMsg}}</span>
          </div>
          <div class="prod-price" v-if="prod.price">¥{{prod.price>=10000?(prod.price/10000)+'万':prod.price+'元'}}</div>
        </div>
      </div>
    </div>
    <Tabbar active-tab-item="History"/>
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
  },
  data() {
    return {
        params:{
            page:1,
            pageSize:10
        },
      enjoyType: 0,
      historyList: null
    };
  },
  created(){
      this.getHistoryList()
  },
  methods: {
    getHistoryList() {
      this.$http(
        "/api/app/history/getHistoryList",
        "post",
        this.$qs.stringify(this.params),
        this.$store.state.token
      ).then(res => {
          if(res.data.code==100){
              this.historyList = res.data.data
            console.log(res.data)
          }else{
            this.$createToast({ txt: res.data.msg, type: "txt" }).show();
          }
      });
    },
    viewProdDetail(id) {
      this.$router.push({ name: "ProductDetail",params:{id:id} });
    },
    enjoyProd(index) {
      this.historyList[index].isenjoy = !this.historyList[index].isenjoy;
    }
  }
};
</script>
<style lang="stylus">
@import '~@/assets/css/style.styl';

.history {
  padding: 10px 15px;
}
</style>
