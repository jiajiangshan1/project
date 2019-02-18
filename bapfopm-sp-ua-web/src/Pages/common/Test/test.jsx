import React from 'react';
import ReactDom from 'react-dom';
import './test.css'

import { Table } from 'antd';

class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a href="#">{text}</a>,
          }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
          }];
        
        return (
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}
export default Test;