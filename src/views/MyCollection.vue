<template>
  <div class="page">
    <Header title="我的收藏"/>
    <div class="collect-box">
      <cube-scroll
        ref="scroll"
        :data="myCollectionList"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
      >
        <div class="prod" v-for="collect in myCollectionList" :key="collect.id">
          <div class="prod-icon">
            <img class="prod-img" :src="collect.picUrls.split(',')[0]" alt>
            <span class="prod-img-pages">{{collect.picUrls.split(',').length}}张</span>
          </div>
          <div class="prod-info">
            <div class="prod-name">
              {{collect.title}}
              <img class="prod-enjoy" src="@/assets/images/icon-2.png" alt srcset>
            </div>
            <div class="prod-value">
              <span>户型:{{collect.classify}}</span>
              <span>面积{{collect.area}}㎡</span>
            </div>
            <div class="prod-time">发布时间:{{collect.createTime&&collect.createTime.substring(0,10)}}</div>
            <div class="prod-tags">
              <span>{{collect.identityMsg}}</span>
              <span>{{collect.dicorationNumMsg}}</span>
              <span>{{collect.statusMsg}}</span>
            </div>
            <div class="prod-price" v-if="collect.price">¥{{collect.price>=10000?(collect.price/10000)+'万':collect.price+'元'}}</div>
          </div>
        </div>
        
      </cube-scroll>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";

export default {
  name: "MyCollection",
  components: {
    Header
  },
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 44,
          stopTime: 1000,
          txt: '更新成功'
        },
        pullUpLoad: {
          threshold:60,
          txt	:{
            more:'加载更多',
            noMore:'没有更多'
          }
          
        },
     
      },
       params: {
        page: 1,
        pageSize: 15
      },
      myCollectionList: []
      
    };
  },
  mounted(){
    this.getMyCollection()
  },
  methods: {
    getMyCollection() {
      this.$http(
        "/api/app/commonUser/getUserCollectionList",
        "post",
        this.$qs.stringify(this.params),
        this.$store.state.token
      ).then(res => {
        console.log(res.data);
        if (res.data.code == 100) {
          this.myCollectionList = this.myCollectionList.concat(
            ...res.data.data
          );
        } else {
          this.$createDialog({
            type: "alert",
            title: res.data.msg,
            icon: "cubeic-warn"
          }).show();
        }
      });
    },
    onPullingDown() {
      this.params.page = 1;
      this.myCollectionList = [];
      this.getMyCollection();

    },
    onPullingUp() {
      this.params.page = this.params.page + 1;
       this.$http(
        "/api/app/commonUser/getUserCollectionList",
        "post",
        this.$qs.stringify(this.params),
        this.$store.state.token
      ).then(res => {

        if (res.data.code == 100) {
          if(res.data.data.length>0){
             this.myCollectionList = this.myCollectionList.concat(
              ...res.data.data
            );
          }else{
            this.$refs.scroll.forceUpdate()
          }
         
        } else {
          this.$createDialog({
            type: "alert",
            title: res.data.msg,
            icon: "cubeic-warn"
          }).show();
        }
      });
      
    }
  }
};
</script>
<style lang="stylus">
@import '~@/assets/css/style.styl';

.collect-box {
  height calc(100vh - 45px)
  padding: 10px 15px;
  box-sizing border-box;
  .cube-pulldown-loaded,.before-trigger{
    font-size: 13px; 
  }
}
</style>