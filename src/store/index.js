import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        katalog: [],
        user: [],
        peminjaman: [],
        personalUser:[]
    },
    modules: {
        auth
    },
    mutations: {
        //sepertinya setkatalog dan setuser masih error
        setkatalog: function (data) {
            this.state.katalog = data
        },
        setUser: function (data) {
            this.state.user = data
        },
        setPersonalUser( state, data){
            state.personalUser = data
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
        getPersonalUser(state){
            return state.personalUser;
        },
        // getUserById: function (state,id) {
        //     return state.user.filter(user=>user.id==id)
        // },

        getUserById (state,id) {
            // console.log("ini state id"+id)
            console.log("ini dikeluarkan "+id)
        return state.user.find(user => user.id === id)
        // return state.user
          }
        // getKatalogByid:function (id){
        //     return 
        // }
    }
});