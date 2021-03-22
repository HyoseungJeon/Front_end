const MenuStore = {
    state : {
        activeMenuName : 'defualt',
        activeMenuNameAsKorean : {
            EmployeeRegister : '사원등록',
            EmployeeInfoReigsterView : '사원등록',
            EmployeeSkillVitaeRegisterView : '사원등록',
            EmployeeRetrieve : '사원조회',
            EmployeeInfoRetrieveView : '사원조회',
            EmployeeSkillVitaeRetrieveView : '사원조회',
            CommonCode : '코드조회',
            CommonCodeRetrieveView : '코드조회',
        },
    },

    getters : {
        getActiveMenuName : (state) => {
            return state.activeMenuName;
        },
        getActiveMenuNameAsKorean : (state) => {
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