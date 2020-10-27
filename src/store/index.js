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
        },
        setUser: function (data) {
            this.state.user = data
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
        // getUserById: function (state,id) {
        //     return state.user.filter(user=>user.id==id)
        // },

        getUserById: (state) => (id) => {
            // console.log("ini state id"+id)
        return state.user.find((user) => user.id === id)
            // return ino 
          }
        // getKatalogByid:function (id){
        //     return 
        // }
    }
});