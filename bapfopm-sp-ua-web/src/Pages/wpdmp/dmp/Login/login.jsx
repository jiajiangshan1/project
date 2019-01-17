import React from 'react';
import ReactDom from 'react-dom';
import {hashHistory} from 'react-router'
import login from '../../../../asset/wpdmp/dmp/img/login.png'
import styles from './login.css'
import {GetUserInfo} from '../../../../Service/wpdmp/dmp/categories'

class Login extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            username: '',
            password: '',
            error: '',
            flag: true,
            stars: '',
            loginState: false,
            code:""
        }
    }

    // async componentWillMount() {
    //     let data=await Get()
    //     console.log(data);
    // }

    usernameInput(value) {
        let patten = /^[a-zA-Z]\w{0,10}$/;
        if (!patten.test(value) && value !== '') {
            this.setState({error: '不能以数字开头哦!'})
        } else {
            this.setState({error: ""})
        }
        this.setState({username: value})
    }

    passwordInput(value) {
        this.setState({password: value})
    }

    async infoSubmit(username, password) {
        let {data} = await GetUserInfo(username, password)
        this.setState({
            code:data.code
        },()=>{
            if (this.state.code == "000000") {
                window.localStorage.setItem("state", true)
                hashHistory.push('/entry')
            } else {
                alert(data.msg)
                window.localStorage.setItem("state", false)
            }
        })
        // return data.code
    }
    //提交表单
    validate(e) {
        let username = this.state.username;
        let password = this.state.password;
        if (username === "" || username == null || password === "" || password == null) {
            alert("用户名或密码不能为空哦~~")
        }
        this.infoSubmit(username, password);
        e.preventDefault();
        e.stopPropagation();
    }


    render() {
        return (
            <div className="main-container">
                <div className='container1'>
                    <div className="login-part">
                        <div className="star1"></div>
                        <div className="star2">
                            <div className="login-title">
                                <img src={login} alt=""/>
                            </div>
                            <form onSubmit={this.validate.bind(this)}>
                                <Username username={this.state.username} error={this.state.error}
                                          handleChange={this.usernameInput.bind(this)}/>
                                <Password password={this.state.password} handle={this.passwordInput.bind(this)}
                                          flag={this.state.flag}/>
                                <Submit/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login;