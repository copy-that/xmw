<template>
    <div class="page">
        <Header title="租住宅"/>
        <div class="newhouse-box">
            <div class="cell" @click="showAddressPicker">
                <div class="cell-label">所属地区:</div>
                <div class="cell-value">请选择地区</div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell" @click="showRangePicker">
                <div class="cell-label">有&ensp;效&ensp;期:</div>
                <div class="cell-value">请选择有效期限</div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell">
                <div class="cell-label">信息标题:</div>
                <input type="text" class="cell-input" placeholder="请输入信息标题"/>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell">
                <div class="cell-label">称&emsp;&emsp;呼:</div>
                <input type="text" class="cell-input" placeholder="我们应该如何称呼您"/>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell">
                <div class="cell-label">手机号码:</div>
                <input type="text" class="cell-input" placeholder="您的联系方式，方便我们及时与您联系"/>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell">
                <div class="cell-label">地理位置:</div>
                <input type="text" class="cell-input" placeholder="请输入门牌号：例如 9号楼10层48室"/>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell" @click="showBuyType">
                <div class="cell-label">出租类型:</div>
                <div class="cell-value">请选择类型</div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
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
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell">
                <div class="cell-label">面积:</div>
                <input type="text" class="cell-input" placeholder="平方米"/>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell">
                <div class="cell-label">面积:</div>
                <input type="text" class="cell-input" placeholder="/月"/>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell" style="height:unset;padding:10px 0">
                <div class="cell-label">房屋配置:</div>
                <div class="radio-box" style="flex-wrap: wrap;">
                    <div class="radio-item is_check">
                        <span class="form_item_radio"></span>床 
                    </div>
                    <div class="radio-item">
                        <span class="form_item_radio is_check"></span>衣柜
                    </div>
                    <div class="radio-item">
                        <span class="form_item_radio is_check"></span>电视
                    </div>
                    <div class="radio-item">
                        <span class="form_item_radio"></span>热水器
                    </div>
                </div>
                <img class="cell-right-icon"  src="@/assets/images/icon-5.png" alt="">
            </div>
            <div class="cell">
                <div class="cell-label">上传房源照片:</div>
                
            </div>
            <div class="cell">
                <div class="cell-label">上传房源照片:</div>
                
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
import { provinceList, cityList, areaList } from '@/area.js'

export default {
    name:'RentHouse',
    components: {
       Header
    },
    data(){
        return{

        }
    },
    mounted () {
        const addressData = provinceList
        addressData.forEach(province => {
            province.children = cityList[province.value]
            province.children.forEach(city => {
                city.children = areaList[city.value]
            })
        })
        this.addressPicker = this.$createCascadePicker({
        title: '选择地区',
        data: addressData,
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
        })
    },
    methods:{
        showAddressPicker() {
            this.addressPicker.show()
        },
        selectHandle(selectedVal, selectedIndex, selectedText) {
            console.log(`Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`)
        },
        cancelHandle() {
        this.$createToast({
            type: 'correct',
            txt: 'Picker canceled',
            time: 1000
        }).show()
        },
        showRangePicker(){
            this.$createTimePicker({
                showNow: true,
                minuteStep: 10,
                delay: 10,
                day: {
                len: 30,
                filter: ['今天', '明天'],
                format: 'M月d日'
                },
                onSelect: (selectedTime, selectedText, formatedTime) => {
                this.$createDialog({
                    type: 'warn',
                    title: `selected time: ${selectedTime}`,
                    content: `selected text: ${selectedText}<br>format time: ${formatedTime}`,
                    icon: 'cubeic-alert'
                }).show()
                },
                onCancel: () => {
                this.$createToast({
                    type: 'correct',
                    txt: 'Picker canceled',
                    time: 1000
                }).show()
                }
            }).show()
        },
        showBuyType(){
            this.$createActionSheet({
                title: '出租方式',
                data: [
                {
                    content: '<em>整套</em>',
                    type: '6'
                },
                {
                    content: '<em>单间</em>',
                    type: '7'
                },
                {
                    content: '<em>床位</em>',
                    type: '8'
                }
                ],
                onSelect: (item, index) => {
                    console.log(item,index)
                }
            }).show()
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../assets/css/style.styl'
.newhouse-box
    padding 0 15px
.radio-item
    margin-bottom 5px
</style>
