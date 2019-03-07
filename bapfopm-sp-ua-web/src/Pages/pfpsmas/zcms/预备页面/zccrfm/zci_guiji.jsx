import React from 'react';
import { hashHistory, Link } from "react-router";
import qs from 'qs'

import './test.css'

// DatePicker日期选择器
import { Table, Button, Modal, Input, Select, Row, Col, DatePicker, InputNumber } from 'antd';
import { getZoningChangeRequestList, getSearchDetails, getUpdateZCCRequest, getExportExcel, getDeleteDetails } from "../../../Service/pfpsmas/zcms/server";

const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;// DatePicker日期选择器

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestList: [],    //  申请单存放数组
            detailsList: [],    //  申请单变更明细存放数组

            updateRequestToggle: false, //  添加申请单确认框显隐开关
            isDisabled: true,   //  添加按钮是否禁用

            //sessionStorage.getItem()获取指定key本地存储的值
            zoningName: sessionStorage.getItem("zoningName"),//行政区划名称 
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
        let year = myDate.getFullYear();//在IE和FF中都可以正确获取年份：2010
        let month = myDate.getMonth() + 1;
        let { zoningName } = this.state;
        let name;
        name = `${zoningName}${year}年${month}月的区划代码变更表`;
        this.setState({
            updateRequestToggle: true,
            name: name
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
                title: '变更类型',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '目标区划代码',
                dataIndex: 'notes',
                key: 'notes',
            }, {
                title: '目标区划名称',
                dataIndex: 'createDate',
                key: 'createDate',
            }, {
                title: '变更时间',
                dataIndex: 'time',
                key: 'time',
            },
        ];


        return (
            <div className="a">
                <label className="lab">区划代码
                    <input type="text" className="c-input in" />
                </label>
                <label className="lab">时间选择
                    <MonthPicker defaultValue="2019-3" size="large" className="c-input inp" />
                </label>
                <Button type="primary" size="large" className="c-query">查询</Button>
                <Button type="primary" size="large" className="c-query reset">重置</Button>
                {/* echarts  轨迹展示 */}
                <div id="echarts-demo"></div>

                {/* 追溯结果展示 */}
                <div style={{ marginTop: 20 }}>
                    <span className="t-title">追溯结果展示</span>
                    <Table columns={detailsColumns} dataSource={this.state.detailsList} />
                </div>
            </div>
        )
    }
}
export default Test;