import React from 'react';
import { hashHistory, Link } from "react-router";
import qs from 'qs'

import blue from "../../../asset/pfpsmas/zcms/img/blue.png";
import black from "../../../asset/pfpsmas/zcms/img/black.png"
import gray from "../../../asset/pfpsmas/zcms/img/gray.png"

import './test.css'

import { Table, Button, Modal, Input, Select, Row, Col } from 'antd';
import { getZoningChangeRequestList, getSearchDetails, getUpdateZCCRequest, getExportExcel, getDeleteDetails } from "../../../Service/pfpsmas/zcms/server";

const Option = Select.Option;

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestList: [],    //  申请单存放数组
            detailsList: [],    //  申请单变更明细存放数组

            updateRequestToggle: false, //  添加申请单确认框显隐开关
            isDisabled: true,   //  添加按钮是否禁用

            zoningName: sessionStorage.getItem("zoningName"),   //  行政区划名称
            levelCode: sessionStorage.getItem("levelCode"), //  级次代码

            requestSeq: "", //  申请单序号
            name: "",   //  申请单名称
            notes: "",  //  申请单备注

            selectedRowKeys: [],  // 这里配置默认勾选列
            selectRows: {},
            selectedRows: {},
        }
    }

    showPrompt() {
        let myDate = new Date();
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        let { zoningName } = this.state;
        let name;
        name = `${zoningName}${year}年${month}月的区划代码变更表`;
        this.setState({
            updateRequestToggle: true,
            name: name
        })
    }

    handleCancel() {
        this.setState({
            updateRequestToggle: false
        })
    }

    handleSubmit() {
        let postDataObj = {};
        let { name, notes, zoningName, levelCode } = this.state;
        postDataObj.name = name;
        postDataObj.notes = notes;
        postDataObj.zoningName = zoningName;
        postDataObj.levelCode = levelCode;
        console.log(postDataObj);

        postDataObj = qs.stringify({
            name: name,
            notes: notes,
            zoningName: zoningName,
            levelCode: levelCode,
        })

        this.axiosAddZoningChangeRequest(postDataObj);
    }

    changeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    changeNote(e) {
        this.setState({
            notes: e.target.value
        })
    }

    onSelectChange(selectedRowKeys, selectedRows) {
        let requestSeq = selectedRows[0].seq;
        let notes = selectedRows[0].notes;
        let name = selectedRows[0].name;
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
            notes: notes,
            name: name,
            selectedRowKeys: arr,
            selectedRows: selectedRows
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
     * 修改申请单接口
     * @param 申请单序号 requestSeq
     * @param 申请单名称 name
     * @param 备注 notes
     */
    async axiosUpdateZCCRequest(params) {
        let res = await getUpdateZCCRequest(params);
        if (res.rtnCode == "000000") {
            this.axiosZoningChangeRequestList();
        } else {
            alert(res.rtnMessage);
        }
        this.setState({
            updateRequestToggle: false
        })
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
            imgPath: blue
        }, {
            name: "审核变更对照表",
            routerPath: "javascript:;",
            imgPath: black
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

                {/* 申请单展示列表 */}
                <div style={{
                    marginTop: 20
                }}>
                    <Table columns={columns} dataSource={this.state.requestList} rowSelection={requestRowSelection} />
                </div>

                {/* 功能按钮组 */}
                <div className="button-group">
                    <Button type="primary" size="large" disabled={this.state.isDisabled} onClick={this.showPrompt.bind(this)}>查看明细</Button>

                    <Button type="primary" size="large" disabled={this.state.isDisabled} onClick={this.showPrompt.bind(this)}>修改</Button>

                    <Button type="primary" size="large" disabled={this.state.isDisabled} onClick={this.showPrompt.bind(this)}>导出明细</Button>
                </div>

                {/* 查询条件 */}
                <div className="search-condition">
                    <Row>
                        <Col span={8} offset={4}>
                            <Row>
                                <Col span={6}>
                                    <span class="sele" ms-data-typecode="data.temp_typeCode">区划级次</span>
                                </Col>
                                <Col span={18}>
                                    <Select placeholder="--请选择--" defaultValue="null" style={{
                                        width: "80%"
                                    }}
                                    onSelect={this.changeAssigningCode.bind(this)}>
                                        <Option value="null">全部</Option>
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
                                    <Select placeholder="--请选择--" defaultValue="null" style={{
                                        width: "80%"
                                    }}
                                    onSelect={this.changeAdjustmentType.bind(this)}>
                                        <Option value="null">全部</Option>
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
                    <Table columns={detailsColumns} dataSource={this.state.detailsList} rowSelection={{ type: "checkbox" }} />
                </div>

                {/* 修改申请单模态框 */}
                <div>
                    <Modal title="添加申请单" visible={this.state.updateRequestToggle}
                        okText="提交" cancelText="返回"
                        onOk={this.handleSubmit.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <div>
                            <div>
                                <span>变更对照表名称</span>
                                <Input onChange={this.changeName.bind(this)} value={this.state.name}></Input>
                            </div>
                            <div>
                                <span>备注</span>
                                <Input type="textarea" onChange={this.changeNote.bind(this)} value={this.state.notes}></Input>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default Test;