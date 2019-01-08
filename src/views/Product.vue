<template>
  <div class="page">
    <div class="mask" v-if="showdrop"></div>
    <Header title="商品页"></Header>
      <div class="search-box top-45">
        <div class="location">
          <img class="location-icon-r" src="@/assets/images/icon-14.png" alt>
          <div class="location-place-r">郑州</div>
        </div>
        <cube-input class="search-min" v-model="searchWorld" placeholder="请输入区域、商圈或者编号">
          <img class="search-icon" slot="prepend" src="@/assets/images/icon-15.png" alt>
        </cube-input>
      </div>
      <div class="filter">
        <div class="filter-header">
          <div class="filter-item" :class="'id'==activeitem?'is_active':''" @click="setFilter('id')">
            身份
            <img src="@/assets/images/icon-17.png" alt srcset>
          </div>
          <div class="filter-item" :class="'pr'==activeitem?'is_active':''" @click="setFilter('pr')">
            价格
            <img src="@/assets/images/icon-17.png" alt srcset>
          </div>
          <div class="filter-item" :class="'fi'==activeitem?'is_active':''" @click="setFilter('fi')">
            筛选
            <img src="@/assets/images/icon-17.png" alt srcset>
          </div>
          <div class="filter-item" :class="'lo'==activeitem?'is_active':''" @click="setFilter('lo')">
            分站
            <img src="@/assets/images/icon-17.png" alt srcset>
          </div>
        </div>
        <div class="filter-body"  v-if="showdrop">
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
            <cube-button class="form-primary-btn" @click="handleFilter" style="margin-bottom:10px" :primary="true">确定</cube-button>
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
            <cube-button class="form-primary-btn" @click="handleFilter" style="margin-bottom:10px" :primary="true">确定</cube-button>
          </div>
          <div class="body-type" v-show="'fi'==activeitem" >
            
            <div  v-for="(todo,index) in fiList" v-bind:key="index">
              <div class="body-item-name">{{todo.name}}</div>
              <div class="body-item-box" >
                <div class="body-item-three" v-for="(tag,key) in todo.children" :key="key" :class="tag.type==vitype?'is_active':''">
                  <span>{{tag.name}}</span>
                  <img class="check-icon" v-if="tag.type==filterTags[index]" src="@/assets/images/icon-6.png" alt srcset>
                  <img class="check-icon" v-else src="@/assets/images/icon-7.png" alt srcset>
                </div>
              </div>
            </div>
            <cube-button class="form-primary-btn" @click="handleFilter" style="margin-bottom:10px" :primary="true">确定</cube-button>
         </div>
          <div class="body-type" v-show="'lo'==activeitem">
            <div class="body-item-name">热门分站</div>
            <div class="body-item-box" style="justify-content: flex-start;margin: 0 -20px;">
              <div class="body-item-five" :class="1==prtype?'is_active':''">不限</div>
              <div class="body-item-five" :class="2==prtype?'is_active':''">北京</div>
              <div class="body-item-five" :class="3==prtype?'is_active':''">上海</div>
              <div class="body-item-five" :class="4==prtype?'is_active':''">天津</div>
              <div class="body-item-five" :class="5==prtype?'is_active':''">重庆</div>
              <div class="body-item-five" :class="6==prtype?'is_active':''">广州</div>
              <div class="body-item-five" :class="7==prtype?'is_active':''">深圳</div>
              <div class="body-item-five" :class="8==prtype?'is_active':''">杭州</div>
              <div class="body-item-five" :class="9==prtype?'is_active':''">福州</div>
              <div class="body-item-five" :class="10==prtype?'is_active':''">厦门</div>
              <div class="body-item-five" :class="11==prtype?'is_active':''">石家庄</div>
              <div class="body-item-five" :class="12==prtype?'is_active':''">郑州</div>
              <div class="body-item-five" :class="13==prtype?'is_active':''">武汉</div>
              <div class="body-item-five" :class="14==prtype?'is_active':''">长沙</div>
              <div class="body-item-five" :class="15==prtype?'is_active':''">南京</div>
              <div class="body-item-five" :class="16==prtype?'is_active':''">南昌</div>
              <div class="body-item-five" :class="17==prtype?'is_active':''">西安</div>
              <div class="body-item-five" :class="18==prtype?'is_active':''">成都</div>   
            </div>
            <cube-button class="form-primary-btn" @click="handleFilter" style="margin-bottom:10px" :primary="true">确定</cube-button>
          </div>
        </div>
      </div>
    <div class="list-prod">
      <div class="prod" v-for="(prod,index) in prodList" :key="index" @click="viewProductDetail">
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
      activeitem: "",
      vitype:1,
      idtype: 1,
      prtype: 1,
      showdrop: false,
      prodList:[{},{}],
      filterTags:[0,0,0,0,0],
      fiList:[
        {
          name:'认证',
          value:'valid',
          children:[{
            name:'不限',
            type:'0'
          },{
            name:'已认证',
            type:'1'
          },{
            name:'未认证',
            type:'2'
          }]
        },
        {
          name:'户型',
          value:'houty',
          children:[{
            name:'不限',
            type:'0'
          },{
            name:'4室及以上',
            type:'1'
          },{
            name:'3室2厅',
            type:'2'
          },
          {
            name:'3室1厅',
            type:'1'
          },{
            name:'2室2厅',
            type:'2'
          },
          {
            name:'2室1厅',
            type:'1'
          },{
            name:'1室1厅',
            type:'2'
          },{
            name:'1室0厅',
            type:'2'
          }]
        },
        {
          name:'面积',
          value:'area',
          children:[{
            name:'不限',
            type:'0'
          },{
            name:'30㎡以下',
            type:'1'
          },{
            name:'30-50㎡',
            type:'2'
          },
          {
            name:'50-90㎡',
            type:'1'
          },{
            name:'90-150㎡',
            type:'2'
          },
          {
            name:'150-300㎡',
            type:'1'
          },{
            name:'300㎡以上',
            type:'2'
          }]
        },
        {
          name:'面积',
          value:'area',
          children:[{
            name:'不限',
            type:'0'
          },{
            name:'30㎡以下',
            type:'1'
          },{
            name:'30-50㎡',
            type:'2'
          },
          {
            name:'50-90㎡',
            type:'1'
          },{
            name:'90-150㎡',
            type:'2'
          },
          {
            name:'150-300㎡',
            type:'1'
          },{
            name:'300㎡以上',
            type:'2'
          }]
        },
        {
          name:'装修',
          value:'derac',
          children:[{
            name:'不限',
            type:'0'
          },{
            name:'毛坯房',
            type:'1'
          },{
            name:'简单装修',
            type:'2'
          },
          {
            name:'中等装修',
            type:'1'
          },{
            name:'精装修',
            type:'2'
          }]
        }
      ]
    };
  },
  methods:{
    setFilter(item){
      this.showdrop = true
      this.activeitem = item
    },
    handleFilter(){
      this.showdrop = false
    },
    viewProductDetail(){
      this.$router.push({name:'ProductDetail'})
    }
  }
};
</script>
<style lang="stylus" scoped>

@import '../assets/css/style.styl';
.page {
  text-align left 

}
.top-45{
  top 45px  
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

.cube-input.search-min .cube-input-field{
  box-sizing: border-box;
  padding: 3px 10px;
}

.search-icon {
  height: 13px;
  width: 13px;
}

.location-icon-r 
  top: 8px;
  position: absolute;
  left: 0;
  height: 13px;
  width: 13px;

.location-place-r {
  top: 8px;
  font-size: 13px;
  position: absolute;
  left: 21px;
  font-size: 0.346667rem;
}

.filter {
  position fixed
  top 85px
  width 100%
  background-color #ffffff
  box-sizing border-box
  z-index 10
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
  // justify-content: space-between;
}

.body-item-two {
  width: 42%;
  margin:0 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  height: 38px;

  &.is_active {
    color: #FB6800;
  }
}
.body-item-two:nth-of-type(2n+1){
  margin-left:0
}
.body-item-two:nth-of-type(2n){
  margin-right:0
}
.body-item-three {
  width: 25%;
  margin:0 6%;
  display: flex;
  color: #666666;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  height: 38px;
}
.body-item-three:nth-of-type(3n+1){
  margin-left:0
}
.body-item-three:nth-of-type(3n+3){
  margin-right:0
}
.body-item-five {
  text-align: center;
  width: 20%;
  font-size: 13px;
  height: 38px;
  line-height: 38px;
  &.is_active {
    color: #FB6800;
  }
}

// .block {
//   position: fixed;
//   top: 0;
// }

// .block-fixed {
//   position: fixed;
//   top: 0;
//   width: 100%;
//   background-color: #fff;
//   z-index: 10;
// }

.list-prod {
  margin:85px 0 20px;
  padding: 0 15px;
}
</style>
