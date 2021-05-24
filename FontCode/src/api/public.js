import request from "../utils/request"


// 登录接口 
export const login = (data) => {
    return request({
        method: "post",
        url: "/api/user/login",
        data
    })
};


//注册
export const register = (data) => {
    return request({
        method: "post",
        url: "/api/user/register",
        data
    })
};


//获取邮箱验证码
export const getEmailCode = (data) => {
    return request({
        method: "post",
        url: "/api/mailCode/get",
        data
    })
}

//找回密码 获取邮箱验证码
export const getRetrievePwdEmailCode = (data) =>{
    return request({
        method: "post",
        url: "/api/forgotPwd/get",
        data
    })
}

//找回密码
export const retrievePwd = (data) =>{
    return request({
        method: "post",
        url: "/api/user/forgotPwd",
        data
    })
}
