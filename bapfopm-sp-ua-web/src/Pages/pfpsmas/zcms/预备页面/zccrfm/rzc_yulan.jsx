import React from 'react';
import { hashHistory, Link } from "react-router";
import qs from 'qs'

import blue from "../../../asset/pfpsmas/zcms/img/blue.png";
import black from "../../../asset/pfpsmas/zcms/img/black.png"

import './test.css'

import { Table, Button, Modal, Input, Select, Row, Col } from 'antd';
import { getZoningChangeRequestList, getSearchDetails, } from "../../../Service/pfpsmas/zcms/server";


class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //  省,市,县,乡,村,组   各级已发布的正式区划预览数据存放
            codeRankPreview: {
                "province": [],
                "city": [],
                "county": [],
                "township": [],
                "village": []
            },

        }

    }
    handleAxiosCheckFormalZoning(e) {
        let { codeRankPreview } = this.state;
        let postData = {};

        let selectedZoningCode, selectedZoningName, selectedAssigningCode;

        selectedAssigningCode = e.target.dataset.assigningcode;
        selectedZoningCode = e.target.dataset.zoningcode
        selectedZoningName = e.target.dataset.zoningname;

        postData.zoningCode = selectedZoningCode;

        this.setState({
            selectedZoningCode: selectedZoningCode,
            selectedZoningName: selectedZoningName,
            selectedAssigningCode: selectedAssigningCode
        })

        clearData(selectedAssigningCode, codeRankPreview);
        this.axiosCheckFormalZoning(postData);
    }


    render() {
        const navbar = [
            {
                name: "导入民政区划",
                routerPath: "javascript:;",
                imgPath: black
            }, {
                name: "民政区划预览",
                routerPath: "javascript:;",
                imgPath: blue
            }
        ]

        const loop = data => data.map(item => {
            return (
                <Link to={item.routerPath} className="navbar-a">
                    <img src={item.imgPath} alt="导航背景" />
                    <span className="">{item.name}</span>
                </Link>
            )
        })

        const displayDom = data => Object.keys(data).map(key => {
            return (
                <Col span={3}>
                    {Cloop(data[key])}
                </Col>
            )
        });

        const Cloop = data => data.map((item) => {
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
        })


        return (
            <div className="a">
                <div className="nav">
                    {loop(navbar)}
                </div>

                <div className="contents">
                    <span className="span">民政区划内容</span>
                </div>

                <div className="container-top">
                    <Row type="flex" justify="space-around">
                        {displayDom(this.state.codeRankPreview)}
                    </Row>
                </div>

                <div className="container-bottom">
                    <Row>
                        <Col span={6}>民政区划代码:</Col>
                        <Col span={6}> <Input type="text" className="c-input" readonly /> </Col>
                        <Col span={6}> 民政区划名称:</Col>
                        <Col span={6}> <Input type="text" className="c-input" readonly /></Col>
                    </Row>
                    <Row style={{marginTop:20}}>
                        <Button type="primary" size="large" className="c-query">生成民政对比</Button>
                        <Button type="primary" size="large" className="c-query">导出</Button>
                        <Button type="primary" size="large" className="c-query">导出EXCEL</Button>
                    </Row>
                </div>

            </div>
        )
    }
}
export default Test;