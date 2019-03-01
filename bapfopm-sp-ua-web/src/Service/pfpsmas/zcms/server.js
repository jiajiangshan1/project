import axios from "axios";

//  rzc
//  区划代码接收与更新
//  在线上报
//  建立变更申请表
//  createChangeComparisonTable

/**
 * 用户申请单信息查询接口
 * @param {string} zoningCode 区划代码  
 * @param {number} pageSize 每个页面数据条数  
 * @param {number} pageIndex 当前页面  
 * @param {number} total 总条数  
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

//  rzc
//  区划代码接收与更新
//  在线上报
//  录入变更明细
//  inputChangeDetails


/**
 * 初始化区划变更明细对照数据录入界面接口
 * @param {string} zoningCode 登录人区划代码
 */
export let getInitAddDetails = async (params) => {
    let response = await axios({
        url: 'zcmsapi/zoningChangeManager/initAddDetails',
        method: 'get',
        params: params
    })
    return response.data
}

/**
 * 获取子级区划接口
 * @param {string} zoningCode 区划代码
 */
export let getSubordinateZoning = async (params) => {
    let response = await axios({
        url: 'zcmsapi/zoningChangeManager/getSubordinateZoning',
        method: 'get',
        params: params
    })
    return response.data
}

/**
 * 单个民政区划对比
 * @param {*} zoningCode 
 * @param {*} zoningName 
 */
export let getZoningCompareAffairByOne = async (params) => {
    let response = await axios({
        url: 'zcmsapi/civilAffair/zoningCompareAffairByOne',
        method: 'get',
        params: params
    })
    return response.data
}

/**
 * 提交区划变更对照明细接口
 * @param {string} group 存放文件序号,变更组名称 
 * @param {string} details 存放变更明细数据 
 * @param {string} zoningCode 区划代码 
 * @param {string} requestSeq 申请单序号  
 */
export let getSaveDetails = async (params) => {
    let response = await axios({
        url: 'zcmsapi/zoningChangeManager/saveDetails',
        method: 'get',
        params: params
    })
    return response.data
}

//  rzc
//  区划代码接收与更新
//  在线上报
//  维护变更明细
//  maintainChangeComparisonTable

/**
 * 查看变更对照明细数据接口
 * @param {number} requestSeq 区划变更申请单序号
 * @param {string} changeType 变更类型
 * @param {string} assigningCode 操作区划的级次代码
 * @param {number} pageIndex 当前页码
 * @param {number} pageSize 每页条数
 */
export let getSearchDetails = async (params) => {
    let response = await axios({
        url: 'zcmsapi/zoningChangeManager/searchDetails',
        method: 'get',
        params: params
    })
    return response.data
}

/**
 * 修改申请单接口
 * @param {number} requestSeq 申请单序号
 * @param {string} name 申请单名称
 * @param {string} notes 备注
 */
export let getUpdateZCCRequest = async (params) => {
    let response = await axios({
        url: 'zcmsapi/zoningChangeManager/updateZCCRequest',
        method: 'get',
        params: params
    })
    return response.data
}

/**
 * 导出变更明细对照数据接口  excel表格式
 * @param 申请单序号 requestSeq
 */
export let getExportExcel = (requestSeq) => {
    window.location.href = 'zcmsapi/zoningChangeManager/exportExcel?seq=' + requestSeq
}

/**
 * 删除明细数据接口
 * @param {string} groupSeqs 变更组序号
 * @param {string} requestSeq 申请单序号
 */
export let getDeleteDetails = async (params) => {
    let response = await axios({
        url: 'zcmsapi/zoningChangeManager/deleteDetails',
        method: 'get',
        params: params
    })
    return response.data
}

//  rzc
//  区划代码接收与更新
//  在线上报
//  变更明细审核
//  reviewChangeDetails

/**
 * 审核变更明细
 * @param {number} seqStr
 * @param {string} isPassed 
 * @param {string} msg 
 */
export let getAuditDetail = async (params) => {
    let response = await axios({
        url: 'zcmsapi/zoningChangeManager/auditDetail',
        method: 'get',
        params: params
    })
    return response.data
}

//  rzc 
//  区划代码接收与更新
//  申请单复用
//  applicationFormReuse

/**
 * 查询申请单中可复用的变更明细
 * @param {number} requestSeq 申请单序号
 */
export let getTraceabilityOfChangeDetails = async (params) => {
    let response = await axios({
        url: 'zcmsapi/zoningChangeManager/TraceabilityOfChangeDetails',
        method: 'get',
        params: params
    })
    return response.data
}

/**
 * 申请单复用
 * @param {number} seqStr 申请单序号
 */
export let getChangeDetailedReproduction = async (params) => {
    let response = await axios({
        url: 'zcmsapi/zoningChangeManager/ChangeDetailedReproduction',
        method: 'get',
        params: params
    })
    return response.data
}