import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import {EmployeeStore} from './modules/'
import {CommonCodeStore} from './modules/'
import {MenuStore} from './modules'

Vue.use(Vuex);

const store = new Vuex.Store({
    state : {
        loading : false
    },
    mutations : {
        setLoading(state, loading){
            state.loading = loading;
        }
    },
    getters : {
        getLoading(state){
            return state.loading;
        }
    },
    modules : {
        EmployeeStore : EmployeeStore,
        CommonCodeStore : CommonCodeStore,
        MenuStore : MenuStore,
    },
    plugins : [
        createPersistedState({
            paths : ["MenuStore",],
            storage : window.sessionStorage,
        })
    ]
});

export default store