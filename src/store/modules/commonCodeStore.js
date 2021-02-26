import { CommonCodeApi } from "@/api"

const commonCodeStore = {

    state : {
        index : null,
        commonCodeList : [],

    },
    getters : {
        getCommonCodeList(state){
            return state.commonCodeList;
        }

    },
    mutations : {
        register : (state, payload) => {
            state.commonCodeList.push(payload);
        },

        list : (state, payload) => {
            state.commonCodeList = payload;
        },

        modify : (state, payload) =>{
            findcommonCodeIndex(payload.code);
            commonCodeList[state.index] = payload;
        },

        remove : (state, payload) => {
            findcommonCodeIndex(payload.code);
            state.commonCodeList.splice(state.index, 1);

        },

        findcommonCodeIndex : (state, code) =>{
            state.index = 0;
            for(commonCode in  state.commonCodeList){
                if(commonCode.code === code){
                    state.index = commonCode.code;
                }
            }
        }
    },

    actions : {
        register({commit}, commonCode){
            return new Promise((resolve, reject) => {
                CommonCodeApi.register(commonCode)
                .then(response =>{
                    commit('register', response);
                    resolve(response);
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
                    commit('list', response);
                    resolve(response);
                })
                .catch(error =>{
                    reject(error);
                })
            })
        },

        modify({commit}, commonCode){
            return new Promise((resolve, reject) =>{
                CommonCodeApi.modify(commonCode)
                .then(response => {
                    commit('modify', response);
                    resolve(response);

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
                    commit('remove', response);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
            })
        }

    }
}

export default commonCodeStore