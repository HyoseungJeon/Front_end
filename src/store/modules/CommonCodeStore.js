import { CommonCodeApi } from "@/api"

const CommonCodeStore = {

    state : {
        groupCode : null,
        responseCodeList : [],
        groupCodeList : [],
        commonCodeList : [],
        dropdowns : {},

    },

    getters : {
        getGroupCodeList : (state) => {
            return state.groupCodeList;
        },

        getCommonCodeList : (state) => {
            return state.commonCodeList;
        },

        getDropdowns : (state) => {
            return state.dropdowns;
        }
    },

    mutations : {
        addCode : () => {
           this.distpach('list');
        },

        setList : (state, payload) => {
            state.responseCodeList = payload;
            state.groupCodeList = state.responseCodeList['group'];
        },

        setCommonCodeList : (state, payload) =>{
            state.groupCode = payload;
            state.commonCodeList = state.responseCodeList[state.groupCode]
        },

        setDropdowns : (state, payload) => {
            state.dropdowns = payload;
        },

        updateCode : () =>{
            this.distpach('list');
        },

        deleteCode : () => {
            this.distpach('list');
        },
    },

    actions : {
        register({commit}, commonCode){
            return new Promise((resolve, reject) => {
                CommonCodeApi.register(commonCode)
                .then(response =>{
                    commit('addCode');
                    resolve(response.status);
                })
                .catch(error => {
                    reject(error);
                })
            })
        },

        list({commit}){
            return new Promise((resolve, reject) => {
                CommonCodeApi.list()
                .then(response =>{
                    commit('setList', response.data);
                    resolve(response.status);
                })
                .catch(error =>{
                    reject(error);
                })
            })
        },

        dropdown({commit}){
            return new Promise((resolve, reject) => {
                CommonCodeApi.dropdown()
                .then(response => {
                    commit('setDropdowns', response.data);
                    resolve(response.status);
                })
                .catch(error => {
                    reject(error);
                })
            })
        },
        

        modify({commit}, commonCode){
            return new Promise((resolve, reject) =>{
                CommonCodeApi.modify(commonCode)
                .then(response => {
                    commit('updateCode');
                    resolve(response.status);

                })
                .catch(error => {
                    reject(error);
                })
            })
        },

        remove({commit}, code){
            return new Promise((resolve, reject) => {
                CommonCodeApi.remove(code)
                .then(response => {
                    commit('deleteCode');
                    resolve(response.status);
                })
                .catch(error => {
                    reject(error);
                })
            })
        }

    }
}

export default CommonCodeStore
