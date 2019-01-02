<template>
  <div class="page">
    <Header title="租住宅"/>
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
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="cell">
        <div class="cell-label">称&emsp;&emsp;呼:</div>
        <input type="text" class="cell-input" placeholder="我们应该如何称呼您">
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="cell">
        <div class="cell-label">手机号码:</div>
        <input type="text" class="cell-input" placeholder="您的联系方式，方便我们及时与您联系">
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="cell">
        <div class="cell-label">地理位置:</div>
        <input type="text" class="cell-input" placeholder="请输入详细地址：例如:财信圣堤亚纳">
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="cell" @click="showBuyType">
        <div class="cell-label">出租类型:</div>
        <div class="cell-value">请选择类型</div>
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="cell">
        <div class="cell-label">身&emsp;&emsp;份:</div>
        <div class="radio-box">
          <div class="radio-item is_check">
            <span class="form_item_radio"></span>个人
          </div>
          <div class="radio-item">
            <span class="form_item_radio"></span>经纪人
          </div>
        </div>
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="cell">
        <div class="cell-label">面积:</div>
        <input type="text" class="cell-input" placeholder="平方米">
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="cell">
        <div class="cell-label">价格:</div>
        <input type="text" class="cell-input" placeholder="元/月">
        <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="block">
        <div class="block-label">上传房源照片:</div>
        <div class="">
            <cube-upload
                class="base-upload"
                action="//jsonplaceholder.typicode.com/photos/"
                :simultaneous-uploads="1"
                @files-added="filesAdded" />
            <div>
                <img src="" alt="" srcset="">
            </div>
        </div>
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
            <img class="tag-item-check" v-if="tag.ischeck" @click="cancelCheck(index)" src="@/assets/images/icon-6.png" alt srcset>
            <img class="tag-item-check" v-else  @click="confrimCheck(index)" src="@/assets/images/icon-7.png" alt srcset>
          </div>
        </div>
        <div class="tags-info">
          <div class="tags-info-item">
            <span class="tags-label">您已选择标签：</span>
            <span>在售、已认证、1折</span>
          </div>
          <div class="tags-info-item">
            <span class="tags-label">共计：</span>
            <span>{{total}}元</span>
          </div>
        </div>
      </div>
      <div class="rule-desc">置顶发布的信息可使成交率提高5倍！</div>
      <cube-button :primary="true" class="primary-btn" style="margin-top:10px">发布</cube-button>
    </div>
    <div class="remind-box" v-show="showRemind">
        <div class="remind-inner">
            <img class="remind-logo" src="@/assets/images/LOGO.png" alt="">
            <div class="remind-desc">{{remindDesc}}</div>
            <img class="remind-close" @click="closeRemind" src="@/assets/images/icon-18.png" alt="">
        </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import { provinceList, cityList, areaList } from "@/area.js";
import { tags } from "@/tags.js";
export default {
  name: "RentHouse",
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
        params:{
            area:'',
            time:'',
            title:'',
            nickName:'',
            phone:'',
            location:'',
            rentType:'',
            idType:'',
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
            type: "6"
          },
          {
            content: "<em>单间</em>",
            type: "7"
          },
          {
            content: "<em>床位</em>",
            type: "8"
          }
        ],
        onSelect: (item, index) => {
          console.log(item, index);
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

.base-upload .cube-upload-btn-def{
    background-color: #f0f0f0 !important
}
</style>
