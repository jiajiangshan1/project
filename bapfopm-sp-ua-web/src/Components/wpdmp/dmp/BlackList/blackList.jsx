import React from 'react';
import ReactDom from 'react-dom';
import {Checkbox} from "antd";


class BlackList extends React.Component {
    constructor(props){
        super(props);
    }
    onChange(e){
        this.props.checkboxChange(e.target.checked)
        //console.log(`checked = ${e.target.checked}`);
    }
    render() {
        let row;
        row=this.props.list.map((item,index)=>{
                if(index %2){
                    return  <tr className='doubleLine'>
                        <Checkbox style={{margin:10}} onChange={this.onChange.bind(this)}></Checkbox>
                        <td>{item.ip}</td>
                        <td>{item.wbName}</td>
                        <td>{item.apiPath}</td>
                        <td>{item.createDate}</td>
                        <td>{item.updateDate}</td>
                        <td>{item.wbType}</td>

                    </tr>
                } else {
                    return  <tr >
                        <Checkbox  style={{margin:10}} onChange={this.onChange.bind(this)}></Checkbox>
                        <td>{item.ip}</td>
                        <td>{item.wbName}</td>
                        <td>{item.apiPath}</td>
                        <td>{item.createDate}</td>
                        <td>{item.updateDate}</td>

                        <td>{item.wbType}</td>
                    </tr>
                }
            }
        )
        let content=this.props.title.map((item,index)=>{return<th>{item}</th>})

        return (
            <table className='table'>
                <tr>
                    {content}
                </tr>
                {row}
            </table>
        );
    }
}

export default BlackList;