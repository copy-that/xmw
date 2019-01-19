<template>
  <div class="page">
    <Header :title="title"/>

    <div class="newhouse-box">
      <template v-if="renttype!==0">
        <div class="cell" @click="showAddressPicker">
          <div class="cell-label">所属地区:</div>
          <div class="cell-value">{{area?area:'请选择地区'}}</div>
          <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
        </div>
        <div class="cell" @click="showRangePicker">
          <div class="cell-label">有&ensp;效&ensp;期:</div>
          <div class="cell-value">{{validityFlag?validityFlag:'请选择有效期限'}}</div>
          <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
        </div>
        <div class="cell">
          <div class="cell-label">信息标题:</div>
          <input type="text" v-model="params.title" class="cell-input" placeholder="请输入信息标题">
          <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
        </div>
        <div class="cell">
          <div class="cell-label">称&emsp;&emsp;呼:</div>
          <input type="text" v-model="params.callName" class="cell-input" placeholder="我们应该如何称呼您">
          <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
        </div>
        <div class="cell">
          <div class="cell-label">手机号码:</div>
          <input
            type="text"
            v-model="params.phone"
            class="cell-input"
            placeholder="您的联系方式，方便我们及时与您联系"
          >
          <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
        </div>
        <div class="cell">
          <div class="cell-label">地理位置:</div>
          <input
            type="text"
            :value="params.locationText"
            @change="initSearch"
            class="cell-input"
            placeholder="请输入详细地址：例如:财信圣堤亚纳"
          >
          <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
        </div>
        <!-- <template v-if="renttype==1||renttype==9"> -->
        <div class="cell" @click="showRentType">
          <div class="cell-label">出租类型:</div>
          <div class="cell-value">{{form==''?"请选择出租类型":form}}</div>
          <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
        </div>
        <div class="cell" @click="showHouseType">
          <div class="cell-label">房&emsp;&emsp;型:</div>
          <div class="cell-value">{{classify==''?"请选择房型":classify}}</div>
          <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
        </div>
        <!-- </template> -->
        <div class="cell">
          <div class="cell-label">身&emsp;&emsp;份:</div>
          <div class="radio-box">
            <div class="radio-item" :class="params.identity===0?'is_check':''" @click="idCheck(0)">
              <span class="form_item_radio"></span>个人
            </div>
            <div class="radio-item" :class="params.identity===1?'is_check':''" @click="idCheck(1)">
              <span class="form_item_radio"></span>经纪人
            </div>
          </div>
          <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
        </div>
        <div class="cell" v-if="params.identity===1">
          <div class="cell-label">中&ensp;介&ensp;费:</div>
          <input type="text" v-model="params.tbBrokerageFee" class="cell-input" placeholder="中介费">
          <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
        </div>
        <div class="cell">
          <div class="cell-label">面&emsp;&emsp;积:</div>
          <input type="text" v-model="params.area" class="cell-input" placeholder="平方米">
          <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
        </div>
        <div class="cell">
          <div class="cell-label">租&emsp;&emsp;金:</div>
          <input type="text" v-model="params.price" class="cell-input" placeholder="元">
          <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
        </div>
        <div class="cell cell-check">
          <div class="cell-label">房屋配置:</div>
          <div class="radio-box">
            <div
              class="radio-item radio-item-margin"
              :class="allocat.flag==0?'':'is_check'"
              v-for="(allocat,index) in allocation"
              @click="handleAlocation(index,allocat)"
              :key="allocat.id"
            >
              <span class="form_item_radio"></span>
              {{allocat.value}}
            </div>
          </div>
        </div>
        <div class="block">
          <div class="block-label">上传房源照片:</div>

          <div class="cube-upload base-upload">
            <div class="cube-upload-def clear-fix">
              <div class="cube-upload-btn">
                <div class="cube-upload-btn-def">
                  <i></i>
                </div>
                <input
                  type="file"
                  ref="house"
                  @change="handleHouse"
                  multiple="multiple"
                  accept="image/*"
                  class="cube-upload-input"
                >
              </div>
              <div class="cube-upload-file" v-for="(img,index) in image" :key="index">
                <div class="cube-upload-file-def" :style="{backgroundImage: `url(${img})`}">
                  <i class="cubeic-wrong" @click="handleDelete(index)"></i>
                  <div class="cube-upload-file-state cube-upload-file_stat">
                    <i class="cube-upload-file-status cubeic-right"></i>
                    <span class="cube-upload-file-progress">100%</span>
                  </div>
                </div>
              </div>
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
            v-model="params.remark"
            placeholder="描述一下您的房子吧..."
          ></textarea>
        </div>
        <div class="block bordered">
          <div class="block-label" style="margin:10px">来为您的房屋购买一个合适的标签吧!</div>
          <div class="tags">
            <!-- <div class="tag-item" v-for="(tag,index) in tags" :key="tag.id">
           
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
            </div>-->
            <div class="tag-item" v-for="(tag,index) in tags" :key="tag.id">
              <img
                class="tag-item-icon"
                :src="tag.tagPicUrl"
                @click="showTagsDesc(index)"
                alt
                srcset
              >
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
          <div class="tags-info">
            <div class="tags-info-item">
              <span class="tags-label">您已选择标签：</span>
              <span class="tags-value">
                <span
                  v-if="tag&&tag.value"
                  v-for="(tag,index) in tagsShow"
                  :key="index"
                >{{tag.value}}、</span>
              </span>
            </div>
            <div class="tags-info-item">
              <span class="tags-label">共计：</span>
              <span>{{params.payPrice}}元</span>
            </div>
          </div>
        </div>
        <div class="rule-desc">置顶发布的信息可使成交率提高5倍！</div>
        <cube-button
          :primary="true"
          class="primary-btn"
          @click="handlePost"
          style="margin-top:10px"
        >发布</cube-button>
      </template>
      <template v-else>
        <div class="error">网络异常稍后再试</div>
      </template>
    </div>
    <div class="remind-box" v-show="showRemind">
      <div class="remind-inner">
        <img class="remind-logo" src="@/assets/images/LOGO.png" alt>
        <div class="remind-desc">{{remindDesc}}</div>
        <img class="remind-close" @click="closeRemind" src="@/assets/images/icon-18.png" alt>
      </div>
    </div>
    <div class="paypop" v-if="showPopPay">
      <div class="paypop-inner">
        <div class="paypop-cancel" @click="showPopPay=false">取消</div>
        <div class="paypop-money">
          ￥
          <span>210</span>
        </div>
        <div class="paypop-title">请选择付款方式</div>
        <div class="paypop-cell" @click="checkType(1)">
          <img class="paypop-cell-check" v-if="paytype==1" src="@/assets/images/icon-6.png" alt>
          <img class="paypop-cell-check" v-else src="@/assets/images/icon-7.png" alt>
          <img class="paypop-cell-icon" src="@/assets/images/icon-9.png" alt>
          <div class="paypop-cell-name">支付宝</div>
        </div>
        <div class="paypop-cell" @click="checkType(2)">
          <img class="paypop-cell-check" v-if="paytype==2" src="@/assets/images/icon-6.png" alt>
          <img class="paypop-cell-check" v-else src="@/assets/images/icon-7.png" alt>
          <img class="paypop-cell-icon" src="@/assets/images/icon-10.png" alt>
          <div class="paypop-cell-name">支付宝</div>
        </div>
        <div class="paypop-cell" @click="checkType(3)">
          <img class="paypop-cell-check" v-if="paytype==3" src="@/assets/images/icon-6.png" alt>
          <img class="paypop-cell-check" v-else src="@/assets/images/icon-7.png" alt>
          <img class="paypop-cell-icon" src="@/assets/images/icon-13.png" alt>
          <div class="paypop-cell-name">支付宝</div>
        </div>
        <cube-button class="form-primary-btn" :primary="true" @click="ToPayFor">确认</cube-button>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import { addressData } from "@/area1.js";
import { tags } from "@/tags.js";
export default {
  name: "BuyHouse",
  components: {
    Header
  },
  data() {
    return {
      Poi: {
        city: "全国",
        citylimit: true,
        offset: 5
      },
      showRemind: false,
      remindDesc: "",
      total: 0,
      tags: [],
      tagsShow: [],
      paytype: 0,
      showPopPay: false,
      area: "",
      validityFlag: "",
      title: "租住宅",
      form: "",
      classify: "",
      image: [],
      imageFile: [],
      renttype: 0,
      allocation:[],
      houseAllocation:[],
      params: {
        type: 0,
        provinceId: "",
        cityId: "",
        zoneId: "",
        validityFlag: "",
        title: "",
        callName: "",
        phone: "",
        locationText: "",
        form: "",
        classify: "",
        identity: "",
        area: "",
        price: "",
        houseAllocation:"",
        longitude: "",
        latitude: "",
        remark: "",
        tbBrokerageFee: "",
        payPrice: 0,
        tagsId: []
      }
    };
  },
  created() {
    this.showHouseAllocation()
    this.$http(
      "/api/app/rendInfoApi/getAllTags",
      "post",
      {},
      this.$store.state.token
    ).then(res => {
      if (res.data.code == 100) {
        console.log(res.data.data);
        this.tags = res.data.data;
      } else {
        this.$createDialog({
          type: "alert",
          title: res.data.msg,
          icon: "cubeic-warn"
        }).show();
      }
    });
  },
  mounted() {
    // this.renttype = this.$route.params.renttype
    this.renttype = this.$route.params.renttype
    const renttype = this.$route.params.renttype;
    console.log(renttype);
    if (renttype) {
      switch (renttype) {
        case "2":
          this.title = "出租住宅";
          break;
        case "4":
          this.title = "租商铺";
          break;
        case "6":
          this.title = "租办公";
          break;
        case "8":
          this.title = "租厂房";
          break;
        case "10":
          this.title = "租酒店";
          break;
        default:
          this.title = "未知错误";
      }
    }

    // console.log(this.$route.params.renttype)
    this.addressPicker = this.$createCascadePicker({
      title: "选择地区",
      data: addressData,
      onSelect: this.selectHandle
    });
  },
  methods: {
    handlePost() {
      console.log(this.$route.params.renttype);
      if (!this.renttype) {
        this.$createToast({ txt: "非法参数错误!", type: "txt" }).show();
        return;
      } else {
        this.params.type = this.renttype;
      }
      if (!this.area) {
        this.$createToast({ txt: "请选择地区", type: "txt" }).show();
        return;
      }
      if (!this.params.validityFlag) {
        this.$createToast({ txt: "请输入有效期", type: "txt" }).show();
        return;
      }
      if (!this.params.title) {
        this.$createToast({ txt: "请输入信息标题", type: "txt" }).show();
        return;
      }
      if (!this.params.callName) {
        this.$createToast({ txt: "请输入您的称呼", type: "txt" }).show();
        return;
      }
      if (!this.params.phone) {
        this.$createToast({ txt: "请输入您的手机号码", type: "txt" }).show();
        return;
      } else {
        if (!this.validPhone(this.params.phone)) {
          this.$createToast({ txt: "您的手机号码不正确", type: "txt" }).show();
          return;
        }
      }
      if (!this.params.locationText) {
        this.$createToast({ txt: "请输入您的详细位置", type: "txt" }).show();
        return;
      }
      if (this.renttype == 1 || this.renttype == 9) {
        if (!this.params.form) {
          this.$createToast({
            txt: "请选择房屋的装修情况",
            type: "txt"
          }).show();
          return;
        }
        if (!this.params.classify === "") {
          this.$createToast({ txt: "请选择房屋的户型", type: "txt" }).show();
          return;
        }
      }
      if (this.renttype !== 3) {
        if (!this.params.identity === "") {
          this.$createToast({ txt: "请选择您的身份", type: "txt" }).show();
          return;
        }
      }

      if (!this.params.area) {
        this.$createToast({ txt: "请输入你房屋的面积", type: "txt" }).show();
        return;
      }
      if (!this.params.price) {
        this.$createToast({ txt: "请输入你房屋的价格", type: "txt" }).show();
        return;
      }
      if (this.houseAllocation.length==0) {
        this.$createToast({ txt: "请选择房屋配置", type: "txt" }).show();
        return;
      }
      
      if (this.image.length == 0) {
        this.$createToast({ txt: "请添加你的房源照片", type: "txt" }).show();
        return;
      }
      if (!this.params.remark) {
        this.$createToast({ txt: "请添加你的房源信息", type: "txt" }).show();
        return;
      }
      if (this.params.identity == 1) {
        if (!this.params.tbBrokerageFee) {
          this.$createToast({ txt: "请输入你的中介费", type: "txt" }).show();
          return;
        }
      }
      if (this.tagsShow.length > 0) {
        this.tagsShow.map(item => {
          console.log(item);
          if (item.id) {
            this.params.tagsId.push(item.id);
          }
        });
      }
      let form = new FormData();
      for (let ket in this.params) {
        
        if(ket=='houseAllocation'){
          form.append(ket, this.houseAllocation.join(','));
        }else if(ket=='tbBrokerageFee'){
          form.append(ket, this.params[ket]);
        }else{
          form.append(ket, this.params[ket]);
         
        }
      }
      for (let imk in this.imageFile) {
        form.append('image', this.imageFile[imk]);
      }
      var url = "";
      if (this.renttype == 2) {
        url = "/api/app/rendInfoApi/saveRendHouse";
      } else if (this.renttype == 4) {
        url = "/api/app/rendInfoApi/saveShop";
      } else if (this.renttype == 6||this.renttype == 8) {
        url = "/api/app/rendInfoApi/saveOffice";
      }else{
        url = "/api/app/rendInfoApi/saveHotel";
      }
      this.$http(url, "post", form, this.$store.state.token).then(res => {
        if (res.data.code == 100) {
          this.$createDialog({
            type: "alert",
            title: res.data.msg,
            icon: "cubeic-info",
            onConfirm: () => {
              this.$router.back();
            }
          }).show();
        } else {
          this.$createDialog({
            type: "alert",
            title: res.data.msg,
            icon: "cubeic-info",
            onConfirm: () => {
              this.$router.back();
            }
          }).show();
        }
      });
      console.log(this.params);
      // showPopPay=true
    },
    validPhone(phone) {
      var myreg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$$/;
      return myreg.test(phone);
    },
    ToPayFor() {
      this.showPopPay = false;
    },
    checkType(type) {
      this.paytype = type;
    },
    idCheck(type) {
      this.params.identity = type;
    },
    cancelCheck(index) {
      if (this.tagsShow[index]) {
        const price = this.tagsShow[index].price;
        this.tagsShow.splice(index, 1);
        this.params.payPrice = this.params.payPrice - price;
      }
    },
    // confrimCheck(index){
    //     const {price,tag,id} = this.tags[index];

    //     switch(id){
    //       case 0:
    //       this.$set(this.tagsShow,0,{id:id,value:tag,price:price});
    //       break;
    //       case 1:
    //       this.$set(this.tagsShow,1,{id:id,value:tag,price:price});
    //       break;
    //       case 2:
    //       this.$set(this.tagsShow,2,{id:id,value:tag,price:price});
    //       break;
    //       case 3:
    //       this.$set(this.tagsShow,3,{id:id,value:tag,price:price});
    //       break;
    //       case 4:
    //       this.$set(this.tagsShow,4,{id:id,value:tag,price:price});
    //       break;
    //       case 5:
    //       this.$set(this.tagsShow,5,{id:id,value:tag,price:price});
    //       break;
    //       case 6:
    //       this.$set(this.tagsShow,5,{id:id,value:tag,price:price});
    //       break;
    //       case 7:
    //       this.$set(this.tagsShow,6,{id:id,value:tag,price:price});
    //       break;
    //       case 8:
    //       this.$set(this.tagsShow,6,{id:id,value:tag,price:price});
    //       break;
    //       case 9:
    //       this.$set(this.tagsShow,6,{id:id,value:tag,price:price});
    //       break;
    //       default:
    //       this.$set(this.tagsShow,7,{id:id,value:tag,price:price});
    //     }
    //     let total = 0;
    //     this.tagsShow.map(item=>{
    //       if(item){
    //         total += item.price;
    //       }
    //     })
    //     this.total = total

    // },
    confrimCheck(index) {
      const { tagPrice: price, tagName: tag, id, flagValue } = this.tags[index];

      this.$set(this.tagsShow, flagValue, { id: id, value: tag, price: price });
      let total = 0;
      this.tagsShow.map(item => {
        if (item) {
          total += item.price;
        }
      });
      this.params.payPrice = total;
    },
    handleHouse(e) {
      const that = this;
      if (that.image.length > 6) {
        this.$createDialog({
          type: "alert",
          title: "不能多于7张哦~",
          icon: "cubeic-warn"
        }).show();
        return;
      }
      var file = e.target.files[0];
      this.imageFile.push(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        that.image.push(this.result);
      };
    },
    handleDelete(idx) {
      this.imageFile.splice(idx, 1);
      this.image.splice(idx, 1);
      console.log(this.params.image);
      console.log(this.image);
    },
    handleAlocation(idx,allocat){
      const {flag,id} = this.allocation[idx]
      this.allocation[idx].flag = flag==0?1:0;
      if(this.houseAllocation.indexOf(id)>=0){
        this.houseAllocation.splice(idx,1)
      }else{
         this.houseAllocation.push(id)
      }
    },
    showTagsDesc(index) {
      this.remindDesc = this.tags[index].remark;
      this.showRemind = true;
    },
    // showTagsDesc(index){
    //     this.remindDesc = this.tags[index].desc
    //     this.showRemind = true
    // },
    closeRemind() {
      this.showRemind = false;
    },
    filesAdded(files) {
      let hasIgnore = false;
      const maxSize = 1 * 1024 * 1024; // 1M
      for (let k in files) {
        const file = files[k];
        if (file.size > maxSize) {
          file.ignore = true;
          hasIgnore = true;
        }
      }
      hasIgnore &&
        this.$createToast({
          type: "warn",
          time: 1000,
          txt: "You selected >1M files"
        }).show();
    },
    showAddressPicker() {
      this.addressPicker.show();
    },
    initSearch(e) {
      this.params.locationText = e.target.value;
      var keywords = e.target.value;
      const that = this;
      AMap.plugin("AMap.PlaceSearch", function() {
        var autoOptions = that.Poi;
        var placeSearch = new AMap.PlaceSearch(autoOptions);
        placeSearch.search(keywords, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据

          if (status == "complete" && result.poiList.pois) {
            const dataSheet = result.poiList.pois.map(item => {
              if (item) {
                return {
                  id: item.id,
                  content: item.name,
                  location: item.location
                };
              }
            });

            that
              .$createActionSheet({
                title: "地理位置",
                data: dataSheet,
                onSelect: (item, index) => {
                  that.params.locationText = item.content;
                  that.params.longitude = item.location.lng;
                  that.params.latitude = item.location.lat;
                }
              })
              .show();
          }
        });
      });
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.area = selectedText.join("/");
      this.Poi.city = selectedIndex[1];
      this.params.provinceId = selectedVal[0];
      this.params.cityId = selectedVal[1];
      this.params.zoneId = selectedVal[2];
      console.log(selectedVal);
    },
    showRangePicker() {
      this.$http(
        "/api/app/rendInfoApi/getPeriod",
        "post",
        {},
        this.$store.state.token
      ).then(res => {
        console.log(res.data);
        if (res.data.code == 100) {
          const dataSheet = res.data.data.map(item => {
            return {
              id: item.id,
              content: item.periodName,
              value: item.periodValue
            };
          });
          this.$createActionSheet({
            title: "有效期",
            data: dataSheet,
            onSelect: (item, index) => {
              this.validityFlag = item.content;
              this.params.validityFlag = item.value;
            }
          }).show();
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      });
    },
    showRentType() {
      const that = this;
      this.$http(
        "/api/app/rendInfoApi/getRendType",
        "post",
        {},
        this.$store.state.token
      ).then(res => {
        console.log(res.data);

        if (res.data.code == 100) {
          const dataSheet = res.data.data.map(item => {
            return {
              id: item.id,
              content: item.value
            };
          });
          this.$createActionSheet({
            title: "装修类型",
            data: dataSheet,
            onSelect: (item, index) => {
              that.form = item.content;
              that.params.form = item.id;
            }
          }).show();
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      });
    },
    showHouseType() {
      const that = this;
      this.$http(
        "/api/app/rendInfoApi/getHouseType",
        "post",
        {},
        this.$store.state.token
      ).then(res => {
        console.log(res.data);
        if (res.data.code == 100) {
          const dataSheet = res.data.data.map(item => {
            return {
              id: item.id,
              content: item.value
            };
          });
          this.$createActionSheet({
            title: "房屋类型",
            data: dataSheet,
            onSelect: (item, index) => {
              console.log(item);
              that.classify = item.content;
              that.params.classify = item.id;
            }
          }).show();
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
        }
      });
    },
    showHouseAllocation() {
      this.$http(
        "/api/app/rendInfoApi/getAllocation",
        "post",
        {},
        this.$store.state.token
      ).then(res => {
        console.log(res.data);
        if (res.data.code == 100) {
          this.allocation = res.data.data;
        } else {
          this.$createToast({ time: 0, txt: "Toast time 0" }).show();
        }
      });
    }
  }
};
</script>
<style lang="stylus">
@import '../assets/css/style.styl';

.newhouse-box {
  padding: 0 15px 10px;
}

.cell-check {
  margin: 20px 0;
  height: auto;
  border: 0;
  align-items: flex-start;
}

.radio-item-margin {
  margin-bottom: 10px;
  min-width: 50px;
  font-size: 13px;
  color: #111;
}

.radio-item {
  margin-bottom: 5px;
}

.rule-desc {
  text-align: center;
  font-size: 12px;
  margin-bottom: 10px;
}

.base-upload {
  margin: 0 -3px;
}

.base-upload .cube-upload-btn-def {
  background-color: #f0f0f0 !important;
}

.error {
  text-align: center;
  font-size: 15px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: center;
}
</style>
