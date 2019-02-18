import React from 'react';
import ReactDom from 'react-dom';
import {hashHistory, Link} from "react-router";
import {List} from "../../../../Components/wpdmp/dmp/List/list1";
import {ApplyList} from "../../../../Components/wpdmp/dmp/ApplyList/applyList";
import {Select, Table,message} from 'antd';
import {GetApiState} from '../../../../Service/wpdmp/dmp/categories'

const Option = Select.Option;

class ApplyApiCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiName: '',
            state: '',
            pageNum: 1,
            list: [],
            pageSize: 5,
            totalUser: '',
            current: 1,
            checked: false,
            selected: true
        }
    }


    handleChange(e) {
        this.setState({apiName: e.target.value,selected: true})
    }

    handleSelect(value) {
        this.setState({state: value,selected: true})
    }

    //查询api
    findApi() {
        this.setState({list: [], totalUser: '', current: '',})
        this.find(this.state.apiName, this.state.state,this.state.pageNum)
    }

    //api接口
    async find(apiName, state,pageNum1) {
        if (apiName && state) {
            let api2 = apiName.replace(/(^\s*)|(\s*$)/g, "");
            let state2 = parseFloat(state.replace(/(^\s*)|(\s*$)/g, ""));
            // let {data:{data:{list},code,msg}} = await GetApiState(api2, state2);
            let {data:{data:{list,total,pageNum},code,msg}} = await GetApiState(api2, state2,pageNum1);
            if (code == "000000") {
                if(!list.length){
                    message.warning('该条无数据!')
                }
                list.map((item)=>{
                    if(item.approvalStatus==1){
                        item.approvalStatus='通过'
                    }else if(item.approvalStatus==2){
                        item.approvalStatus="驳回"
                    }else{
                        item.approvalStatus='待审核'
                    }
                })
                this.setState({list: list, totalUser: total, current: pageNum})
            } else {
                alert(msg)
            }
        } else {
            alert('输入内容不能为空哦^_^')
        }

    }

    //页面跳转
    changePage1(current) {
        this.setState({
            pageNum: current, selected: false
        }, this.findApi)
    }


    render() {
        return (
            <div>
                <div className="main-container">
                    <div className="container">
                        <div className="main clearfix">
                            <div className="searchTitle clearfix">
                                <div className="searchBox">
                                    <div className="apiName">
                                        <span>接口名称</span>
                                    </div>
                                    <div className="search">
                                        <label htmlFor="userName" className="apiLabel"></label>
                                        <input type="text" id="userName" onChange={this.handleChange.bind(this)}
                                               value={this.state.apiName}/>
                                    </div>
                                </div>
                                <div className="searchBox">
                                    <div className="apiName">
                                        <span>状态</span>
                                    </div>
                                    <div className="search">
                                        <Select placeholder='请选择状态哦' style={{width: 200, height: 35}}
                                                onChange={this.handleSelect.bind(this)}>
                                            <Option value="0">待审核</Option>
                                            <Option value="1">已通过</Option>
                                            <Option value="2">驳回</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="searchBtn">
                                    <input type="button" value="查询" onClick={this.findApi.bind(this)}/>
                                </div>
                            </div>
                            <div className="content apiContent">
                                <div className="searchBtn new-built">
                                    <Link to='/about/wpdmp/dmp/applyCHeck/apiList' state={sessionStorage.getItem("systemId")}>新建申请</Link>
                                </div>
                                <div className="contentApi content-float">
                                    <ApplyList list={this.state.list} totalUser={this.state.totalUser}
                                               current={this.state.current} handleChange={this.changePage1.bind(this)}
                                               selected={this.state.selected}/>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ApplyApiCheck;