const MenuStore = {
    state : {
        activeMenuName : 'default',
        activeMenuNameAsKorean : {
            EmployeeRegister : '사원등록',
            EmployeeRetrieve : '사원조회',
            CommonCode : '코드조회'
        }
    },

    getters : {
        getActiveMenuName(state){
            return state.activeMenuName;
        },
        getActiveMenuNameAsKorean(state){
            return state.activeMenuNameAsKorean[state.activeMenuName];
        }
    },

    mutations : {
        setActiveMenuName : (state, payload) => {
            state.activeMenuName = payload;
        }
    }
}

export default MenuStore