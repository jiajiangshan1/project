import React from 'react';
import ReactDom from 'react-dom';

//用户名
class Username extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    handleChange(e) {
        this.props.handleChange(e.target.value)
    }

    render() {
        return (
            <div>
                <div className="login-username login-input">
                    <label htmlFor="username" className="input"></label>
                    <input type="text" className="username input2" id="username" placeholder="请输入用户名"
                           onChange={this.handleChange.bind(this)} value={this.props.username}/>
                    <i className="logo logo-user"></i>
                </div>
                <p>{this.props.error}</p>
            </div>
        );
    }
}


function InputBtn(props) {
    return (<input type="text" className="password input2" id="password" placeholder="请输入密码"
                  onChange={props.handle} value={props.password}/>);
}

function SpanBtn(props) {
    return (<span className='span'>{props.stars}</span>);
}

//密码
class Password extends React.Component {
    constructor(prop) {
        super(prop);
        this.state={flag:true,stars:''}

    }

    handle(e) {
        this.props.handle(e.target.value)
    }

    handleClick(e){
        let password=this.props.password;//12345
        let event= e.target;
        this.state.flag=!this.state.flag;
        if(!this.state.flag){
            event.className=event.className.replace("logo-word","logo-hide");
            this.setState({stars:password.replace(/\w/ig,'*')})
        }else {
            event.className=event.className.replace("logo-hide","logo-word");
            this.setState({stars:''})
        }
    }
    render() {
        let btn=null;
        if(this.state.flag){
            btn=<InputBtn handle={this.handle.bind(this)} password={this.props.password}/>
        }else {
            btn=<SpanBtn stars={this.state.stars}/>
        }
        return (
            <div>
                <div className="login-password login-input">
                    <label htmlFor="password" className="input "></label>
                    {btn}
                    <i className="logo logo-word" onClick={this.handleClick.bind(this)}></i>
                </div>
            </div>
        )
    }
}

//提交
class Submit extends React.Component{
    constructor(props){
        super(props);
    }
    // handleSubmit(e){
    //     this.props.handleSubmit(e)
    // }
    render(){
        return(
            <div>
                <div className="submit">
                    <input type="submit" className="enter" />
                </div>
            </div>
        )
    }
}


export {Username, Password,Submit};