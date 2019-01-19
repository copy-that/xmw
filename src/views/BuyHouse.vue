<template>
  <div class="page">
    <Header :title="title"/>
    
    <div class="newhouse-box">
      <template v-if="buytype!==0">
      
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
      <template v-if="buytype==1||buytype==9">
      
        <div class="cell" @click="showBuyType">
          <div class="cell-label">装&emsp;&emsp;修:</div>
          <div class="cell-value">{{dicorationNum==''?"请选择装修":dicorationNum}}</div>
          <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
        </div>
        <div class="cell" @click="showHouseType">
          <div class="cell-label">房&emsp;&emsp;型:</div>
          <div class="cell-value">{{classify==''?"请选择房型":classify}}</div>
          <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt>
        </div>
      </template>
      <div class="cell" v-if="buytype!=3">
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
        <div class="cell-label">中介费:</div>
        <input type="text" v-model="params.tbBrokerageFee" class="cell-input" placeholder="中介费">
        <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
      </div>
      <div class="cell">
        <div class="cell-label">面积:</div>
        <input type="text" v-model="params.area" class="cell-input" placeholder="平方米">
        <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
      </div>
      <div class="cell">
        <div class="cell-label">价格:</div>
        <input type="text" v-model="params.price" class="cell-input" placeholder="元">
        <!-- <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt> -->
      </div>
      <div class="block">
        <div class="block-label">上传房源照片:</div>

        <div class="cube-upload base-upload">
          <div class="cube-upload-def clear-fix">
            <div class="cube-upload-btn">
              <div class="cube-upload-btn-def">
                <i></i>
              </div>
              <input type="file" ref="house" @change="handleHouse" multiple="multiple" accept="image/*" class="cube-upload-input">
            </div>
            <div class="cube-upload-file" v-for="(img,index) in image"
                :key="index">
              <div
                
                class="cube-upload-file-def"
                :style="{backgroundImage: `url(${img})`}"
              >
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
        <div class="paypop-money">￥
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
      Poi:{
        city:'全国',
        citylimit:true,
        offset:5,
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
      title:'买住宅',
      dicorationNum: "",
      classify: "",
      image:[],
      buytype:0,
      params: {
        type:0,
        provinceId: "",
        cityId: "",
        zoneId: "",
        validityFlag: "",
        title: "",
        callName: "",
        phone: "",
        locationText: "",
        dicorationNum: "",
        classify: "",
        identity: "",
        area: "",
        price: "",
        longitude:"",
        latitude:"",
        image:[],
        remark: "",
        tbBrokerageFee:"",
        payPrice:0,
        tagsId:[]
      }
    };
  },
  created() {
    this.$http(
      "/api/app/rendInfoApi/getAllTags",
      "post",
      {},
      this.$store.state.token
    ).then(res => {
      if (res.data.code == 100) {
        console.log(res.data.data)
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
    this.buytype = this.$route.params.buytype
    const buytype = this.$route.params.buytype;
    console.log(typeof buytype)
    if(buytype){
      switch(buytype){
      case '1':
      this.title = '买住宅';
      break;
      case '3':
      this.title = '买商铺';
      break;
      case '5':
      this.title = '买办公';
      break;
      case '7':
      this.title = '买厂房';
      break;
      case '9':
      this.title = '买期房';
      break;
      default:
      this.title = '未知错误';
    }
    }
    
    
    // console.log(this.$route.params.buytype)
    this.addressPicker = this.$createCascadePicker({
      title: "选择地区",
      data: addressData,
      onSelect: this.selectHandle
    });
  },
  methods: {
    handlePost(){
      console.log(this.$route.params.buytype)
      if(!this.buytype){
        this.$createToast({ txt: '非法参数错误!', type: "txt" }).show();
        return;
      }else{
        this.params.type = this.buytype
      }
      if(!this.area){
        this.$createToast({ txt: '请选择地区', type: "txt" }).show();
        return;
      }
      if(!this.params.validityFlag){
        this.$createToast({ txt: '请输入有效期', type: "txt" }).show();
        return;
      }
      if(!this.params.title){
        this.$createToast({ txt: '请输入信息标题', type: "txt" }).show();
        return;
      }
      if(!this.params.callName){
        this.$createToast({ txt: '请输入您的称呼', type: "txt" }).show();
        return;
      }
      if(!this.params.phone){
        this.$createToast({ txt: '请输入您的手机号码', type: "txt" }).show();
        return;
      }else{
        if(!this.validPhone(this.params.phone)){
          this.$createToast({ txt: '您的手机号码不正确', type: "txt" }).show();
          return;
        }
      }
      if(!this.params.locationText){
        this.$createToast({ txt: '请输入您的详细位置', type: "txt" }).show();
        return;
      }
      if(this.buytype==1||this.buytype==9){
         if(!this.params.dicorationNum){
          this.$createToast({ txt: '请选择房屋的装修情况', type: "txt" }).show();
          return;
        }
        if(!this.params.classify===''){
          this.$createToast({ txt: '请选择房屋的户型', type: "txt" }).show();
          return;
        }
      }
      if(this.buytype!==3){
        if(!this.params.identity===''){
          this.$createToast({ txt: '请选择您的身份', type: "txt" }).show();
          return;
        }
      }
      
      if(!this.params.area){
        this.$createToast({ txt: '请输入你房屋的面积', type: "txt" }).show();
        return;
      }
      if(!this.params.price){
        this.$createToast({ txt: '请输入你房屋的价格', type: "txt" }).show();
        return;
      }
      if(this.image.length==0){
        this.$createToast({ txt: '请添加你的房源照片', type: "txt" }).show();
        return;
      }
      if(!this.params.remark){
        this.$createToast({ txt: '请添加你的房源信息', type: "txt" }).show();
        return;
      }
      if(this.params.identity==1){
        if(!this.params.tbBrokerageFee){
          this.$createToast({ txt: '请输入你的中介费', type: "txt" }).show();
          return;
        }  
      }
      if(this.tagsShow.length>0){
         this.tagsShow.map(item=>{
          console.log(item)
          if(item.id){
            this.params.tagsId.push(item.id)
          }
          
        })
      }
      let form = new FormData()
      for(let ket in this.params){
        if(ket=='image'){
          for(let img in this.params[ket]){
             form.append('image',this.params[ket][img])
            
          } 
        }
        form.append(ket,this.params[ket])
      }
      var url = ''
      if(this.buytype==1||this.buytype==9){
        url = '/api/app/rendInfoApi/saveBuyHouse'
      }else if(this.buytype==5||this.buytype==7){
        url = '/api/app/rendInfoApi/saveOffice'
      }else{
        url = '/api/app/rendInfoApi/saveShop'
      }
      this.$http(url,'post',form,this.$store.state.token).then(res=>{
       
        if(res.data.code==100){
           this.$createDialog({
              type: "alert",
              title: res.data.msg,
              icon: "cubeic-info",
              onConfirm: () => {
                this.$router.back();
              }
            }).show();
        }else{
           this.$createDialog({
            type: "alert",
            title: res.data.msg,
            icon: "cubeic-info",
            onConfirm: () => {
              this.$router.back();
            }
          }).show();
        }
      })
      console.log(this.params)
      // showPopPay=true
    },
    validPhone(phone){
      var myreg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$$/;
      return myreg.test(phone)
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
        this.tagsShow.splice(index,1)
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
    handleHouse(e){
        const that = this
        if(that.image.length>6){
          this.$createDialog({
            type: "alert",
            title: '不能多于7张哦~',
            icon: "cubeic-warn"
          }).show();
           return;
        };
        var file = e.target.files[0]
        this.params.image.push(file)
        var reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = function(){
            that.image.push(this.result); 
        };
    },
    handleDelete(idx){
      this.params.image.splice(idx,1)
      this.image.splice(idx,1)
      console.log(this.params.image)
      console.log(this.image)
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
      this.params.locationText = e.target.value
      var keywords = e.target.value;
      const that = this;
      AMap.plugin("AMap.PlaceSearch", function() {
        var autoOptions = that.Poi;
        var placeSearch = new AMap.PlaceSearch(autoOptions);
        placeSearch.search(keywords, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          
          if(status=='complete'&&result.poiList.pois){
            const dataSheet = result.poiList.pois.map(item => {
            
              if(item){
                return {
                  id: item.id,
                  content: item.name,
                  location: item.location
                };
              }
            });

            that.$createActionSheet({
              title: "地理位置",
              data: dataSheet,
              onSelect: (item, index) => {
            
                that.params.locationText = item.content;
                that.params.longitude = item.location.lng;
                that.params.latitude = item.location.lat;
              }
            }).show();
          }
          
        });
      });
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.area = selectedText.join("/");
      this.Poi.city= selectedIndex[1]
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
    showBuyType() {
      const that = this;
      this.$http(
        "/api/app/rendInfoApi/getDecorate",
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
              that.dicorationNum = item.content;
              that.params.dicorationNum = item.id;
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
              console.log(item)
              that.classify = item.content;
              that.params.classify = item.id;
            }
          }).show();
        } else {
          this.$createToast({ txt: res.data.msg, type: "txt" }).show();
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
.error{
  text-align: center;
  font-size: 15px;
  height:200px;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:center;
}
</style>
