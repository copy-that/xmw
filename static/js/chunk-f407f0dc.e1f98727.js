(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f407f0dc"],{"0418":function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"header"},[t.backIcon?e("img",{staticClass:"back-icon",attrs:{src:s("1de5"),alt:""},on:{click:t.goback}}):t._e(),e("div",{staticClass:"header-name"},[t._v(t._s(t.title))])])},i=[],n={props:{backIcon:{type:Boolean,default:!0},title:{type:String}},methods:{goback:function(){this.$router.go(-1)}}},c=n,l=(s("6c3e"),s("2877")),o=Object(l["a"])(c,e,i,!1,null,null,null);a["a"]=o.exports},"1de5":function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABbklEQVRIS73WzUqFQBQA4DPizKFdwa0WLYLWLVpXeCN6CkcQ3PUEvURP0EJQ0Ofo9z5A7YOCFnGDoBahg04MXEEu6R210a0yn+fMmXOGwEgP+Q8nSZKNPM8vEfHCdd2Pv9YcDClECHEnpZwg4r4RKE3TSZ7n1wCwXpalEwTBc1OGekekkCzL7gkha5RSh3P+0rYNvaA0TbezLLtRCCHk0Pf9t1V73RlaIDO1sGVZjg6ivu0ERVG0U5blLQAIRJy6rvu+KpLqvTakECnlTEr5g4jHTdU1qBiSJNkVQqhIvhljJ10RrdQtkAcAmFNKTznnn7rpqn/XmrowDPcsy1KRzG3bnnqe99UHaY0ojuOtoigeAeCVUno2BGmFwjDcJIQ8GYfUX4ySumovRimGJcxseVfYKAe2jhlvQRU2SlNdwsyOiRpmfvDVsWqUU0qP2qas9pho6nHV5UTdGxhjB0YuJ7Vzpm5CV4yxc6OQTkf/BVj+zxto2lp7AAAAAElFTkSuQmCC"},"25d8":function(t,a,s){},"4b7f":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"page"},[e("Header",{attrs:{title:"修改资料"}}),e("div",{staticClass:"edite-box"},[e("div",{staticClass:"cell avatar-box"},[e("label",{staticClass:"cell-label",attrs:{for:""}},[t._v("头  像")]),e("div",{staticClass:"cube-upload cell-upload"},[e("div",{staticClass:"cube-upload-btn"},[t.myInfo.avatar?e("img",{staticClass:"cell-avatar",attrs:{src:t.myInfo.avatar,alt:""}}):e("img",{staticClass:"cell-avatar",attrs:{src:s("6f11"),alt:""}}),e("input",{ref:"avatar",staticClass:"cube-upload-input",attrs:{type:"file",accept:"image/*"},on:{change:t.avatarChange}})])]),e("img",{staticClass:"cell-right-icon",attrs:{src:s("5463"),alt:"",srcset:""}})]),e("div",{staticClass:"cell"},[e("div",{staticClass:"cell-label"},[t._v("昵  称")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.myInfo.nickName,expression:"myInfo.nickName"}],staticClass:"cell-input",attrs:{type:"text",placeholder:"请输入您的昵称"},domProps:{value:t.myInfo.nickName},on:{input:function(a){a.target.composing||t.$set(t.myInfo,"nickName",a.target.value)}}}),e("img",{staticClass:"cell-right-icon",attrs:{src:s("5463"),alt:""}})]),e("div",{staticClass:"cell"},[e("div",{staticClass:"cell-label"},[t._v("手 机 号")]),e("input",{staticClass:"cell-input",attrs:{readonly:"",type:"text",placeholder:"请输入您的手机号"},domProps:{value:t.myInfo.account}}),e("img",{staticClass:"cell-right-icon",attrs:{src:s("5463"),alt:""}})]),e("div",{staticClass:"cell"},[e("div",{staticClass:"cell-label"},[t._v("性  别")]),e("div",{staticClass:"radio-box"},[e("div",{staticClass:"radio-item",class:"1"==t.myInfo.sex?"is_check":"",on:{click:function(a){t.handleClick("1")}}},[e("span",{staticClass:"form_item_radio"}),t._v("男\n        ")]),e("div",{staticClass:"radio-item",class:"0"==t.myInfo.sex?"is_check":"",on:{click:function(a){t.handleClick("0")}}},[e("span",{staticClass:"form_item_radio"}),t._v("女\n        ")])]),e("img",{staticClass:"cell-right-icon",attrs:{src:s("5463"),alt:""}})]),e("div",{staticClass:"cell",on:{click:t.viewEidtePass}},[e("div",{staticClass:"cell-label"},[t._v("修改密码")]),e("span",{staticClass:"change-text"},[t._v("更改 ")]),e("img",{staticClass:"cell-right-icon",attrs:{src:s("5463"),alt:""}})]),e("cube-button",{staticClass:"primary-btn",attrs:{primary:!0},on:{click:t.saveInfo}},[t._v("保存")])],1)],1)},i=[],n=s("0418"),c={components:{Header:n["a"]},data:function(){return{myInfo:{account:"",avatar:"",nickName:"",sex:"",id:""}}},mounted:function(){this.getMyInfo()},methods:{getMyInfo:function(){var t=this;this.$http("/api/app/commonUser/getInfo","post",{},this.$store.state.token).then(function(a){if(console.log(a.data),100==a.data.code){var s=a.data.data,e=s.account,i=s.atavar,n=s.nickName,c=s.sex,l=void 0===c?"":c;t.myInfo.account=e,t.myInfo.nickName=n,t.myInfo.avatar=i,t.myInfo.sex=l}else t.$createDialog({type:"alert",title:a.data.msg,icon:"cubeic-warn"}).show()})},avatarChange:function(t){var a=this,s=t.target.files[0],e=new FileReader;e.readAsDataURL(s),e.onload=function(){a.myInfo.avatar=this.result}},handleClick:function(t){this.myInfo.sex=t,console.log(this.myInfo.sex)},viewEidtePass:function(){this.$router.push({name:"EidtePass"})},saveInfo:function(){var t=this,a=this.myInfo,s=a.avatar,e=a.nickName,i=a.sex;if(""!=s)if(""!=i)if(""!=e){var n=new FormData;n.append("image",this.$refs.avatar.files[0]),n.append("nickName",e),n.append("sex",i),this.$http("/api/app/commonUser/updateUserInfo","post",n,this.$store.state.token).then(function(a){t.$createDialog({type:"alert",title:a.data.msg,icon:100==a.data.code?"cubeic-right":"cubeic-warn",onConfirm:function(){t.$router.back()}}).show()})}else this.$createToast({txt:"昵称不能为空",type:"txt"}).show();else this.$createToast({txt:"请选择性别",type:"txt"}).show();else this.$createToast({txt:"头像不能为空",type:"txt"}).show()}}},l=c,o=(s("b886"),s("2877")),r=Object(o["a"])(l,e,i,!1,null,null,null);a["default"]=r.exports},5463:function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAA2CAYAAADUOvnEAAACnUlEQVRYR73YXWvTYBjG8etOUqoeCFtFByJd59S5nUkPRakv04koeKB+AL+fiLLhNhFRPBq+gKMvWQ1YaBVFCXST0SSXPKMtbuu2JnmeFUKOkl/+eQK5U8Eh/2RlZSWTy+VynU5nxLbtwHGcX/l8/o+p65ByuZxzHGcOwK0u8tJxnOVCofDdBCqrq6uj2Wz2LsnHAPIAPpF8YVnWu8nJyYZuVDzPOxIEwbQqJHldRE4BKJN8mslkXusuFVXQbDaPtdvt8yJyG4DaRgF8Jjmvu3QL7KEbGxsXSd4EcA3AGICK7tI+qFB1ezudzpTJ0m2gQhuNxtHNzc1pU6W7QNOlA0GTpXuCpkr3BU2UHgjqLh0K1Fk6NKirNBaoozQ2mLY0EZimNDGYtDQVmKQ0NRi3VAsYp1QbOKiU5AiAj5ZlLQB4v76+/lsrOKC0RHJMRNSM9MyyrJp2UKGu62ZF5FwURXMicgeAKv0AoGoE/A8tknwA4CoAm2TTGNhFL4nII5KzALIAWsbAarV6WkRmReQhgInurOtqB0na9Xq9QFLdRjVcXxCRpojMk9S7hiQtz/POhGF4A8B9AOMA6gCWALyJouiHtsIdZWp6n9paM5HnQRAstlqteqlUCrSAA8rUmnkkl0Tkle/7tWKx2FEPUmpw2LLeJ0UqME5ZajBuWSowSVliMGlZIjBNWWwwbVksUEfZ0KCusqFAnWUHgrrL9gVNlO0JmiobCJos2wWaLtsGHkZZH1QzJICzInK5+2fQwDd174C0e1lbWztJ8l53BikA+EpyeeebOi3UL6xUKgXbtp+QvCIifwHMh2G40JtBdEF9sFarTXRnxxMkv4nIW9/3v/RmEO2g67rHbdseD4LAiqLID8Pw58zMTFs31DvfPzX1TNHBQ8o5AAAAAElFTkSuQmCC"},"6c3e":function(t,a,s){"use strict";var e=s("25d8"),i=s.n(e);i.a},"6f11":function(t,a,s){t.exports=s.p+"img/icon-4.85485a71.png"},a471:function(t,a,s){},b886:function(t,a,s){"use strict";var e=s("a471"),i=s.n(e);i.a}}]);
//# sourceMappingURL=chunk-f407f0dc.e1f98727.js.map