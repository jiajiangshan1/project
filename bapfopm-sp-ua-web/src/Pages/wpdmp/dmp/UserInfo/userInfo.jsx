import React from 'react';
import ReactDom from 'react-dom';
import style from './userInfo.css'
import UserList from "../../../../Components/wpdmp/dmp/UserList/userList";
import {hashHistory,Link} from "react-router";
import {GetInfo} from "../../../../Service/wpdmp/dmp/categories";
import {UserDetail} from "../UserDetail/userDetail";

class UserInfo extends React.Component {
    constructor(props){
        super(props);
        this.state={
            title:title,
            list:[],
            username:"",
            userCode:"",
            totalUsers:'',
            current:''
        }
    }
    // componentDidMount() {
    //     if (!window.localStorage.getItem("state")) {
    //         alert("请登录哦~~")
    //         hashHistory.push('/login')
    //     }
    // }
    nameInput(e){
        this.setState({username: e.target.value})
    }

    codeInput(e){
        this.setState({userCode: e.target.value})
    }
    //查询用户信息
    findInfo() {
        this.setState({list: []})
        this.userInfo(this.state.userCode, this.state.username)
    }
    //api接口
    async userInfo(code, name) {
        let code2 =code.replace(/(^\s*)|(\s*$)/g, "");
        let name2=name.replace(/(^\s*)|(\s*$)/g, "");
        console.log(code2, name2);
        let {data} = await GetInfo(code2,name2);
        console.log(data);
        if (data.code == "000000") {
            let list = this.state.list;
            this.setState({list: list.concat(data.data)})
        } else {
            alert(data.msg)
        }
    }
    render() {
        return (
            <div className="main-container">
                <div className="container">
                    <div className="main clearfix">
                        <div className="searchTitle clearfix">
                            <div className="searchBox">
                                <div className="apiName">
                                    <span>用户编码</span>
                                </div>
                                <div className="search">
                                    <label htmlFor="userCode" className="apiLabel"></label>
                                    <input type="text" id="userCode" onChange={this.codeInput.bind(this)}/>
                                </div>
                            </div>
                            <div className="searchBox">
                                <div className="apiName">
                                    <span>用户名</span>
                                </div>
                                <div className="search">
                                    <label htmlFor="userName" className="apiLabel"></label>
                                    <input type="text" id="userName" value={this.state.username} onChange={this.nameInput.bind(this)}  />
                                </div>
                            </div>
                            <div className="searchBtn">
                                <input type="button" value="查询" onClick={this.findInfo.bind(this)}/>
                            </div>
                        </div>
                        <div className="content">
                            <div className="contentBtn clearfix">
                                <div className="setUp btn">
                                    <Link to="/entry/userInfo/userDetail">新建</Link>
                                </div>
                                <div className="revise btn">
                                    <Link to="/entry/userInfo/userDetail">修改</Link>
                                </div>
                                <div className="del btn">
                                    <input type="button" value="删除"/>
                                </div>
                                <div className="stop btn">
                                    <input type="button" value="启停"/>
                                </div>
                                <div className="publish btn">
                                    <input type="button" value="授权"/>
                                </div>

                            </div>
                            <div className="contentApi">
                               <UserList list={this.state.list} title={this.state.title}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

let title=["用户编码", "用户描述","用户组","是否启用","创建时间","更新时间","有效期","类型"];

export default UserInfo;