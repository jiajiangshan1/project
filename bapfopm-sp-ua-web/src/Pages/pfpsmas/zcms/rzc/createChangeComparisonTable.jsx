import React from 'react';
import { hashHistory, Link } from "react-router";

import blue from "../../../asset/pfpsmas/zcms/img/blue.png";
import black from "../../../asset/pfpsmas/zcms/img/black.png"
import gray from "../../../asset/pfpsmas/zcms/img/gray.png"

import './test.css'

import { Table, Button, Modal, notification, Input  } from 'antd';
import { getZoningChangeRequestList, getAddZoningChangeRequest, getFindWritableZCCRequests } from "../../../Service/pfpsmas/zcms/server";

class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            requestList: [],    //  申请单存放数组
            addRequestToggle: false, //  添加申请单确认框显隐开关
            isDisabled: false,   //  添加按钮是否禁用

            zoningName: sessionStorage.getItem("zoningName"),   //  行政区划名称
            levelCode: sessionStorage.getItem("levelCode"), //  级次代码

            name: "",   //  申请单名称
            notes: "",  //  申请单备注
        }
    }

    showPrompt(){
        let myDate = new Date();
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        let {zoningName} = this.state;
        let name;
        name = `${zoningName}${year}年${month}月的区划代码变更表`;
        this.setState({
            addRequestToggle: true,
            name: name
        })
    }

    handleCancel(){
        this.setState({
            addRequestToggle: false
        })
    }

    handleSubmit(){
        let postDataObj = {};
        let {name, notes, zoningName, levelCode} = this.state;
        postDataObj.name = name;
        postDataObj.notes = notes;
        postDataObj.zoningName = zoningName;
        postDataObj.levelCode = levelCode;
        this.axiosAddZoningChangeRequest(postDataObj);
    }

    changeName(e){
        this.setState({
            name: e.target.value
        })
    }

    changeNote(e){
        this.setState({
            notes: e.target.value
        })
    }

    /**
     *  查询申请单
     */
    async axiosZoningChangeRequestList(){
        let res = await getZoningChangeRequestList();
        console.log("数据", res);
        if(res.rtnCode == "000000"){
            this.setState({
                requestList: res.responseData.dataList
            })
        }
    }

    /**
     * 查询是否存在可录入的申请单
     */
    async axiosFindWritableZCCRequests(){
        let res = await getFindWritableZCCRequests();
        if(res.rtnCode == "000000" && res.responseData != 0){
            this.setState({
                isDisabled: true
            })
        }else{
            this.setState({
                isDisabled: false
            })
        }
        console.log(this.state.isDisabled)
        return res;
    }

    /**
     * 添加申请单
     * @param name — 申请单名字
     * @param levelCode — 上报区划的级别代码
     * @param notes — 备注
     * @param zoningName — 区划名称
     */
    async axiosAddZoningChangeRequest(params){
        let res = await getAddZoningChangeRequest(params);
        if(res.rtnCode == "000000"){
            this.axiosZoningChangeRequestList();
        }else{
            alert(res.rtnMessage);
        }
        this.setState({
            addRequestToggle: false
        })
    }

    componentWillMount(){
        this.axiosZoningChangeRequestList();
        this.axiosFindWritableZCCRequests();
    }

    render(){
        const columns = [{
            title: '区划代码',
            dataIndex: 'levelCode',
            key: 'levelCode',
          }, {
            title: '区划名称',
            dataIndex: 'zoningName',
            key: 'zoningName',
          }, {
            title: '变更对照表名称',
            dataIndex: 'name',
            key: 'name',
          }, {
            title: '备注',
            dataIndex: 'notes',
            key: 'notes',
          }, {
            title: '录入时间',
            dataIndex: 'createDate',
            key: 'createDate',
          }, {
            title: '操作',
            render: (text, record) => (
                <span>
                  <Link to="javascript:;">录入明细</Link>
                </span>
              ),
          }];
          
          const navbar = [{
            name: "建立变更对照表",
            routerPath: "javascript:;",
            imgPath: blue
          },
          { 
            name: "录入变更明细",
            routerPath: "javascript:;",
            imgPath: black
          },
          {
            name: "维护变更对照表",
            routerPath: "javascript:;",
            imgPath: black
          },
          {
            name: "审核变更对照表",
            routerPath: "javascript:;",
            imgPath: black
          }
        ]

        const loop = data => data.map(item => {
            return (
                <Link to={item.routerPath} className="navbar-a">
                    <img src={item.imgPath} alt="导航背景"/> 
                    <span className="">{item.name}</span>
                </Link>
            )
        })

        
        return (
            <div>
                <div className="nav">
                    {loop(navbar)}
                </div>

                <div style={{
                    marginTop: 20
                }}>
                    <Table columns={columns} dataSource={this.state.requestList} />
                </div>

                <div>
                    <Button type="primary" size="large" style={{
                        position: "absolute",
                        left: "50%",
                        marginTop: 20
                    }} disabled={this.state.isDisabled} onClick={this.showPrompt.bind(this)}>添加</Button>
                </div>

                <div>
                    <Modal title="添加申请单" visible={this.state.addRequestToggle}
                        okText="提交" cancelText="返回"
                        onOk={this.handleSubmit.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <div>
                            <div>
                                <span>变更对照表名称</span>
                                <Input onChange={this.changeName.bind(this)} value={this.state.name}></Input>
                            </div>
                            <div>
                                <span>备注</span>
                                <Input type="textarea" onChange={this.changeNote.bind(this)} value={this.state.notes}></Input>
                            </div>
                        </div>   
                    </Modal>
                </div>
            </div>
        )
    }
}
export default Test;