import { CommonCodeApi } from "@/api"

const CommonCodeStore = {

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
            state.commonCodeList[state.index] = payload;
        },

        remove : (state) => {
            state.commonCodeList.splice(state.index, 1);
        },
        setIndex : (state, payload) => {
            state.index = payload;
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

export default CommonCodeStore