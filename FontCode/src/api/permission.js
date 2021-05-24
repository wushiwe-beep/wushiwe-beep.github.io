import request from "../utils/request"

export const getPression = (data )=>{
    return request({
        method: "get",
        url: "/api/user/permission.token",
        data
    })
}