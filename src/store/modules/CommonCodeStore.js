import { CommonCodeApi } from "@/api"
import {DropdownUtil} from '~/util/'

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

const dummyDropdown = {
    "A" : [{
        "text": "플래티어",
        "value": "A01"
    },
    {
        "text": "경영지원실",
        "value": "A02"
    },
    {
        "text": "마케팅실",
        "value": "A03"
    },
    {
        "text": "기술연구소",
        "value": "A04"    
    }],
    "B": [{
        "text": "대표",
        "value": "B01"
    },
    {
        "text": "사장",
        "value": "B02"
    },
    {
        "text": "상무",
        "value": "B03"
    }],
    "C": [{
        "text": "CSO",
        "value": "C01"
    },
    {
        "text": "CFO",
        "value": "C02"
    }],
    "D": [{
        "text": "특채",
        "value": "D01"
    },
    {
        "text": "공채",
        "value": "D02"
    }],
    "E": [{
        "text": "기혼",
        "value": "E01"
    },
    {
        "text": "미혼",
        "value": "E02"
    }],
    "F": [{
        "text": "장교",
        "value": "F01"
    },
    {
        "text": "부사관",
        "value": "F02"
    }],
    "G": [{
        "text": "남",
        "value": "G01"
    },
    {
        "text": "여",
        "value": "G02"
    }],
    "H": [{
        "text": "휴학",
        "value": "H01"
    },
    {
        "text": "재적",
        "value": "H02"
    },
    {
        "text": "자퇴",
        "value": "H03"
    },
    {
        "text": "재학",
        "value": "H04"
    },
    {
        "text": "졸업",
        "value": "H05"
    }],
    "I": [{
        "text": "언어",
        "value": "I01"
    },
    {
        "text": "자격",
        "value": "I02"
    }],
    "J": [{
        "text": "초급",
        "value": "J01"
    },
    {
        "text": "중급",
        "value": "J02"
    },
    {
        "text": "상급",
        "value": "J03"
    }],
    "K": [{
        "text": "PM",
        "value": "K01"
    },
    {
        "text": "PL",
        "value": "K02"
    }],
    "L": [{
        "text": "Windows",
        "value": "L01"
    },
    {
        "text": "Linux",
        "value": "L02"
    }],
    "M": [{
        "text": "Oracle",
        "value": "M01"
    },
    {
        "text": "MariaDB",
        "value": "M02"
    }],
    "N": [{
        "text": "Java",
        "value": "N01"
    },
    {
        "text": "C",
        "value": "N02"
    }],
    "O": [{
        "text": "부",
        "value": "O01"
    },
    {
        "text": "모",
        "value": "O02"
    },
    {
        "text": "강아지",
        "value": "O03"
    }]
}

const CommonCodeStore = {
    state : {
        originCommonCodeList : {},
        commonCodeList : {},
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
                commit('setList',dummyCommonCodeList)
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
                dummyDropdown
                commit('setDropdowns', DropdownUtil.addDefalut(dummyDropdown))
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
