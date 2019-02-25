import React from 'react';
import {hashHistory, Link} from "react-router";
import qs from 'qs'

import blue from "../../../../../asset/pfpsmas/zcms/img/blue.png";
import black from "../../../../../asset/pfpsmas/zcms/img/black.png"
import gray from "../../../../../asset/pfpsmas/zcms/img/gray.png"

import './quhua.css'

import {Table, Button, Modal, DatePicker} from 'antd';
import {
    getZoningChangeRequestList,
} from "../../../Service/pfpsmas/zcms/server";


class Quhua extends React.Component {
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
        }
    }

    componentWillMount() {

    }

    //控制时间选择器
    selectDate(value, dateString) {
        if(dateString){
            this.setState({isDisabled:false})
        }else{
            this.setState({isDisabled:true})
        }
        console.log(value, dateString);
    }

    render() {
        //表格中数据
        const changeControl = [{
            a: "20180327 09:00:00",
            b: "30",
            c: "分",
            d: "成功结束",
            e: "20180327 17:30:00",
            f: "20180327 16:00:00",
            g: "20180327 19:33:24"
        },
            {
                a: "20180425 09:00:00",
                b: "30",
                c: "分",
                d: "成功结束",
                e: "20180425 17:30:00",
                f: "20180425 16:00:00",
                g: "20180425 16:14:01"
            },
            {
                a: "20180526 09:00:00",
                b: "30",
                c: "分",
                d: "成功结束",
                e: "20180526 17:30:00",
                f: "20180526 16:00:00",
                g: "20180526 18:25:42"
            },
        ]

        const columns = [{
            title: '启动时间',
            dataIndex: 'a',
            key: 'a',
        }, {
            title: '启动频度',
            dataIndex: 'b',
            key: 'b',
        }, {
            title: '时间单位',
            dataIndex: 'c',
            key: 'c',
        }, {
            title: '处理状态',
            dataIndex: 'd',
            key: 'd',
        }, {
            title: '上次执行时间',
            dataIndex: 'e',
            key: 'e',
        }, {
            title: '下次执行时间',
            dataIndex: 'f',
            key: 'f',
        }, {
            title: '终止时间',
            dataIndex: 'g',
            key: 'g',
        }];

        const navbar = [{
            name: "定时发布区划",
            routerPath: "javascript:;",
            imgPath: blue
        }, {
            name: "区划下载",
            routerPath: "javascript:;",
            imgPath: black
        }]


        const loop = data => data.map(item => {
            return (
                <Link to={item.routerPath} className="navbar-a">
                    <img src={item.imgPath} alt="导航背景"/>
                    <span className="">{item.name}</span>
                </Link>
            )
        })


        return (
            <div className="a">
                <div className="nav">
                    {loop(navbar)}
                </div>

                {/* 功能按钮组 */}
                <div className="button-group" style={{marginTop:'15px'}}>
                    <span className='time-title'>选择自动发布时间: </span>
                    <DatePicker  size="large" onChange={this.selectDate.bind(this)}/>
                    <Button className='fabu-btn' type="primary" size="large" disabled={this.state.isDisabled}>定时发布</Button>
                </div>
                {/* 申请单展示列表 */}
                <div style={{
                    marginTop: 20
                }}>
                    <Table columns={columns} dataSource={changeControl}/>
                </div>


            </div>
        )
    }
}

export default Quhua;