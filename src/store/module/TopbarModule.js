const module = {
    // 开启命名空间
    namespaced: true,
    state: {
        isTopbarShow:true
    },
    mutations: {
        TopShow(state){
            state.isTopbarShow = true
        },
        TopHide(state){
            state.isTopbarShow = false
        }
    },
    actions: {
    },
    modules: {
    }
}

export default module