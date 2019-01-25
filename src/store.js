import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage&&localStorage.getItem('userToken') || '',
        hasAuth: localStorage&&localStorage.getItem('auth') || false,
    },
    mutations: {
        setAuth:function (state, auth) {
            localStorage&&localStorage.setItem('auth', auth);
            state.hasAuth = auth;
        },
        // 存储TOKEN (登录存储)
        setUserToken: function (state, token) {
            localStorage&&localStorage.setItem('userToken', token);
            state.token = token;
        },
        removeUserToken:function(state){
            localStorage&&localStorage.removeItem("userToken");
            state.token='';
        }
    }
});