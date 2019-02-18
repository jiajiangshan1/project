import React from 'react';
import ReactDom from 'react-dom';
import {hashHistory,Link} from "react-router";
import {Table, Button, Pagination,Modal} from 'antd';
import {DelBlackList} from '../../../../Service/wpdmp/dmp/categories';
const columns = [{
    title: '黑白名单名称',
    dataIndex: 'wbName',
},{
    title: '地址',
    dataIndex: 'ip',
}, {
    title: '描述',
    dataIndex: 'wbDesc',
}, {
    title: '是否启用',
    dataIndex: 'isUse',
},{
    title: '创建时间',
    dataIndex: 'createDate',
}, {
    title: '更新时间',
    dataIndex: 'updateDate',
},{
    title: '类型',
    dataIndex: 'wbType',
}];

const BlackList = React.createClass({
    getInitialState() {
        return {
            selectedRowKeys: [],  // 这里配置默认勾选列
            loading: false,
            selectRows:{},
            totalSelectKeys:[],
            selectRow:'',
            visible:false,
            apiIds:[],
            current:1,
            totalApiIds:{}
        };
    },
    start() {
        this.setState({ loading: true });
        // 模拟 ajax 请求，完成后清空
        if(this.state.selectedRowKeys.length<=1){
            hashHistory.push({pathname:'/entry/apilist/apiDetailChange',state:sessionStorage.getItem("systemId")})
        }else{
            alert('只能选一项修改哦~~')
        }
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    },
    delete(){
        this.setState({visible:true})
    },
    handleOk() {
        let apiIds=this.state.apiIds;
        let totalApiIds=this.state.totalApiIds;
        let cur=this.props.current;
        totalApiIds[cur]=apiIds;
        var deleteIDs=[];
        for(var key in totalApiIds){
            deleteIDs=deleteIDs.concat(totalApiIds[key])
        }
        console.log('jjjjjjjjjjj',deleteIDs);
        this.delApi(deleteIDs+"");
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
            this.props.changePage1(this.props.current)
            this.setState({selectedRowKeys:[]})
        }, 2000);
    },
    handleCancel() {
        this.setState({ visible: false });
    },
    async delApi(apiIds){
        let response=await DelBlackList(apiIds);
        console.log(response);
    },
    onSelectChange(selectedRowKeys,selectedRows) {
        let arr = Array.from(new Set(selectedRowKeys))
        let apiIds=selectedRows.map((item,index)=>{
            return item.wbId
        })
        this.setState({ selectedRowKeys:arr,selectedRows:selectedRows,apiIds:apiIds});
    },
    newStart(){
        hashHistory.push({pathname:'/about/wpdmp/dmp/apilist/blackList/blackDetail',state:sessionStorage.getItem("systemId")})
    },

    //翻页
    changePage(current){
        this.props.changePage1(current.current);
        let selectedRowKeys=this.state.selectedRowKeys;//[0,1,2]
        let selectRows=this.state.selectRows;//{1:[0,1,2]}
        let cur=this.props.current;//1
        let apiIds=this.state.apiIds;
        let totalApiIds=this.state.totalApiIds;
        selectRows[cur]=this.state.selectedRowKeys;
        totalApiIds[cur]=apiIds;
        console.log('kkkkkkkkkkkk',totalApiIds);

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
                <div style={{ marginBottom: 16,width:"35%"}}>
                    <Button type='primary' onClick={this.newStart}>新建</Button>
                    <Button type="primary" onClick={this.start}
                            disabled={!hasSelected} loading={loading} style={{ marginLeft: 15 }}
                    >修改</Button>
                    <Button type="primary" style={{ marginLeft: 15 }} loading={loading} onClick={this.delete}
                    >删除</Button>
                    {/*<Button type="primary" style={{ marginLeft: 15 }}*/}
                    {/*>发布</Button>*/}
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={list} pagination={{pageSize:'5', defaultCurrent:'1',
                    current:this.props.current,
                    total:this.props.totalUser,}}  onChange={this.changePage.bind(this)} />
                <Modal ref="modal"
                       visible={this.state.visible}
                       title="提示" onOk={this.handleOk} onCancel={this.handleCancel}
                       footer={[
                           <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
                           <Button key="submit" type="primary" size="large" loading={this.state.loading1} onClick={this.handleOk}>
                               提 交
                           </Button>,
                       ]}
                >
                    <p>您确认要删除这些接口吗?</p>
                </Modal>
            </div>
        );
    },
    componentWillReceiveProps(nextProps){
        console.log(nextProps.selected);//true
        if(nextProps.selected){
            this.setState({selectedRowKeys: []})
        }
    }
});

export {BlackList} ;


