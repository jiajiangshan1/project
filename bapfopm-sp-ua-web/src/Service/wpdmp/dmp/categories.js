import axios from "axios";


// axios.defaults.baseURL = '/api'
//axios.defaults.headers.post['Content-Type'] = 'application/json';
//登陆
// export let GetUserInfo = async (username, password) => {
//     let response = await axios({
//         url: "api/do/login",
//         method: "post",
//         params: {
//             "userName": username,
//             "userPassWord": password
//         }
//     });
//     return response;
// }

//获取接口信息
export let GetApi = async (api, page) => {
    let response = await axios({
        method: "post",
        url: "dmpapi/gw/apiInfo/findAllApi",
        params: {
            "apiName": api,
            "page": page
        },
    })
    return response;
}

// //获取用户信息
// export let GetInfo = async (userId = "", userName = "") => {
//     let response = await axios({
//         url: "api/get/user/info",
//         method: "post",
//         params: {
//             "createDate": "2018-12-28T07:48:57.699Z",
//             "groupId": 0,
//             "isUse": 0,
//             "updateDate": "2018-12-28T07:48:57.699Z",
//             "userId": userId,
//             "userName": userName,
//             "userPassWord": "string"
//         }
//     });
//     return response;
// }
//查询接口状态
export let GetApiState = async (apiName, state, pageNum = 1, pageSize = 5) => {
    let response = await axios({
        url: "dmpapi1/get/api/info",
        method: "get",
        params: {
            "approvalStatus": state,
            "approvalInterface": apiName,
            "pageNum": pageNum,
            "pageSize": pageSize
        }
    });
    return response;
}
//获取全量待申请接口
export let GetApplyApi = async (pageNum = 1, pageSize = 5) => {
    let response = await axios({
        url: "dmpapi1/get/list/api/info",
        method: "get",
        params: {
            "pageNum": pageNum,
            "pageSize": pageSize,
        }
    });
    return response;
}
//上传文件
export let UpLoadFile = async (file) => {
    let response = await axios({
        url: "dmpapi1/upload/file",
        method: "post",
        data: {
            "file": file,
        }
    });
    return response;
};
//申请接口
export let ApplyApi1 = async (approvalApplication, approvalInterface, approvalProposer, approvalProvince, apiId) => {
    let response = await axios({
        url: "dmpapi1/save/approval/info",
        method: "post",
        params: {
            "approvalApplication": approvalApplication,
            "approvalInterface": approvalInterface,
            "approvalProposer": approvalProposer,
            "approvalProvince": approvalProvince,
            "apiId": apiId

        }
    });
    return response;
}
//获取登录用户信息
export let UserInfo = async () => {
    let response = await axios({
        url: "dmpapi1/get/user/info",
        method: "get",
    });
    return response;
}
//获取待审核接口
export let GetReviewApi = async (pageNum, pageSize=5) => {
    let response = await axios({
        url: "dmpapi1/get/approval/info",
        method: "get",
        params: {
            "pageNum": pageNum,
            "pageSize": pageSize
        }
    });
    return response;
}
//提交审批申请接口信息
export let ReviewApi1 = async (approvalId,approvalAction,approvalUserName,approvalComments,approvalStatus) => {
    let response = await axios({
        url: "dmpapi1/update/status",
        method: "get",
        params: {
            "approvalId":approvalId,
            "approvalAction":approvalAction,
            "approvalUserName":approvalUserName,
            "approvalComments":approvalComments,
            "approvalStatus":approvalStatus
        }
    });
    return response;
}
//获取黑白名单信息
export let GetBlackList = async (ip, dec, page = 1) => {
    let response = await axios({
        method: "post",
        url: "dmpapi/gw/wbList/findByMany",
        data: {
            "ip": ip,
            "wbDesc": dec,
            "page": page
        }
    })
    return response;
}

//获取全量黑白名单接口信息
export let GetAllBlackList = async (page) => {
    let response = await axios({
        method: "post",
        url: "dmpapi/gw/apiInfo/findNoWbAll",
        params: {
            "page":page
        }
    })
    return response;
}
//新建黑白名单api
export let AddBlackList = async (wbName,ip,wbDesc,wbType,apiId) => {
    let response = await axios({
        method: "post",
        url: "dmpapi/gw/wbList/addWbApi",
        data: {
            "wbName":wbName,
            "ip":ip,
            "wbDesc":wbDesc,
            "wbType":wbType,
            "apiId":apiId
        }
    })
    return response;
}
//删除黑白名单api
export let DelBlackList = async (wbIds) => {
    let response = await axios({
        method: "post",
        url: "dmpapi/gw/wbList/deleteByUrl",
        params: {
            wbIds:wbIds
        }
    })
    return response;
}

//新建api
export let addApi = async (data) => {
    let response = await axios({
        method: "post",
        url: "dmpapi/gw/apiInfo/addRequestServiceInfo",
        data: data
    })
    return response;
}
//删除api
export let deleteApi = async (apiIds) => {
    let response = await axios({
        method: "post",
        url: "dmpapi/gw/apiInfo/deleteById",
        params: {
            apiIds:apiIds
        }
    })
    return response;
}
//改变启停状态
export let StartStopApi = async (apiIds) => {
    let response = await axios({
        method: "post",
        url: "dmpapi/gw/apiInfo/startStopApi",
        params: {
            apiIds:apiIds
        }
    })
    return response;
}
