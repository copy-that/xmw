<template>
  <div class="page">
    <Header title="买住宅"/>
    <div class="newhouse-box">
      <div class="cell" @click="showAddressPicker">
        <div class="cell-label">所属地区:</div>
        <div class="cell-value">{{params.area?params.area:'请选择地区'}}</div>
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="cell" @click="showRangePicker">
        <div class="cell-label">有&ensp;效&ensp;期:</div>
        <div class="cell-value">{{params.time?params.time:'请选择有效期限'}}</div>
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="cell">
        <div class="cell-label">信息标题:</div>
        <input type="text" class="cell-input" placeholder="请输入信息标题">
        <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
      </div>
      <div class="cell">
        <div class="cell-label">称&emsp;&emsp;呼:</div>
        <input type="text" class="cell-input" placeholder="我们应该如何称呼您">
        <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
      </div>
      <div class="cell">
        <div class="cell-label">手机号码:</div>
        <input type="text" class="cell-input" placeholder="您的联系方式，方便我们及时与您联系">
        <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
      </div>
      <div class="cell">
        <div class="cell-label">地理位置:</div>
        <input type="text" class="cell-input" placeholder="请输入详细地址：例如:财信圣堤亚纳">
        <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
      </div>
      <div class="cell" @click="showBuyType">
        <div class="cell-label">出租类型:</div>
        <div class="cell-value">{{params.rentType==1?"整套":''}}{{params.rentType==2?"单间":''}}{{params.rentType==3?"床位":''}}{{params.rentType==''?"请选择类型":''}}</div>
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="cell">
        <div class="cell-label">身&emsp;&emsp;份:</div>
        <div class="radio-box">
          <div class="radio-item" :class="params.idType==1?'is_check':''" @click="idCheck(1)">
            <span class="form_item_radio"></span>个人
          </div>
          <div class="radio-item" :class="params.idType==2?'is_check':''" @click="idCheck(2)">
            <span class="form_item_radio"></span>经纪人
          </div>
        </div>
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="cell">
        <div class="cell-label">面积:</div>
        <input type="text" class="cell-input" placeholder="平方米">
        <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
      </div>
      <div class="cell">
        <div class="cell-label">价格:</div>
        <input type="text" class="cell-input" placeholder="元/月">
        <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
      </div>
      <div class="block">
        <div class="block-label">上传房源照片:</div>
         <cube-upload
                class="base-upload"
                action="//jsonplaceholder.typicode.com/photos/"
                :simultaneous-uploads="1"
                @files-added="filesAdded" />
      </div>
      <div class="block">
        <div class="block-label">房源信息:</div>
        <textarea
          style="margin-top:0px"
          class="textarea"
          rows="6"
          maxlength="140"
          name
          id
          placeholder="描述一下您的房子吧..."
        ></textarea>
      </div>
      <div class="block bordered">
        <div class="block-label" style="margin:10px">来为您的房屋购买一个合适的标签吧!</div>
        <div class="tags">
          <div class="tag-item" v-for="(tag,index) in tags" :key="tag.id">
           
            <img class="tag-item-icon" :src="tag.icon" @click="showTagsDesc(index)"  alt srcset>
            <template v-if="tag.id<5">
              <img class="tag-item-check" v-if="tagsShow[index]&&index==tagsShow[index].id" @click="cancelCheck(index)" src="@/assets/images/icon-6.png" alt srcset>
              <img class="tag-item-check" v-else  @click="confrimCheck(index)" src="@/assets/images/icon-7.png" alt srcset>
            </template>
            <template v-else-if="tag.id<7&&tag.id>=5">
              <img class="tag-item-check" v-if="tagsShow[5]&&tag.id==tagsShow[5].id" @click="cancelCheck(5)" src="@/assets/images/icon-6.png" alt srcset>
              <img class="tag-item-check" v-else  @click="confrimCheck(index)" src="@/assets/images/icon-7.png" alt srcset>
            </template>
            <template v-else-if="tag.id<10&&tag.id>=7">
              <img class="tag-item-check" v-if="tagsShow[6]&&tag.id==tagsShow[6].id" @click="cancelCheck(6)" src="@/assets/images/icon-6.png" alt srcset>
              <img class="tag-item-check" v-else  @click="confrimCheck(index)" src="@/assets/images/icon-7.png" alt srcset>
            </template>
            <template v-else>
              <img class="tag-item-check" v-if="tagsShow[7]&&tag.id==tagsShow[7].id" @click="cancelCheck(7)" src="@/assets/images/icon-6.png" alt srcset>
              <img class="tag-item-check" v-else  @click="confrimCheck(index)" src="@/assets/images/icon-7.png" alt srcset>
            </template>
          </div>
        </div>
        <div class="tags-info">
          <div class="tags-info-item">
            <span class="tags-label">您已选择标签：</span>
            <span class="tags-value"><span  v-if="tag&&tag.value" v-for="(tag,index) in tagsShow" :key="index">{{tag.value}}、</span></span>
          </div>
          <div class="tags-info-item">
            <span class="tags-label">共计：</span>
            <span>{{total}}元</span>
          </div>
        </div>
      </div>
      <div class="rule-desc">置顶发布的信息可使成交率提高5倍！</div>
      <cube-button :primary="true" class="primary-btn" @click="showPopPay=true" style="margin-top:10px">发布</cube-button>
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
import { provinceList, cityList, areaList } from "@/area.js";
import { tags } from "@/tags.js";
export default {
  name: "BuyHouse",
  components: {
    Header
  },
  data() {
    return {
        Poi:{
            city:'全国',
            citylimit:true
            },
        showRemind:false,
        remindDesc:'',
        total:0,
        tags:tags,
        tagsShow:[],
        type:0,
        showPopPay:false,
        params:{
            area:'',
            time:'',
            title:'',
            nickName:'',
            phone:'',
            location:'',
            rentType:'',
            idType:'1',
            square:'',
        }
    };
  },
  mounted() {
    const addressData = provinceList;
    addressData.forEach(province => {
      province.children = cityList[province.value];
      province.children.forEach(city => {
        city.children = areaList[city.value];
      });
    });
    this.addressPicker = this.$createCascadePicker({
      title: "选择地区",
      data: addressData,
      onSelect: this.selectHandle,
      onCancel: this.cancelHandle
    });
  },
  methods: {
    ToPayFor(){
      this.showPopPay = false
    },
    checkType(type){
      this.type = type
    },
    idCheck(type){
      this.params.idType = type
    },
    cancelCheck(index){
      if(this.tagsShow[index]){
         const price = this.tagsShow[index].price;
        this.$set(this.tagsShow,index,null);
        this.total = this.total - price;
      }
     
    },
    confrimCheck(index){
        const {price,tag,id} = this.tags[index];

        switch(id){
          case 0:
          this.$set(this.tagsShow,0,{id:id,value:tag,price:price});
          break;
          case 1:
          this.$set(this.tagsShow,1,{id:id,value:tag,price:price});
          break;
          case 2:
          this.$set(this.tagsShow,2,{id:id,value:tag,price:price});
          break;
          case 3:
          this.$set(this.tagsShow,3,{id:id,value:tag,price:price});
          break;
          case 4:
          this.$set(this.tagsShow,4,{id:id,value:tag,price:price});
          break;
          case 5:
          this.$set(this.tagsShow,5,{id:id,value:tag,price:price});
          break;
          case 6:
          this.$set(this.tagsShow,5,{id:id,value:tag,price:price});
          break;
          case 7:
          this.$set(this.tagsShow,6,{id:id,value:tag,price:price});
          break;
          case 8:
          this.$set(this.tagsShow,6,{id:id,value:tag,price:price});
          break;
          case 9:
          this.$set(this.tagsShow,6,{id:id,value:tag,price:price});
          break;
          default:
          this.$set(this.tagsShow,7,{id:id,value:tag,price:price});
        }
        let total = 0;
        this.tagsShow.map(item=>{
          if(item){
            total += item.price;
          }  
        })
        this.total = total
        
    },
    showTagsDesc(index){
        this.remindDesc = this.tags[index].desc
        this.showRemind = true
    },
    closeRemind(){
        this.showRemind = false
    },
    filesAdded(files) {
      let hasIgnore = false
      const maxSize = 1 * 1024 * 1024 // 1M
      for (let k in files) {
        const file = files[k]
        if (file.size > maxSize) {
          file.ignore = true
          hasIgnore = true
        }
      }
      hasIgnore && this.$createToast({
        type: 'warn',
        time: 1000,
        txt: 'You selected >1M files'
      }).show()
    },
    showAddressPicker() {
      this.addressPicker.show();
    },
    initSearch(){
      var keywords = '北京大学';
      AMap.plugin('AMap.PlaceSearch', function(){
        var autoOptions = {
          city: ''
        }
        var placeSearch = new AMap.PlaceSearch(autoOptions);
        placeSearch.search(keywords, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(status, result)
        })
      })

    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.params.area = selectedText.join('/')
      this.Poi.city= selectedIndex[1]
      this.initSearch()
      console.log(
        `Selected Item: <br/> - value: ${selectedVal.join(
          ", "
        )} <br/> - index: ${selectedIndex.join(
          ", "
        )} <br/> - text: ${selectedText.join(" ")}`
      );
    },
    cancelHandle() {
      this.$createToast({
        type: "correct",
        txt: "Picker canceled",
        time: 1000
      }).show();
    },
    showRangePicker() {
      this.$createTimePicker({
        showNow: true,
        minuteStep: 10,
        delay: 10,
        format:"YYYY-MM-DD",
        day: {
          len: 30,
          filter: ["今天", "明天"],
          
        },
        onSelect: (selectedTime, selectedText, formatedTime) => {
          this.params.time = formatedTime
        },
        onCancel: () => {
          this.$createToast({
            type: "correct",
            txt: "Picker canceled",
            time: 1000
          }).show();
        }
      }).show();
    },
    showBuyType() {
      this.$createActionSheet({
        title: "出租方式",
        data: [
          {
            content: "<em>整套</em>",
            type: "1"
          },
          {
            content: "<em>单间</em>",
            type: "2"
          },
          {
            content: "<em>床位</em>",
            type: "3"
          }
        ],
        onSelect: (item, index) => {
          this.params.rentType = item.type
          console.log(item.type);
        }
      }).show();
    }
  }
};
</script>
<style lang="stylus">
@import '../assets/css/style.styl';

.newhouse-box {
  padding: 0 15px 10px;
}

.radio-item {
  margin-bottom: 5px;
}

.rule-desc {
  text-align: center;
  font-size: 12px;
  margin-bottom: 10px;
}
.base-upload
  margin 0 -3px
.base-upload .cube-upload-btn-def{
    background-color: #f0f0f0 !important
}
</style>
