<template>
  <div class="page">
    <div class="banner">
      <img class="back" src="@/assets/images/icon-1.png" alt srcset @click="goback">
      <img class="banner-img" src="@/assets/images/ban-1.png" alt>
      <div class="carbin">1/7</div>
    </div>
    <div class="detail-info">
      <div class="detail-top">
        <div class="left">
          <div class="detail-name">和悦华锦</div>
          <div class="detail-time">发布时间：2018-11-20</div>
          <div class="detail-tages">
            <span>个人</span>
            <span>简单装修</span>
            <span>在售</span>
          </div>
        </div>
        <div class="right">
          <span class="detail-price">¥1200/月</span>
          <div class="detail-enjoy">
            <img class="enjoy-icon" src="@/assets/images/icon-2.png" alt>
            <span class="enjoy-state">已收藏</span>
          </div>
        </div>
      </div>
      <div class="images">
        <img class="image-item" src="@/assets/images/tag-2.png" alt srcset>
        <img class="image-item" src="@/assets/images/tag-2.png" alt srcset>
        <img class="image-item" src="@/assets/images/tag-2.png" alt srcset>
      </div>
      <div class="detail-cell">
        <div class="cell-lable">房源编号：</div>
        <div class="cell-value">123456</div>
      </div>
      <div class="detail-cell">
        <div class="cell-lable">发&ensp;布&ensp;人：</div>
        <div class="cell-value">王先生（经纪人），中介费：100元</div>
      </div>
      <div class="detail-cell">
        <div class="cell-lable">房&emsp;&emsp;型：</div>
        <div class="cell-value">3室1厅</div>
      </div>
      <div class="detail-cell">
        <div class="cell-lable">面&emsp;&emsp;积：</div>
        <div class="cell-value">100平米</div>
      </div>
      <div class="detail-cell">
        <div class="cell-lable">房屋配置：</div>
        <div class="cell-value">窗户，防盗窗，门</div>
      </div>
      <div class="detail-cell"  v-if="state==2">
        <div class="cell-lable" style="color:#FB6800">屋主电话：</div>
        <div class="cell-value" style="color:#FB6800">12345645768</div>
      </div>
    </div>
    <div class="section">
      <div class="section-name">房屋信息详情</div>
      <div class="section-desc">
        是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。
        一壶浊酒喜相逢，古今多少事，都付笑谈中。是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。
        滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。
      </div>
    </div>
    <div class="section">
      <div class="section-name">地理位置</div>
      <div class="map" id="map"></div>
    </div>
    <div class="section" v-if="state==2">
      <div class="section-name">房屋评论</div>
      <div class="comment">
        <div class="comment-top">
          <div class="comment-left">
            <img class="comment-avatar" src="@/assets/images/icon-4.png" alt>
            <div class="comment-name">喜买屋房友</div>
          </div>
          <span class="comment-time">2018-11-10</span>
        </div>
        <div class="comment-text">
          地理位置一般般，交通来说，现在并不怎么好。周围配套还不完善。
          需要开通十号线地铁站。只要地铁一响，这儿就是个非常帮的位置。
          虽然十号线通的是郑州火车站，正因为这样，
        </div>
      </div>
      <div class="write-com">
        <textarea class="write-line" name id placeholder="在这里写下您的评论..."></textarea>
      </div>
    </div>
    <div class="buyInfo" v-if="state==1">
        <div class="info-left">
            <div class="info-price">信息价格：20金币</div>
            <div class="info-desc">(立即购买后可以获得屋主信息)</div>
        </div>
        <div class="info-btn" @click="handleBuy">立即购买</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProductDetail",
  data() {
    return {
        state:1
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    handleBuy(){
        this.state = 2
    },
    goback(){
        this.$router.go(-1)
    },
    initMap() {
      var map = new AMap.Map("map", {
        zoom: 13,
        center: [113.75, 34.75],
        resizeEnable: true
      });
      var viaMarker = new AMap.Marker({
        position: new AMap.LngLat(113.75, 34.75),
        icon: require("@/assets/images/icon-3.png"),
        offset: new AMap.Pixel(-75, -3)
      });
      map.add([viaMarker]);
    }
  }
};
</script>
<style lang="stylus">
.page{
    padding-bottom 66px
    padding-top 0px
}
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
.banner {
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
      margin-bottom: 10px;
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
</style>