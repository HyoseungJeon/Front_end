const MenuStore = {
    state : {
        activeMenuName : 'default'
    },

    getters : {
        getActiveMenuName(state){
            return state.activeMenuName;
        }
    },

    mutations : {
        setActiveMenuName : (state, payload) => {
            state.activeMenuName = payload;
        }
    }
}

export default MenuStore