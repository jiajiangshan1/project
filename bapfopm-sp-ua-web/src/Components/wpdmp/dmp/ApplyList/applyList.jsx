import React from 'react';
import ReactDom from 'react-dom';
import { Table, Button } from 'antd';

const columns = [{
    title: '申请接口序号',
    dataIndex: 'approvalId',
}, {
    title: '申请接口名称',
    dataIndex: 'approvalInterface',
}, {
    title: '申请接口状态',
    dataIndex: 'approvalStatus',
}];



const ApplyList = React.createClass({
    getInitialState() {
        return {
            selectedRowKeys: [],  // 这里配置默认勾选列
            loading: false,
            selectRows:{},
            // selectRow:'',
            selectedRows:[],
            selectApi:{}
        };
    },

    start() {
        this.setState({ loading: true });
        // 模拟 ajax 请求，完成后清空
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    },
    onSelectChange(selectedRowKeys,selectedRows) {
        let arr = Array.from(new Set(selectedRowKeys))
        this.setState({ selectedRowKeys:arr,selectedRows:selectedRows});
    },
    //翻页
    changePage(current){
        this.props.handleChange(current.current);
        let selectedRowKeys=this.state.selectedRowKeys;//[0,1,2]
        let selectRows=this.state.selectRows;//{1:[0,1,2]}
        let cur=this.props.current;//1
        selectRows[cur]=this.state.selectedRowKeys;
        for(var key in selectRows){
            if((current.current+"")==key){
                this.setState({selectedRowKeys:selectRows[key]})
                //console.log("true",selectRows);
                return
            }else {
                this.setState({selectedRowKeys:[]})
                selectRows[cur]=this.state.selectedRowKeys;
                // console.log("false"+this.state.selectedRowKeys,selectRows);
            }
        }

    },
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        // if(this.props.list.length){
        //     this.props.list.map((item)=>{
        //         if(item.approvalStatus==1){
        //             item.approvalStatus='通过'
        //         }else if(item.approvalStatus==2){
        //             item.approvalStatus="驳回"
        //         }else{
        //             item.approvalStatus='待审核'
        //         }
        //     })
        // }
        return (
            <div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.list} pagination={{pageSize:'5', defaultCurrent:'1',current:this.props.current,
                    total:this.props.totalUser,}}  onChange={this.changePage} />
            </div>
        );
    },
    componentWillReceiveProps(nextProps){
        console.log(nextProps.selected);
        if(nextProps.selected){
            this.setState({selectedRowKeys: []})
        }}
});




export  {ApplyList};