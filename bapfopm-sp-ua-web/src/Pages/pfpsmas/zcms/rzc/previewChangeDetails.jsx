import React from 'react';
import { hashHistory, Link } from "react-router";
import "./previewChangeDetails.css";

import blue from "../../../../asset/pfpsmas/zcms/img/blue.png";
import black from "../../../../asset/pfpsmas/zcms/img/black.png";
import gray from "../../../../asset/pfpsmas/zcms/img/gray.png";

//  自定义滚动条
import FreeScrollBar from 'react-free-scrollbar';

import { clearData, placeData, changeTypeConversion, getAssigningCode, getSubZoning, getSuperiorZoningCode, openNotificationWithIcon } from "../../../../asset/pfpsmas/zcms/js/common";
import { getInitPreviewZoningData, getCheckPreviewZoning, getRejectionChangeDetails, getConfirmationChangeDetails, getFindChangeDetails} from "../../../../Service/pfpsmas/zcms/server";

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

            //  各级选中区划,颜色样式状态标志
            activedColor: {
                "province": "",
                "city": "",
                "county": "",
                "township": "",
                "village": ""
            }  
        }
    }

    /**
     * 获取预览表下级区划
     */
    handleAxiosCheckPreviewZoning(e){
        let postData = {};
        let colorRank = {};

        let { codeRankPreview, activedColor } = this.state;
        let selectedAssigningCode = e.target.dataset.assigningcode;
        let selectedZoningCode = e.target.dataset.zoningcode;

        colorRank[selectedAssigningCode] = selectedZoningCode;

        placeData(colorRank, activedColor);

        postData.zoningCode = e.target.dataset.zoningcode;
        this.axiosCheckPreviewZoning(postData);
        this.axiosFindChangeDetails(postData);

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
        console.log(postData);

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
            this.setState({
                codeRankPreview: codeRankPreview
            })
        }
    }

    /**
     * 根据行政区划查询当月变更明细
     * @param {string} zoningCode 区划代码
     */
    async axiosFindChangeDetails(params){
        let res = await getFindChangeDetails(params);
        let tempArr = [];

        console.log(res);
        if (res.rtnCode == "000000") {
    
            res.responseData.forEach(item => {
                item.disChangeType= changeTypeConversion(item.changeType)
                tempArr.push(item);
            });

            this.setState({
                displayDetails: tempArr
            })
        }else{
            openNotificationWithIcon("error", res.rtnMessage);
        }
    }

    /**
     * 确认变更明细
     * @param seqStr 申请单序号
     */
    async axiosConfirmationChangeDetails(params){
        let res = await getConfirmationChangeDetails(params);
        console.log(res);
        if(res.rtnCode == "000000"){
            openNotificationWithIcon("success", res.rtnMessage);
        }else{
            openNotificationWithIcon("error", res.rtnMessage);
        }
    }

    /**
     * 驳回变更明细
     * @param seqStr 申请单序号
     */
    async axiosRejectionChangeDetails(params){
        let res = await getRejectionChangeDetails(params);
        console.log(res);
        if(res.rtnCode == "000000"){
            openNotificationWithIcon("success", res.rtnMessage);
            hashHistory.push({
                pathname: "/about/pfpsmas/zcms/inputChangeDetails"
            })
        }else{
            openNotificationWithIcon("error", res.rtnMessage);
        }
    }

    componentWillMount() {
        let { zoningCode } = this.state;
        let postData = {};
        let requestSeq = this.props.location.state.requestSeq;
        console.log(requestSeq);
        postData.zoningCode = zoningCode.substr(0, 6);        
        this.axiosInitPreviewZoningData(postData);
        this.setState({
            requestSeq: requestSeq
        })  
    }

    render() {
        const navbar = [{
            name: "建立变更对照表",
            routerPath: "/about/pfpsmas/zcms/createChangeComparisonTable",
            imgPath: gray
        },
        {
            name: "录入变更明细",
            routerPath: "/about/pfpsmas/zcms/inputChangeDetails",
            imgPath: gray
        },
        {
            name: "变更明细预览",
            routerPath: "/about/pfpsmas/zcms/previewChangeDetails",
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
            dataIndex: 'currentZoningCode',
            key: 'currentZoningCode',
            width: 150,
        }, {
            title: '现区划名称',
            dataIndex: 'currentZoningName',
            key: 'currentZoningName',
            width: 150,
        }, {
            title: '备注',
            dataIndex: 'notes',
            key: 'notes',
            width: 150,
        }];

        const displayDom = (data, color) => Object.keys(data).map(key => {
            return (
                <Col span={4}>
                    <FreeScrollBar>
                        {loop(data[key], color[key])}
                    </FreeScrollBar>
                </Col>
            )
        });

        const loop = (data, color) => data.map((item) => {

            return (
                <tr className={`zoningcode-tr ${(item.sfbh && item.sfbh == "1") ? "background-color-red": null} ${color == item.zoningCode?"zoningCode-actived" : null }`}
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
                            {displayDom(this.state.codeRankPreview, this.state.activedColor)}
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