import React from 'react';
import { hashHistory, Link } from "react-router";
import qs from 'qs'

import './test2.css'

import { Table, Button, Select, Upload,Icon} from 'antd';
import { getZoningChangeRequestList, getSearchDetails, getUpdateZCCRequest, getExportExcel, getDeleteDetails } from "../../../Service/pfpsmas/zcms/server";

const Option = Select.Option;

class ZccrfmShangchuan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestList: [],    //  申请单存放数组
            detailsList: [],    //  申请单变更明细存放数组

            updateRequestToggle: false, //  添加申请单确认框显隐开关


            zoningName: sessionStorage.getItem("zoningName"),   //  行政区划名称
            levelCode: sessionStorage.getItem("levelCode"), //  级次代码

            requestSeq: "", //  申请单序号
            name: "",   //  申请单名称
            notes: "",  //  申请单备注

            selectedRowKeys: [],  // 这里配置默认勾选列
            selectRows: {},
            selectedRows: {},
            fileList: [{
                levelCode: -1,
                zoningName: 'xxx.png',
                fileName: 'done',
                year: 'http://www.baidu.com/xxx.png',
                time:''
            }],
            fileValue:''
        }
    }
    onSelectChange(selectedRowKeys, selectedRows) {
        console.log(selectedRowKeys, selectedRows);
    }

    update(e){
        this.setState({fileValue:e.target.files[0].name});
    }

    onChange(e){
        e.target.value=this.state.fileValue
    }
    onUpload(){

    }
    render() {
        const columns = [
            {
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
            },
            {
                title: '年份',
                dataIndex: 'year',
                key: 'year',
            },
            {
                title: '上传时间',
                dataIndex: 'time',
                key: 'time',
            }];



        const requestRowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        }



        return (
            <div className="a">
                <div className="upload-quhua">
                    <span>上传文件</span>
                    <input type="text" className='filename' onChange={this.onChange.bind(this)} value={this.state.fileValue}/>
                    <input type="file" className="upload-file" id="upload_file" name="file" onChange={this.update.bind(this)}/>
                    <input type="button" className="button-up" value="浏览"/>

                </div>
                {/* 功能按钮组 */}
                <div className="button-group  button-group-quhua">
                    <Button type="primary" size="large" onClick={this.onUpload.bind(this)}>上传</Button>

                    <Button type="primary" size="large"  >重置</Button>
                </div>
                {/* 申请单展示列表 table tr th 未text-align:center*/}
                <div style={{ marginTop: 60 }}>
                    <Table columns={columns} dataSource={this.state.fileList} rowSelection={requestRowSelection} />
                </div>
            </div>
        )
    }
}
export default ZccrfmShangchuan;