import { CommonCodeApi } from "@/api"
import {DropdownUtil} from '~/util/'

var dummyData = {
    "group": [
        {
            "groupCode": 'A',
            "parentCode": null,
            "code": "A00",
            "codeName": "부서"
        },
        {
            "groupCode": 'B',
            "parentCode": null,
            "code": "B00",
            "codeName": "직급"
        },
        {
            "groupCode": 'C',
            "parentCode": null,
            "code": "C00",
            "codeName": "직책"
        }
    ],
    "A": [
        {
            "code": "A01",
            "codeName": "플래티어",
            "parentCode": "string",
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
            "parentCode": "",
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
            "parentCode": "",
            "groupCode": "C"
        },
        {
            "code": "C02",
            "codeName": "CFO",
            "parentCode": "",
            "groupCode": "C"
        }
    ]
};

const CommonCodeStore = {
    state : {
        originCommonCodeList : {},
        commonCodeList : {},
        dropdowns : {},
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
        }
    },

    mutations : {
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
        commonCodeSave({commit}, commonCodeList){
            return new Promise((resolve, reject) => {
                CommonCodeApi.save(commonCodeList)
                .then(response =>{
                    commit();
                    resolve(response.status);
                })
                .catch(error => {
                    reject(error);
                })
            })
        },

        commonCodeGet({commit}){
            return new Promise((resolve, reject) => {
                commit('setList', dummyData);
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
