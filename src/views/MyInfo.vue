<template>
    <div class="page">
       <Header  title="修改资料"/>
       <div class="edite-box">
            <div class="cell avatar-box">
                <label class="cell-label" for="">头&emsp;&emsp;像</label>
                <cube-upload
                    class="cell-upload"
                    ref="house"
                    >
                    <cube-upload-btn :multiple="false">
                        <img class="cell-avatar" src="@/assets/images/icon-4.png"  alt="">
                    </cube-upload-btn>
                </cube-upload>
                <img class="cell-right-icon" src="@/assets/images/icon-5.png" alt="" srcset="">
            </div>
            <div class="cell">
                <div class="cell-label">昵&emsp;&emsp;称</div>
                <input class="cell-input" type="text" placeholder="请输入您的昵称">
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell">
                <div class="cell-label">手&ensp;机&ensp;号</div>
                <input class="cell-input" type="text" placeholder="请输入您的手机号">
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell">
                <div class="cell-label">性&emsp;&emsp;别</div>
                <div class="radio-box">
                    <div class="radio-item is_check">
                        <span class="form_item_radio"></span>男
                    </div>
                    <div class="radio-item">
                        <span class="form_item_radio"></span>女
                    </div>
                </div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell" @click="viewEidtePass">
                <div class="cell-label">修改密码</div>
                <span class="change-text">更改&emsp;</span>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <cube-button class="primary-btn" :primary="true">保存</cube-button>
       </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    components:{
        Header
    },
    data(){
        return{
            sex: '1',
            sexOption:[
                {
                label: '男',
                value: '1'
                },
                {
                label: '女',
                value: '2'
                }
            ]
        }
    },
    methods:{
        viewEidtePass(){
            this.$router.push({name:'EidtePass'})
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../assets/css/style.styl';
.edite-box
    box-sizing border-box
    padding 0 15px
    width 100%
.avatar-box
    position relative
    height 75px
    .cell-upload
        position absolute
        right 30px
    .cell-avatar
        height 50px
        width 50px
.change-text
    color #717171
    text-align right
    font-size 13px

</style>
