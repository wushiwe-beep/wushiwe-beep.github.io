

let children = {
    "p1": {
        path: '/gjgl',
        name: '稿件管理',
        icon: "el-icon-s-fold",
        pid: "p1",
        component: () => import("@/views/gjgl/index"),
        meta: {
            requireAuth: true
        }
    },
    "p8": {
        path: '/xtjs',
        name: '系统介绍',
        icon: "icon-cat-skuQuery",
        pid: "p8",
        component: () => import("@/views/xtjs/index"),
        meta: {
            requireAuth: true
        }
    },
    "p7": {
        path: '/xtgl',
        name: '稿件审核',
        icon: "el-icon-setting",
        pid: "p7",
        component: () => import("@/views/xtgl/index"),
        meta: {
            requireAuth: true
        }
    },

    "p5": {
        path: '/gjbj',
        name: '稿件编辑',
        icon: "icon-cms-manage",
        pid: "p5",
        component: () => import("@/views/gjbj/index"),
        meta: {
            requireAuth: true
        }
    },

    "p6": {
        path: '/qxgl',
        name: '系统管理',
        icon: "el-icon-thumb",
        pid: "p6",
        component: () => import("@/views/qxgl/index"),
        meta: {
            requireAuth: true
        }
    },
    "p4": {
        path: '/yhgl',
        name: '用户管理',
        icon: "icon-cus-manage",
        pid: "p4",
        component: () => import("@/views/yhgl/index"),
        meta: {
            requireAuth: true
        }
    },
    "p3": {
        path: '/grzx',
        name: '个人中心',
        icon: "el-icon-s-custom",
        pid: "p3",
        component: () => import("@/views/grzx/index"),
        meta: {
            requireAuth: true
        }
    },
    "p2": {
        path: '/wdtg',
        name: '我的投稿',
        icon: "icon-cms-manage",
        pid: "p2",
        component: () => import("@/views/wdtg/index"),
        meta: {
            requireAuth: true
        }
    },

};



export function setPression(pressionArr, router) {
    
    

    for (let i = 0; i < router.options.routes.length; i++) {

        if (router.options.routes[i]["path"] == "/index") {

            //遍历权限
            for (let j = 0; j < pressionArr.length; j++) {
            
                router.options.routes[i]["children"].push(children[pressionArr[j]["id"]])

            }

            
        }

    }
    
}

export {
    children
}