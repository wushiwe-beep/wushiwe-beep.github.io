import request from "../utils/request"

export const paperList =  (data)=>{
    return request({
        method:"get",
        url:"/api/author/paperList.token",
        data
    })
}

export const delPaper = (data)=>{
    return request({
        method:"put",
        url:`/api/author/paper/${data}.token`,
    })
}

export const showPaper = (data)=>{
    return request({
        method:"get",
        url:`/api/paper/pdf/${data}.token`,
    })
}

export const getFile= (data) =>{
    return request({
        method: "post",
        url: "/api/author/paper/downLoad.token",
        responseType: "blob",
        data
    })
}

export const paperInfo = (data) =>{
    return request({
        method:"get",
        url:`/api/author/paper/audit/${data}.token`
    })
}