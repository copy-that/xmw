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
          <div class="tag-item">
            <img class="tag-item-icon" src="@/assets/images/tag-1.png" alt srcset>
            <img class="tag-item-check" src="@/assets/images/icon-6.png" alt srcset>
          </div>
          <div class="tag-item">
            <img class="tag-item-icon" src="@/assets/images/tag-1.png" alt srcset>
            <img class="tag-item-check" src="@/assets/images/icon-6.png" alt srcset>
          </div>
          <div class="tag-item">
            <img class="tag-item-icon" src="@/assets/images/tag-1.png" alt srcset>
            <img class="tag-item-check" src="@/assets/images/icon-6.png" alt srcset>
          </div>
          <div class="tag-item">
            <img class="tag-item-icon" src="@/assets/images/tag-1.png" alt srcset>
            <img class="tag-item-check" src="@/assets/images/icon-6.png" alt srcset>
          </div>
          <div class="tag-item">
            <img class="tag-item-icon" src="@/assets/images/tag-1.png" alt srcset>
            <img class="tag-item-check" src="@/assets/images/icon-6.png" alt srcset>
          </div>
          <div class="tag-item">
            <img class="tag-item-icon" src="@/assets/images/tag-1.png" alt srcset>
            <img class="tag-item-check" src="@/assets/images/icon-7.png" alt srcset>
          </div>
          <div class="tag-item">
            <img class="tag-item-icon" src="@/assets/images/tag-1.png" alt srcset>
            <img class="tag-item-check" src="@/assets/images/icon-7.png" alt srcset>
          </div>
          <div class="tag-item">
            <img class="tag-item-icon" src="@/assets/images/tag-1.png" alt srcset>
            <img class="tag-item-check" src="@/assets/images/icon-6.png" alt srcset>
          </div>
        </div>
        <div class="tags-info">
          <div class="tags-info-item">
            <span class="tags-label">您已选择标签：</span>
            <span>在售、已认证、1折</span>
          </div>
          <div class="tags-info-item">
            <span class="tags-label">共计：</span>
            <span>100元</span>
          </div>
        </div>
      </div>
      <div class="rule-desc">置顶发布的信息可使成交率提高5倍！</div>
      <cube-button :primary="true" class="primary-btn" style="margin-top:10px">发布</cube-button>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import { provinceList, cityList, areaList } from "@/area.js";

export default {
  name: "BuyNewHouse",
  components: {
    Header
  },
  data() {
    return {
      Poi:{
          city:'全国',
          citylimit:true
        },
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
  padding: 0 15px;
}

.radio-item {
  margin-bottom: 5px;
}

.rule-desc {
  text-align: center;
  font-size: 12px;
  margin-bottom: 10px;
}

.block {
  margin: 10px 0 20px;
}

.block.bordered {
  border: 1px solid #f2f2f2;
  border-radius: 4px;
}

.block-label {
  font-size: 15px;
  margin-bottom: 10px;
}

.tags-info {
  padding: 15px;
  box-sizing: border-box;
  height: 70px;
  background-color: #f7f7f7;

  .tags-info-item {
    margin-bottom: 10px;
    display: flex;
    font-size: 13px;
  }
}

.tags {
  display: flex;
  flex-wrap: wrap;

  .tag-item {
    position: relative;
    padding: 12.5px 0;
    height: 92px;
    width: 25%;
    box-sizing border-box
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content space-between;
    .tag-item-icon {
      width: 46px;
    }

    .tag-item-check {
      // position: absolute;
      bottom: 20px;
      height: 10px;
      width: 10px;
    }
  }
}
.base-upload .cube-upload-btn-def{
    background-color: #f0f0f0 !important
}
</style>
