import React from 'react';
import ReactDom from 'react-dom';
import { Checkbox } from 'antd';

class List extends React.Component {
    constructor(props){
        super(props)
    }
    onChange(e){
        console.log(this.refs.check.key);
        this.props.checkboxChange(e.target.checked)
        //console.log(`checked = ${e.target.checked}`);
    }
    render() {
        let row;

        row=this.props.list.map((item,index)=>{
                if(index %2){
                    return  <tr className='doubleLine'>
                        <Checkbox style={{margin:10}} onChange={this.onChange.bind(this)} ></Checkbox>
                        <td>{item.apiName}</td>
                        <td>{item.apiType}</td>
                        <td>{item.apiPath}</td>
                        <td>{item.apiId}</td>
                        <td>{item.versionNumber}</td>
                        <td>{item.status}</td>
                        <td>{item.useable}</td>
                        <td>{item.createTime}</td>
                        <td>{item.endTime}</td>
                        <td>{item.timeOut}</td>
                    </tr>
                } else {
                    return  <tr >
                        <Checkbox  style={{margin:10}} onChange={this.onChange.bind(this)} ></Checkbox>
                        <td>{item.apiName}</td>
                        <td>{item.apiType}</td>
                        <td>{item.apiPath}</td>
                        <td>{item.apiId}</td>
                        <td>{item.versionNumber}</td>
                        <td>{item.status}</td>
                        <td>{item.useable}</td>
                        <td>{item.createTime}</td>
                        <td>{item.endTime}</td>
                        <td>{item.timeOut}</td>
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
                <tr>
                    <Checkbox  style={{margin:10}} onChange={this.onChange.bind(this)}  key='0' ></Checkbox>
                    <td>gg</td>
                    <td>rrr</td>
                    <td>ttt</td>
                    <td>666</td>
                    <td>4</td>
                    <td>566</td>
                    <td>qq</td>
                    <td>88</td>
                    <td>99</td>
                    <td>00</td>
                </tr>
                {row}
            </table>
        );
    }
}

export default List;