import wx from 'weixin-jsapi'
const jsApiList = ['chooseWXPay']
export default function wxPay(args, id) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: args.appId, // 必填，公众号的唯一标识
    timestamp: args.timeStamp, // 必填，生成签名的时间戳
    nonceStr: args.nonceStr, // 必填，生成签名的随机串
    signature: args.paySign, // 必填，签名
    jsApiList: jsApiList // 必填，需要使用的JS接口列表
  })
  wx.ready(function () {
    wx.chooseWXPay({
      nonceStr: args.nonceStr, // 支付签名随机串
      package: args.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      paySign: args.paySign, // 支付签名
      signType: args.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      timestamp: args.timeStamp, // 支付签名时间戳
      success: function (res) {
        window.location.href =
          'https://localhost:8080/#/my'
      },
      cancel: function (res) {
        alert('已取消支付')
      },
      fail: function (res) {
        alert('购买失败，请重新创建订单')
      }
    })
  })
  wx.error(function (res) {
    alert('微信验证失败')
  })
}
