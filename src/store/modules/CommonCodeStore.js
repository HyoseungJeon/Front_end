import { CommonCodeApi } from "@/api"
import {DropdownUtil} from '~/util/'
import {CommonCodeListDto} from '~/model/dto/'
import swal from 'sweetalert'

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
        commonCodeSave({commit, state}){
            return new Promise((resolve, reject) => {
                CommonCodeApi.save(state.commonCodeList)
                .then(response =>{
                    swal({
                        title: "성공",
                        text: "저장이 완료되었습니다.",
                        icon: "success",
                        timer : 1000,
                    });
                    commit();
                    resolve(response.status);
                })
                .catch(error => {
                    swal('업로드에 실패하였습니다.\n\n잠시 후 다시 시도해주세요.')
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
                    swal('서버의 상태가 좋지 않습니다.\n잠시 후 다시 시도해주세요.')
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
                    swal('서버의 상태가 좋지 않습니다.\n잠시 후 다시 시도해주세요.')
                    reject(error);
                })
            })
        },
    }
}

export default CommonCodeStore
