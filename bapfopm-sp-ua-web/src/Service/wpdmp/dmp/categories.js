import axios from "axios";


// axios.defaults.baseURL = '/api'
//axios.defaults.headers.post['Content-Type'] = 'application/json';
//登陆
export let GetUserInfo = async (username, password) => {
    let response = await axios({
        url: "http://localhost:3001/api/do/login",
        method: "post",
        params: {
            "userName": username,
            "userPassWord": password
        }
    });
    return response;
}


// export let Get = async () => {
//     let response = await axios({
//         method: "post",
//         url: "http://172.30.3.130:8411/gwWb/findByMany",
//         data: {
//             "ip": "1",
//             "name": "1",
//             "page": '1'
//         }
//     })
//     return response;
// }
//获取接口信息
export let GetApi = async (api, page) => {
    let response = await axios({
        method: "post",
        url: "api/gw/apiInfo/findAllApi",
        params: {
            "apiName": api,
            "page": page
        }
    })
    return response;
}

//获取用户信息
export let GetInfo = async (userId="", userName="") => {
    let response = await axios({
        url: "http://localhost:3001/api/get/user/info",
        method: "post",
        params: {
            "createDate": "2018-12-28T07:48:57.699Z",
            "groupId": 0,
            "isUse": 0,
            "updateDate": "2018-12-28T07:48:57.699Z",
            "userId": userId,
            "userName": userName,
            "userPassWord": "string"
        }
    });
    return response;
}

//获取黑白名单信息
export let GetBlackList = async (ip,dec,page=1) => {
    let response = await axios({
        method: "post",
        url: "api/gw/wbList/findByMany",
        data: {
            "ip":ip,
            "apiDesc":dec,
            "page":page
        }
    })
    return response;
}

//新建api
export let addApi = async (data) => {
    let response = await axios({
        method: "post",
        url: "api/gw/apiInfo/addRequestServiceInfo",
        data: data
    })
    return response;
}
export let GetCourseCateList = async (isApp = 1) => {
    let response = await axios(`http://api.dufe.online/getCourseCateList?isApp=${isApp}`);
    return response.data
}

export let GetPlateList = async () => {
    let response = await axios("http://api.dufe.online/getPlateList");
    return response.data
}

export let GetPlateCourses = async (plateId) => {
    let response = await axios(`http://api.dufe.online/getPlateCourseList?plateId=${plateId}&page=0&size=10`);
    return response.data.courses;
}

export let GetCarouselList = async (type = 1) => {
    let response = await axios(`http://api.dufe.online/getCarouselList?type=${type}`);
    return response.data;
}