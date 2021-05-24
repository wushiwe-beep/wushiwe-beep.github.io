import request from "../utils/request"


//用户列表
export const userList = (data)=>{
    return request({
        method:"post",
        url:"/api/admin/userList.token",
        data
    })
}


//导出所有用户
export const allList = () => {
    return request({
        method: "post",
        url: "/api/admin/userExcel/all.token",
        responseType: "blob"
    })
}


//导出部分用户

export const partList = (data) => {
    return request({
        method: "post",
        url: "/api/admin/userExcel/choose.token",
        responseType: "blob",
        data
    })
}

//状态修改
export const status = (data) =>{
    return request({
        method: "post",
        url: "/api/admin/userStatus.token",
        data
    })
}

//用户角色修改
export const role = (data) =>{
    return request({
        method: "post",
        url: "/api/admin/setRole.token",
        data
    })
}