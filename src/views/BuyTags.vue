<template>
    <div class="page">
        <Header title="购买标签" />
        <div class="tags-popup">
            <div class="block">
            <div class="block-label" style="margin:10px">来为您的房屋购买一个合适的标签吧!</div>
            <div class="tags">
                <div class="tag-item" v-for="(tag,index) in tagsList" :key="tag.id">
                    <img class="tag-item-icon" :src="tag.tagPicUrl" @click="showTagsDesc(index)" alt srcset>
                    <img
                        class="tag-item-check"
                        v-if="tagsShow[tag.flagValue]&&tagsShow[tag.flagValue].id==tag.id"
                        @click="cancelCheck(tag.flagValue)"
                        src="@/assets/images/icon-6.png"
                        alt
                        srcset
                    >
                    <img
                        class="tag-item-check"
                        v-else
                        @click="confrimCheck(index)"
                        src="@/assets/images/icon-7.png"
                        alt
                        srcset
                    >
                </div>
            </div>
            <div class="tags-list">
                <span>您已选择标签：</span>
                <span
                    v-if="tag&&tag.value"
                    v-for="(tag,index) in tagsShow"
                    :key="index"
                >{{tag.value}}、</span>
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
export default {
    name:'BuyTags',
    components: {
        Header
    },
    data(){
        return{
            tagsList:[],
            tagsShow:[],
            remindDesc:'',
            showRemind:false,
            type:0,
            showPopPay:false,
            showTagLabel:[],
            total:0
        }
    },
    mounted(){
        // console.log(this.$route.params.id)
        this.$http('/api/app/tags/getTagsList','post',this.$qs.stringify({infoId:this.$route.params.id}),this.$store.state.token).then(res=>{
            
            if(res.data.code==100){
               res.data.data.map(item=>{
                    
                    if(item.buy==0){
                       this.tagsList.push(item)
                    }else{

                    }
                    
                })
               console.log(this.tagsList)
            }else{

            }
        })
    },
    methods:{
        cancelCheck(index){
            const ischeck = this.tagsList[index].buy==1;
            if(ischeck){
                const price = this.tagsList[index].tagPrice;
                this.$set(this.tagsList[index],'buy',0)
                this.total = this.total - price;
            }
        },
        confrimCheck(index) {
            const { tagPrice: price, tagName: tag, id, flagValue } = this.tagsList[index];

            this.$set(this.tagsShow, flagValue, { id: id, value: tag, price: price });
            let total = 0;
            this.tagsShow.map(item => {
                if (item) {
                total += item.price;
                }
            });
            this.total = total;
        },
        cancelCheck(index) {
            if (this.tagsShow[index]) {
                const price = this.tagsShow[index].price;
                this.tagsShow.splice(index,1)
                this.total = this.total - price;
            }
        },
        showTagsDesc(index){
            this.remindDesc = this.tagsList[index].desc
            this.showRemind = true
        },
        closeRemind(){
            this.showRemind = false
        },
        ToPayFor(){
            this.showPopPay = false
        },
        checkType(type){
            this.type = type
        },
        rawOrder(){
            this.showPopPay = true
        },
    }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/style.styl';
.tags-popup
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

