import React from 'react';
import ReactDom from 'react-dom';


class Error extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.flag){
            return (
                <div className="model-box-error text-center absolute">
                    <div className="exit text-center absolute" onClick={this.changeFlag.bind(this)}>×</div>
                    <p>{this.props.error}</p>
                </div>
            );
        }else{
            return <div style={{display: "none"}}></div>;
        }
        
    }
}

export default Error;