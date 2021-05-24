// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
import { getPression } from "../api/permission"
import { setPression,children } from "../utils/pressionConfig"
import store from "../vuex/store"
import { Message } from 'element-ui'
import nprogress from "nprogress"
// 启用路由
Vue.use(Router);

const xtjs = {
    path: '/xtjs',
    name: '系统介绍',
    component: () => import("@/views/xtjs/index"),
    icon: "el-icon-tickets",
    pid: "xtjs",
    meta: {
        requireAuth: true
    }
};


const routes= [
    {
        path: '/',
        name: '',
        redirect: "/xtjs"
    },
    {
        path: '/login',
        name: '用户登录',
        component: () => import("@/views/public/login"),

        meta: {
            requireAuth: false
        }
    },
    {
        path: '/register',
        name: '用户注册',
        component: () => import("@/views/public/Register"),

        meta: {
            requireAuth: false
        }
    },
    {
        path: '/retrievePwd',
        name: '找回密码',
        component: () => import("@/views/public/retrievePwd"),

        meta: {
            requireAuth: false
        }
    },
    {
        path: '/index',
        name: '首页',
        component: () => import("@/views/index"),
        children: [
            xtjs
        ]



    }

]




const router = new Router({
    routes
})

// 路由拦截器
router.beforeEach((to, from, next) => {
    nprogress.start()
    window.document.title = to.name;

    if (to.matched.length != 0) {
        if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
            if (Boolean(localStorage.getItem("token")) && Boolean(localStorage.getItem("account"))) { // 通过vuex state获取当前的user是否存在
                /**
                 * 
                 * 获取菜单
                 * 
                 */
                setMenu();


                next();
            } else {
                next({
                    path: '/login',
                    query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }
        } else {

            if (Boolean(localStorage.getItem("token")) && Boolean(localStorage.getItem("account"))) { // 判断是否登录

                /**
                 * 
                 * 获取菜单
                 */

                setMenu();

                if (to.path != "/" && to.path != "/login") { //判断是否要跳到登录界面
                    next();
                } else {
                    /**
                     * 防刷新，如果登录，修改路由跳转到登录页面，修改路由为登录后的首页 
                     */
                    next({
                        path:'/xtjs'
                    })
                }
            } else {
                next();
            }
        }
    }

    else {
        next({
            path: '/login',
            query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    }
})

router.afterEach(()=>{
    nprogress.done()
})

function setMenu() {
    
    if (store.state.isMenu) {
        /**
         * false 没有菜单
         * true 已经有菜单
         */
        
        return;
    }
    
    getPression().then((res) => {
    
     
        

        if (res.status != "200") {
            Message.error("发生了错误，请重新登陆");
            store.commit("logout");
            router.push({ path: "/login" });
            return;
        }
        const permissionArr = res.data.role.permissions
     

        setPression(permissionArr.sort((a, b) => {return a.sort - b.sort;}), router)
        router.addRoutes(router.options.routes)
        store.commit("isMenu", true);
        

        setNav(permissionArr)
        store.commit("setUserInfo", res["data"]["baseInfo"])
        
    })
}


function setNav(pression = []) {
    let menu = [
        xtjs
    ]
    let temp = pression.sort((a, b) => {return a.sort - b.sort;});

    temp.forEach((v)=>{
        menu.push(children[v["id"]])
    })

    store.commit("setMenu",menu)
}


// 导出路由 
export default router

