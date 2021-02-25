import Vue from 'vue'
import Vuex from 'vuex'

import {employeeStore} from './modules/employeeStore'
import {commonCodeStore} from './modules/commonCodeStore'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules : {
        employeeStore : employeeStore,
        commonCodeStore : commonCodeStore,
    }
});

export default store