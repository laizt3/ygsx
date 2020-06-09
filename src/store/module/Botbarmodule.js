const module = {
    // 开启命名空间
    namespaced: true,
    state: {
        isBotbarShow:true
    },
    mutations: {
        BotShow(state){
            state.isBotbarShow = true
        },
        BotHide(state){
            state.isBotbarShow = false
        }
    },
    actions: {
    },
    modules: {
    }
}

export default module