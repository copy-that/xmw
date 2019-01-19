<template>
  <div class="page">
    <Header title="我的预约"/>
    <div class="todo-box">
      <cube-scroll
        ref="scroll"
        :data="prodList"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
      >
        <div class="prod" v-for="prod in prodList" :key="prod.id">
          <div class="prod-icon">
            <img class="prod-img" :src="prod.picUrls.split(',')[0]" alt>
            <span class="prod-img-pages">{{prod.picUrls.split(',').length}}张</span>
          </div>
          <div class="prod-info">
            <div class="prod-name">
              {{prod.title}}
              <img class="prod-enjoy" src="@/assets/images/icon-2-b.png" alt srcset>
            </div>
            <div class="prod-value">
              <span>户型:{{prod.classify}}</span>
              <span>面积{{prod.area}}㎡</span>
            </div>
            <div class="prod-time">发布时间:{{prod.createTime&&prod.createTime.substring(0,10)}}</div>
            <div class="prod-tags">
              <span>{{prod.identityMsg}}</span>
              <span>{{prod.dicorationNumMsg}}</span>
              <span>{{prod.statusMsg}}</span>
            </div>
            <div class="prod-price" v-if="prod.price">¥{{prod.price>=10000?(prod.price/10000)+'万':prod.price+'元'}}</div>
            <div class="btn-com">写评价</div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";

export default {
  name: "MyTodo",
  components: {
    Header
  },
  data(){
    return{
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
      prodList: []
    }
  },
  mounted(){
    this.getMyTodo()
  },
  methods:{
    getMyTodo() {
      this.$http(
        "/api/app/user/getMySubscribeVos",
        "post",
        this.$qs.stringify(this.params),
        this.$store.state.token
      ).then(res => {
        console.log(res.data);
        if (res.data.code == 100) {
           if(res.data.data.length>0){
              this.prodList = this.prodList.concat(
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
    },
    onPullingDown() {
      this.params.page = 1;
      this.prodList = [];
      this.getMyTodo();

    },
    onPullingUp() {
      this.params.page = this.params.page + 1;
       this.$http(
        "/api/app/user/getMySubscribeVos",
        "post",
        this.$qs.stringify(this.params),
        this.$store.state.token
      ).then(res => {

        if (res.data.code == 100) {
          if(res.data.data.length>0){
             this.prodList = this.prodList.concat(
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

.todo-box {
  height calc(100vh - 45px)
  padding: 10px 15px;
  box-sizing border-box;
  .cube-pulldown-loaded,.before-trigger{
    font-size: 13px; 
  }
}

.btn-com {
  position: absolute;
  height 20px;
  box-sizing border-box
  line-height 20px;
  border 1px solid #ff6b00
  border-radius 2px
  color #ff6b00
  right: 0px;
  padding: 0px 10px;
  top: 80px
  font-size 13px
}
</style>