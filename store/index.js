import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'


Vue.use(Vuex)

// 对外暴露
export default new Vuex.Store ({
    modules: {
        tab
    }
})