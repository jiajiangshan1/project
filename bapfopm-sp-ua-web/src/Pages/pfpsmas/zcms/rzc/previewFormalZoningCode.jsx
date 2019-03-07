import React from 'react';
import { hashHistory, Link } from "react-router";
import "./previewFormalZoningCode.css";

import blue from "../../../../asset/pfpsmas/zcms/img/blue.png";
import black from "../../../../asset/pfpsmas/zcms/img/black.png";
import gray from "../../../../asset/pfpsmas/zcms/img/gray.png";

import { openNotificationWithIcon, clearData, placeData, changeTypeConversion, getAssigningCode, getSubZoning, getSuperiorZoningCode } from "../../../../asset/pfpsmas/zcms/js/common";
import { getInitFormalZoningData, getCheckFormalZoning } from "../../../../Service/pfpsmas/zcms/server";
import { Navbar, Hr } from "../../../../Components/index";
import { Row, Col, Button } from 'antd';

class PreviewFormalZoningCode extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zoningCode: sessionStorage.getItem("zoningCode"),   //  用户所在的区划代码
            countryZoningCode:  "000000000000000",
            assigningCode: sessionStorage.getItem("assigningCode"), //  用户所在级次代码

            //  省,市,县,乡,村,组   各级已发布的正式区划预览数据存放
            codeRankPreview: {
                "province": [],
                "city": [],
                "county": [],
                "township": [],
                "village": []
            },

            selectedZoningCode: "", //  已选择区划代码
            selectedZoningName: "", //  已选择区划名称
            selectedAssigningCode: "", //  已选择的级次代码

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
     * 初始化正式表数据
     */
    handleAxiosInitFormalZoningData(zoningCode){
        let { codeRankPreview, assigningCode} = this.state;
        let postData = {};
        postData.zoningCode = zoningCode;

        clearData(assigningCode, codeRankPreview);
        this.axiosInitFormalZoningData(postData);
    }

    /**
     * 获取下级正式数据
     * @param {*} e 
     */
    handleAxiosCheckFormalZoning(e){
        let { codeRankPreview, activedColor} = this.state;
        let postData = {};

        let colorRank = {};

        let selectedZoningCode, selectedZoningName, selectedAssigningCode;

        selectedAssigningCode = e.target.dataset.assigningcode;
        selectedZoningCode = e.target.dataset.zoningcode
        selectedZoningName = e.target.dataset.zoningname;

        colorRank[selectedAssigningCode] = selectedZoningCode;

        placeData(colorRank, activedColor);

        postData.zoningCode = selectedZoningCode;

        this.setState({
            selectedZoningCode: selectedZoningCode,
            selectedZoningName: selectedZoningName,
            selectedAssigningCode: selectedAssigningCode
        })

        clearData(selectedAssigningCode, codeRankPreview);
        this.axiosCheckFormalZoning(postData);
    }

    /**
     * 初始化已发布的正式区划代码
     * @param {string} zoningCode 区划代码
     */
    async axiosInitFormalZoningData(params){
        let { codeRankPreview } = this.state;
        let res = await getInitFormalZoningData(params);
        console.log(res);
        if(res.rtnCode == "000000"){
            let dataCode = res.responseData;
            placeData(dataCode, codeRankPreview);
            this.setState({
                codeRankPreview: codeRankPreview
            })
        }else{
            openNotificationWithIcon("error", res.rtnMessage);
        }
    }

    /**
     * 获取下级正式区划
     * @param {string} zoningCode 区划代码
     */
    async axiosCheckFormalZoning(params){
        let { codeRankPreview } = this.state;
        let res = await getCheckFormalZoning(params);
        if(res.rtnCode == "000000"){
            let dataCode = res.responseData;
            placeData(dataCode, codeRankPreview);
            this.setState({
                codeRankPreview: codeRankPreview
            })
        }else{
            openNotificationWithIcon("error", res.rtnMessage);
        }
    }

    componentWillMount(){
        let {zoningCode} = this.state;
        let postData = {};
        postData.zoningCode = zoningCode;
        this.axiosInitFormalZoningData(postData);
    }

    render(){
        let {zoningCode, countryZoningCode} = this.state;

        const navbar = [{
            name: "区划预览",
            routerPath: "/about/pfpsmas/zcms/previewFormalZoningCode",
            imgPath: blue
        }];

        const displayDom = (data, color) => Object.keys(data).map(key => {
            return (
                <Col span={3}>
                    {loop(data[key], color[key])}
                </Col>
            )
        });

        const loop = (data, color) => data.map((item) => {

            if(color == item.zoningCode){
                return (
                    <tr className="zoningcode-tr zoningCode-actived"
                        data-zoningCode={item.zoningCode}
                        data-zoningName={item.divisionName}
                        data-assigningCode={item.assigningCode}
                        onClick={this.handleAxiosCheckFormalZoning.bind(this)}
                        >
                        <td data-zoningCode={item.zoningCode}
                            data-zoningName={item.divisionName}
                            data-assigningCode={item.assigningCode}>
                            {item.divisionName} {item.ownCode}
                        </td>
                    </tr>
                )
            }else{
                return (
                    <tr className="zoningcode-tr"
                        data-zoningCode={item.zoningCode}
                        data-zoningName={item.divisionName}
                        data-assigningCode={item.assigningCode}
                        onClick={this.handleAxiosCheckFormalZoning.bind(this)}
                        >
                        <td data-zoningCode={item.zoningCode}
                            data-zoningName={item.divisionName}
                            data-assigningCode={item.assigningCode}>
                            {item.divisionName} {item.ownCode}
                        </td>
                    </tr>
                )
            }
        })

        return (
            <div className="previewFormalZoningCode">
                <Navbar data={navbar} />

                <div className="container">
                    <div className="container-header">
                        <Button type="primary" size="large" onClick={this.handleAxiosInitFormalZoningData.bind(this,zoningCode)}>查看本省区划</Button>
                        <Button type="primary" size="large" className="margin-left-20" onClick={this.handleAxiosInitFormalZoningData.bind(this,countryZoningCode)}>查看全国区划</Button>
                    </div>

                    <div className="container-top">
                        <Row type="flex" justify="space-around">
                            {displayDom(this.state.codeRankPreview, this.state.activedColor)}
                        </Row>
                    </div>

                    <Hr />

                    <div className="container-bottom">
                        <Row>
                            <Col span={9} offset={3}>
                                <Row>
                                    <Col span={8}>
                                        <span>已发布区划代码:</span>
                                    </Col>
                                    <Col span={16}>
                                        <span>
                                            {this.state.selectedZoningCode}
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={9}>
                                <Row>
                                    <Col span={8}>
                                        <span>已发布区划名称:</span>
                                    </Col>
                                    <Col span={16}>
                                        <span>
                                            {this.state.selectedZoningName}
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>

            </div>
        )
    }
}

export default PreviewFormalZoningCode;