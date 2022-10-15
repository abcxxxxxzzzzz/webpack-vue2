import Cookie from "js-cookie"


export default {
    // 变量
    state: {
        isCollapse: false,

        // 面包屑初始值
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
        ],
        currentMenu: null,
        // token: ''
    },
    //方法
    mutations: {
        collapseMenu(state) {
            state.isCollapse = ! state.isCollapse
        },

        // 面包屑方法
        selectMenu(state, val) {
            if (val.name !== 'home') {
                // console.log(val)
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if (result === -1) {
                    state.tabsList.push(val)
                }
            }else {
                state.currentMenu = null
            }
        },
        closeTag(state, val) {
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },



        // setToken(state, val) {
        //     console.log(val)
        //     state.token = Cookie.set('token', val)
        // },
        // getToken(state) {
        //     state.token = Cookie.get('token')
        // },
        // removeToken(state) {
        //     state.token = ''
        // }


    }  
}