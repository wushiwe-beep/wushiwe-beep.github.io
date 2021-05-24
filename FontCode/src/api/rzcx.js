import request from "../utils/request"


export const logList = (data) => {
    return request({
        method: "post",
        url: "/api/admin/logList.token",
        data
    })
}

export const allList = () => {
    return request({
        method: "post",
        url: "/api/admin/logExcel/all.token",
        responseType: "blob"
    })
}


export const partList = (data) => {
    return request({
        method: "post",
        url: "/api/admin/logExcel/choose.token",
        responseType: "blob",
        data
    })
}


// export const partList = (data) => {
//     return request({
//         method: "post",
//         url: "/api/logs",
//         responseType: "blob",
//         data
//     })
// }