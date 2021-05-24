import request from "../utils/request"

export const userInfo = (data) =>{
    return request({
        method: "get",
        url: "/api/user/getInfo.token",
        data
    })
};
export const updateInfo = (data,params) =>{
    return request({
        method: "put",
        url: `/api/user/${params}.token`,
        data,
    })
}

export const changePwd = (data) =>{
    return request({
        method:"put",
        url:"/api/user/setPassword.token",
        data
    })
}