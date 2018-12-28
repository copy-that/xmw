import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/history',
      name: 'history',
      component: () => import(/* webpackChunkName: "about" */ './views/History.vue')
    },
    {
      path: '/buysell',
      name: 'buysell',
      component: () => import('./views/BuySell.vue')
    },
    {
      path: '/buynewhouse',
      name: 'BuyNewHouse',
      component: () => import('./views/BuyNewHouse.vue')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('./views/My.vue')
    },
    {
      path: '/myinfo',
      name: 'MyInfo',
      component: () => import('./views/MyInfo.vue')
    },
    {
      path: '/mytodo',
      name: 'MyTodo',
      component: () => import('./views/MyTodo.vue')
    },
    {
      path: '/mypoket',
      name: 'MyPoket',
      component: () => import('./views/MyPoket.vue')
    },
    {
      path: '/poketdetail',
      name: 'PoketDetail',
      component: () => import('./views/PoketDetail.vue')
    },
    {
      path: '/recharge',
      name: 'Recharge',
      component: () => import('./views/Recharge.vue')
    },
    {
      path: '/resuccess',
      name: 'ReSuccess',
      component: () => import('./views/ReSuccess.vue')
    },
    {
      path: '/withdraw',
      name: 'Withdraw',
      component: () => import('./views/Withdraw.vue')
    },
    {
      path: '/wisuccess',
      name: 'WiSuccess',
      component: () => import('./views/WiSuccess.vue')
    },
    {
      path: '/mymessage',
      name: 'MyMessage',
      component: () => import('./views/MyMessage.vue')
    },
    {
      path: '/mycollect',
      name: 'MyCollection',
      component: () => import('./views/MyCollection.vue')
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
      component: () => import('./views/AboutUs.vue')
    },
    {
      path: '/question',
      name: 'Question',
      component: () => import('./views/Question.vue')
    },
    {
      path: '/questiondetail',
      name: 'QuestionDetail',
      component: () => import('./views/QuestionDetail.vue')
    },
    {
      path: '/issues',
      name: 'Issues',
      component: () => import('./views/Issues.vue')
    },
    {
      path: '/auth',
      name: 'Authentication',
      component: () => import('./views/Authentication.vue')
    },
    {
      path: '/eidtepass',
      name: 'EidtePass',
      component: () => import('./views/EidtePass.vue')
    },
    {
      path: '/product',
      name: 'product',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Product.vue')
    },
    {
      path: '/productdetail',
      name: 'ProductDetail',
      component: () => import(/* webpackChunkName: "about" */ './views/ProductDetail.vue')
    },
    {
      path: '/newsdetail',
      name: 'NewsDetail',
      component: () => import(/* webpackChunkName: "about" */ './views/NewsDetail.vue')
    },
    
  ]
})
