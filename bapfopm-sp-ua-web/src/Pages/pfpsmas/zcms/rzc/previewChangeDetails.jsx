import React from 'react';
import { hashHistory, Link } from "react-router";
import "./previewChangeDetails.css";

import blue from "../../../../asset/pfpsmas/zcms/img/blue.png";
import black from "../../../../asset/pfpsmas/zcms/img/black.png";
import gray from "../../../../asset/pfpsmas/zcms/img/gray.png";

import { clearData, placeData, changeTypeConversion, getAssigningCode, getSubZoning, getSuperiorZoningCode } from "../../../../asset/pfpsmas/zcms/js/common";
import { getInitPreviewZoningData, getCheckPreviewZoning, getRejectionChangeDetails, getConfirmationChangeDetails} from "../../../../Service/pfpsmas/zcms/server";
import { Navbar, Hr } from "../../../../Components/index";
import { Table, Button, Modal, Input, Checkbox, Select, Row, Col, Tooltip, Tree } from 'antd';

class PreviewChangeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoningCode: sessionStorage.getItem("zoningCode"), //  区划代码
            assigningCode: Number(sessionStorage.getItem("assigningCode")), //  级次代码

            //  省,市,县,乡,村,组   各级区划预览数据存放
            codeRankPreview: {
                "province": [],
                "city": [],
                "county": [],
                "township": [],
                "village": []
            },

            displayDetails: [], //  变更明细展示

            requestSeq: "", //  申请单序号
        }
    }

    /**
     * 获取预览表下级区划
     */
    handleAxiosCheckPreviewZoning(e){
        let postData = {};
        let { codeRankPreview } = this.state;
        let selectedAssigningCode = e.target.dataset.assigningcode;

        postData.zoningCode = e.target.dataset.zoningcode;
        this.axiosCheckPreviewZoning(postData);

        clearData(selectedAssigningCode, codeRankPreview);
    }

    handleAxiosConfirmationChangeDetails(){
        let {requestSeq} = this.state;
        let postData = {};
        postData.seqStr = requestSeq;

        this.axiosConfirmationChangeDetails(postData);
    }

    handleAxiosRejectionChangeDetails(){
        let {requestSeq} = this.state;
        let postData = {};
        postData.seqStr = requestSeq;

        this.axiosRejectionChangeDetails(postData)
    }

    /**
     * 初始化预览表数据
     */
    async axiosInitPreviewZoningData(params) { 
        let { codeRankPreview } = this.state;  
        let res = await getInitPreviewZoningData(params);      
        if (res.rtnCode == "000000") {
            let dataCode = res.responseData;
            placeData(dataCode, codeRankPreview);
            this.setState({
                codeRankPreview: codeRankPreview
            })
        }
    }

    /**
     * 获取预览表下级区划
     */
    async axiosCheckPreviewZoning(params){
        let res = await getCheckPreviewZoning(params);
        let { codeRankPreview } = this.state;
        if (res.rtnCode == "000000") {
            let dataCode = res.responseData;
            placeData(dataCode, codeRankPreview);
            console.log("--------------", codeRankPreview)
            this.setState({
                codeRankPreview: codeRankPreview
            })
        }
    }

    /**
     * 确认变更明细
     * @param seqStr 申请单序号
     */
    async axiosConfirmationChangeDetails(params){
        let res = await getConfirmationChangeDetails(params);
        console.log(res);
    }

    /**
     * 驳回变更明细
     * @param seqStr 申请单序号
     */
    async axiosRejectionChangeDetails(params){
        let res = await getRejectionChangeDetails(params);
        console.log(res);
    }

    componentWillMount() {
        let { zoningCode } = this.state;
        let postData = {};
        let requestSeq = this.props.location.state.requestSeq;
        postData.zoningCode = zoningCode.substr(0, 6);        
        this.axiosInitPreviewZoningData(postData);
        this.setState({
            requestSeq: requestSeq
        })
    }

    render() {
        const navbar = [{
            name: "建立变更对照表",
            routerPath: "/about/createChangeComparisonTable",
            imgPath: gray
        },
        {
            name: "录入变更明细",
            routerPath: "/about/inputChangeDetails",
            imgPath: gray
        },
        {
            name: "变更明细预览",
            routerPath: "/about/previewChangeDetails",
            imgPath: blue
        }];

        const columns = [{
            title: '原区划代码',
            dataIndex: 'originalZoningCode',
            key: 'originalZoningCode',
            width: 150,
        }, {
            title: '原区划名称',
            dataIndex: 'originalZoningName',
            key: 'originalZoningName',
            width: 150,
        }, {
            title: '调整类型',
            dataIndex: 'disChangeType',
            key: 'disChangeType',
            width: 150,
        }, {
            title: '现区划代码',
            dataIndex: 'targetZoningCode',
            key: 'targetZoningCode',
            width: 150,
        }, {
            title: '现区划名称',
            dataIndex: 'targetZoningName',
            key: 'targetZoningName',
            width: 150,
        }, {
            title: '备注',
            dataIndex: 'notes',
            key: 'notes',
            width: 150,
        }];

        const displayDom = data => Object.keys(data).map(key => {
            return (
                <Col span={3}>
                    {loop(data[key])}
                </Col>
            )
        });

        const loop = data => data.map((item) => {
            return (
                <tr className="zoningcode-tr"
                    data-zoningCode={item.zoningCode}
                    data-zoningName={item.divisionName}
                    data-assigningCode={item.assigningCode}
                    onClick={this.handleAxiosCheckPreviewZoning.bind(this)}
                    >
                    <td data-zoningCode={item.zoningCode}
                        data-zoningName={item.divisionName}
                        data-assigningCode={item.assigningCode}>
                        {item.divisionName} {item.ownCode}
                    </td>
                </tr>
            )
        })

        return (
            <div className="previewchangedetails">

                <Navbar data={navbar}></Navbar>

                <div className="container">
                    <div className="container-top">
                        <Row type="flex" justify="space-around">
                            {displayDom(this.state.codeRankPreview)}
                        </Row>
                    </div>

                    <Hr />

                    <div className="container-bottom">
                        <Table dataSource={this.state.displayDetails} columns={columns} pagination={{ pageSize: 5 }} />
                    </div>

                    <div className="container-footer margin-top-10">
                        <Button type="primary" size="large" onClick={this.handleAxiosRejectionChangeDetails.bind(this)}>驳回</Button>
                        <Button type="primary" size="large" style={{ marginLeft: 20 }} onClick={this.handleAxiosConfirmationChangeDetails.bind(this)}>确认</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PreviewChangeDetails;