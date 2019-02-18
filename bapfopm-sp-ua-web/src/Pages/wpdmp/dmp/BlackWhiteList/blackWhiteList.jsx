import React from 'react';
import ReactDom from 'react-dom';
import {BlackList} from "../../../../Components/wpdmp/dmp/BlackList/blackList";
import {GetBlackList} from "../../../../Service/wpdmp/dmp/categories";
import List from "../../../../Components/wpdmp/dmp/List/list";
import Page from "../../../../Components/wpdmp/dmp/Pagination/pagination";
import style from './blackWhiteList.css'
import {message} from 'antd';
class BlackWhiteList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list:[],
            current:'',
            checked:false,
            totalUser:'',
            ip:'',
            dec:'',
            pageNum:1,
            selected:true
        }
    }
    componentDidMount() {

    }

    handleChange(e) {
        this.setState({ip: e.target.value,selected:true})
        //console.log(e.target.value);
    }
    handleChange2(e){
        this.setState({dec: e.target.value,selected:true})
    }
    //查询黑白名单
    findApi() {
        this.setState({list: [],totalUser:'',current:''})
        this.find(this.state.ip, this.state.dec,this.state.pageNum)

    }
    //接口
    async find(ip,dec,page) {
        let ip2 = ip.replace(/(^\s*)|(\s*$)/g, "");
        let dec2 = dec.replace(/(^\s*)|(\s*$)/g, "");
        if(ip2&&dec2){
            // let {data:{data,totalUsers,currentPage}} = await GetApi(api2, page);

            let {data:{object,totalUsers,currentPage}} = await GetBlackList(ip2, dec2,page);
            console.log(object);
            if (object.code == "000000") {
                if(!object.data.length){
                    message.warning('这条暂无数据哦~')
                }else{
                    let list = this.state.list;
                    object.data.map((item, index) => {
                        item['isUse'] ? item['isUse'] = "是" : item['isUse'] = '否';
                        item.wbType==1?item.wbType="黑名单":item.wbType="白名单"
                    })
                    console.log(object.data);
                    this.setState({list: list.concat(object.data),totalUser:totalUsers,current:currentPage})
                }

            } else {
                message.error(object.msg)
            }
        }else{
            message.warning('输入内容不能为空哦~')
        }

    }
    //页面跳转
    changePage1(current){
        console.log(current);
        this.setState({
            pageNum:current,selected:false
        },this.findApi)
    }

    //多选框赋值
    checkboxChange(value){
        this.setState({checked: value},()=>{
            console.log(this.state.checked);
        })

    }
    render() {
        return (
            <div className="main-container">
                <div className="container">
                    <div className="main clearfix">
                        <div className="searchTitle clearfix">
                            <div className="searchBox">
                                <div className="apiName">
                                    <span>地址</span>
                                </div>
                                <div className="search">
                                    <label htmlFor="userName" className="apiLabel"></label>
                                    <input type="text" id="userName" onChange={this.handleChange.bind(this)} value={this.state.ip}/>
                                </div>
                            </div>
                            <div className="searchBox">
                                <div className="apiName">
                                    <span>描述</span>
                                </div>
                                <div className="search">
                                    <label htmlFor="userGroup" className="apiLabel"></label>
                                    <input type="text" id="userGroup" onChange={this.handleChange2.bind(this)} value={this.state.dec}/>
                                </div>
                            </div>
                            <div className="searchBtn">
                                <input type="button" value="查询" onClick={this.findApi.bind(this)}/>
                            </div>
                        </div>
                        <div className="content api-content">
                            {/*<div className="contentBtn clearfix">*/}
                                {/*<div className="setUp btn">*/}
                                    {/*<input type="button" value="新建"/>*/}
                                {/*</div>*/}
                                {/*<div className="revise btn">*/}
                                    {/*<input type="button" value="修改"/>*/}
                                {/*</div>*/}
                                {/*<div className="del btn">*/}
                                    {/*<input type="button" value="删除"/>*/}
                                {/*</div>*/}
                                {/*<div className="publish btn">*/}
                                    {/*<input type="button" value="发布"/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <div className="contentApi">
                                <BlackList list={this.state.list} changePage1={this.changePage1.bind(this)} selected={this.state.selected} totalUser={this.state.totalUser} current={this.state.current}/>
                                {/*<Page list={this.state.list} handleChange={this.changePage1.bind(this)} totalUser={this.state.totalUser} current={this.state.current}/>*/}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default BlackWhiteList;