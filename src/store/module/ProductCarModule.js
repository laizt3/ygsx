const module = {
    // 开启命名空间
    namespaced: true,
    state: {
        CarList:[],
        CarNum:'0'
    },
    mutations: {
        //列表页添加商品方法
        addProduct(state,data){
            state.CarList = data
            state.CarNum  = state.CarList.length
        }
    },
    actions: {
    },
    modules: {
    }
}

export default module