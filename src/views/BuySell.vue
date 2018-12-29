<template>
  <div class="page paddbo">
    <Header :back-icon="false" title="发布信息"/>
    <div class="buysell-box">
      <div class="name">点击选择</div>
      <div class="card" @click="showBuySheet">
        <img class="card-icon" src="@/assets/images/icon-12.png" alt>
        <div class="card-name">买房信息</div>
        <img class="card-arrow" src="@/assets/images/icon-5.png" alt>
      </div>
      <div class="card" @click="showSellSheet">
        <img class="card-icon" src="@/assets/images/icon-12.png" alt>
        <div class="card-name">买房信息</div>
        <img class="card-arrow" src="@/assets/images/icon-5.png" alt>
      </div>
      <cube-button :primary="true" class="primary-btn">查看我的发布</cube-button>
    </div>
    <Tabbar active-tab-item="buysell" @click="viewMypost" />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Tabbar from "@/components/Tabbar.vue";
export default {
    name:'BuySell',
    components: {
        Tabbar,
        Header
    },
    data(){
        return{}
    },
    methods:{
        viewMypost(){
            this.$router.push({name:'Mypost'})
        },
        showBuySheet() {
            this.$createActionSheet({
                title: '买房信息',
                data: [
                {
                    content: '<em>住宅</em>',
                    id: '6'
                },
                {
                    content: '<em>商铺</em>',
                    id: '7'
                },
                {
                    content: '<em>写字楼</em>',
                    id: '8'
                },
                {
                    content: '<em>厂房仓库</em>',
                    id: '9'
                },
                {
                    content: '买新房',
                    id: '10'
                },
                ],
                onSelect: (item, index) => {
                    this.$router.push({name:'BuyNewHouse'})
                }
            }).show()
        },
        showSellSheet(){
            this.$createActionSheet({
                title: '出租信息',
                data: [
                {
                    content: '<em>住宅</em>',
                    class: 'cube-foo'
                },
                {
                    content: '<em>商铺</em>',
                    class: 'cube-foo'
                },
                {
                    content: '<em>写字楼</em>',
                    class: 'cube-foo'
                },
                {
                    content: '<em>厂房仓库</em>',
                    class: 'cube-foo'
                },
                {
                    content: '<em>租酒店</em>',
                    class: 'cube-foo'
                },
                ],
                onSelect: (item, index) => {
                this.$createToast({
                    txt: `Clicked ${item.content}`,
                    time: 1000
                }).show()
                }
            }).show()
        }
    }
}
</script>
<style lang="stylus" scoped>
.buysell-box {
  .name {
    text-align center;
    color: #666666;
    font-size: 15px;
    margin: 37px auto 18px;
  }
}

.card {
  position: relative;
  border-radius: 6px;
  height: 100px;
  background-color: #ffffff;
  margin: 16px 15px;
  box-shadow: 0 0 2px 2px #f5f5f5;
  display: flex;
  align-items: center;

  .card-icon {
    margin-left: 35px;
    height: 40px;
    width: 40px;
  }

  .card-name {
    color: #FF6B00;
    font-size: 17px;
    margin-left: 26px;
  }

  .card-arrow {
    position: absolute;
    top: 40px;
    right: 30px;
    height: 20px;
    width: 10px;
  }
}
</style>
