import React from 'react';
import ReactDom from 'react-dom';
import { Menu, Dropdown, Button, Icon } from 'antd';

class LoginValidate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value : ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.handle(e.target.value);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="label_block">
                <label htmlFor={this.props.data.name}>
                    <span>{this.props.data.content}</span>
                    <input type={this.props.data.type} id={this.props.data.name} name={this.props.loginType} value={this.props.inputData} onChange={this.handleChange}/>
                    <i className={"rt " + this.props.data.name} ></i>
                </label>
            </div>
        );
    }
}

class LoginDropDown extends React.Component{
    constructor(prop) {
        super(prop);
        this.state = {
            title: '登录方式'
        }
    }

    handleMenuClick(e) {
        this.props.handle(e.key);
        this.setState({title: e.item.props.children});
    }

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
                <Menu.Item key="userName">用户名</Menu.Item>
                <Menu.Item key="idNumber">身份证</Menu.Item>
                <Menu.Item key="telephone">手机号</Menu.Item>
                <Menu.Item key="email">邮箱</Menu.Item> 
            </Menu>
        )

        return (
            <div>
                <Dropdown overlay={menu}>
                    <Button type="ghost">
                        {this.state.title} <Icon type="down" />
                    </Button>
                </Dropdown>
            </div>
        )
    }
}

export {LoginValidate, LoginDropDown};