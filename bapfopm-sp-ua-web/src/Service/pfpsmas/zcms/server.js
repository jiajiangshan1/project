import axios from "axios";

//  rzc
//  区划代码接收与更新

/**
 * 用户申请单信息查询接口
 * @param 区划代码 zoningCode 
 * @param 每个页面数据条数 pageSize 
 * @param  当前页面 pageIndex 
 * @param 总条数 total 
 */
export let getZoningChangeRequestList = async (params) => {
    let response = await axios({
        url: 'zcmsapi/zoningChangeManager/ZoningChangeRequestList',
        method: 'get',
        params: params
    })
    return response.data
}

/**
 * 建立申请单接口
 * @param {string} name 申请单名字
 * @param {string} levelCode 上报区划的级别代码
 * @param {string} notes 备注
 * @param {string} zoningName 区划名称
 */
export let getAddZoningChangeRequest = async (params) => {
    let response = await axios({
        url: 'zcmsapi/zoningChangeManager/addZoningChangeRequest',
        method: 'post',
        data: params
    })
    return response.data
}

/**
 * 查询存在可录入的变更申请单接口
 */
export let getFindWritableZCCRequests = async () => {
    let response = await axios({
        url: 'zcmsapi/zoningChangeManager/findWritableZCCRequests',
        method: 'get'
    })
    return response.data
}





