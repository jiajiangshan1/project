import React from 'react';
import ReactDom from 'react-dom';

class Code extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.handle(e.target.value);
    }

    render() {
        return (
            <div className="label_block relative">
                <label htmlFor="proving">
                    <span>验&nbsp;证&nbsp;码：</span>
                    <input type="text" id="proving" name={this.props.data.name} maxLength="4" onChange={this.handleChange}/>
                </label>
                <div className="proving text-center">
                    <span id="provingCode">{this.props.codeNum}</span>
                </div>
            </div>
        );
    }
}

export default Code;