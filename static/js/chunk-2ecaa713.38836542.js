(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ecaa713"],{"0418":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header"},[t.backIcon?a("img",{staticClass:"back-icon",attrs:{src:s("1de5"),alt:""},on:{click:t.goback}}):t._e(),a("div",{staticClass:"header-name"},[t._v(t._s(t.title))])])},n=[],i={props:{backIcon:{type:Boolean,default:!0},title:{type:String}},methods:{goback:function(){this.$router.go(-1)}}},o=i,c=(s("6c3e"),s("2877")),l=Object(c["a"])(o,a,n,!1,null,null,null);e["a"]=l.exports},"1de5":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABbklEQVRIS73WzUqFQBQA4DPizKFdwa0WLYLWLVpXeCN6CkcQ3PUEvURP0EJQ0Ofo9z5A7YOCFnGDoBahg04MXEEu6R210a0yn+fMmXOGwEgP+Q8nSZKNPM8vEfHCdd2Pv9YcDClECHEnpZwg4r4RKE3TSZ7n1wCwXpalEwTBc1OGekekkCzL7gkha5RSh3P+0rYNvaA0TbezLLtRCCHk0Pf9t1V73RlaIDO1sGVZjg6ivu0ERVG0U5blLQAIRJy6rvu+KpLqvTakECnlTEr5g4jHTdU1qBiSJNkVQqhIvhljJ10RrdQtkAcAmFNKTznnn7rpqn/XmrowDPcsy1KRzG3bnnqe99UHaY0ojuOtoigeAeCVUno2BGmFwjDcJIQ8GYfUX4ySumovRimGJcxseVfYKAe2jhlvQRU2SlNdwsyOiRpmfvDVsWqUU0qP2qas9pho6nHV5UTdGxhjB0YuJ7Vzpm5CV4yxc6OQTkf/BVj+zxto2lp7AAAAAElFTkSuQmCC"},"25d8":function(t,e,s){},"65c0":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page"},[s("Header",{attrs:{title:"消息"}}),s("div",{staticClass:"message-box"},[s("cube-scroll",{ref:"scroll",attrs:{data:t.messageList,options:t.options},on:{"pulling-down":t.onPullingDown,"pulling-up":t.onPullingUp}},t._l(t.messageList,function(e,a){return s("div",{key:a,staticClass:"message"},[s("div",{staticClass:"message-time"},[t._v(t._s(e&&e.createTime))]),s("div",{staticClass:"message-info"},[s("div",{staticClass:"message-type"},[t._v(t._s(e&&e.msgTitle))]),s("div",{staticClass:"message-text"},[t._v(t._s(e&&e.msgContent))])])])}),0)],1)],1)},n=[],i=s("75fc"),o=s("0418"),c={name:"MyMessage",components:{Header:o["a"]},data:function(){return{messageList:[],params:{page:1,pageSize:15},options:{pullDownRefresh:{threshold:60,stopTime:1e3,txt:"更新成功"},pullUpLoad:{threshold:60,txt:{more:"加载更多",noMore:"没有更多"}}}}},mounted:function(){this.getMessage()},methods:{getMessage:function(){var t=this;this.$http("/api/app/commonUser/getMessageList","post",this.$qs.stringify(this.params),this.$store.state.token).then(function(e){var s;100==e.data.code?e.data.data.length>0?t.messageList=(s=t.messageList).concat.apply(s,Object(i["a"])(e.data.data)):t.$refs.scroll.forceUpdate():t.$createDialog({type:"alert",title:e.data.msg,icon:"cubeic-warn"}).show()})},onPullingDown:function(){this.params.page=1,this.messageList=[],this.getMessage()},onPullingUp:function(){this.params.page=this.params.page+1,this.getMessage()}}},l=c,r=(s("a922"),s("2877")),g=Object(r["a"])(l,a,n,!1,null,null,null);e["default"]=g.exports},"6c3e":function(t,e,s){"use strict";var a=s("25d8"),n=s.n(a);n.a},a922:function(t,e,s){"use strict";var a=s("ced7"),n=s.n(a);n.a},ced7:function(t,e,s){}}]);
//# sourceMappingURL=chunk-2ecaa713.38836542.js.map