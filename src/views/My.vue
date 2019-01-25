<template>
    <div class="page paddbo">
        <Header :back-icon="false" title="个人中心"/>
        <div class="my-box">
            <div class="userinfo" @click="viewMyInfo">
                <div class="userinfo-name">{{myInfo&&myInfo.nickName}}</div>
                <img v-if="myInfo&&myInfo.atavar" class="userinfo-avatar" :src="myInfo.atavar"  alt="">
                <img v-else class="userinfo-avatar" src="@/assets/images/icon-4.png"  alt="">
                <img class="userinfo-right-icon" src="@/assets/images/icon-5.png" alt="" srcset="">
            </div>
            <div class="userinfo-menu">
                <div class="menu" @click="viewMyTodo">
                    <img class="menu-icon" src="@/assets/images/tab-5.png" alt="">
                    <span class="menu-text">我的预约</span>
                </div>
                <div class="menu" @click="viewMyPoket">
                    <img class="menu-icon" src="@/assets/images/tab-6.png" alt="">
                    <span class="menu-text">我的钱包</span>
                </div>
                <div class="menu" @click="viewMyMessage">
                    <img class="menu-icon" src="@/assets/images/tab-7.png" alt="">
                    <span class="menu-text">我的消息</span>
                </div>
                <div class="menu" @click="viewMyCollection">
                    <img class="menu-icon" src="@/assets/images/tab-8.png" alt="">
                    <span class="menu-text">我的收藏</span>
                </div>
            </div>
            <div class="cell" @click="viewAuthentication">
                <div class="cell-label">个人认证</div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell" @click="viewIssues">
                <div class="cell-label">问题反馈</div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell" @click="viewQuestion">
                <div class="cell-label">常见问题</div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell" @click="viewAboutUs">
                <div class="cell-label">关于我们</div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell" @click="showSheet">
                <div class="cell-label">联系客服</div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell" @click="userLogout">
                <div class="cell-label">退出登录</div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            
        </div>
        
        <Tabbar active-tab-item="My" />
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Tabbar from "@/components/Tabbar.vue";
export default {
    name: "my",
    components: {
        Tabbar,
        Header
    },
    data(){
        return{
            myInfo:null
        }
    },
    mounted(){
        this.getMyInfo()
    },
    methods:{
        getMyInfo(){
            this.$http('/api/app/commonUser/getInfo','post',{},this.$store.state.token).then(res=>{
                console.log(res.data)
                if(res.data.code==100){
                    this.myInfo = res.data.data
                    console.log(res.data)
                }else{
                     this.$createToast({ txt: res.data.msg, type: "txt" }).show();
                }
            })
        },
        viewMyInfo(){
            this.$router.push({name:'MyInfo'})
        },
        viewAboutUs(){
            this.$router.push({name:'AboutUs'})
        },
        viewQuestion(){
            this.$router.push({name:'Question'})
        },
        viewIssues(){
            this.$router.push({name:'Issues'})
        },
        viewAuthentication(){
            this.$router.push({name:'Authentication'})
        },
        viewMyTodo(){
            this.$router.push({name:'MyTodo'})
        },
        viewMyPoket(){
            this.$router.push({name:'MyPoket'})
        },
        viewMyMessage(){
             this.$router.push({name:'MyMessage'})
        },
        viewMyCollection(){
             this.$router.push({name:'MyCollection'})
        },
        showSheet(){
            const token = this.$store.state.token;
            let sertel ;
            this.$http('/api/otherInfo/getAboutUs','get',{},token).then(res=>{
                if(res.data.code==100){
                    return res.data.data.serviceTel
                }
               
            }).then(tel=>{
                this.$createActionSheet({
                    title: '客服电话',
                    data: [
                        {
                            content: `<a href="tel:${tel}">${tel} 点击拨打</a>`
                        }
                    ],
                    onSelect: (item, index) => {
                        console.log(`Clicked ${item.content}`)
                    }
                }).show()
            })
            
        },
        userLogout(){
            this.$store.commit('removeUserToken');
            this.$router.push({name:'Login'})
        }
    }
}
</script>
<style lang="stylus" >
@import '../assets/css/style.styl';
.page {
  text-align left 

}
.my-box
    border-top 1px solid #fbfbfb
    padding 0 15px
.userinfo
    position relative
    height 90px
    display flex
    align-items center
    justify-content space-between
    .userinfo-name
        font-size:18px;
    .userinfo-avatar
        position absolute
        height 50px
        width 50px
        border-radius:50%
        right 65px
        top 25px
    .userinfo-right-icon
        width 7px
        height 13px
.userinfo-menu
    height 104px
    display flex
    justify-content space-between
    .menu
        display flex
        flex 1
        flex-direction column
        align-items center
        justify-content center
        .menu-icon
            height 25px
            width 25px
        .menu-text
            color #666666
            font-size 12px
            margin-top 8px

</style>
