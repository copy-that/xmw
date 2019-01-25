<template>
  <div class="page">
    <div class="search-box">
      <div class="location" @click="$router.back()">
        <img src="@/assets/images/icon-16.png" alt class="location-icon-r">
        <div class="location-place-r">搜索</div>
      </div>
      <div class="cube-input search-min">
        <div class="cube-input-prepend">
          <img src="@/assets/images/icon-15.png" alt class="search-icon">
        </div>
        <input
          type="text"
          ref="search"
          v-model="params.searchValue"
          placeholder="请输入区域、商圈或者编号"
          @change="handleSearch"
          class="cube-input-field"
        >
        <!---->
      </div>
    </div>
    <div class="result-box">
    <cube-scroll
      ref="scroll"
      :data="historyList"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
    >
      <div
        class="prod"
        v-for="prod in historyList&&historyList"
        @click="viewProdDetail(prod.id)"
        :key="prod.id"
      >
        <div class="prod-icon">
          <img class="prod-img" v-lazy="prod.picUrl&&prod.picUrl.split(',')[0]" alt>
          <span class="prod-img-pages">{{prod.picUrl&&prod.picUrl.split(',').length}}张</span>
        </div>
        <div class="prod-info">
          <div class="prod-name">
            {{prod.title.length>12?prod.title.slice(0,10)+'...':prod.title}}
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
          <div class="prod-time">发布时间:{{prod.time&&prod.time}}</div>
          <div class="prod-tags">
            <span v-for="(tag,index) in prod.tagNames" :key="index">{{tag}}</span>
            <!-- <span v-if="prod.dicorationNumMsg">{{prod.dicorationNumMsg}}</span>
            <span v-if="prod.statusMsg">{{prod.statusMsg}}</span>-->
          </div>
          <div
            class="prod-price"
            v-if="prod.price"
          >¥{{prod.price>=10000?(prod.price/10000)+'万':prod.price+'元'}}</div>
        </div>
      </div>
    </cube-scroll>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchResult",
  data() {
    return {
      params: {
        page: 1,
        pageSize: 15,
        searchValue: ""
      },
      options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 44,
          stopTime: 1000,
          txt: "更新成功"
        },
        pullUpLoad: {
          threshold: 60,
          txt: {
            more: "加载更多",
            noMore: "没有更多"
          }
        }
      },
      historyList: []
    };
  },
  mounted() {
    this.$refs.search.focus();
  },
  methods: {
    handleSearch() {
      this.$http(
        "/api/app/rendInfoApi/search",
        "post",
        this.$qs.stringify(this.params),
        this.$store.state.token
      ).then(res => {
        console.log(res);
        if (res.data.code == 100) {
          this.historyList = res.data.data.data;
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      });
    },
    onPullingDown() {
      this.params.page = 1;
      this.historyList = [];
      this.handleSearch();
    },
    onPullingUp() {
      this.params.page = this.params.page + 1;
      this.handleSearch();
    },
    viewProdDetail(id) {
      this.$router.push({ name: "ProductDetail", params: { id: id } });
    },
    enjoyProd(index) {
      this.historyList[index].isenjoy = !this.historyList[index].isenjoy;
    }
  }
};
</script>
<style lang="stylus">
@import '~@/assets/css/style.styl';

.result-box {
  height: calc(100vh - 40px);
  margin: 0 15px;
  .cube-pulldown-loaded,.before-trigger{
    font-size: 13px; 
  }
}
</style>
