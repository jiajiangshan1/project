import React from 'react';
import ReactDom from 'react-dom';


class Success extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        if(this.props.successFlag){
            return (
                <div className="model-box-success text-center" ms-if="data.successToggle">
                    <div className="exit text-center absolute" ms-on-click="hiddenPrompt()">×</div>
                    <p className="tit">恭喜您</p>
                    <p className="info-a">注册完成！</p>
                    <p className="info-b">请等待审核，关注邮箱邮件或短信</p>
                    <a href="#" className="return">返回登录</a>
                </div>
            );
        }else{
            return <div style={{display: "none"}}></div>;
        }
    }
}

export default Success;