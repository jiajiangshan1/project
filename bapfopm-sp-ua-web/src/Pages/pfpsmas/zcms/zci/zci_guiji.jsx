import React from 'react';
import { hashHistory, Link } from "react-router";
import qs from 'qs' //序列化

import './zci_guiji.css'

// DatePicker日期选择器
import { Table, Button, Modal, Input, Select, Row, Col, DatePicker, InputNumber } from 'antd';
import { historicalTrack } from "../../../Service/pfpsmas/zcms/server";

const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;// DatePicker日期选择器

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsList: [],    //  申请单变更明细存放数组

            //参数
            timeInterval: '',   //时间间隔
            zoningCode: '230111010204000', //原区划代码

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.getHistoricalTrack = this.getHistoricalTrack.bind(this);
    }
    handleInputChange(e) {
        this.setState({ zoningCode: e.target.value })
    }
    handleTimeChange(e, value) {
        this.setState({ timeInterval: value })
    }
    //参数处理
    getHistoricalTrack() {
        let getDataObj = {};
        let { zoningCode, timeInterval } = this.state;
        getDataObj.zoningCode = zoningCode;
        getDataObj.timeInterval = timeInterval;
        this.axiosRequestList(getDataObj);
    }
    /**
   * 历史轨迹数据获取接口
   * @param {string} zoningCode 区划代码
   * @param {string} timeInterval 时间间隔(所选时间到最近一次发布)   6位数
   */
    async axiosRequestList(params) {
        let res = await historicalTrack(params);
        console.log('res-->', res);
        // if (res.rtnCode == "999999") {
        //     alert('请完善查询条件!');
        // }else{
        //     this.setState({
        //         detailsList:res.responseData
        //     })
        // }
    }


    render() {
        const detailsColumns = [
            {
                title: '原区划代码',
                dataIndex: 'zoningCode',
                key: 'zoningCode',
            }, {
                title: '原区划名称',
                dataIndex: 'zoningName',
                key: 'zoningName',
            }, {
                title: '变更类型',
                dataIndex: 'changeType',
                key: 'changeType',
            }, {
                title: '目标区划代码',
                dataIndex: 'uniqueKey',
                key: 'uniqueKey',
            }, {
                title: '目标区划名称',
                dataIndex: 'zoningFullName',
                key: 'zoningFullName',
            }, {
                title: '变更时间',
                dataIndex: 'periodStart',
                key: 'periodStart',
            },
        ];


        return (
            <div className="zci_guiji">
                <div className="codeQuery">

                    <div className="codeQuery-left">
                        <div className="codeName">
                            <span> 区划代码</span>
                        </div>
                        <div className="lableInput">
                            <label for="codeInput" className="inputLable"></label>
                            <input type="text" id="codeInput" value={this.state.zoningCode} onChange={this.handleInputChange} />
                        </div>

                        <div className="codeName">
                            <span> 时间选择</span>
                        </div>
                        <div className="timePicker">
                            <MonthPicker size="large" defaultValue="2019-3" onChange={this.handleTimeChange} />
                        </div>

                    </div>

                    <div className="codeQuery-right">
                        <Button type="primary" size="large" className="queryBtn" onClick={this.getHistoricalTrack}>查询</Button>
                        <Button type="primary" size="large" className="queryBtn">重置</Button>
                    </div>

                </div>
                {/* echarts  轨迹展示 */}
                {/* <div id="echarts-demo"></div> */}

                {/* 追溯结果展示 */}
                <div className="resultDisplay">
                    <span className="t-title">追溯结果展示</span>
                    <Table columns={detailsColumns} dataSource={this.state.detailsList} />
                </div>
            </div>
        )
    }
}
export default Test;