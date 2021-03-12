import { CommonCodeApi } from "@/api"
import {DropdownUtil} from '~/util/'
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
            state.commonCodeList = payload;
        },

        setDropdowns : (state, payload) => {
            state.dropdowns = payload;
        },

        initList(state){
            state.commonCodeList = JSON.parse(JSON.stringify(state.originCommonCodeList))
        },
    },

    actions : {
        commonCodeSave({commit, state, dispatch}){
            return new Promise((resolve, reject) => {
                CommonCodeApi.save(state.commonCodeList)
                .then(response =>{
                    commit();
                    dispatch('dropdown')
                    resolve(response.status);
                })
                .catch(error => {
                    alert('업로드에 실패하였습니다.\n\n잠시 후 다시 시도해주세요.')
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
                    reject(error);
                })
            })
        },
    }
}

export default CommonCodeStore
