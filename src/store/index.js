import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        listAgenda: [
            { hari: 'senin', kegiatan: 'Belajar Vuejs' },
            { hari: 'selasa', kegiatan: 'Belajar Laravel' },
            { hari: 'rabu', kegiatan: 'Belajar Mysql' }
        ]
    },
    modules: {
        auth
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        nama: function (state){
            return state.listAgenda
        }
    }
});