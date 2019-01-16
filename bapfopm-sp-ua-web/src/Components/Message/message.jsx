import React from 'react';
import ReactDom from 'react-dom';
import {getTelephoneCode} from '../../Service/Login/login'

class Message extends React.Component {
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

    async axiosTelephoneCode(){
        let data = await getTelephoneCode(this.props.data);
        console.log(data)
        return data;
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="label_block">
                <label htmlFor="message">
                    <span>短信验证：</span>
                    <input type="text" id="message" name="telephoneCode" value={this.props.inputData} onChange={this.handleChange}/>
                </label>
                <input type="button" name="" id="telephoneCodeBtn" value="发送" onClick={this.axiosTelephoneCode.bind(this)}/>
            </div>
        );
    }
}

export default Message;