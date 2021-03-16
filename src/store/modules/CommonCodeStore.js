import { CommonCodeApi } from "@/api"
import {DropdownUtil, SwalUtil} from '~/util/'
import {CommonCodeListDto} from '~/model/dto/'

const CommonCodeStore = {
    state : {
        originCommonCodeList : new CommonCodeListDto(),
        commonCodeList : new CommonCodeListDto(),
        dropdowns : {},
        groupTempCode : 0,
    },

    getters : {
        getCommonCodeList(state){
            return state.commonCodeList;
        },

        getDropdowns : (state) => {
            return state.dropdowns;
        },

        getOriginCommonCodeList(state){
            return state.originCommonCodeList;
        },

        getChanged(state){
            return JSON.stringify(state.commonCodeList) !== JSON.stringify(state.originCommonCodeList)
        },
        getGroupTempCode(state){
            return state.groupTempCode
        }
    },

    mutations : {
        increamentGroupTempCode(state){
            state.groupTempCode++;
        },
        setList(state, payload){
            state.originCommonCodeList = JSON.parse(JSON.stringify(payload));
            state.commonCodeList = JSON.parse(JSON.stringify(payload));
        },

        setDropdowns : (state, payload) => {
            state.dropdowns = payload;
        },

        initList(state){
            state.commonCodeList = JSON.parse(JSON.stringify(state.originCommonCodeList))
        },
    },

    actions : {
        commonCodeSave({state, dispatch}){
            return new Promise((resolve, reject) => {
                CommonCodeApi.save(state.commonCodeList)
                .then(response =>{
                    SwalUtil.serverSuccess('저장 완료');
                    dispatch('commonCodeGet')
                    resolve(response.status);
                })
                .catch(error => {
                    SwalUtil.serverError();
                    reject(error);
                })
            })
        },

        commonCodeGet({commit}){
            return new Promise((resolve, reject) => {
                CommonCodeApi.list()
                .then(response =>{
                    commit('setList', response.data);
                    resolve(response.status);
                })
                .catch(error =>{
                    SwalUtil.serverError();
                    reject(error);
                })
            })
        },

        dropdown({commit}){
            return new Promise((resolve, reject) => {
                CommonCodeApi.dropdown()
                .then(response => {
                    let dropdowns = DropdownUtil.addDefalut(response.data)
                    commit('setDropdowns', dropdowns);
                    resolve(response.status);
                })
                .catch(error => {
                    SwalUtil.serverError();
                    reject(error);
                })
            })
        },
    }
}

export default CommonCodeStore
