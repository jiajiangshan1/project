import React from 'react';
import {hashHistory, Link} from "react-router";
import qs from 'qs'

import blue from "../../../../../asset/pfpsmas/zcms/img/blue.png";
import black from "../../../../../asset/pfpsmas/zcms/img/black.png"
import gray from "../../../../../asset/pfpsmas/zcms/img/gray.png"



import {Table, Button, Modal, DatePicker} from 'antd';

import style from './guanli.css'

class Guanli extends React.Component {
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

            startValue: null,//时间选择器起始时间
            endValue: null,//时间选择器结束时间
            endOpen: false,//
        }
    }

    componentWillMount() {

    }

    //以下都是时间选择器方法
    disabledStartDate(startValue) {
        if (!startValue || !this.state.endValue) {
            return false;
        }
        return startValue.getTime() >= this.state.endValue.getTime();
    }
    disabledEndDate(endValue) {
        if (!endValue || !this.state.startValue) {
            return false;
        }
        return endValue.getTime() <= this.state.startValue.getTime();
    }
    onChange(field, value) {
        console.log(field, 'change', value);
        this.setState({
            [field]: value,
        });
    }
    onStartChange(value) {
        this.onChange('startValue', value);
    }
    onEndChange(value) {
        this.onChange('endValue', value);
    }
    handleStartToggle({ open }) {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }
    handleEndToggle({ open }) {
        this.setState({ endOpen: open });
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
            title: '文件名',
            dataIndex: 'fileName',
            key: 'fileName',
        }, {
            title: '文件类型',
            dataIndex: 'fileType',
            key: 'fileType',
        }, {
            title: '年份',
            dataIndex: 'year',
            key: 'year',
        }, {
            title: '上传时间',
            dataIndex: 'uploadDate',
            key: 'uploadDate',
        }];




        const data=[]
        return (
            <div className="a">
                {/* 时间选择器 */}
                <div className="button-group" style={{marginTop:'15px'}}>
                    <span className='time-title'>导出时间起(YYYYMMDD): </span>
                    <DatePicker
                        disabledDate={this.disabledStartDate.bind(this)}
                        value={this.state.startValue}
                        placeholder="开始日期"
                        onChange={this.onStartChange.bind(this)}
                        toggleOpen={this.handleStartToggle.bind(this)}
                        size='large'
                    />
                    <span className='time-title'>导出时间止(YYYYMMDD): </span>
                    <DatePicker
                        disabledDate={this.disabledEndDate.bind(this)}
                        value={this.state.endValue}
                        placeholder="结束日期"
                        onChange={this.onEndChange.bind(this)}
                        open={this.state.endOpen}
                        toggleOpen={this.handleEndToggle.bind(this)}
                        size='large'
                    />
                </div>

                {/* 功能按钮组 */}
                <div className="button-group">
                    <Button type="primary" size="large" >查询</Button>

                    <Button type="primary" size="large" >重置</Button>
                </div>

                {/* 申请单展示列表 */}
                <div style={{
                    marginTop: 15
                }}>
                    <div className="table-title">
                        <span>查询信息结果展示</span>
                    </div>
                    <Table columns={columns} dataSource={data}/>
                </div>


            </div>
        )
    }
}

export default Guanli;