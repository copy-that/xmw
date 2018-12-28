<template>
  <div class="page">
    <div class="mask" v-if="showdrop"></div>
    <div class="block">
      <Header title="商品页"></Header>
      <div class="search-box">
        <div class="location">
          <img class="location-icon" src="@/assets/images/location.png" alt>
          <div class="location-place">郑州</div>
        </div>
        <cube-input class="search-min" v-model="searchWorld" placeholder="请输入区域、商圈或者编号">
          <img class="search-icon" slot="prepend" src="@/assets/images/search.png" alt>
        </cube-input>
      </div>
      <div class="filter">
        <div class="filter-header">
          <div class="filter-item" :class="'id'==activeitem?'is_active':''">
            身份
            <img src="@/assets/images/down.png" alt srcset>
          </div>
          <div class="filter-item" :class="'pr'==activeitem?'is_active':''">
            价格
            <img src="@/assets/images/down.png" alt srcset>
          </div>
          <div class="filter-item" :class="'fi'==activeitem?'is_active':''">
            筛选
            <img src="@/assets/images/down.png" alt srcset>
          </div>
          <div class="filter-item" :class="'lo'==activeitem?'is_active':''">
            分站
            <img src="@/assets/images/down.png" alt srcset>
          </div>
        </div>
        <div class="filter-body">
          <div class="id-body" v-show="'id'==activeitem">
            <div class="id-body-item" :class="0==idtype?'is_active':''">
              <span>不限</span>
            </div>
            <div class="id-body-item" :class="1==idtype?'is_active':''">
              <span>个人</span>
              <img class="check-icon" src="@/assets/images/icon-7.png" alt srcset>
            </div>
            <div class="id-body-item" :class="2==idtype?'is_active':''">
              <span>经纪人</span>
              <img class="check-icon" src="@/assets/images/icon-7.png" alt srcset>
            </div>
            <div class="confirm-btn">确定</div>
          </div>
          <div class="body-item-box" v-show="'pr'==activeitem">
            <div class="body-item-two" :class="1==prtype?'is_active':''">
              <span>不限</span>
              <img class="check-icon" src="@/assets/images/icon-6.png" alt srcset>
            </div>
            <div class="body-item-two" :class="2==prtype?'is_active':''">
              <span>1000元以内</span>
              <img class="check-icon" src="@/assets/images/icon-7.png" alt srcset>
            </div>
            <div class="body-item-two" :class="3==prtype?'is_active':''">
              <span>1000-2000元</span>
              <img class="check-icon" src="@/assets/images/icon-7.png" alt srcset>
            </div>
            <div class="body-item-two" :class="4==prtype?'is_active':''">
              <span>2000-3000元</span>
              <img class="check-icon" src="@/assets/images/icon-7.png" alt srcset>
            </div>
          </div>
          <div class="body-type" v-show="'fi'==activeitem">
            <div class="body-item-name">户型</div>
            <div class="body-item-box">
              <div class="body-item-three" :class="1==prtype?'is_active':''">
                <span>不限</span>
                <img class="check-icon" src="@/assets/images/icon-6.png" alt srcset>
              </div>
              <div class="body-item-three" :class="2==prtype?'is_active':''">
                <span>4室及以上</span>
                <img class="check-icon" src="@/assets/images/icon-7.png" alt srcset>
              </div>
              <div class="body-item-three" :class="3==prtype?'is_active':''">
                <span>3室2厅</span>
                <img class="check-icon" src="@/assets/images/icon-7.png" alt srcset>
              </div>
              <div class="body-item-three" :class="4==prtype?'is_active':''">
                <span>3室1厅</span>
                <img class="check-icon" src="@/assets/images/icon-7.png" alt srcset>
              </div>
            </div>
          </div>
          <div class="body-type" v-show="'lo'==activeitem">
            <div class="body-item-name">户型</div>
            <div class="body-item-box" style="justify-content: flex-start;margin: 0 -20px;">
              <div class="body-item-five" :class="1==prtype?'is_active':''">3室1厅</div>
              <div class="body-item-five" :class="2==prtype?'is_active':''">3室1厅</div>
              <div class="body-item-five" :class="3==prtype?'is_active':''">3室2厅</div>
              <div class="body-item-five" :class="4==prtype?'is_active':''">3室1厅</div>
              <div class="body-item-five" :class="5==prtype?'is_active':''">3室1厅</div>
              <div class="body-item-five" :class="6==prtype?'is_active':''">3室1厅</div>
              <div class="body-item-five" :class="7==prtype?'is_active':''">3室1厅</div>
              <div class="body-item-five" :class="8==prtype?'is_active':''">3室2厅</div>
              <div class="body-item-five" :class="9==prtype?'is_active':''">3室1厅</div>
              <div class="body-item-five" :class="10==prtype?'is_active':''">3室1厅</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list-prod">
      <div class="prod">
        <div class="prod-icon">
          <img class="prod-img" src="@/assets/images/item-icon.png" alt>
          <span class="prod-img-pages">7张</span>
        </div>
        <div class="prod-info">
          <div class="prod-name">和悦华锦
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
            <span>在售</span>
          </div>
          <div class="prod-price">¥3000万</div>
        </div>
      </div>
      <div class="prod">
        <div class="prod-icon">
          <img class="prod-img" src="@/assets/images/item-icon.png" alt>
          <span class="prod-img-pages">7张</span>
        </div>
        <div class="prod-info">
          <div class="prod-name">和悦华锦
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
            <span>在售</span>
          </div>
          <div class="prod-price">¥3000万</div>
        </div>
      </div>
      <div class="prod">
        <div class="prod-icon">
          <img class="prod-img" src="@/assets/images/item-icon.png" alt>
          <span class="prod-img-pages">7张</span>
        </div>
        <div class="prod-info">
          <div class="prod-name">和悦华锦
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
            <span>在售</span>
          </div>
          <div class="prod-price">¥3000万</div>
        </div>
      </div>
      <div class="prod">
        <div class="prod-icon">
          <img class="prod-img" src="@/assets/images/item-icon.png" alt>
          <span class="prod-img-pages">7张</span>
        </div>
        <div class="prod-info">
          <div class="prod-name">和悦华锦
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
            <span>在售</span>
          </div>
          <div class="prod-price">¥3000万</div>
        </div>
      </div>
      <div class="prod">
        <div class="prod-icon">
          <img class="prod-img" src="@/assets/images/item-icon.png" alt>
          <span class="prod-img-pages">7张</span>
        </div>
        <div class="prod-info">
          <div class="prod-name">和悦华锦
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
            <span>在售</span>
          </div>
          <div class="prod-price">¥3000万</div>
        </div>
      </div>
      <div class="prod">
        <div class="prod-icon">
          <img class="prod-img" src="@/assets/images/item-icon.png" alt>
          <span class="prod-img-pages">7张</span>
        </div>
        <div class="prod-info">
          <div class="prod-name">和悦华锦
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
            <span>在售</span>
          </div>
          <div class="prod-price">¥3000万</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  name: "Product",
  components: {
    Header
  },
  data() {
    return {
      searchWorld: "",
      activeitem: "lo",
      idtype: 1,
      prtype: 1,
      showdrop: false
    };
  }
};
</script>
<style lang="stylus" scope>
@import '../assets/css/style.styl';

.page {
  margin-top: 125px;
}

.cube-input.search-min {
  width: 260px;
  box-sizing: border-box;
  padding: 0 15px;
  font-size: 13px;
}

.cube-input.search-min::after {
  border-radius: 40px;
  box-shadow: 0 2px 2px 2px rgba(245, 245, 245, 0.6);
}

.cube-input.search-min .cube-input-field {
  padding: 6px 10px;
}

.search-icon {
  height: 13px;
  width: 13px;
}

.location-icon {
  top: 8px;
}

.location-place {
  top: 8px;
}

.filter {
  padding: 0 15px;
  overflow: hidden;
}

.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;

  .filter-item {
    width: 37px;
    font-size: 14px;
    color: rgba(17, 17, 17, 1);

    &.is_active {
      color: #FB6800;
    }
  }
}

.id-body {
  .id-body-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    height: 38px;

    &.is_active {
      color: #FB6800;
    }
  }
}

.check-icon {
  height: 10px;
  width: 10px;
}

.confirm-btn {
  border-radius: 3px;
  height: 35px;
  line-height: 35px;
  background-color: #FB6800;
  color: #ffffff;
  font-size: 15px;
  margin-bottom: 10px;
}

.body-item-name {
  text-align: left;
  padding: 10px 0;
  margin-top: 10px;
  font-size: 15px;
}

.body-item-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.body-item-two {
  width: 125px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  height: 38px;

  &.is_active {
    color: #FB6800;
  }
}

.body-item-three {
  width: 90px;
  display: flex;
  color: #666666;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  height: 38px;
}

.body-item-five {
  text-align: center;
  width: 20%;
  font-size: 13px;
  height: 38px;
  line-height: 38px;
}

.block {
  position: fixed;
  top: 0;
}

.block {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 10;
}

.list-prod {
  padding: 0 15px;
}
</style>
