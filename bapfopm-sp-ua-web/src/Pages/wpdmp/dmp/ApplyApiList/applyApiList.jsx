import React from 'react';
import ReactDom from 'react-dom';
import { Table, Button } from 'antd';
import {hashHistory,Link} from "react-router";
import {GetApplyApi} from '../../../../Service/wpdmp/dmp/categories'
const columns = [{
    title: '名称',
    dataIndex: 'apiName',
}, {
    title: '路径',
    dataIndex: 'apiPath',
},
    {
    title: '状态',
    dataIndex: 'serviceSource',
},{
    title: '描述',
    dataIndex: 'apiDesc',
},{
    title: '服务源',
    dataIndex: 'serviceSource',
},

];



const ApplyApiList = React.createClass({
    getInitialState() {
        return {
            selectedRowKeys: [],  // 这里配置默认勾选列
            selectRows:{},
            selectedRows:{},
            loading: false,
            list:'',
            current:1,
            totalApi:'',
            pageNum:1,
        };
    },
    async componentWillMount(){
        let {data:{data:{list,pageNum,total},code,msg}}=await GetApplyApi();
        if(code=='000000'){
            this.setState({list:list,current:pageNum,totalApi:total})
        }else{
            alert(msg)
        }
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
        // let selectRows=this.state.selectRows;//{1:[0,1,2]}
        // let cur=this.state.current;//1
        // selectRows[cur]=this.state.selectedRowKeys;
        let obj={};
        obj.apiName=this.state.selectedRows[0].apiName;
        obj.apiId=this.state.selectedRows[0].apiId
        console.log(obj);
        hashHistory.push({pathname:'/about/wpdmp/dmp/applyCHeck/apiList/applyApi',query:obj,state:sessionStorage.getItem("systemId")})
    },
    onSelectChange(selectedRowKeys,selectedRows) {
        let arr = Array.from(new Set(selectedRowKeys))
        this.setState({ selectedRowKeys:arr,selectedRows:selectedRows});
    },
    changePage(current){

        this.setState({pageNum: current.current,selectedRowKeys:[]},()=>{this.getAllApi(this.state.pageNum)})
        // let selectedRowKeys=this.state.selectedRowKeys;//[0,1,2]
        // let selectRows=this.state.selectRows;//{1:[0,1,2]}
        // let cur=this.state.current;//1
        // selectRows[cur]=this.state.selectedRowKeys;
        // for(var key in selectRows){
        //     if((current.current+"")==key){
        //         this.setState({selectedRowKeys:selectRows[key]})
        //         //console.log("true",selectRows);
        //         return
        //     }else {
        //         this.setState({selectedRowKeys:[]})
        //         selectRows[cur]=this.state.selectedRowKeys;
        //         // console.log("false"+this.state.selectedRowKeys,selectRows);
        //     }
        // }
    },
    async getAllApi(pageNum1,pageSize){
        let {data:{data:{list,pageNum,total},code,msg}}=await GetApplyApi(pageNum1);
        if(code=='000000'){
            this.setState({list:list,current:pageNum,totalApi:total})
        }else{
            alert(msg)
        }
    },
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            type:'radio',
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="main-container">
                <div className="container">
                    <div className="main clearfix">
                        <div className="searchTitle" >
                <div className="title" style={{fontSize:20,float:"left"}}>接口列表</div>
                        </div>
                        <div className="content apiContent">
                            <div className="contentApi">

                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.list} pagination={{pageSize:'5', defaultCurrent:'1',current:this.state.current,total:this.state.totalApi}} onChange={this.changePage} />
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={!hasSelected} loading={loading}
                                    >操作</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
                                </div>
                        </div>
                        </div>
            </div>
                </div>
            </div>
        );
    },
});

export {ApplyApiList};