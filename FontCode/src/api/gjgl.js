import request from "../utils/request";

const getList = (data)=>{
    return request({
        method:"post",
        url:"/api/auditor/auditList.token",
        data
    })
}
const gjgl = (data,id)=>{
    return request({
        method:"post",
        url:`/api/auditor/audit/submit/${id}.token`,
        data
    })
}


export default {
    getList,
    gjgl
}