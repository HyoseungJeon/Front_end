import { CommonCodeApi } from "@/api"
import {DropdownUtil} from '~/util/'
import {CommonCodeListDto} from '~/model/dto/'
import swal from 'sweetalert'

const dummyCommonCodeList = {
    "group": [
        {
            "groupCode": "A",
            "parentCode": null,
            "code": "A00",
            "codeName": "부서"
        },
        {
            "groupCode": "B",
            "parentCode": null,
            "code": "B00",
            "codeName": "직급"
        },
        {
            "groupCode": "C",
            "parentCode": null,
            "code": "C00",
            "codeName": "직책"
        }
    ],
    "A": [
        {
            "code": "A01",
            "codeName": "플래티어",
            "parentCode": null,
            "groupCode": "A"
        },
        {
            "code": "A02",
            "codeName": "경영지원실",
            "parentCode": "A01",
            "groupCode": "A"
        }
    ],
    "B": [
        {
            "code": "B01",
            "codeName": "대표이사",
            "parentCode": null,
            "groupCode": "B"
        },
        {
            "code": "B02",
            "codeName": "상무",
            "parentCode": "B01",
            "groupCode": "B"
        }
    ],
    "C": [
        {
            "code": "C01",
            "codeName": "CSO",
            "parentCode": null,
            "groupCode": "C"
        },
        {
            "code": "C02",
            "codeName": "CFO",
            "parentCode": null,
            "groupCode": "C"
        }
    ]
}

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
            console.log("payLoad\n" + JSON.stringify(payload))
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
            commit('setList', dummyCommonCodeList);
            // return new Promise((resolve, reject) => {
            //     CommonCodeApi.list()
            //     .then(response =>{
            //         commit('setList', response.data);
            //         resolve(response.status);
            //     })
            //     .catch(error =>{
            //         reject(error);
            //     })
            // })
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
