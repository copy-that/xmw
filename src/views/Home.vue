<template>
  <div class="page paddbo">
    <div class="search-box" style="top:0">
      <div class="location" @click.stop="changeLocation">
        <img class="location-icon" src="@/assets/images/icon-14.png" alt>
        <div class="location-place">{{showCity.name}}</div>
        <div class="location-change">切换分站</div>
      </div>
      <cube-input class="search" v-model="searchWorld" placeholder="请输入区域、商圈或者编号">
        <img class="search-icon" slot="prepend" src="@/assets/images/icon-15.png" alt>
      </cube-input>
    </div>
    <div class="banner">
      <img v-if="banner.path" class="img-full" :src="banner.path" alt srcset>
      <img v-else class="img-full" src="@/assets/images/banner.png" alt srcset>
    </div>
    <div>
      <ul class="list-menu">
        <li v-for="item in scrollList2" class="list-menu-item" :key="item.id" @click="viewProduct(item.id)">
          <img class="list-item-icon" :src="item.icon" alt>
          <div class="list-item-name">{{ item.name }}</div>
        </li>
      </ul>
    </div>

    <div class="recom" v-for="(recom,index) in recomList" :key="index">
      <div class="recom-name">{{recom.name}}</div>
      <div class="recom-desc">{{recom.desc}}</div>
      <cube-scroll
        ref="scroll"
        :data="recom.children"
        direction="horizontal"
        :options="{eventPassthrough:'vertical',cancelable:true}"
        class="horizontal-scroll-list-wrap"
      >
        <ul class="list-wrapper">
          <div
            class="reitem list-item"
            v-for="recomitem in recom.children"
            @click="viewProductDetail(recomitem.id)"
            :key="recomitem.id"
          >
            <img class="reitem-icon" :src="recomitem.picUrls" alt>
            <div class="reitem-name">{{recomitem.title}}</div>
            <div class="reitem-price">¥{{recomitem.price}}万</div>
          </div>
        </ul>
      </cube-scroll>
    </div>
    <div class="news" ref="wrapper">
      <div class="news-name">最新资讯</div>
      <!-- <div class="newsitem" v-for="msg in newMsg" :key="msg.id" @click="viewNewsDetail(msg.id)">
        <img class="newsitem-icon" src="@/assets/images/item-icon.png" alt="">
        <div class="newsitem-info">
          <div class="newsitem-name">{{msg.msgName}}</div>
          <div class="newsitem-time">{{msg.createTime}}</div>
        </div>
      </div>-->
      <div class="newsitem" v-for="msg in newMsg" :key="msg.id" @click="viewNewsDetail(msg.id)">
        <!-- <img class="newsitem-icon" src="@/assets/images/item-icon.png" alt=""> -->
        <div class="newsitem-info">
          <div class="newsitem-name">{{msg.msgName}}</div>
          <div class="newsitem-time">{{msg.createTime}}</div>
        </div>
      </div>
    </div>
    <!-- <div class="popCity" v-if="showPopCity">
      <cube-index-list :data="cityData">
        <cube-index-list-group  v-for="(group, index) in cityData" :key="index" :group="group">
          <cube-index-list-item
            v-for="(item, index) in group.items"
            :key="index"
            :item="item"
            @select="selectItem">
            <div class="pop-item">{{item.name}}</div>
          </cube-index-list-item>
        </cube-index-list-group>
      </cube-index-list>
    </div>-->
    <div class="popCity" v-if="showPopCity">
      <div class="popCity-inner">
        <div
          v-for="city in cityData"
          class="popCity-item"
          @click="switchCity(city)"
          :class="city.id==showCity.id?'is_active':''"
          :key="city.id"
        >{{city.name}}</div>
      </div>
    </div>
    <Tabbar/>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabbar from "@/components/Tabbar.vue";
export default {
  name: "home",
  components: {
    Tabbar
  },
  data() {
    return {
      banner: {
        path: "",
        content: ""
      },
      newMsg: [],
      page: 1,
      pageSize: 10,
      cityData: [
        {
          id: "",
          name: "总站"
        }
      ],
      showPopCity: false,
      showCity: {
        id: "",
        name: "总站"
      },
      searchWorld: "",
      slideList: [
        {
          url: "http://www.didichuxing.com/",
          image: require("@/assets/images/banner.png")
        }
      ],
      scrollList2: [
        { 
          icon: require("@/assets/images/tab-9.png"), 
          name: "买住宅", 
          id: "1" 
        },
        {
          icon: require("@/assets/images/tab-10.png"),
          name: "买商铺",
          id: "3"
        },
        {
          icon: require("@/assets/images/tab-11.png"),
          name: "买办公",
          id: "5"
        },
        {
          icon: require("@/assets/images/tab-12.png"),
          name: "买厂房",
          id: "7"
        },
        {
          icon: require("@/assets/images/tab-13.png"),
          name: "买期房",
          id: "9"
        },
        {
          icon: require("@/assets/images/tab-9.png"),
          name: "租住宅",
          id: "2"
        },
        {
          icon: require("@/assets/images/tab-10.png"),
          name: "租商铺",
          id: "4"
        },
        {
          icon: require("@/assets/images/tab-11.png"),
          name: "租办公",
          id: "6"
        },
        {
          icon: require("@/assets/images/tab-12.png"),
          name: "租厂房",
          id: "8"
        },
        {
          icon: require("@/assets/images/tab-13.png"),
          name: "租酒店",
          id: "10"
        }
      ],
      recomList: [
        {
          name: "置顶推荐",
          desc: "我们为你推选好的房源",
          children: []
        }
        // ,
        // {
        //   name: "热门导购",
        //   desc: "真实的房源信息",
        //   children: [
        //     {
        //       id: 0,
        //       icon: require("@/assets/images/item-icon.png"),
        //       name: "蓝堡湾 南北通透",
        //       price: 155
        //     },
        //     {
        //       id: 1,
        //       icon: require("@/assets/images/item-icon.png"),
        //       name: "蓝堡湾 南北通透",
        //       price: 155
        //     },
        //     {
        //       id: 3,
        //       icon: require("@/assets/images/item-icon.png"),
        //       name: "蓝堡湾 南北通透",
        //       price: 155
        //     }
        //   ]
        // }
      ]
    };
  },
  created() {
    this.getNewMsg();
    this.getRecoment();
    this.getSiteList();
    this.getBannerPic();
  },
  methods: {
    getBannerPic() {
      this.$http(
        "/api/otherInfo/getSowingMap",
        "get",
        { type: 1 },
        this.$store.state.token
      ).then(res => {
        console.log(res);
        if (res.data.code == 100) {
          this.banner.path = res.data.data.picUrl;
          this.banner.content = res.data.data.mapTitle;
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      });
    },
    switchCity(city) {
      this.showPopCity = false;
      this.showCity = city;
    },
    getSiteList() {
      this.$http(
        "/api/otherInfo/getAreaList",
        "get",
        {},
        this.$store.state.token
      ).then(res => {
        if (res.data.code == 100) {
          this.cityData.push(...res.data.data);
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      });
    },
    changeLocation() {
      this.showPopCity = !this.showPopCity;
    },
    getRecoment() {
      const token = this.$store.state.token;
      this.$http("/api/app/homeMsg/hotList", "post", {}, token).then(res => {
        if (res.data.code == 100) {
          this.recomList[0].children.push(...res.data.data);
          // console.log(res.data.data)
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      });
    },
    getNewMsg() {
      const token = this.$store.state.token;
      this.$http(
        "/api/app/homeMsg/msgList",
        "post",
        this.$qs.stringify({ page: this.page, pageSize: this.pageSize }),
        token
      ).then(res => {
        if (res.data.code == 100) {
          this.newMsg.push(...res.data.data);
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      });
    },
    selectItem(item) {
      this.showCity = item.name;
      this.showPopCity = false;
      console.log(item.name);
    },
    changePage(current) {
      console.log("当前轮播图序号为:" + current);
    },
    clickHandler(item, index) {
      console.log(item, index);
    },
    scrollHandler({ y }) {
      this.scrollY = -y;
    },
    viewProduct(type) {
      var {name ,id} = this.showCity;
        if(id==''){
          id='all'
        }

      this.$router.push({name:"Product",params:{type:type,station:id,stationName:name}});
    },
    viewProductDetail(id) {
      console.log(id);
      this.$router.push({ name: "ProductDetail", params: { id: id } });
    },
    viewNewsDetail(id) {
      console.log(id);
      this.$router.push({ name: "NewsDetail", params: { id: id } });
    }
  }
};
</script>
<style lang="stylus">
@import '../assets/css/style.styl';

.page {
  text-align: left;
}

.slide-img {
  height: 100%;
}

.cube-input.search {
  width: 260px;
  box-sizing: border-box;
  padding: 0 15px;
  font-size: 13px;
}

.cube-input.search::after {
  border-radius: 40px;
  box-shadow: 0 2px 2px 2px rgba(245, 245, 245, 0.6);
}

.search-icon {
  height: 13px;
  width: 13px;
}

.location-icon {
  position: absolute;
  top: 0;
  left: 0;
  height: 13px;
  width: 13px;
}

.location-place {
  font-size: 13px;
  position: absolute;
  left: 21px;
  font-size: 0.346667rem;
}

.location-change {
  padding: 5px 0;
  font-size: 14px;
  position: absolute;
  top: 15px;
}

.banner {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  height: 174px;

  .img-full {
    width: 100%;
    height: 100%;
  }
}

.list-menu {
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
}

.list-menu-item {
  display: inline-block;
  width: 20%;
  margin: 10px 0;
  text-align: center;
}

.list-item-icon {
  width: 35px;
  height: 35px;
  border-radius: 10px;
}

.list-item-name {
  margin-top: 5px;
  font-size: 13px;
  color: #111111;
}

.recom {
  text-align: left;
  margin-top: 10px;
  padding: 10px 15px;

  .recom-name {
    font-size: 18px;
    color: #111111;
  }

  .recom-desc {
    color: #777777;
    margin-top: 8px;
    font-size: 12px;
  }
}

.horizontal-scroll-list-wrap {
  margin-top: 15px;
  border-radius: 5px;

  .cube-scroll-content {
    display: inline-block;
  }

  .list-wrapper {
    white-space: nowrap;
  }

  .list-item {
    display: inline-block;
    margin-right: 25px;

    .reitem-icon {
      display: block;
      height: 100px;
      width: 130px;
      border-radius: 4px;
    }

    .reitem-name {
      font-size: 13px;
      margin-top: 8px;
    }

    .reitem-price {
      margin-top: 8px;
      color: #FF6B00;
      font-size: 15px;
    }
  }
}

.news {
  box-sizing: border-box;
  padding: 15px;
}

.news-name {
  margin-top: 10px;
  font-size: 18px;
}

.newsitem {
  display: flex;
  padding: 15px 0 10px;
  border-bottom: 1px solid #f0f0f0;
}

.newsitem:last-child {
  border-bottom: 0;
}

.newsitem-icon {
  height: 85px;
  width: 100px;
  border-radius: 4px;
}

.newsitem-info {
  margin-left: 15px;
  flex: 1;
}

.newsitem-name {
  margin: 10px 0;
  line-height: 20px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.newsitem-time {
  margin-top: 5px;
  line-height: 15px;
  font-size: 12px;
  color: #9f9f9f;
}

.cube-pulldown-wrapper {
  font-size: 13px;
}

.popCity {
  position: fixed;
  top: 40px;
  height: calc(100% - 90px);
  width: 100vw;
  background-color: #fff;
  z-index: 10;
  background-color: rgba(52, 52, 52, 0.4);
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.popCity-inner {
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.popCity-item {
  text-align: center;
  width: 20%;
  font-size: 13px;
  height: 38px;
  line-height: 38px;

  &.is_active {
    color: #FB6800;
  }
}
</style>