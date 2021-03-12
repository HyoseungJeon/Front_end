import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import {EmployeeStore} from './modules/'
import {CommonCodeStore} from './modules/'
import {MenuStore} from './modules'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules : {
        EmployeeStore : EmployeeStore,
        CommonCodeStore : CommonCodeStore,
        MenuStore : MenuStore,
    },
    plugins : [
        createPersistedState({
            paths : ["MenuStore", "CommonCodeStore"],
            storage : window.sessionStorage,
        })
    ]
});

export default store