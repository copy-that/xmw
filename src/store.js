import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: sessionStorage.getItem('userToken') || ''
    },
    mutations: {
        // 存储TOKEN (登录存储)
        setUserToken: function (state, token) {
            sessionStorage.setItem('userToken', token);
            state.token = token;
        },
        removeUserToken:function(state){
            sessionStorage.removeItem("userToken");
            state.token='';
        }
    }
});