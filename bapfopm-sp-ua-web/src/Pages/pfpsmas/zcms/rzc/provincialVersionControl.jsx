import React from 'react';
import { hashHistory, Link } from "react-router";
import "./provincialVersionControl.css";

import blue from "../../../../asset/pfpsmas/zcms/img/blue.png";
import black from "../../../../asset/pfpsmas/zcms/img/black.png";
import gray from "../../../../asset/pfpsmas/zcms/img/gray.png";

import { openNotificationWithIcon } from "../../../../asset/pfpsmas/zcms/js/common";
import {getFindVersionExist, getFindVersionRecord, getRecordVersion } from "../../../../Service/pfpsmas/zcms/server";
import { Navbar, Hr } from "../../../../Components/index";
import { Table, Button, Modal, Input, Select, Row, Col, Tooltip, Tree } from 'antd';

const Option = Select.Option;

class ProvincialVersionControl extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zoningCode: sessionStorage.getItem("zoningCode"),   //  用户登录区划
    
            displayVersion: [], //  各省使用区划版本
            usedVersion: "" //  所使用的版本
        }
    }

    handleUsedVersion(e){
        console.log(e);
    }

    /**
     * 提交版本记录
     */
    handleAxiosRecordVersion(){
        let {zoningCode} = this.state;
        let postData = {};

        postData.dmxzqh = zoningCode;

        this.axiosRecordVersion(postData);
    }

    /**
     * 查询已发布版本
     */
    async axiosFindVersionExist(){
        let res = await getFindVersionExist();
        console.log(res);
    }

    /**
     * 查询版本记录
     */
    async axiosFindVersionRecord(){
        let res = await getFindVersionRecord();
        console.log(res);
    }

    /**
     * 提交版本记录
     * @param {string} dmxzqh 行政区划代码
     * @param {string} bbfbrq 版本发布日期
     */
    async axiosRecordVersion(params){
        let res = await getRecordVersion(params);
        console.log(res);
        if(res.rtnCode == "000000"){
            openNotificationWithIcon("success", rtnMessage);
            this.axiosFindVersionRecord();
        }else{
            openNotificationWithIcon("error", rtnMessage);
        }
    }

    componentWillMount(){
        this.axiosFindVersionExist();
        this.axiosFindVersionRecord();
    }

    render(){
        const columns = [];

        const navbar = [{
            name: "省级版本控制",
            routerPath: "/about/provincialVersionControl",
            imgPath: blue
        }]

        return (
            <div className="provincialVersionControl">

                <Navbar data={navbar}></Navbar>

                <div className="container">

                    <div className="container-top">
                        <Table dataSource={this.state.displayVersion} columns={columns} pagination={{ pageSize: 5 }} />
                    </div>

                    <Hr />

                    <div className="container-bottom">
                        <span>
                            请选择所使用区划的版本
                        </span>

                        <Select 
                            defaultValue="--请选择" 
                            value={this.state.usedVersion} 
                            onChange={this.handleUsedVersion.bind(this)}>

                        </Select>

                        <Button type="primary" size="large" onClick={this.handleAxiosRecordVersion.bind(this)}>提交</Button>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default ProvincialVersionControl;