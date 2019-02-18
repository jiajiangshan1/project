import React from 'react';
import ReactDom from 'react-dom';
import { Table, Button } from 'antd';
import {GetReviewApi} from '../../../../Service/wpdmp/dmp/categories'
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



const ReviewApplyList = React.createClass({
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
         let {data:{data:{list,pageNum,total},code,msg}}=await GetReviewApi(this.state.pageNum1)
        if(code=='000000'){
            list.map((item)=>{
                item.approvalStatus="待审核"
            })
            this.setState({list:list,current:pageNum,totalApi:total})
        }else{
            alert(msg)
        }
    },
    start() {
        this.setState ({ loading: true });
        // 模拟 ajax 请求，完成后清空
        setTimeout(() => {
            this.setState({
                loading: false,
            });
            this.props.getApplyApi(this.state.selectedRows)
        }, 1000);
    },
    onSelectChange(selectedRowKeys,selectedRows) {
        let arr = Array.from(new Set(selectedRowKeys))
        this.setState({ selectedRowKeys:arr,selectedRows:selectedRows});

    },
    //翻页
    changePage(current){
        this.setState({pageNum: current.current,selectedRowKeys:[]},()=>{this.getReviewApi(this.state.pageNum)})
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
    async getReviewApi(pageNum1){
        let {data:{data:{list,pageNum,total},code,msg}}=await GetReviewApi(pageNum1)
        if(code=='000000'){
            list.map((item)=>{
                item.approvalStatus="待申请"
            })
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
            <div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.list} pagination={{pageSize:'5', defaultCurrent:'1',current:this.state.current,
                    total:this.state.totalApi,}}  onChange={this.changePage}  />
                <div style={{ margin:'16px 0 16px 0'}}>
                    <Button type="primary" onClick={this.start}
                            disabled={!hasSelected} loading={loading}
                    >显示详情</Button>
                </div>
            </div>
        );
    },
    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps.selected);
    //     if(nextProps.selected){
    //         this.setState({selectedRowKeys: []})
    //     }}
});



export  {ReviewApplyList};