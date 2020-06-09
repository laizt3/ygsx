import axios from 'axios'


// 分类页面axios请求封装

export function getClassiftList() {
    return axios({
        url: '/json/Classift/ProductList.json',
        methods: 'get',
    })
}
export function getEatBanner() {
    return axios({
        url: '/json/Eat/Eat-banner.json',
        methods: 'get',
    })
}
export function getEatData() {
    return axios({
        url: '/json/Eat/Eat-content.json',
        methods: 'get',
    })
}
export function getMine() {
    return axios({
        url: '/json/Wode/mine.json',
        methods: 'get',
    })
}


