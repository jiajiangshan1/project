import React from 'react';
import ReactDom from 'react-dom';
import {hashHistory,Link} from "react-router";
import {Table, Button, Pagination,message,Modal} from 'antd';
import {deleteApi,StartStopApi} from '../../../../Service/wpdmp/dmp/categories';
const confirm = Modal.confirm;
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
    dataIndex: 'versionNumber',
},{
    title: '状态',
    dataIndex: 'apiStatus',
}, {
    title: '是否启用',
    dataIndex: 'isUse',
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
            loading1: false,
            loading2: false,
            selectRows:{},
             selectRow:'',
            selectedRows:[],
            selectApi:{},
            apiIds:[],
            totalApiIds:{},
            visible:false,
            visible1:false,
            newList:''
        };
    },

    start() {
        this.setState({ loading: true });
        // 模拟 ajax 请求，完成后清空
        if(this.state.selectedRowKeys.length<=1){
            hashHistory.push({pathname:'/about/wpdmp/dmp/apilist/apiDetailChange',query:this.state.selectRow,state:sessionStorage.getItem("systemId")})
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
        let apiIds=selectedRows.map((item,index)=>{
            return item.apiId
        })
        this.setState({ selectedRowKeys:arr,selectedRows:selectedRows,apiIds:apiIds});
    },
    onSelect(record, selected, selectedRows) {
        this.setState({selectRow:record})
       // console.log(record, selected, selectedRows);
    },
    newStart(){
        hashHistory.push({pathname:'/about/wpdmp/dmp/apilist/apiDetail',state:sessionStorage.getItem("systemId")})
    },
    black(){
        hashHistory.push({pathname:'/about/wpdmp/dmp/apilist/blackList',state:sessionStorage.getItem("systemId")})
    },
    //删除api
    delete(){
        this.setState({visible:true,loading1: true})
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
        this.delApi(deleteIDs+"");
        // this.setState({ loading1: true });
        setTimeout(() => {
            this.setState({ loading1: false, visible: false });
            this.props.handleChange(this.props.current)
            this.setState({selectedRowKeys:[]})
        }, 1000);
    },
    handleCancel() {
        this.setState({ visible: false });
    },
    async delApi(apiIds){
        let response=await deleteApi(apiIds);
        console.log(response);
    },
    //启停api
    startStop(){
        this.setState({visible1:true})
    },
    handleOk1() {
        let apiIds=this.state.apiIds;
        let totalApiIds=this.state.totalApiIds;
        let cur=this.props.current;
        totalApiIds[cur]=apiIds;
        var deleteIDs=[];
        for(var key in totalApiIds){
            deleteIDs=deleteIDs.concat(totalApiIds[key])
        }
        console.log(deleteIDs + "");
        this.startApi(deleteIDs+"");
        this.setState({ loading2: true });
        setTimeout(() => {
            this.setState({ loading2: false, visible1: false });
            this.props.handleChange(this.props.current)
            this.setState({selectedRowKeys:[]})
        }, 1000);
    },
    handleCancel1() {
        this.setState({ visible1: false });
    },
    async startApi(apiIds){
        let response=await StartStopApi(apiIds)
        console.log(response);
    },
    //翻页
    changePage(current){
        this.props.handleChange(current.current);
        let selectedRowKeys=this.state.selectedRowKeys;//[0,1,2]
        let selectRows=this.state.selectRows;//{1:[0,1,2]}
        let cur=this.props.current;//1
        let apiIds=this.state.apiIds;
        let totalApiIds=this.state.totalApiIds;
        selectRows[cur]=this.state.selectedRowKeys;
        totalApiIds[cur]=apiIds;
        console.log(totalApiIds);
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
        const { loading,loading1,loading2, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onSelect:this.onSelect,
            type:'checkbox',
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;


        return (
            <div>
                <div style={{ marginBottom: 16,width:"44%"}}>
                    <Button type='primary' onClick={this.newStart}>新建</Button>
                    <Button type="primary" onClick={this.start}
                            disabled={!hasSelected} loading={loading} style={{ marginLeft: 15 }}
                    >修改</Button>
                    <Button type="primary" disabled={!hasSelected}  style={{ marginLeft: 15 }} onClick={this.delete}
                    >删除</Button>
                    <Button type="primary" disabled={!hasSelected} loading={loading2} style={{ marginLeft: 15 }} onClick={this.startStop}
                    >启停</Button>
                    <Button type="primary" style={{ marginLeft: 15 }} onClick={this.black}
                    >黑白名单</Button>

                </div>
                <Modal ref="modal"
                       visible={this.state.visible}
                       title="提醒" onOk={this.handleOk} onCancel={this.handleCancel}
                       footer={[
                           <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
                           <Button key="submit" type="primary" size="large"  onClick={this.handleOk}>
                               提 交
                           </Button>,
                       ]}
                >
                    <p>您确认要删除这些接口吗?</p>
                </Modal>
                <Modal ref="modal1"
                       visible={this.state.visible1}
                       title="提醒" onOk={this.handleOk1} onCancel={this.handleCancel1}
                       footer={[
                           <Button key="back" type="ghost" size="large" onClick={this.handleCancel1}>返 回</Button>,
                           <Button key="submit" type="primary" size="large" loading={this.state.loading2} onClick={this.handleOk1}>
                               提 交
                           </Button>,
                       ]}
                >
                    <p>您确认要启停这些接口吗?</p>
                </Modal>
                <div style={{margin:"0 auto"}}>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.list} pagination={{pageSize:'5',
                    current:this.props.current,
                    total:this.props.totalUser,}}  onChange={this.changePage.bind(this)} />
                    </div>
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