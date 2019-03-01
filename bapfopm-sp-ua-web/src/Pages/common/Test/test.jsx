import React from 'react';
import { hashHistory, Link } from "react-router";
import qs from 'qs'

import blue from "../../../asset/pfpsmas/zcms/img/blue.png";
import black from "../../../asset/pfpsmas/zcms/img/black.png"
import gray from "../../../asset/pfpsmas/zcms/img/gray.png"

import './test.css'

import { Table, Button, Modal, Input, Checkbox, Select, Row, Col } from 'antd';
import { Navbar, Hr } from "../../../Components/index"

import {clearData, placeData, sliceSpecifiedCode} from "../../../asset/pfpsmas/zcms/js/common";
import { getInitAddDetails, getSubordinateZoning, getZoningCompareAffairByOne } from "../../../Service/pfpsmas/zcms/server";

const Option = Select.Option;

class Test extends React.Component {
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

            //  获取下级区划代码
            selectedZoningCode: "", //  用户有效的点击，选中区划代码
            selectedZoningName: "", // 用户选中的区划区划名称
            selectedAssigningCode: "",   //  用户选择地区的级次代码,用户只能查看下级区划代码

            //  民政区划对比
            civilCode: '无',
            civilName: '无',
            resultType: '',
            codeEqual: '',
            nameEqual: '',

            //  变更明细数据
            originalZoningCodeArray: ["", "", "", "", "", ""], //  原区划代码分组展示的存放位置
            originalZoningCode: "", //  原区划代码
            originalZoningName: "", //  原区划名称
            targetZoningCodeArray: ["", "", "", "", "", ""], //  现区划代码分组展示的存放位置
            targetZoningCode: "", //   现区划代码
            targetZoningName: "", //  现区划名称

            changeType: "",  //  变更类型

            displayDetails: [], // 变更明细数据存放

            ringFlag: false,    //  是否重用

            //  变更类型存放数组
            changeTypeOption:[
                {value: "11", text: "新增", disabled: "true"},
                {value: "21", text: "变更", disabled: "true"},
                {value: "31", text: "并入", disabled: "true"},
                {value: "41", text: "迁移", disabled: "true"},
            ]
        }
    }

    handleAxiosSubordinateZoning(e) {
        let {assigningCode, codeRankPreview} = this.state;
        let selectedAssigningCode = Number(e.target.dataset.assigningcode);
        let originalZoningCodeArray;
        let targetZoningCodeArray;
        let originalZoningName;
        let targetZoningName;

        //  用户权限判定 只能操作下级数据
        if(selectedAssigningCode >= assigningCode){

             // 清理非直系下级数据，只保留亲子级数据
            clearData(selectedAssigningCode, codeRankPreview);

            //  获取子级区划代码发送数据
            let postData = {};
            postData.zoningCode = e.target.dataset.zoningcode;
            postData.zoningName = e.target.dataset.zoningname;

            this.axiosSubordinateZoning(postData);
            this.axiosZoningCompareAffairByOne(postData);

            originalZoningCodeArray = sliceSpecifiedCode(e.target.dataset.zoningcode);
            targetZoningCodeArray = originalZoningCodeArray;
            originalZoningName = e.target.dataset.zoningname;
            targetZoningName = originalZoningName;

            this.setState({
                selectedAssigningCode: selectedAssigningCode,
                selectedZoningCode: e.target.dataset.zoningcode,
                originalZoningCodeArray: originalZoningCodeArray,
                targetZoningCodeArray: targetZoningCodeArray,
                originalZoningName: originalZoningName,
                targetZoningName: targetZoningName
            })
        }
    }

    handleChangeValue(e){
        console.log(e);
        console.log(this.state.targetZoningCodeArray);
    }

    handleChecked(e){
        console.log(e.target.checked)
    }

    /**
     * 初始化区划变更明细对照数据录入界面
     */
    async axiosInitAddDetails(params) {
        let res = await getInitAddDetails(params);
        let { codeRankPreview } = this.state;
        if (res.rtnCode == "000000") {
            let dataCode = res.responseData.previewData;
            placeData(dataCode, codeRankPreview);
            this.setState({
                codeRankPreview: codeRankPreview
            })
        }
    }

    /**
     * 获取子级区划代码
     */
    async axiosSubordinateZoning(params) {
        let res = await getSubordinateZoning(params);
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
     * 单个民政区划对比
     */
    async axiosZoningCompareAffairByOne(params){
        let res = await getZoningCompareAffairByOne(params);
        console.log(res);
        if(res.rtnCode == "000000"){
            let data = res.responseData;
            this.setState({
                civilCode: data.civilCode,
                civilName: data.civilName,
                codeEqual: data.codeEqual ? "相同" : "不同",
                nameEqual: data.nameEqual ? "相同" : "不同"
            })
        }
    }

    componentWillMount() {
        let postData = {};
        let { zoningCode } = this.state;
        postData.zoningCode = zoningCode;
        this.axiosInitAddDetails(postData);
    }

    render() {
        const navbar = [{
            name: "建立变更对照表",
            routerPath: "javascript:;",
            imgPath: gray
        }, {
            name: "录入变更明细",
            routerPath: "javascript:;",
            imgPath: blue
        }, {
            name: "维护变更对照表",
            routerPath: "javascript:;",
            imgPath: black
        }, {
            name: "审核变更对照表",
            routerPath: "javascript:;",
            imgPath: black
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
            dataIndex: 'changeType',
            key: 'changeType',
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
                    onClick={this.handleAxiosSubordinateZoning.bind(this)}>
                        <td data-zoningCode={item.zoningCode} 
                            data-zoningName={item.divisionName} 
                            data-assigningCode={item.assigningCode}>
                                {item.divisionName} {item.ownCode}
                        </td>
                </tr>
            )
        })

        const loopInput = (data, assigningcode) => data.map( (item, index) => {            
            if(index <= 2){
                if(assigningcode == (index+1)){
                    return (
                        <input className="input-small-length input-font-color" type="text" maxLength="2" value={item} onChange={this.handleChangeValue.bind(this)}/>
                    )
                }else{
                    return (
                        <input className="input-small-length" type="text" maxLength="2" value={item} readOnly/>
                    )
                }
            }else{
                if(assigningcode == (index+1)){
                    return (
                        <input className="input-small-length input-font-color" type="text" maxLength="3" value={item} onChange={this.handleChangeValue.bind(this)}/>
                    )
                }else{
                    return (
                        <input className="input-small-length" type="text" maxLength="3" value={item} readOnly/>
                    )
                }
            }

        })

        return (
            <div className="inputchangedetails">
                <Navbar data={navbar}></Navbar>

                <div className="container">
                    <div className="container-top">
                        <Row type="flex" justify="space-around">
                            {displayDom(this.state.codeRankPreview)}
                        </Row>
                    </div>

                    <Hr />

                    <div className="container-top-2">
                        <div className="civil-content">
                            <span className="civil-span">民政区划代码:</span> <span className="civil-input">{this.state.civilCode}</span>
                            <span className="civil-span">民政区划名称:</span> <span className="civil-input">{this.state.civilName}</span>
                            <span className="civil-span">比对结果:</span> 
                            <span className="civil-input civil-color">
                                代码比对{this.state.codeEqual};
                                名称比对{this.state.nameEqual}
                            </span>
                        </div>	
                    </div>

                    <Hr />

                    <div className="container-center">
                        <Row className="margin-top-10">
                            {/* 调整说明 */}
                            <Col span={12}>
                                <Row>
                                    <Col span={6}>
                                        <label className="label-font-16">调整说明<span className="color-red-margin">*</span></label>
                                    </Col>
                                    <Col span={18}>
                                        <input type="text" className="input-large-length" />
                                    </Col>
                                </Row>
                            </Col>

                            {/* 调整类型 */}
                            <Col span={12}>
                                <Row>
                                    <Col span={6}>
                                        <Checkbox onChange={this.handleChecked.bind(this)}>重用变更</Checkbox>
                                    </Col>
                                    <Col span={18}>
                                        <Row>
                                            <Col span={6}>
                                                <label className="label-font-16">调整类型<span className="color-red-margin">*</span></label>
                                            </Col>
                                            <Col span={18} className="text-align-left">
                                                <Select size="large" placeholder="--请选择--"
                                                style={{width: "66%"}}>
                                                    <Option value="11">新增</Option>
                                                    <Option value="21">变更</Option>
                                                    <Option value="31">并入</Option>
                                                    <Option value="41">迁移</Option>
                                                </Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="margin-top-10">
                            {/* 原区划代码 */}
                            <Col span={12}>
                                <Row>
                                    <Col span={6}>
                                        <label className="label-font-16">原区划代码</label>
                                    </Col>
                                    <Col span={18}>
                                        {loopInput(this.state.originalZoningCodeArray)}
                                    </Col>
                                </Row>
                            </Col>

                            {/* 现区划代码 */}
                            <Col span={12}>
                                <Row>
                                    <Col span={6}>
                                        <label className="label-font-16">现区划代码<span className="color-red-margin">*</span></label>
                                    </Col>
                                    <Col span={18}>
                                        {loopInput(this.state.targetZoningCodeArray, this.state.selectedAssigningCode)}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="margin-top-10">
                            {/* 原区划名称 */}
                            <Col span={12}>
                                <Row>
                                    <Col span={6}>
                                        <label className="label-font-16">原区划名称</label>
                                    </Col>
                                    <Col span={18}>
                                        <input type="text" className="input-large-length" value={this.state.originalZoningName}/>
                                    </Col>
                                </Row>
                            </Col>

                            {/* 现区划名称 */}
                            <Col span={12}>
                                <Row>
                                    <Col span={6}>
                                        <label className="label-font-16">现区划名称<span className="color-red-margin">*</span></label>
                                    </Col>
                                    <Col span={18}>
                                        <input type="text" className="input-large-length" value={this.state.targetZoningName}/>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>

                        <Row className="margin-top-10">
                            {/* 备注 */}
                            <Col span={12}>
                                <Row>
                                    <Col span={6}>
                                        <label className="label-font-16">备注<span className="color-red-margin">*</span></label>
                                    </Col>
                                    <Col span={18}>
                                        <input type="text" className="input-large-length"/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="margin-top-10">
                            {/* 功能按钮组 */}
                            <Col span={12} offset={6}>
                                <Button type="primary" size="large">保存明细</Button>
                                <Button type="primary" size="large" style={{marginLeft: 20}}>重置</Button>
                            </Col>
                        </Row>

                    </div>

                    <Hr/>

                    <div className="container-bottom" style={{height: 800}}>
                        <Table dataSource={this.state.displayDetails} columns={columns} pagination={{ pageSize: 5 }} />
                    </div>
                </div>
            </div>
        )
    }

}
export default Test;