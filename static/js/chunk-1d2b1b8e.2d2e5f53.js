(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d2b1b8e"],{"0418":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"header"},[t.backIcon?s("img",{staticClass:"back-icon",attrs:{src:e("1de5"),alt:""},on:{click:t.goback}}):t._e(),s("div",{staticClass:"header-name"},[t._v(t._s(t.title))])])},i=[],c={props:{backIcon:{type:Boolean,default:!0},title:{type:String}},methods:{goback:function(){this.$router.go(-1)}}},n=c,o=(e("6c3e"),e("2877")),l=Object(o["a"])(n,s,i,!1,null,null,null);a["a"]=l.exports},"1de5":function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABbklEQVRIS73WzUqFQBQA4DPizKFdwa0WLYLWLVpXeCN6CkcQ3PUEvURP0EJQ0Ofo9z5A7YOCFnGDoBahg04MXEEu6R210a0yn+fMmXOGwEgP+Q8nSZKNPM8vEfHCdd2Pv9YcDClECHEnpZwg4r4RKE3TSZ7n1wCwXpalEwTBc1OGekekkCzL7gkha5RSh3P+0rYNvaA0TbezLLtRCCHk0Pf9t1V73RlaIDO1sGVZjg6ivu0ERVG0U5blLQAIRJy6rvu+KpLqvTakECnlTEr5g4jHTdU1qBiSJNkVQqhIvhljJ10RrdQtkAcAmFNKTznnn7rpqn/XmrowDPcsy1KRzG3bnnqe99UHaY0ojuOtoigeAeCVUno2BGmFwjDcJIQ8GYfUX4ySumovRimGJcxseVfYKAe2jhlvQRU2SlNdwsyOiRpmfvDVsWqUU0qP2qas9pho6nHV5UTdGxhjB0YuJ7Vzpm5CV4yxc6OQTkf/BVj+zxto2lp7AAAAAElFTkSuQmCC"},"25d8":function(t,a,e){},"2cea":function(t,a,e){"use strict";var s=e("6228"),i=e.n(s);i.a},6228:function(t,a,e){},"6c3e":function(t,a,e){"use strict";var s=e("25d8"),i=e.n(s);i.a},"886d":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"page"},[e("Header",{attrs:{title:"个人认证"}}),e("div",{staticClass:"auth-box"},[e("div",{staticClass:"auth-name"},[t._v("姓名：")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"auth-input",attrs:{type:"text",placeholder:"请输入您的姓名"},domProps:{value:t.name},on:{input:function(a){a.target.composing||(t.name=a.target.value)}}}),e("div",{staticClass:"auth-name"},[t._v("身份证正反面照片：")]),e("div",{staticClass:"upload-box"},[e("div",{staticClass:"cube-upload"},[e("img",{staticClass:"cube-upload-pic",attrs:{src:t.face,alt:"",srcset:""}}),e("div",{staticClass:"cube-upload-btn"},[""==t.face?e("div",[e("i",[t._v("＋")]),e("p",[t._v("点击上传身份证正面照")])]):t._e(),e("input",{ref:"face",staticClass:"cube-upload-input",attrs:{type:"file",accept:"image/*"},on:{change:t.faceHandler}})])]),e("div",{staticClass:"cube-upload"},[e("img",{staticClass:"cube-upload-pic",attrs:{src:t.back,alt:"",srcset:""}}),e("div",{staticClass:"cube-upload-btn"},[""==t.back?e("div",[e("i",[t._v("＋")]),e("p",[t._v("点击上传身份证背面照")])]):t._e(),e("input",{ref:"back",staticClass:"cube-upload-input",attrs:{type:"file",accept:"image/*"},on:{change:t.backHandler}})])])]),e("div",{staticClass:"auth-name"},[t._v("房产证照片：")]),e("div",{staticClass:"upload-box"},[e("div",{staticClass:"cube-upload"},[e("img",{staticClass:"cube-upload-pic",attrs:{src:t.house,alt:"",srcset:""}}),e("div",{staticClass:"cube-upload-btn"},[""==t.house?e("div",[e("i",[t._v("＋")]),e("p",[t._v("点击上传房产证照片")])]):t._e(),e("input",{ref:"house",staticClass:"cube-upload-input",attrs:{type:"file",accept:"image/*"},on:{change:t.houseHandler}})])])]),e("cube-button",{staticClass:"primary-btn",attrs:{primary:!0},on:{click:function(a){return a.stopPropagation(),t.submitForm(a)}}},[t._v("提交")])],1)],1)},i=[],c=e("0418"),n={name:"Issues",components:{Header:c["a"]},data:function(){return{name:"",face:"",back:"",house:""}},methods:{faceHandler:function(t){var a=this,e=t.target.files[0],s=new FileReader;s.readAsDataURL(e),s.onload=function(){a.face=this.result}},backHandler:function(t){var a=this,e=t.target.files[0],s=new FileReader;s.readAsDataURL(e),s.onload=function(){a.back=this.result}},houseHandler:function(t){var a=this,e=t.target.files[0],s=new FileReader;s.readAsDataURL(e),s.onload=function(){a.house=this.result}},submitForm:function(){var t=this;if(""!=this.name)if(0!=this.$refs.face.files.length)if(0!=this.$refs.back.files.length)if(0!=this.$refs.house.files.length){var a=new FormData;a.append("image1",this.$refs.face.files[0]),a.append("image2",this.$refs.back.files[0]),a.append("image3",this.$refs.house.files[0]),a.append("certificationName",this.name),this.$http("/api/app/commonUser/userCertification","post",a,this.$store.state.token).then(function(a){t.$createDialog({type:"alert",title:a.data.msg,icon:100==a.data.code?"cubeic-right":"cubeic-warn",onConfirm:function(){t.$router.back()}}).show()})}else this.$createToast({txt:"请添加房产证照片",type:"txt"}).show();else this.$createToast({txt:"请添加身份证背面照",type:"txt"}).show();else this.$createToast({txt:"请添加身份证正面照",type:"txt"}).show();else this.$createToast({txt:"名字不能为空",type:"txt"}).show()}}},o=n,l=(e("2cea"),e("2877")),r=Object(l["a"])(o,s,i,!1,null,null,null);a["default"]=r.exports}}]);
//# sourceMappingURL=chunk-1d2b1b8e.2d2e5f53.js.map