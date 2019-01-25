<template>
  <div class="page">
    <div class="mask" v-if="showdrop"></div>
    <Header :title="title"></Header>
      <div class="search-box top-45">
        <div class="location">
          <img class="location-icon-r" src="@/assets/images/icon-14.png" alt>
          <div class="location-place-r">{{stationName}}</div>
        </div>
        <cube-input class="search-min" v-model="searchWorld" placeholder="请输入区域、商圈或者编号">
          <img class="search-icon" slot="prepend" src="@/assets/images/icon-15.png" alt>
        </cube-input>
      </div>
      <div class="filter">
        <div class="filter-header">
          <div class="filter-item" :class="activeitem&&activeitem==oneData.valueField?'is_active':''" @click="setFilter(oneData.valueField)">
            {{oneData.valueName?oneData.valueName:'身份'}}
            <img src="@/assets/images/icon-17.png" alt srcset>
          </div>
          <div class="filter-item" :class="activeitem&&activeitem==twoData.valueField?'is_active':''" @click="setFilter(twoData.valueField)">
            {{twoData.valueName?twoData.valueName:'价格'}}
            <img src="@/assets/images/icon-17.png" alt srcset>
          </div>
          <div class="filter-item" :class="activeitem&&filterData.valueField==activeitem?'is_active':''" @click="setFilter(filterData.valueField)">
            {{filterData.valueName}}
            <img src="@/assets/images/icon-17.png" alt srcset>
          </div>
          <div class="filter-item" :class="activeitem&&threeData.valueField==activeitem?'is_active':''" @click="setFilter(threeData.valueField)">
            {{threeData.valueName?threeData.valueName:'分站'}}
            <img src="@/assets/images/icon-17.png" alt srcset>
          </div>
        </div>
        <div class="filter-body"  v-if="showdrop">
          <div class="id-body" v-if="oneData.valueField==activeitem&&activeitem">
            <div class="id-body-item" :class="item.id==oneparam?'is_active':''" v-for="(item,index) in oneData.zdValue" :key="index" @click="setIdentity(oneData.valueField,item.id,1)">
              <span>{{item.value}}</span>
              <img class="check-icon" v-if="item.id==oneparam" src="@/assets/images/icon-6.png" alt srcset>
              <img class="check-icon" v-else src="@/assets/images/icon-7.png" alt srcset>
            </div>
            <cube-button class="form-primary-btn" @click="getProductList()" style="margin-bottom:10px" :primary="true">确定</cube-button>
          </div>
          <div class="body-item-box"  v-if="twoData.valueField==activeitem&&activeitem">
            <div class="body-item-two" :class="item.id==twoparam?'is_active':''" v-for="(item,index) in twoData.zdValue" :key="index" @click="setIdentity(twoData.valueField,item.id,2)">
              <span>{{item.value}}</span>
              <img class="check-icon" v-if="item.id==twoparam" src="@/assets/images/icon-6.png" alt srcset>
              <img class="check-icon" v-else src="@/assets/images/icon-7.png" alt srcset>
            </div>
            <cube-button class="form-primary-btn" @click="getProductList()" style="margin-bottom:10px" :primary="true">确定</cube-button>
          </div>
          <div class="body-type"  v-if="filterData.valueField==activeitem&&activeitem"> 
            <div  v-for="(todo,row) in filterData.zdValue" v-bind:key="todo.valueField">
              <div class="body-item-name">{{todo.valueName}}</div>
              <div class="body-item-box" >
                <div class="body-item-three" v-for="(item,index) in todo.zdValue" :key="index"  @click="setIdentity(todo.valueField,item.id,3,row)">
                  <span>{{item.value}}</span>
                  <img class="check-icon" v-if="item.id==filterTags[row]" src="@/assets/images/icon-6.png" alt srcset>
                  <img class="check-icon" v-else src="@/assets/images/icon-7.png" alt srcset>
                </div>
              </div>
            </div>
            <cube-button class="form-primary-btn" @click="getProductList()" style="margin-bottom:10px" :primary="true">确定</cube-button>
         </div>
        <div class="body-type"  v-if="threeData.valueField==activeitem&&activeitem">
          <div class="body-item-box" style="justify-content: flex-start;">
            <div class="body-item-five" :class="item.id==threeparam?'is_active':''" 
             v-for="(item,index) in threeData.zdValue" :key="index" @click="setIdentity(threeData.valueField, item.id,4,item.value)">
             {{item.value}}
             </div>
          </div>
          <cube-button class="form-primary-btn" @click="getProductList()" style="margin-bottom:10px" :primary="true">确定</cube-button>
        </div>
          <!-- <div class="id-body" v-show="'id'==activeitem">
            <div class="id-body-item" :class="''==identity?'is_active':''" @click="setIdentity('')">
              <span>不限</span>
            </div>
            <div class="id-body-item" :class="1==identity?'is_active':''" @click="setIdentity(1)">
              <span>个人</span>
              <img class="check-icon" v-if="1==identity" src="@/assets/images/icon-6.png" alt srcset>
              <img class="check-icon" v-else src="@/assets/images/icon-7.png" alt srcset>
            </div>
            <div class="id-body-item" :class="2==identity?'is_active':''" @click="setIdentity(2)">
              <span>经纪人</span>
              <img class="check-icon" v-if="2==identity" src="@/assets/images/icon-6.png" alt srcset>
              <img class="check-icon" v-else src="@/assets/images/icon-7.png" alt srcset>
            </div>
            <cube-button class="form-primary-btn" @click="getProductList" style="margin-bottom:10px" :primary="true">确定</cube-button>
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
            <cube-button class="form-primary-btn" @click="getProductList" style="margin-bottom:10px" :primary="true">确定</cube-button>
          </div>
          <div class="body-type" v-show="'fi'==activeitem" >
            
            <div  v-for="(todo,index) in fiList" v-bind:key="index">
              <div class="body-item-name">{{todo.name}}</div>
              <div class="body-item-box" >
                <div class="body-item-three" v-for="(tag,key) in todo.children" :key="key">
                  <span>{{tag.name}}</span>
                  <img class="check-icon" v-if="tag.type==filterTags[index]" src="@/assets/images/icon-6.png" alt srcset>
                  <img class="check-icon" v-else src="@/assets/images/icon-7.png" alt srcset>
                </div>
              </div>
            </div>
            <cube-button class="form-primary-btn" @click="getProductList" style="margin-bottom:10px" :primary="true">确定</cube-button>
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
            <cube-button class="form-primary-btn" @click="getProductList" style="margin-bottom:10px" :primary="true">确定</cube-button>
          </div> -->
        </div>
      </div>
    <div class="list-prod">
      <!-- <div class="prod" v-for="(prod,index) in prodList" :key="index" @click="viewProductDetail">
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
      </div>      -->
      <cube-scroll
          ref="scroll"
          :data="prodList"
          :options="options"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp">
          <div v-for="prod in prodList" class="prod" :key="prod.id" @click="viewProductDetail(prod.id)">
            <div class="prod-icon">
              <img class="prod-img" v-lazy="prod.picUrls&&prod.picUrls.split(',')[0]" alt>
              <span class="prod-img-pages">{{prod.picUrls&&prod.picUrls.split(',').length}}张</span>
            </div>
            <div class="prod-info">
              <div class="prod-name">{{prod.title.length>12?prod.title.slice(0,10)+'...':prod.title}}
                <img class="prod-enjoy" src="@/assets/images/icon-2-b.png" alt srcset>
              </div>
              <div class="prod-value">
                <span v-if="prod.classify">户型:{{prod.classify}}</span>
                <span v-if="prod.area">面积:{{prod.area}}㎡</span>
                <span v-if="prod.grade">档次:{{prod.grade}}</span>
                <span v-if="prod.mating">配套:{{prod.mating}}</span>
              </div>
              <div class="prod-time">发布时间:{{prod.createTime}}</div>
              <div class="prod-tags">
                <span v-if="prod.identityMsg">{{prod.identityMsg}}</span>
                <span v-if="prod.dicorationNumMsg">{{prod.dicorationNumMsg}}</span>
                <span v-if="prod.statusMsg">{{prod.statusMsg}}</span>
              </div>
              <div class="prod-price">¥{{prod.price>=10000?(prod.price/10000)+'万':prod.price+'元'}}</div>
            </div>
          </div>
      </cube-scroll>
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
      vitype:'',
      stationName:'',
      station:'',
      oneparam: '',
      twoparam: '',
      threeparam:'',
      showdrop: false,
      prodList:[],
      filterTags:[],
      params:{
        page:1,
        pageSize:15,
        identity:'',
        auStatus:'',
        form:'',
        dicorationNum:'',
        classify:'',
        price:'',
        area:'',
        station:'',
        grade:'',
        mating:''
      },
      oneData:{valueName:"",valueField:"",zdValue:[]},
      twoData:{valueName:"",valueField:"",zdValue:[]},
      threeData:{valueName:"",valueField:"",zdValue:[]},
      filterData:{valueName:"筛选",valueField:"zd_shaixuan",zdValue:[]},
      options:{
        pullDownRefresh: {
          threshold: 60,
          stopTime: 1000,
          txt: '更新成功'
        },
        pullUpLoad: {
          threshold:60,
          txt	:{
              more:'加载更多',
              noMore:'没有更多'
          }
        }
      },
      fiList:[
        {
          name:'信息',
          value:'valid',
          children:[{
            name:'不限',
            type:''
          },{
            name:'已认证',
            type:'1'
          },{
            name:'未认证',
            type:'0'
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
            type:'1gsd6fg46fdg'
          }]
        }
      ]
    };
  },
  computed:{
    title:function(){
      switch(this.vitype){
        case '1':
        return '买住宅'
        break;
        case '2':
        return '租住宅'
        break;
        case '3':
        return '买商铺'
        break;
        case '4':
        return '租商铺'
        break;
        case '5':
        return '买办公'
        break;
        case '6':
        return '租办公'
        break;
        case '7':
        return '买厂房'
        break;
        case '8':
        return '租厂房'
        break;
         case '9':
        return '买期房'
        break;
        case '10':
        return '租酒店'
        break;
      }
      
    }
  },
  mounted(){
    
    const {type,station,stationName} = this.$route.params
    this.vitype = type;
    this.params.station = station;
    this.stationName = stationName;
    // console.log(type,station,stationName)
    this.getFileData()
    this.getProductList()
  },
  methods:{
    setIdentity(key,value,col,filter){
      const type = this.$route.params.type;
      //  console.log(key,value,filter)
      this.identity = value
     
      switch(key){
          case 'zd_shenfen':
          this.params.identity = value
          break;
          case 'zd_buy_price':
          this.params.price = value
          break;
          case 'zd_zujin':
          this.params.price = value
          break;
          case 'zd_workshop_zj':
          this.params.price = value
          break;
          case 'zd_zu_price':
          this.params.price = value
          break;
           case 'zd_dangci':
          this.params.grade = value
          break;
          case 'zd_peitao':
          this.params.mating = value
          break;
          case 'zd_xinxi':
          this.params.auStatus = value
          break;
          case 'zd_xingshi':
          this.params.form = value
          break;
          case 'zd_fenzhan':
          this.params.station = value
          break;
          case 'zd_decorate':
          this.params.dicorationNum = value
          break;
          case 'zd_houseType':
          this.params.classify = value
          break;
          case 'zd_mianji':
          this.params.area = value
          break;
           
        }
      
      if(col == 1){
        this.oneparam = value
      }
      if(col == 2){
        this.twoparam = value
      }
      if(col == 3){
        if(filter!==undefined){
          this.$set(this.filterTags,filter,value)
          // this.filterTags[filter] = value
        }
      }
      if(col == 4){
        this.stationName = filter
        this.threeparam = value
      }
    
    },
    setFilter(item){
      //  console.log(item)
      this.showdrop = true
      this.activeitem = item
    },
    getFileData(){
      const query = this.$qs.stringify({type:this.vitype}) 
     
      this.$http('/api/app/rendInfoApi/getDictionaryList','post',query,this.$store.state.token).then(res=>{
        
        if(res.data.code==100){
      
          if(this.vitype==3||this.vitype==4||this.vitype==10){
            res.data.data.map(item=>{
               console.log(item)
              if(item.valueField=="zd_xinxi" || item.valueField=='zd_zu_price' ){
                this.oneData = item
              }else if(item.valueField=="zd_buy_price" ||  item.valueField=='zd_dangci'){
                this.twoData = item
              }else if(item.valueField=="zd_fenzhan"){
                this.threeData = item
              }else{
                this.filterTags.push('')
                this.filterData.zdValue.push(item)
              }
            })
           

          }else{
             res.data.data.map(item=>{
               console.log(item)
              if(item.valueField=="zd_shenfen"){
                this.oneData = item
              }else if(item.valueField=="zd_buy_price" || item.valueField=='zd_zujin' || item.valueField=='zd_workshop_zj'){
                this.twoData = item
              }else if(item.valueField=="zd_fenzhan"){
                this.threeData = item
              }else{
                this.filterTags.push('')
                this.filterData.zdValue.push(item)
              }
              
            })
          }
        }else{

        }
       
      })
    },
    getProductList(){
      this.prodList = []
      this.showdrop = false;
      const vitype = this.vitype;
      console.log(this.showdrop)
      if(vitype==1||vitype==9){
        this.getHouseList()
      }else if(vitype==10){
        this.getHotelList()
      }else if(vitype==5||vitype==6){
        this.getOfficeList()
      }else if(vitype==2){
        this.getRentHouseList()
      }else if(vitype==3||vitype==4){
        this.getShopList()
      }else{
        this.getWorkHouseList()
      }

    },
    getHouseList(){
      this.$http('/api/app/rendInfoApi/getBuyHouseList','post',this.$qs.stringify({type:this.vitype,...this.params}),this.$store.state.token).then(res=>{
          if(res.data.code==100){
            console.log(res.data)
              if(res.data.data.rendVos.length>0){
                
                  this.prodList = this.prodList.concat(...res.data.data.rendVos)
              }
              else{
                  this.$refs.scroll.forceUpdate()
              }
          }else{
            this.$createDialog({
                type: 'alert',
                title: res.data.msg,
                icon: 'cubeic-warn'
            }).show()
          }
      })
    },
    getHotelList(){
      this.$http('/api/app/rendInfoApi/getHotelList','post',this.$qs.stringify({type:this.vitype,...this.params}),this.$store.state.token).then(res=>{
          if(res.data.code==100){
            console.log(res.data)
              if(res.data.data.rendVos.length>0){
                
                  this.prodList = this.prodList.concat(...res.data.data.rendVos)
              }
              else{
                  this.$refs.scroll.forceUpdate()
              }
          }else{
            this.$createDialog({
                type: 'alert',
                title: res.data.msg,
                icon: 'cubeic-warn'
            }).show()
          }
      })
    },
    getOfficeList(){
      this.$http('/api/app/rendInfoApi/getOfficeList','post',this.$qs.stringify({type:this.vitype,...this.params}),this.$store.state.token).then(res=>{
          if(res.data.code==100){
            console.log(res.data)
              if(res.data.data.rendVos.length>0){
                
                  this.prodList = this.prodList.concat(...res.data.data.rendVos)
              }
              else{
                  this.$refs.scroll.forceUpdate()
              }
          }else{
            this.$createDialog({
                type: 'alert',
                title: res.data.msg,
                icon: 'cubeic-warn'
            }).show()
          }
      })
    },
    
    getRentHouseList(){
       this.$http('/api/app/rendInfoApi/getRendHouseList','post',this.$qs.stringify({type:this.vitype,...this.params}),this.$store.state.token).then(res=>{
          if(res.data.code==100){
            console.log(res.data)
              if(res.data.data.rendVos.length>0){
                
                  this.prodList = this.prodList.concat(...res.data.data.rendVos)
              }
              else{
                  this.$refs.scroll.forceUpdate()
              }
          }else{
            this.$createDialog({
                type: 'alert',
                title: res.data.msg,
                icon: 'cubeic-warn'
            }).show()
          }
      })
    },
    getShopList(){
      this.$http('/api/app/rendInfoApi/getShopList','post',this.$qs.stringify({type:this.vitype,...this.params}),this.$store.state.token).then(res=>{
          if(res.data.code==100){
            console.log(res.data)
              if(res.data.data.rendVos.length>0){
                
                  this.prodList = this.prodList.concat(...res.data.data.rendVos)
              }
              else{
                  this.$refs.scroll.forceUpdate()
              }
          }else{
            this.$createDialog({
                type: 'alert',
                title: res.data.msg,
                icon: 'cubeic-warn'
            }).show()
          }
      })
    },
    getWorkHouseList(){
      this.$http('/api/app/rendInfoApi/getWorkshopList','post',this.$qs.stringify({type:this.vitype,...this.params}),this.$store.state.token).then(res=>{
          if(res.data.code==100){
            console.log(res.data)
              if(res.data.data.rendVos.length>0){
                
                  this.prodList = this.prodList.concat(...res.data.data.rendVos)
              }
              else{
                  this.$refs.scroll.forceUpdate()
              }
          }else{
            this.$createDialog({
                type: 'alert',
                title: res.data.msg,
                icon: 'cubeic-warn'
            }).show()
          }
      })
    },
    onPullingUp() {
        this.params.page = this.params.page + 1;
        this.getProductList()
    },
    onPullingDown() {
        this.params.page = 1;
        this.prodList = []
        this.getProductList()
    },
    viewProductDetail(id){
      this.$router.push({name:'ProductDetail',params:{id:id}})
    }
  }
};
</script>
<style lang="stylus">

@import '../assets/css/style.styl';
.page {
  text-align left 

}
.top-45{
  top 45px  
}


.filter {
  position fixed
  top 85px
  width 100%
  background-color #ffffff
  box-sizing border-box
  z-index 10
  overflow: hidden;
}
.filter-header {
  padding: 0 15px;
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
  text-align: left;
  width: 20%;
  font-size: 13px;
  height: 38px;
  line-height: 38px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  &.is_active {
    color: #FB6800;
  }
}
.body-item-five:nth-of-type(5n){
  text-align: right;
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
  padding 80px 15px 0px
  box-sizing: border-box
  height calc(100vh - 45px)
  .cube-pulldown-loaded,.before-trigger{
    font-size: 13px; 
  }
}
</style>
