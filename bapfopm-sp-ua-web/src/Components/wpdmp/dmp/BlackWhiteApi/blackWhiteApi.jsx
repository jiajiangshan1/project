import React from 'react';
import ReactDom from 'react-dom';
import { Table, Button } from 'antd';
import {GetAllBlackList} from '../../../../Service/wpdmp/dmp/categories'
const columns = [{
    title: 'Api名称',
    dataIndex: 'apiName',
}, {
    title: '地址',
    dataIndex: 'apiPath',
}, {
    title: '状态',
    dataIndex: 'apiStatus',
},{
    title: '类型',
    dataIndex: 'apiType',
},{
    title: '服务源',
    dataIndex: 'serviceSource',
}, {
    title: '有效期',
    dataIndex: 'timeOut',
}, {
    title: '状态',
    dataIndex: 'apiStatus',
},{
    title: '类型',
    dataIndex: 'apiType',
}];



const BlackWhiteApi = React.createClass({
    getInitialState() {
        return {
            selectedRowKeys: [],  // 这里配置默认勾选列
            loading: false,
            selectRows:{},
            // selectRow:'',
            selectedRows:[],
            selectApi:{},
            pageNum1:1,
            list:[],
            current:1,
            totalApi:''
        };
    },
    async componentDidMount(){
        // let {data:{data:{list,pageNum,total},code,msg}}=await GetAllBlackList()
        let {data: {object:{code,data,msg}, totalUsers, currentPage}}=await GetAllBlackList(this.state.pageNum1)
        console.log(code,data,msg);
        if(code=='000000'){
            this.setState({list:data,current:currentPage,totalApi:totalUsers})
        }else{
            alert(msg)
        }
    },
    start() {
        this.setState ({ loading: true });
        // 模拟 ajax 请求，完成后清空
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
            this.props.getApplyApi(this.state.selectedRows)
        }, 1000);
    },
    onSelectChange(selectedRowKeys,selectedRows) {
        let arr = Array.from(new Set(selectedRowKeys))
        this.setState({ selectedRowKeys:arr,selectedRows:selectedRows});
        this.props.getIpList(selectedRows)
    },
    //翻页
    changePage(current){
        this.setState({pageNum: current.current,selectedRowKeys:[]},()=>{this.getApi(this.state.pageNum)})
        // let selectedRowKeys=this.state.selectedRowKeys;//[0,1,2]
        // let selectRows=this.state.selectRows;//{1:[0,1,2]}
        // let cur=this.props.current;//1
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
    async getApi(pageNum1){
        let {data: {object:{code,data,msg}, totalUsers, currentPage}}=await GetAllBlackList(pageNum1)
        if(code=='000000'){
            this.setState({list:data,current:currentPage,totalApi:totalUsers})
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
            <div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.list} pagination={{pageSize:'5', defaultCurrent:'1',current:this.state.current,
                    total:this.state.totalApi,}}  onChange={this.changePage} />
            </div>
        );
    },
    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps.selected);
    //     if(nextProps.selected){
    //         this.setState({selectedRowKeys: []})
    //     }}
});



export {BlackWhiteApi};