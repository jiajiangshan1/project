import axios from "axios";

/**
 * 获取验证码
 * @param {string} codeType 验证码类型
 */
export let getVerificationCode = async (codeType) => {
    let response = await axios({
        url: 'spua/user/code',
        method: 'post',
        params: {
            codeType: codeType
        }
    })
    return response.data
}

/**
 * 登录接口
 * @param {string} loginName 用户名 
 * @param {string} password  密码
 * @param {string} loginCode 验证码
 */
export let getLoginData = async (data) => {
    let response = await axios({
        url: 'spua/user/login',
        method: 'post',
        params: data
    })
    return response.data
}

/**
 * 获取手机验证码
 * @param {string} telephone 手机号码
 */
export let getTelephoneCode = async (telephone) => {
    let response = await axios({
        url: 'spua/user/telephoneCode',
        method: 'post',
        params: {
            telephone: telephone
        }
    })
    return response.data
}

/**
 * 注册接口
 * @param {string} name 用户姓名
 * @param {string} zoningId 用户区划
 * @param {string} parentZoningId 上级区划代码
 * @param {string} username 用户别名
 * @param {string} password 密码
 * @param {string} idNumber 身份证
 * @param {string} telephone 手机号码
 * @param {string} telephoneCode 手机验证码
 * @param {string} email 邮箱
 */
// export let getRegisterData = async (name,zoningId,parentZoningId,username,password,idNumber,telephone,telephoneCode,email) => {
export let getRegisterData = async (data) => {
    let response = await axios({
        url: 'spua/user/register',
        method: 'post',
        params: data
    })
    return response.data
}

/**
 * 获取区划代码
 * @param {string} zoningCode 点击的子区划
 * @param {string} ownZoningCode 自身区划
 */
export let getSubNodes = async (zoningCode,ownZoningCode='000000000000000') => {
    let response = await axios({
        url: 'zcmsapi/queryZoningData/getSubNodes',
        method: 'get',
        params: {
            zoningCode: zoningCode,
            ownZoningCode: ownZoningCode
        }
    })
    return response.data
}

// zoningChangeManager/index
export let getCustInfo = async () => {
    let response = await axios({
        url: 'zcmsapi/zoningChangeManager/index',
        method: 'get',
    })
    return response.data
}


/**
 * 系统查询
 * 用户登录门户之后查看平台下所有的系统
 */ 
export let getSystemList = async () => {
    let response = await axios({
        url: 'spua/user/systemList',
        method: 'post'
    })
    return response.data
}

/**
 * 系统菜单查询
 * 用户点击系统之后加载的系统菜单
 * @param {number} systemId 用户进入的系统id
 */
export let getAuthMenu = async (systemId) => {
    let response = await axios({
        url: 'spua/user/authMenu',
        method: 'post',
        params: {
            systemId:systemId
        }
    })
    return response.data
}


/**
 * 角色查询
 * 初始用户登录后查询用户可申请的角色
 */
export let getApplicableRoles = async () => {
    let response = await axios({
        url: 'spua/user/applicableRoles',
        method: 'post'
    })
    return response.data
}


/**
 * 角色申请
 * 初始用户登录后进行权限申请
 * @param {array} roleList 将用户申请的角色的id数组
 */
export let getApplyRole = async (roleList) => {
    let response = await axios({
        url: 'spua/user/applyRole',
        method: 'post',
        params: {
            roleList:roleList
        }
    })
    return response.data
}

/**
 * 用户密码修改 
 */
export let getUpdatePassword = async (params) => {
    let response = await axios({
        url: 'spua/user/updatePassword',
        method: 'post',
        params: params
    })
    return response.data
}

/**
 * 权限查询
 * 查询用户可申请的权限
 * @param {number} authType 0-业务权限，1-管理员权限，2-国家级系统管理员
 */
export let getAuthList = async (authType) => {
    let response = await axios({
        url: 'spua/user/authList',
        method: 'post',
        params: {
            authType: authType
        }
    })
    return response.data
}


/**
 * 权限申请
 * 用户业务权限申请
 * @param {object} params authorityId/ applyType  0删 1增/ systemId/ caseType 0 业务 1 管理
 */
export let getApplyAuth = async (params) => {
    let response = await axios({
        url: 'spua/user/applyAuth',
        method: 'post',
        data: params
    })
    return response.data
}

/**
 * 权限申请
 * 用户管理权限申请
 */
export let getApplyAdminAuth = async (params) => {
    let response = await axios({
        url: 'spua/user/applyAdminAuth',
        method: 'post',
        data: params
    })
    return response.data
}



/**
 * 权限申请审批单查询接口
 * @param {number} params  systemId 
 */
export let getApplyAuthList = async (params) => {
    let response = await axios({
        url: 'spua/admin/applyAuthList',
        method: 'post',
        params: params
    })
    return response.data
}


/**
 * 权限审批接口
 */   
export let getDealApplyAuthList = async (params) => {
    let response = await axios({
        url: 'spua/admin/dealApplyAuthList',
        method: 'post',
        params: params
    })
    return response.data
}

/**
 * 登出系统
 */
export let doLogOut = async () => {
    let response = await axios({
        url: 'spua/user/logout',
        method: 'post',
    })
    return response.data
}

/**
 * 获取个人信息
 */
export let getUserInfo = async () => {
    let response = await axios({
        url: 'spua/user/userInfo',
        method: 'get',
    })
    return response.data
}

/**
 * 修改个人信息
 */
export let getUpdateBasicInfo = async (params) => {
    let response = await axios({
        url: 'spua/user/updateBasicInfo',
        method: 'post',
        params: params
    })
    return response.data
}

/**
 * 管理员查看审批单是会需要查看审批单里的详细内容
 */
export let getDetailAuthMessage = async (params) => {
    let response = await axios({
        url: 'spua/admin/detailAuthMessage',
        params: params,
        method: 'get',
    })
    return response.data
}



/**
 * 添加系统
 * 管理员添加系统
 * systemName	int	是	添加的系统名称
 * modDes	String	否	对于系统的描述 
 */
export let getAddSystem = async (params) => {
    let response = await axios({
        url: 'spua/superAdmin/addSystem',
        method: 'post',
        params: params
    })
    return response.data
}   


/**
 * 权限添加
 * 添加权限
 * authorityName	String	是	权限名称
 * authorityId	String	否	权限的Id
 * requestUrl	String	是	权限模块访问地址
 * parent	int	是	当前模块的父节点
 * authType	int	否	权限的类型，0-普通权限，1-管理员权限，2-国家管理员，3-默认权限
 * authLevel	int	否	权限的级次(区划的级次)
 * systemId	int	是	创建的权限属于哪个系统
 * authDes	String	否	权限说明
 */
export let getAddAuth = async (params) => {
    let response = await axios({
        url: 'spua/superAdmin/addAuth',
        method: 'post',
        params: params
    })
    return response.data
}

/**
 * 系统查询
 * 管理员添加权限的时候需要先查询系统
 */
export let getSuperAdminSystemList = async () => {
    let response = await axios({
        url: 'spua/superAdmin/systemList',
        method: 'get',
    })
    return response.data
}



/**
 * 获取权限列表
 * 管理员添加权限时需要查询权限列表（一级一级查询）
 * parent	父节点	是	如果查询一级菜单则为0
 * systemId	系统Id	是	要查询的权限属于的系统Id
 */
export let getChildrenAuthList = async (params) => {
    let response = await axios({
        url: 'spua/superAdmin/childrenAuthList',
        method: 'get',
        params: params
    })
    return response.data
}