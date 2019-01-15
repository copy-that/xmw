<template>
  <div class="page paddbo" style="padding-top:0;">
    <div class="banner-detail" @click="showImagePreview">
      <img class="back" src="@/assets/images/icon-1.png" alt srcset @click.stop="goback">
      <img class="banner-img" :src="ProductInfo&&ProductInfo.picUrls.split(',')[0]" alt>
      <div class="carbin">1/{{ProductInfo&&ProductInfo.picUrls.split(',').length}}</div>
    </div>
    <div class="detail-info">
      <div class="detail-top">
        <div class="left">
          <div class="detail-name">{{ProductInfo&&ProductInfo.title}}</div>
          <div class="detail-time">发布时间：{{ProductInfo&&ProductInfo.createTime.substring(0,10)}}</div>
          <div class="detail-tages" v-if="ProductInfo&&ProductInfo.tagVos">
            <span>{{ProductInfo&&ProductInfo.identityMsg}}</span>
            <span>{{ProductInfo&&ProductInfo.dicorationNum}}</span>
            <span>{{ProductInfo&&ProductInfo.status==0?'在售':'已售'}}</span>
          </div>
        </div>
        <div class="right">
          <span class="detail-price">¥{{ProductInfo&&ProductInfo.price}}/月</span><!-- 缺少类型 -->
          <div class="detail-enjoy" @click="enjoyProd">
            <img class="enjoy-icon" v-if="ProductInfo&&ProductInfo.coll==1" src="@/assets/images/icon-2.png" alt>
            <img class="enjoy-icon" v-else src="@/assets/images/icon-2-b.png" alt>
            <span class="enjoy-state">{{ProductInfo&&ProductInfo.coll==1?'已收藏':'&ensp;收藏&ensp;'}}</span>
          </div>
        </div>
      </div>
      <div class="images" v-if="ProductInfo&&ProductInfo.tagVos">
        <img class="image-item" v-for="tag in ProductInfo.tagVos" :src="tag.tagPicUrl" :key="tag.id" alt srcset>
      </div>
      <div class="detail-cell">
        <div class="cell-lable">房源编号：</div>
        <div class="cell-value">{{ProductInfo&&ProductInfo.number}}</div>
      </div>
      <div class="detail-cell">
        <div class="cell-lable">发&ensp;布&ensp;人：</div>
        <div class="cell-value">{{ProductInfo&&ProductInfo.callName }}（{{ProductInfo&&ProductInfo.identityMsg}}），中介费：{{ProductInfo&&ProductInfo.tbBrokerageFee}}元</div>
      </div>
      <div class="detail-cell">
        <div class="cell-lable">房&emsp;&emsp;型：</div>
        <div class="cell-value">{{ProductInfo&&ProductInfo.classify}}</div>
      </div>
      <div class="detail-cell">
        <div class="cell-lable">出租类型：</div>
        <div class="cell-value">{{ProductInfo&&ProductInfo.form}}</div>
      </div>
      <div class="detail-cell">
        <div class="cell-lable">面&emsp;&emsp;积：</div>
        <div class="cell-value">{{ProductInfo&&ProductInfo.area}}平米</div>
      </div>
      <div class="detail-cell">
        <div class="cell-lable">房屋配置：</div>
        <div class="cell-value">{{ProductInfo&&ProductInfo.houseAllocation}}</div>
      </div>
      <div class="detail-cell">
        <div class="cell-lable">酒店等级：</div>
        <div class="cell-value">{{ProductInfo&&ProductInfo.grade}}</div>
      </div>
      <div class="detail-cell">
        <div class="cell-lable">提供服务：</div>
        <div class="cell-value">{{ProductInfo&&ProductInfo.mating}}</div>
      </div>
      <div class="detail-cell">
        <div class="cell-lable">客服电话：</div>
        <div class="cell-value">{{serviceTel&&serviceTel}}</div>
      </div>
      <div class="detail-cell" v-if="ProductInfo&&ProductInfo.hasPay==1">
        <div class="cell-lable" style="color:#FB6800">屋主电话：</div>
        <div class="cell-value" style="color:#FB6800">{{ProductInfo&&ProductInfo.phone}}</div>
      </div>
    </div>
    <div class="section">
      <div class="section-name">房屋信息详情</div>
      <div class="section-desc">
        {{ProductInfo&&ProductInfo.remark}}
      </div>
    </div>
    <div class="section">
      <div class="section-name">地理位置</div>
      <div class="map" id="map"></div>
    </div>
    <div class="section" v-if="ProductInfo&&ProductInfo.hasPay==1">
      <div class="section-name">房屋评论</div>
      <div class="comment" v-for="assess in ProductInfo&&ProductInfo.assessVos" :key="assess.id">
        <div class="comment-top">
          <div class="comment-left">
            <img class="comment-avatar" :src="assess.avatar" alt>
            <div class="comment-name">{{assess.nickName}}</div>
          </div>
          <span class="comment-time">{{assess.createTime }}</span>
        </div>
        <div class="comment-text">
          {{assess.content }}
        </div>
      </div>
      <div class="write-com">
        <!-- <textarea class="write-line"  v-model="comment" ></textarea> -->
        <cube-textarea v-model="comment" class="bg-pray"  :maxlength="140" placeholder="在这里写下您的评论..."></cube-textarea>
        <cube-button class="form-primary-btn" :primary="true" >发表评论</cube-button>
      </div>
    </div>
    <div class="buyInfo" v-if="ProductInfo&&ProductInfo.hasPay!=1">
        <div class="info-left">
            <div class="info-price">信息价格：{{ProductInfo&&ProductInfo.payPrice}}金币</div>
            <div class="info-desc">(立即购买后可以获得屋主信息)</div>
        </div>
        <div class="info-btn" @click="handleBuy">立即购买</div>
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
export default {
  name: "ProductDetail",
  data() {
    return {
        type:0,
        serviceTel:'',
        showPopPay:false,
        comment:'',
        ProductInfo:null
    };
  },
  mounted() {
    console.log(this.$route.params.id)
    // this.initMap();
    this.getProductDetail()
    this.$http('/api/otherInfo/getAboutUs','get',{},this.$store.state.token).then(res=>{
          if(res.data.code==100){
              this.serviceTel = res.data.data.serviceTel
          } 
      })
  },
  methods: {
    getProductDetail(){
      const token = this.$store.state.token;
      const id = this.$route.params.id;
      this.$http(
        "/api/app/rendInfoApi/getInfoMsg",
        "post",
        this.$qs.stringify({ infoId: id}),
        token
      ).then(res => {
        if (res.data.code == 100) {
          console.log(res.data)
          this.ProductInfo = res.data.data;
          const lng = Number(res.data.data.longitude).toFixed(2);
          const lat = Number(res.data.data.longitude).toFixed(2);
         return [+lng,+lat]
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      }).then(data=>{
        this.initMap(data)
        console.log(data)
      });
    },
    ToPayFor(){
      this.showPopPay = false
    },
    checkType(type){
      this.type = type
    },
    showImagePreview() {
      var that = this
      this.$createImagePreview({
        imgs: that.picUrls
      }).show()
    },
    handleBuy(){
      const token = this.$store.state.token;
      if(token == ''){
         this.$createDialog({
        type: 'confirm',
        title: '你还没有登录!',
        confirmBtn: {
          text: '去登陆',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          this.$router.push({name:'Login'})
        },
        onCancel: () => {
          
        }
      }).show()
      }else{
        this.showPopPay =true
      }
    },
    enjoyProd(){
      this.isEnjoy = !this.isEnjoy
    },
    goback(){
        this.$router.go(-1)
    },
    initMap(data) {
      
      var map = new AMap.Map("map", {
        zoom: 13,
        center: data,
        resizeEnable: true
      });
      var viaMarker = new AMap.Marker({
        position: new AMap.LngLat(data[0], data[1]),
        icon: require("@/assets/images/icon-3.png"),
        offset: new AMap.Pixel(-75, -3)
      });
      map.add([viaMarker]);
    }
  }
};
</script>
<style lang="stylus">
@import '../assets/css/style.styl';
.buyInfo{
    text-align left 
    position fixed
    display flex
    align-items center
    bottom 0
    background-color #ffffff
    height 66px
    z-index 1
    width 100%
    padding 10px 15px
    box-sizing border-box
}
.info-left{
    flex 1
}
.info-price{
    margin-bottom 12px
    font-size:15px;
    color:rgba(251,104,0,1);
}
.info-desc{
    font-size:12px;
    color:rgba(102,102,102,1);
}
.info-btn{
    width 125px
    height 45px
    line-height 45px
    font-size:18px;
    border-radius 4px
    background-color #f4821f
    color #ffffff
    text-align center 
}
.banner-detail {
  position: relative;
  height: 300px;
  width: 100%;
  overflow: hidden;

  .back {
    position: absolute;
    left: 15px;
    top: 8px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .banner-img {
    height: 300px;
    width: 100%;
  }

  .carbin {
    position: absolute;
    font-size: 10px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    right: 15px;
    bottom: 15px;
    width: 30px;
    height: 16px;
    line-height: 16px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.4);
  }
}

.detail-info {
  padding: 20px 15px;
  border-bottom: 5px solid #f1f1f1;

  .detail-top {
    display: flex;
    align-items: center;

    .left {
      width: 60%;
      margin-right: 30px;
      text-align: left;

      .detail-name {
        line-height: 20px;
        font-size: 18px;
        font-weight: bold;
      }

      .detail-time {
        margin-top: 10px;
        font-size: 11px;
        height: 14px;
        line-height: 14px;
        color: rgba(160, 160, 160, 1);
      }

      .detail-tages {
        display: flex;
        align-items: center;
        margin-top: 10px;

        span {
          margin-right: 13px;
          border-radius: 2px;
          padding: 0 5px;
          font-size: 10px;
          height: 14px;
          line-height: 14px;
          color: rgba(255, 107, 0, 1);
          background-color: rgba(255, 105, 0, 0.5);
        }
      }
    }

    .right {
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .detail-price {
        font-size: 15px;
        color: rgba(255, 107, 0, 1);
      }

      .detail-enjoy {
        display: flex;
        align-items: center;
        flex-direction: column;

        .enjoy-icon {
          height: 13px;
          width: 13px;
        }

        .enjoy-state {
          text-align: center;
          font-size: 10px;
          color: rgba(17, 17, 17, 1);
          margin-top: 10px;
        }
      }
    }
  }

  .images {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    .image-item {
      margin-right: 10px;
      margin-bottom: 10px;
      width: 46px;
      height: 46px;
    }
  }

  .detail-cell {
    display: flex;
    height: 35px;
    line-height: 35px;

    .cell-lable {
      color: #666666;
      font-size: 14px;
    }

    .cell-value {
      color: #111111;
      font-size: 14px;
    }
  }
}

.section {
  text-align: left;
  padding: 15px;

  .section-name {
    font-size: 15px;
    margin-bottom: 10px;
  }

  .section-desc {
    line-height: 20px;
    font-size: 13px;
    color: rgba(102, 102, 102, 1);
  }

  .map {
    height: 180px;
    width: 100%;
  }

  .comment {
    border-bottom: 1px solid #f1f1f1;
    padding-top: 15px;
    margin-bottom: 10px;
    .comment-top {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .comment-left {
        display: flex;
        align-items: center;

        .comment-avatar {
          width: 30px;
          height: 30px;
        }

        .comment-name {
          font-size: 13px;
          margin-left: 20px;
        }
      }

      .comment-time {
        color: rgba(102, 102, 102, 1);
        font-size: 12px;
      }
    }

    .comment-text {
      padding-bottom: 10px;
      line-height: 18px;
      font-size: 12px;
      color: rgba(102, 102, 102, 1);
    }
  }
}

.write-line {
  resize: none;
  border: none;
  outline: none;
  padding: 5px 10px;
  box-sizing: border-box;
  font-size: 12px;
  color: rgba(102, 102, 102, 1);
  background-color: #f2f2f2;
  border-radius: 2px;
  letter-spacing: 2px;
  width: 100%;
  min-height: 16px;
  line-height: 16px;
}
.amap-logo{
    display: none !important
}
.amap-copyright{
  display: none !important
}
.bg-pray .cube-textarea
  background-color #f2f2f2
</style>