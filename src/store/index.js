import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        katalog: [],
        user: [],
        peminjaman: []
    },
    modules: {
        auth
    },
    mutations: {
        setkatalog: function (data) {
            this.state.katalog = data
        }
    },
    actions: {

    },
    getters: {
        getKatalog: function (state) {
            return state.katalog
        },
        getPeminjaman: function (state) {
            return state.peminjaman
        },
        getUser: function (state) {
            return state.user
        },
        // getKatalogByid:function (id){
        //     return 
        // }
    }
});