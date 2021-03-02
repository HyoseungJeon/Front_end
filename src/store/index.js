import Vue from 'vue'
import Vuex from 'vuex'

import {EmployeeStore} from './modules/'
import {CommonCodeStore} from './modules/'
import {MenuStore} from './modules'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules : {
        EmployeeStore : EmployeeStore,
        CommonCodeStore : CommonCodeStore,
        MenuStore : MenuStore,
    }
});

export default store