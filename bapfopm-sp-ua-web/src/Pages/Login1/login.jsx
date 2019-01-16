import React from 'react';
import ReactDom from 'react-dom';
import { hashHistory, Link } from 'react-router';

import { LoginValidate, LoginDropDown, Code, Error, Select, Form, Input } from '../../Components';
import { getLoginData, getVerificationCode } from '../../Service/Login/login';

require('../../asset/css/icon.css');
require('./login.css');

class Login extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            inputData: '',  //..    输入框初始化数据
            loginType: 'userName',
            username: '',    //..    用户名
            password: '',   //..    密码
            codeNum: '',    //..    接收验证码
            code: '',       //..    验证码
            error: '',      //..    提示信息
            flag: false     //..    提示框显隐标志
        }

        this.setUserName = this.setUserName.bind(this);
        this.setPassWord = this.setPassWord.bind(this);
        this.setCode = this.setCode.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
    }

    /**
     * 获取登录方式
     */
    setLoginType(value) {
        this.setState({ loginType: value })
        console.log(this.state.loginType)
    }

    /**
     * 输入用户名
     */
    setUserName(value) {
        this.setState({ username: value, inputData: value })
    }

    /**
     * 输入密码
     */
    setPassWord(value) {
        this.setState({ password: value, inputData: value })
    }

    /**
     * 输入验证码
     */
    setCode(value) {
        this.setState({ code: value })
    }

    /**
     * 提交表单
     * @param {} event 
     */
    handleSumbit(event) {
        event.preventDefault();
        event.returnValue = false;
        this.axiosLoginData();
    }

    /**
     * 登录
     */
    async axiosLoginData() {
        let data = await getLoginData(this.state.loginType, this.state.username, this.state.password, this.state.code)
        console.log('------------------登录success', data);
        if (data.status == 200) {
            hashHistory.push('/home');
        }else{
            this.axiosVerificationCode();
        }
    }

    /**
     * 获取验证码
     */
    async axiosVerificationCode() {
        let codeNum = await getVerificationCode('loginCode');
        this.setState({ codeNum: codeNum });
    }

    componentWillMount() {
        this.axiosVerificationCode();
    }

    render() {
        //传入子组件参数
        var user = {
            name: "user",
            content: "账 号：",
            type: "text",
            inputName: "userName",
        }
        var password = {
            name: "password",
            content: "密 码：",
            type: "text",
            inputName: "custPwd"
        }
        var loginCode = {
            name: "loginCode"
        }

        return (
            <div className="content">
                <div className="login">
                    <h3 className="title1"></h3>
                    <form className="form" onSubmit={this.handleSumbit}>

                        {/* 登录方式 */}
                        <LoginDropDown loginType={this.state.loginType} handle={this.setLoginType.bind(this)} />

                        {/* 登录用户 */}
                        <LoginValidate data={user} handle={this.setUserName} username={this.state.username} />

                        {/* 密码 */}
                        <LoginValidate data={password} handle={this.setPassWord} password={this.state.password} />

                        {/* 登录验证码 */}
                        <Code data={loginCode} handle={this.setCode} code={this.state.code} codeNum={this.state.codeNum} />

                        {/* <div className="overflow pass">
                            <label for="check" className="lt check_btn">
                                <input type="checkbox" id="check" />
                                <i className="no-margin"></i> 记住密码
                                </label>
                            <a href="#" className="rt forget_pass">忘记密码</a>
                        </div> */}

                        <div className="text-center login_btn">
                            <button type="sumbit" onSubmit={this.handleSumbit}>登录</button>
                        </div>

                        <div className="text-center account_btn">
                            <Link to="/register">没有账号？ 立即注册</Link>
                        </div>

                        {/* 错误信息提示 */}
                        <Error error={this.state.error} flag={this.state.flag} />
                    </form>
                </div>
            </div>
        )
    }

}

export default Login;