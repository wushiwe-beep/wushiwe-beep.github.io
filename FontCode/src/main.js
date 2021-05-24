// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';


import App from './App';
// 引入路由
import router from './router';
// 引入状态管理
import store from './vuex/store';
// 引入icon
import './assets/icon/iconfont.css'

// 

//ElementUI 
import element from  './utils/element.js'
import { Message,MessageBox} from "element-ui"
Vue.use(element)
Vue.prototype.$message = Message 
Vue.component(MessageBox)




Vue.config.productionTip = false;

// // 过滤器
import * as custom from './utils/util'

Object.keys(custom).forEach(key => {

    Vue.filter(key, custom[key])
})



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store, //使用store vuex状态管理
    components: { App },
    template: '<App/>',
    data: {
        // 空的实例放到根组件下，所有的子组件都能调用
        Bus: new Vue()
    }

})