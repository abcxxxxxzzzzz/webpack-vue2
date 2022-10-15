import Vue from 'vue'
import VueRouter from 'vue-router'


// 1.使用路由
Vue.use(VueRouter)

// 2.路由数组
const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../views/Main.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () =>import('../views/home')
            },
            {
                path: '/user',
                name: 'user',
                component: () =>import('../views/user')
            },
            {
                path: '/shop',
                name: 'shop',
                component: () => import('../views/shop')
            },
            {
                path: '/page1',
                name: 'page1',
                component: () => import('../views/other/pageOne')
            },
            {
                path: '/page2',
                name: 'page2',
                component: () => import('../views/other/pageTwo')
            },

        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login')
    },
]

// 3.传递给 router 实例化
const router = new VueRouter({
    mode: "history",
    routes
})


// 添加全局导航路由守卫
router.beforeEach((to, from, next) => {
    // 判断 token 是否存在
    // const token = Cookie.get('token')
    const token = localStorage.getItem('token')

    // console.log('路由守卫',)

    if (!token && to.name !== "login") {
        next({ name: 'login' })
    } else if (token && to.name === 'login') {
        next({ name: 'home' })
    } else {
        next()
    }
})


// 4.暴露路由
export default router

