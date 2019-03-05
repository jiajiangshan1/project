import React from 'react';
import { hashHistory, Link } from "react-router";
import qs from 'qs'

import blue from "../../../asset/pfpsmas/zcms/img/blue.png";
import black from "../../../asset/pfpsmas/zcms/img/black.png"
import gray from "../../../asset/pfpsmas/zcms/img/gray.png"

import './reviewChangeDetails.css'

import { Table, Button, Modal, Input, Select, Row, Col } from 'antd';
import { getZoningChangeRequestList, getSearchDetails, getAuditDetail } from "../../../../Service/pfpsmas/zcms/server";


const Option = Select.Option;

class Shenhe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestList: [],    //  申请单存放数组
            detailsList: [],    //  申请单变更明细存放数组

            auditDetailToggle: false, //  添加申请单确认框显隐开关
            isDisabled: true,   //  添加按钮是否禁用

            zoningName: sessionStorage.getItem("zoningName"),   //  行政区划名称
            levelCode: sessionStorage.getItem("levelCode"), //  级次代码

            requestSeq: "", //  申请单序号

            seqStr: "", //  变更明细序号
            msg: "", // 审批意见
            isPassed: "",   //  审批状态

            //  查询变更明细条件
            changeType: "",
            assigningCode: "",
            pageIndex: 1,
            pageSize: 5,

            selectedRowKeys: [],  // 这里配置默认勾选列
            selectedRows: {},

            detailsSelectedRowKeys: [],  // 这里配置默认勾选列
            detailsSelectedRows: {},
        }
    }

    //  获取级次
    getAssigningCode(value, option) {
        console.log("12323", value, option);
        this.setState({
            assigningCode: value
        })
    }

    //  获取变更类型
    getChangeType(value, option) {
        console.log("12323", value, option);
        this.setState({
            changeType: value
        })
    }

    showPrompt(params){
        if(params){
            this.setState({
                msg: "审批通过"
            })
        }else{
            this.setState({
                msg: ""
            })
        }

        this.setState({
            auditDetailToggle: true,
            isPassed: params
        })
    }

    handleSubmit(){
        let postDataObj = {};
        let {msg, isPassed} = this.state;
        postDataObj.msg = msg;
        postDataObj.isPassed = isPassed;
        this.axiosAuditDetail()
    }

    handleCancel(){
        this.setState({
            auditDetailToggle: false
        })
    }

    showDetails() {
        let postDataObj = {};
        let { changeType, assigningCode, pageIndex, pageSize, requestSeq } = this.state;
        postDataObj.requestSeq = requestSeq;
        postDataObj.changeType = changeType;
        postDataObj.assigningCode = assigningCode;
        postDataObj.pageIndex = pageIndex;
        postDataObj.pageSize = pageSize;

        this.axiosSearchDetails(postDataObj);
    }

    changeMsg(e) {
        this.setState({
            msg: e.target.value
        })
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

    onDetailsSelectChange(selectedRowKeys, selectedRows) {
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
            detailsSelectedRowKeys: arr,
            detailsSelectedRows: selectedRows
        })
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

    /**
     * 查询变更明细
     */
    async axiosSearchDetails(params) {
        let res = await getSearchDetails(params);
        console.log("变更明细=======", res);
    }

    /**
     * 审核明细
     */
    async axiosAuditDetail(params){
        let res = await getAuditDetail(params);
        console.log("审批结果==========", res);
    }

    componentWillMount() {
        this.axiosZoningChangeRequestList();
    }

    render() {
        const columns = [{
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
        }, {
            title: '备注',
            dataIndex: 'notes',
            key: 'notes',
        }, {
            title: '审批意见',
            dataIndex: 'device',
            key: 'device',
        }, {
            title: '录入时间',
            dataIndex: 'createDate',
            key: 'createDate',
        }];

        const detailsColumns = [{
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
        }];

        const navbar = [{
            name: "省级区划代码预览",
            routerPath: "javascript:;",
            imgPath: gray
        }, {
            name: "变更明细审核",
            routerPath: "javascript:;",
            imgPath: blue
        }]

        const requestRowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        }

        const detailsRowSelection = {
            type: 'checkbox',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onDetailsSelectChange.bind(this),
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

                {/* 申请单展示列表 */}
                <div style={{
                    marginTop: 20
                }}>
                    <Table columns={columns} dataSource={this.state.requestList} rowSelection={requestRowSelection} />
                </div>

                {/* 功能按钮组 */}
                <div className="button-group">
                    <Button type="primary" size="large" disabled={this.state.isDisabled} onClick={this.showDetails.bind(this)}>查看明细</Button>

                    <Button type="primary" size="large" disabled={this.state.isDisabled} onClick={this.showPrompt.bind(this, true)} >审核通过</Button>

                    <Button type="primary" size="large" disabled={this.state.isDisabled} onClick={this.showPrompt.bind(this, false)} >审核不通过</Button>
                </div>

                {/*分割线*/}

                <div className="line"></div>
                {/* 查询条件 */}

                <div className="search-condition">
                    <Row>
                        <Col span={8} offset={4}>
                            <Row>
                                <Col span={6}>
                                    <span class="sele" ms-data-typecode="data.temp_typeCode">区划级次</span>
                                </Col>
                                <Col span={18}>
                                    <Select placeholder="--请选择--" defaultValue="" style={{
                                        width: "80%"
                                    }} onSelect={this.getAssigningCode.bind(this)}>
                                        <Option value="">全部</Option>
                                        <Option value="1">省级</Option>
                                        <Option value="2">市级</Option>
                                        <Option value="3">县级</Option>
                                        <Option value="4">乡级</Option>
                                        <Option value="5">村级</Option>
                                        <Option value="6">组级</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <Row>
                                <Col span={6}>
                                    <span class="sele" ms-data-typecode="data.temp_typeCode">变更类型</span>
                                </Col>
                                <Col span={18}>
                                    <Select placeholder="--请选择--" defaultValue="" style={{
                                        width: "80%"
                                    }} onSelect={this.getChangeType.bind(this)}>
                                        <Option value="">全部</Option>
                                        <Option value="11">新增</Option>
                                        <Option value="21">变更</Option>
                                        <Option value="31">并入</Option>
                                        <Option value="41">迁移</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                {/* 变更明细展示列表 */}
                <div style={{
                    marginTop: 20
                }}>
                    <Table columns={detailsColumns} dataSource={this.state.detailsList} rowSelection={detailsRowSelection} />
                </div>

                {/* 审核变更明细模态框 */}
                <div>
                    <Modal title="变更明细审核" visible={this.state.auditDetailToggle}
                        okText="同意" cancelText="返回"
                        onOk={this.handleSubmit.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <div>
                            <div>
                                <span>审批意见</span>
                                <Input type="textarea" onChange={this.changeMsg.bind(this)} value={this.state.msg}></Input>
                            </div>
                        </div>
                    </Modal>
                </div>

            </div>
        )
    }
}
export default Shenhe;