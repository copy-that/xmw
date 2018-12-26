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
      path: '/my',
      name: 'my',
      component: () => import(/* webpackChunkName: "about" */ './views/My.vue')
    },
    {
      path: '/myinfo',
      name: 'MyInfo',
      component: () => import(/* webpackChunkName: "about" */ './views/MyInfo.vue')
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
    }
  ]
})
