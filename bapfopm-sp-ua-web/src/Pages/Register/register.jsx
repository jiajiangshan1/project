import React from 'react';
import ReactDom from 'react-dom';
import { Link } from "react-router";
import style from './register.css';
import { Model, RegisterValidate, Message, Error, Success } from "../../Components";
import { Button, notification, message} from 'antd';
import { getRegisterData } from '../../Service/Login/login';

class Register extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            inputData: '',  //..    输入框初始化数据
            name: '',   //..    用户姓名
            zoningId: '',   //..    用户区划ID
            parentZoningId: '', //..    用户父区划ID
            username: '',   //..    用户别名
            password: '',   //..    用户密码
            idNumber: '',   //..    身份证号
            telephone: '',  //..    手机号码
            telephoneCode: '',  //..    短信验证码
            email: '',  //..    邮箱
            codeNum: '',    //..    接收验证码
            confirmPsd: '',       //..    确认密码
            error: '',      //..    提示信息
            flag: false,     //..    提示框显隐标志
            successFlag: false   //..    成功提示框显隐标志
        }
        this.handleSumbit = this.handleSumbit.bind(this);
    }

    /**
     * 输入用户名
     */
    setName(value) {
        var nameReg = /^(?!\d+$)[\da-zA-Z]+$/;
        this.setState({ name: value, inputData: value });
        // if(!nameReg.test(value) && value != ""){
        //     this.setState({flag: true, error: '用户名格式有误!'});
        // }else{
        //     this.setState({flag: false});
        // }
    }

    /**
     * 输入身份证
     */
    setIdNumber(value) {
        var idReg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        this.setState({ idNumber: value, inputData: value });
        // if(!idReg.test(value) && value != ""){
        //     this.setState({flag: true, error: '身份证格式有误!'});
        // }else{
        //     this.setState({flag: false});
        // }
    }

    /**
     * 输入邮箱
     */
    setEmail(value) {
        var emailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        this.setState({ email: value, inputData: value });
        if(!emailReg.test(value) && value != ""){
            message.error('邮箱格式不对');
            
        }else{
            message.success('邮箱格式正确')
        }
    }

    /**
     * 输入别名
     */
    setUserName(value) {
        this.setState({ username: value, inputData: value })
    }

    /**
     * 输入手机号
     */
    setTelephone(value) {
        var telephoneReg = /^1[0-9]{10}$/;
        this.setState({ telephone: value, inputData: value });
        // if(!telephoneReg.test(value) && value != ""){
        //     this.setState({flag: true, error: '手机号格式有误!'});
        // }else{
        //     this.setState({flag: false});
        // }
    }

    /**
     * 输入手机验证码
     */
    setTelephoneCode(value) {
        this.setState({ telephoneCode: value, inputData: value })
    }

    /**
     * 输入密码
     */
    setPassword(value) {
        this.setState({ password: value, inputData: value })
    }

    /**
     * 输入密码
     */
    setConfirmPsd(value) {
        this.setState({ confirmPsd: value, inputData: value })
    }

    /**
     * 输入密码
     */
    setZoningId(value) {
        this.setState({ zoningId: value, inputData: value })
    }

    /**
     * 输入密码
     */
    setParentZoningId(value) {
        this.setState({ parentZoningId: value, inputData: value })
    }

    /**
     * 提交表单
     * @param {} event 
     */
    handleSumbit(event) {
        alert(111);
        event.preventDefault();
        event.returnValue = false;
        this.axiosRegisterData();
    }

    /**
     * 登录
     */
    async axiosRegisterData() {
        let data = await getRegisterData(this.state.name, this.state.zoningId, this.state.parentZoningId, this.state.username, this.state.password, this.state.idNumber, this.state.telephone, this.state.telephoneCode, this.state.email)
        console.log(data)
    }



    componentDidMount() {
        // this.axiosVerificationCode();
    }

    render() {
        var user = {
            id: "user",
            content: "用户姓名：",
            name: "name"
        }
        var ID = {
            id: "ID",
            content: "身份证号：",
            name: "idNumber",
            maxLength: 18
        }
        var mailbox = {
            id: "mailbox",
            content: "邮  箱：",
            name: "email"
        }
        var code = {
            id: "code",
            content: "区划代码：",
            name: "zoningId",
            // readOnly: true
        }
        var pCode = {
            id: "pCode",
            content: "上级区划代码：",
            name: "parentZoningId",
            // readOnly: true
        }
        var alias = {
            id: "alias",
            content: "别  名：",
            name: "username"
        }
        var phone = {
            id: "phone",
            content: "手 机 号：",
            name: "telephone"
        }
        var password = {
            id: "password",
            content: "密  码：",
            name: "password"
        }
        var confirm = {
            id: "confirm",
            content: "确认密码：",
            name: ""
        }
        // var registerCode = {
        //     name: "registerCode"
        // }


        return (
            <div className="content">
                <div className="login overflow">
                    <h3 className="title"></h3>
                    <div className="form overflow">
                        <form className="form" onSubmit={this.handleSumbit}>

                            {/* 用户姓名 */}
                            <RegisterValidate data={user} handle={this.setName.bind(this)} username={this.state.name} />

                            {/* 身份证号 */}
                            <RegisterValidate data={ID} handle={this.setIdNumber.bind(this)} username={this.state.idNumber} />

                            {/* 邮箱 */}
                            <RegisterValidate data={mailbox} handle={this.setEmail.bind(this)} username={this.state.email} />

                            {/* 区划代码 */}
                            <RegisterValidate data={code} handle={this.setZoningId.bind(this)} username={this.state.zoningId} />

                            {/* 上级区划代码 */}
                            <RegisterValidate data={pCode} handle={this.setParentZoningId.bind(this)} username={this.state.parentZoningId} />

                            {/* 用户别名 */}
                            <RegisterValidate data={alias} handle={this.setUserName.bind(this)} username={this.state.username} />

                            {/* 手机号 */}
                            <RegisterValidate data={phone} handle={this.setTelephone.bind(this)} username={this.state.telephone} />

                            {/* 短信验证 */}
                            <Message handle={this.setTelephoneCode.bind(this)} data={this.state.telephone} username={this.state.telephoneCode} />

                            {/* 密码 */}
                            <RegisterValidate data={password} handle={this.setPassword.bind(this)} username={this.state.password} />

                            {/* 确认密码 */}
                            <RegisterValidate data={confirm} handle={this.setConfirmPsd.bind(this)} username={this.state.confirmPsd} />

                            {/* 注册验证码 */}
                            {/* <Code data={registerCode} handle={this.setCode} code={this.state.code} codeNum={this.state.codeNum} /> */}

                            {/* 提交按钮 */}
                            <div className="text-center login_btn">
                                <button type="sumbit" onSubmit={this.handleSumbit}>注册</button>
                                <div className="text-center account_btn">
                                    <Link to="/login">已有账户 立即登录</Link>
                                </div>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        )
    }
}



export default Register;