import Vue from 'vue'
import store from '@/store.js';
import Router from 'vue-router';

Vue.use(Router)
const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        Auth: true
      }
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
      path: '/buyhouse/:buytype',
      name: 'BuyHouse',
      component: () => import('./views/BuyHouse.vue')
    },
    {
      path: '/renthouse/:renttype',
      name: 'RentHouse',
      component: () => import('./views/RentHouse.vue')
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
      path: '/mypost',
      name: 'MyPost',
      component: () => import('./views/MyPost.vue')
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
      path: '/hotguide',
      name: 'HotGuide',
      component: () => import('./views/HotGuide.vue'),
      meta: {
        Auth: true
      }
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
      path: '/questiondetail/:id',
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
      component: () => import('./views/Product.vue'),
      meta: {
        Auth: true
      }
    },
    {
      path: '/productdetail/:id',
      name: 'ProductDetail',
      component: () => import('./views/ProductDetail.vue'),
      meta: {
        Auth: true
      }
    },
    {
      path: '/newsdetail/:id',
      name: 'NewsDetail',
      component: () => import('./views/NewsDetail.vue'),
      meta: {
        Auth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue'),
      meta: {
        Auth: true
      }
    },
    {
      path: '/forgot',
      name: 'Forgot',
      component: () => import('./views/Forgot.vue'),
      meta: {
        Auth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/Register.vue'),
      meta: {
        Auth: true
      }
    },
    {
      path: '/register2',
      name: 'Register2',
      component: () => import('./views/Register2.vue'),
      meta: {
        Auth: true
      }
    },
    {
      path: '*',
      redirect: { name: 'Login' }
    }
  ]
})
router.beforeEach((to, from, next) => {
  // ...
  const token = store.state.token;
  if (token || to.meta.Auth) {
    next()
  } else {
    next({
      path: '/login'
    });
  }
})

export default router;