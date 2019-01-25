<template>
  <div class="page">
    <Header title="我的发布"/>
    <div class="todo-box">
      <div class="prod" v-for="prod in myPostList&&myPostList" :key="prod.id">
        <div class="prod-icon">
          <img class="prod-img" v-lazy="prod.picUrls&&prod.picUrls.split(',')[0]" alt>
          <span class="prod-img-pages">{{prod.picUrls&&prod.picUrls.split(',').length}}张</span>
        </div>
        <div class="prod-info">
          <div class="prod-name">
            {{prod.title}}
            <!-- <img class="prod-enjoy" src="@/assets/images/icon-2-b.png" alt srcset> -->
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
          <div class="prod-price" v-if="prod.price">¥{{prod.price.length>5?prod.price.toFixed(4)+'万':prod.price+'元'}}</div>
          <div class="btn-com" style="top:0.266667rem" @click="toBuyTags(prod.id)">购买标签</div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  name: "MyPost",
  components: {
    Header
  },
  data(){
    return{
      params:{
          page:1,
          pageSize:10
      },
      myPostList:null
    }
  },
  mounted(){
    this.getMyPostList()
  },
  methods:{
    getMyPostList(){
      this.$http(
        "/api/app/history/getMyList",
        "post",
        this.$qs.stringify(this.params),
        this.$store.state.token
      ).then(res => {
          if(res.data.code==100){
              this.myPostList = res.data.data
            console.log(res.data)
          }else{
            this.$createToast({ txt: res.data.msg, type: "txt" }).show();
          }
      });
    },
    toBuyTags(tid){
      
      this.$router.push({name:'BuyTags',params:{id:tid}})
    },
    
  }
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/style.styl';
.page
  text-align left 
.todo-box {
  padding: 10px 15px;
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