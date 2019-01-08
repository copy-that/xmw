<template>
  <div class="page">
    <Header title="我的发布"/>
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
            <!-- <span>在售</span> -->
            <span style="background-color:unset">...</span>
          </div>
          <div class="prod-price">¥3000万</div>
          <div class="btn-com" @click="toBuyTags">购买标签</div>
        </div>
      </div>
    </div>
    <div class="tags-popup" v-show="showPop">
        <div class="pop-head">
          <img class="pop-back" @click="closePop" src="@/assets/images/icon-16.png" alt="">
          <div class="pop-title">购买标签</div>
        </div>
        <div class="block">
          <div class="block-label" style="margin:10px">来为您的房屋购买一个合适的标签吧!</div>
          <div class="tags">
            <div class="tag-item" v-for="(tag,index) in tags" :key="tag.id">
              <img class="tag-item-icon" :src="tag.icon" @click="showTagsDesc(index)"  alt srcset>
              <img class="tag-item-check" v-if="tag.ischeck" @click="cancelCheck(index)" src="@/assets/images/icon-6.png" alt srcset>
              <img class="tag-item-check" v-else  @click="confrimCheck(index)" src="@/assets/images/icon-7.png" alt srcset>
            </div>
          </div>
          <div class="tags-list">
            <span>您已选择标签：</span>
            <span>在售、已认证、1折</span>
          </div>
        </div>
        <div class="total-fix-bot">
            <div class="fix-bot-lable">
              <span>共计：</span>
              <span class="fix-bot-value">{{total}}元</span>
            </div>
            <div class="fix-bot-btn" @click="rawOrder">确认购买</div>
        </div>
    </div>
    <div class="remind-box" v-show="showRemind">
        <div class="remind-inner">
            <img class="remind-logo" src="@/assets/images/LOGO.png" alt="">
            <div class="remind-desc">{{remindDesc}}</div>
            <img class="remind-close" @click="closeRemind" src="@/assets/images/icon-18.png" alt="">
        </div>
    </div>
    <div class="paypop" v-if="showPopPay">
      <div class="paypop-inner">
        <div class="paypop-cancel" @click="showPopPay=false">取消</div>
        <div class="paypop-money">￥<span>210</span></div>
        <div class="paypop-title">请选择付款方式</div>
        <div class="paypop-cell" @click="checkType(1)">
          <img class="paypop-cell-check" v-if="type==1" src="@/assets/images/icon-6.png" alt="">
          <img class="paypop-cell-check" v-else src="@/assets/images/icon-7.png" alt="">
          <img class="paypop-cell-icon" src="@/assets/images/icon-9.png" alt="">
          <div class="paypop-cell-name">支付宝</div>
        </div>
        <div class="paypop-cell" @click="checkType(2)">
          <img class="paypop-cell-check" v-if="type==2" src="@/assets/images/icon-6.png" alt="">
          <img class="paypop-cell-check" v-else src="@/assets/images/icon-7.png" alt="">
          <img class="paypop-cell-icon" src="@/assets/images/icon-10.png" alt="">
          <div class="paypop-cell-name">支付宝</div>
        </div>
        <div class="paypop-cell" @click="checkType(3)">
          <img class="paypop-cell-check" v-if="type==3" src="@/assets/images/icon-6.png" alt="">
          <img class="paypop-cell-check" v-else src="@/assets/images/icon-7.png" alt="">
          <img class="paypop-cell-icon" src="@/assets/images/icon-13.png" alt="">
          <div class="paypop-cell-name">支付宝</div>
        </div>
        <cube-button class="form-primary-btn" :primary="true" @click="ToPayFor">确认</cube-button>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import { tags } from "@/tags.js";
export default {
  name: "MyPost",
  components: {
    Header
  },
  data(){
    return{
      type:0,
      showPopPay:false,
      showPop:false,
      tags:tags,
      total:0,
      remindDesc:'',
      showRemind:false,
    }
  },
  methods:{
    ToPayFor(){
      this.showPopPay = false
    },
    checkType(type){
      this.type = type
    },
    rawOrder(){
      this.showPopPay = true
    },
    toBuyTags(){
      this.showPop = true
    },
    closePop(){
      this.showPop = false
    },
    cancelCheck(index){
        const ischeck = this.tags[index].ischeck;
        if(ischeck){
            const price = this.tags[index].price;
            this.$set(this.tags[index],'ischeck',false)
           this.total = this.total - price;
        }
    },
    confrimCheck(index){
        const ischeck = this.tags[index].ischeck;
        if(!ischeck){
            const price = this.tags[index].price;
            this.$set(this.tags[index],'ischeck',true)
            this.total = this.total + price;
        }
        
    },
    showTagsDesc(index){
        this.remindDesc = this.tags[index].desc
        this.showRemind = true
    },
    closeRemind(){
        this.showRemind = false
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

.tags-popup
  position fixed
  top 0
  left 0
  z-index 10
  height calc(100vh - 50px)
  width 100vw
  overflow scroll
  background-color #ffffff

.pop-back{
  position: absolute;
  top: 0.186667rem;
  left: 0;
  padding: 0.24rem;
  height: 0.346667rem;
  width: 0.346667rem;
}
.pop-head
    position relative
    top 0
    width 100%
    background-color #ffffff
    display flex
    align-items center
    height 45px
    line-height 45px
    border-bottom 1px solid #f2f2f2
.pop-title{
  text-align center
  font-size 17px
  color #111111
  flex 1
}
.tags-list
  padding 10px 15px
  line-height 25px
  font-size 13px
.total-fix-bot
  position fixed
  bottom 0
  width 100%
  height 50px
  line-height 50px
  display flex
  align-items center
  overflow hidden
  font-size 13px
.fix-bot-lable
  width calc(100% - 130px)
  box-sizing border-box
  background-color #F7F7F7
  padding 0 15px
.fix-bot-value
  color #ff6b00
.fix-bot-btn
  text-align center
  position absolute
  right 0
  width 130px
  background-color #ff6b00
  color #ffffff

</style>