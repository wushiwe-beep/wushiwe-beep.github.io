import Vue from 'vue';
import Vuex from 'vuex';
import { delCookie } from "../utils/util"

Vue.use(Vuex);
// 登录验证
export default new Vuex.Store({
    state: {
        token: "" || localStorage.getItem("token"),
        menu:[],
        isMenu:false,  //判断是有菜单了
        userInfo:{}
    },
    mutations: {
        // 登录
        login(state, data) {
            state.token = data.token;
            localStorage.setItem("token", data.token);
            localStorage.setItem("account",data.account)
        },
        // 退出
        logout(state) {
            state.token = "";
            localStorage.clear();
            delCookie("JSESSIONID")
            setTimeout(()=>{
                location.reload()
            },500)
            
        },
        
        //判断是否有菜单
        isMenu(state,isMenu) {
            state.isMenu = isMenu
        },

        //设置菜单
        setMenu(state,menu) {
            state.menu = menu;
        },

        //设置用户个人信息
        setUserInfo(state,userInfo) {
            state.userInfo  = userInfo;
           
        }
    },
    getters:{
        getMenu(state) {
            return state.menu;
        }
    }
})