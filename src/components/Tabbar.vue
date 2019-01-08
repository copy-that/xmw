<template>
   <cube-tab-bar
   class="tabbar"
    v-model="activeTab"
    @click="clickHandler">
    <cube-tab class="tab-item" v-for="item in tabs" :label="item.label" :key="item.label">
      <!-- name为icon的插槽 -->
      <!-- <i slot="icon" :class="item.icon"></i> -->
      <img slot="icon" :src="activeTab==item.label?item.icon_active:item.icon" class="b-img-40" />
      <!-- 默认插槽 -->
      <div class="b-font-22">{{item.name}}</div>
    </cube-tab>
  </cube-tab-bar>
</template>
<script>
export default {
  props:{
    activeTabItem:{
      type:String,
      default:'home'
    }
  },
  data () {
    return {
      activeTab:'',
      tabs: [{
        name: '首 页',
        label:'home',
        icon: require('@/assets/images/tab-1.png'),
        icon_active:  require('@/assets/images/tab-1-p.png'),
      }, {
        name: '历史',
        label:'history',
        icon:  require('@/assets/images/tab-2.png'),
        icon_active:  require('@/assets/images/tab-2-p.png'),
      }, {
        name: '出租出售发布',
        label:'buysell',
        icon:  require('@/assets/images/tab-3.png'),
        icon_active:  require('@/assets/images/tab-3-p.png'),
      }, {
        name: '我的',
        label:'my',
        icon:  require('@/assets/images/tab-4.png'),
        icon_active:  require('@/assets/images/tab-4-p.png'),
      }]
    }
  },
  mounted(){
    this.activeTab = this.activeTabItem
  },
  methods: {
    clickHandler (name) {
      // if you clicked home tab, then print 'Home'
      console.log(name)
      this.$router.replace({ name: name})
    }
  }
}
</script>
<style >
    .tabbar{
        position: fixed;
        border-top: 1px solid #f2f2f2;
        bottom: 0;
        left: 0;
        width: 100vw;
        background-color: #ffffff;
        z-index: 10;
    }
    .tab-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 49px;
        box-sizing: border-box;
        padding: 5px 0;
    }
    .b-font-22{
        height: 16px;
        line-height: 16px;
        font-size: 11px;
    }
    .b-img-40{
        display: block;
        height: 20px;
        width: 20px;
    }
</style>