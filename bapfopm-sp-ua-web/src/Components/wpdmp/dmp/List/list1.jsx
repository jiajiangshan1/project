import React from 'react';
import ReactDom from 'react-dom';
import {hashHistory,Link} from "react-router";
import {Table, Button, Pagination,message} from 'antd';

const columns = [{
    title: 'API名称',
    dataIndex: 'apiName',
}, {
    title: '分组',
    dataIndex: 'groupId',
}, {
    title: 'API路径',
    dataIndex: 'apiPath',
},{
    title: '服务ID',
    dataIndex: 'apiId',
}, {
    title: '版本号',
    dataIndex: 'protocool',
},{
    title: '状态',
    dataIndex: 'status',
}, {
    title: '是否启用',
    dataIndex: 'isUsed',
}, {
    title: '创建时间',
    dataIndex: 'createDate',
},{
    title: '结束时间',
    dataIndex: 'updateDate',
}, {
    title: '有效期',
    dataIndex: 'timeOut',
}];

const List = React.createClass({
    getInitialState() {
        return {
            selectedRowKeys: [],  // 这里配置默认勾选列
            loading: false,
            selectRows:{},
            totalSelectKeys:[],
            selectRow:'',
        };
    },
    start() {
        this.setState({ loading: true });
        // 模拟 ajax 请求，完成后清空
        if(this.state.selectedRowKeys.length<=1){
            hashHistory.push({pathname:'/about/wpdmp/dmp/apilist/apiDetailChange',state:this.state.selectRow})
        }else{
            message.warning('只能选一项修改哦~~')
        }
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    },

    onSelectChange(selectedRowKeys,selectedRows) {
        let arr = Array.from(new Set(selectedRowKeys))
        this.setState({ selectedRowKeys:arr});
    },
    onSelect(record, selected, selectedRows) {
        this.setState({selectRow:record})
       // console.log(record, selected, selectedRows);
    },
    newStart(){
        hashHistory.push('/about/wpdmp/dmp/apilist/apiDetail')
    },
    black(){
        hashHistory.push('/about/wpdmp/dmp/apilist/blackList')
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
            onSelect:this.onSelect,
            type:'checkbox',
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const list=this.props.list;

        return (
            <div>
                <div style={{ marginBottom: 16, marginRight:"67%"}}>
                    <Button type='primary' onClick={this.newStart}>新建</Button>
                    <Button type="primary" onClick={this.start}
                            disabled={!hasSelected} loading={loading} style={{ marginLeft: 15 }}
                    >修改</Button>
                    <Button type="primary" style={{ marginLeft: 15 }}
                    >删除</Button>
                    <Button type="primary" style={{ marginLeft: 15 }}
                    >发布</Button>
                    <Button type="primary" style={{ marginLeft: 15 }}
                    >启停</Button>
                    <Button type="primary" style={{ marginLeft: 15 }} onClick={this.black}
                    >黑白名单</Button>

                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={list} pagination={{pageSize:'5', defaultCurrent:'1',
                    current:this.props.current,
                    total:this.props.totalUser,}}  onChange={this.changePage.bind(this)} />
            </div>
        );
    },
    componentWillReceiveProps(nextProps){
        // const list=nextProps.list;
        console.log(nextProps.selected);//true
        if(nextProps.selected){
            this.setState({selectedRowKeys: []})
        }
        //list.length?console.log(list[0].apiName):''
        // if(list.length){
        //     if(list[0].apiName!==list1[0].apiName){
        //         console.log('11111111111');
        //     }
        // }

        // console.log(this.props.list[0].apiName);
       //  if(this.props!==nextProps){
       //      this.setState({selectedRowKeys: []})
       //  }

    }
});

export {List} ;