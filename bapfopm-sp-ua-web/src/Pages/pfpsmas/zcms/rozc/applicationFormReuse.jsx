import React from 'react';
import { hashHistory, Link } from "react-router";
import qs from 'qs'

import blue from "../../../../asset/pfpsmas/zcms/img/blue.png";
import black from "../../../../asset/pfpsmas/zcms/img/black.png"
import gray from "../../../../asset/pfpsmas/zcms/img/gray.png"

import './test2.css'

import { Table, Button, Modal, Input, } from 'antd';
import { getZoningChangeRequestList, getTraceabilityOfChangeDetails, getChangeDetailedReproduction} from "../../../../Service/pfpsmas/zcms/server";

class RzcShenhe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestList: [],    //  申请单存放数组
            detailsList: [],    //  申请单变更明细存放数组

            isDisabled: true,   // 申请单重用按钮是否禁用

            requestSeq: "", //  申请单序号

            selectedRowKeys: [],  // 这里配置默认勾选列
            selectRows: {},
            selectedRows: {},
        }
    }

    onSelectChange(selectedRowKeys, selectedRows) {
        let requestSeq = selectedRows[0].seq;
        let arr = Array.from(new Set(selectedRowKeys))

        if (requestSeq) {
            this.setState({
                isDisabled: false
            })
        } else {
            this.setState({
                isDisabled: true
            })
        }

        this.setState({
            requestSeq: requestSeq,
            selectedRowKeys: arr,
            selectedRows: selectedRows
        })
    }

    handleCheckReuse(){
        let postData = {};
        let {requestSeq} = this.state;
        postData.requestSeq = requestSeq;

        this.axiosTraceabilityOfChangeDetails(postData);
    }

    handReuse(){
        let postData = {};
        let {requestSeq} = this.state;
        postData.requestSeq = requestSeq;

        this.axiosTraceabilityOfChangeDetails(postData, this.axiosChangeDetailedReproduction(postData));
    }

    /**
     *  查询申请单
     */
    async axiosZoningChangeRequestList() {
        let res = await getZoningChangeRequestList();
        console.log("数据", res);
        if (res.rtnCode == "000000") {
            this.setState({
                requestList: res.responseData.dataList
            })
        }
    }

    async axiosTraceabilityOfChangeDetails(params, callback){
        let res = await getTraceabilityOfChangeDetails(params);
        console.log("可复用的申请单======", res);
        if(res.rtnCode == "000000"){
            if(callback) callback(params)
        }
    }

    async axiosChangeDetailedReproduction(params){
        let res = await getChangeDetailedReproduction(params);
        console.log("申请单复用=======", res);
    }


    componentWillMount() {
        this.axiosZoningChangeRequestList();
    }

    render() {
        const columns = [
            {
                title: '区划代码',
                dataIndex: 'levelCode',
                key: 'levelCode',
            }, {
                title: '区划名称',
                dataIndex: 'zoningName',
                key: 'zoningName',
            }, {
                title: '变更对照表名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '变更对照表状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '备注',
                dataIndex: 'notes',
                key: 'notes',
            },
            {
                title: '审批意见',
                dataIndex: 'type',
                key: 'type',
            }, {
                title: '录入时间',
                dataIndex: 'createDate',
                key: 'createDate',
            }];

        const detailsColumns = [
            {
                title: '原区划代码',
                dataIndex: 'levelCode',
                key: 'levelCode',
            }, {
                title: '原区划名称',
                dataIndex: 'zoningName',
                key: 'zoningName',
            }, {
                title: '调整类型',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '现区划代码',
                dataIndex: 'notes',
                key: 'notes',
            }, {
                title: '现区划名称',
                dataIndex: 'createDate',
                key: 'createDate',
            }, {
                title: '审批状态',
                dataIndex: 'status',
                key: 'status',
            }, {
                title: '备注',
                dataIndex: 'notes',
                key: 'notes',
            }
        ];

        const navbar = [{
            name: "建立变更对照表",
            routerPath: "javascript:;",
            imgPath: gray
        }, {
            name: "录入变更明细",
            routerPath: "javascript:;",
            imgPath: gray
        }, {
            name: "维护变更对照表",
            routerPath: "javascript:;",
            imgPath: gray
        }, {
            name: "审核变更对照表",
            routerPath: "javascript:;",
            imgPath: blue
        }]

        const requestRowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        }

        const loop = data => data.map(item => {
            return (
                <Link to={item.routerPath} className="navbar-a">
                    <img src={item.imgPath} alt="导航背景" />
                    <span className="">{item.name}</span>
                </Link>
            )
        })

        return (
            <div className="a">
                <div className="nav">
                    {loop(navbar)}
                </div>
                
                {/* 申请单展示列表 table tr th 未text-align:center*/}
                <div style={{ marginTop: 20 }}>
                    <Table columns={columns} dataSource={this.state.requestList} rowSelection={requestRowSelection} />
                </div>

                {/* 功能按钮组 */}
                <div className="button-group">
                    <Button type="primary" size="large" disabled={this.state.isDisabled} onClick={this.showPrompt.bind(this)}>是否可复用</Button>

                    <Button type="primary" size="large" disabled={this.state.isDisabled} onClick={this.showPrompt.bind(this)}>申请单复用</Button>
                </div>

                {/* 变更明细展示列表 */}
                <div style={{ marginTop: 20 }}>
                    <Table columns={detailsColumns} dataSource={this.state.detailsList} />
                </div>

                <div class="hr_2"></div>
            </div>
        )
    }
}
export default RzcShenhe;