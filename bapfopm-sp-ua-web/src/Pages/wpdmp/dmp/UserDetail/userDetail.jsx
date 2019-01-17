import React from 'react';
import ReactDom from 'react-dom';
import style from './userDetail.css'
import {hashHistory} from "react-router";

class UserDetail extends React.Component {
    constructor(props){
        super(props);
        this.state={
             userId:'',
             username:'',
             password:'',
             userGroup:'',
             period:'',
             type:'',
             isUsed:false
        }
    }
    // componentDidMount() {
    //     if (!window.localStorage.getItem("state")) {
    //         alert("请登录哦~~")
    //         hashHistory.push('/login')
    //     }
    // }

    render() {
        return (
            <div className="main-container">
                <div className="container">
                    <div className="main ">
                        <div className="content clearfix">
                            <form className="form clearfix" action="#" method="get">
                                <div className="userDiv part  clearfix">
                                    <p>用户编码</p>
                                    <label htmlFor="userId"></label>
                                    <input type="text" id="userId"/>
                                </div>
                                <div className="nameDiv part clearfix">
                                    <p>用户名</p>
                                    <label htmlFor="userName"></label>
                                    <input type="text" id="userName"/>
                                </div>
                                <div className="passwordDiv part clearfix">
                                    <p>密码</p>
                                    <label htmlFor="password"></label>
                                    <input type="text" id="password"/>
                                </div>
                                <div className="groupDiv part clearfix">
                                    <p>用户组</p>
                                    <label htmlFor="userGroup"></label>
                                    <input type="text" id="userGroup"/>
                                </div>
                                <div className="periodDiv part clearfix">
                                    <p>有效期</p>
                                    <label htmlFor="period"></label>
                                    <input type="text" id="period"/>
                                </div>
                                <div className="typeDiv part clearfix">
                                    <p>类型</p>
                                    <div className="selectBox">
                                        <span>请选择接口</span>
                                        <select name="type">
                                            <option value="0">请选择接口</option>
                                            <option value="volvo">哈哈哈哈哈哈哈哈</option>
                                            <option value="saab">嘿嘿嘿</option>
                                            <option value="fiat">Fiat</option>
                                            <option value="audi">Audi</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="selectDiv part clearfix">
                                    <input type="checkbox" name="use" id="select"/>
                                        <label htmlFor="select" className="selectLabel">启用</label>
                                </div>
                                <div className="submitDiv part clearfix">
                                    <input type="submit" value="保存"/>
                                        <a href="#">返回</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default UserDetail ;