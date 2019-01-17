import React from 'react';
import ReactDom from 'react-dom';
import BlackList from "../../../../Components/wpdmp/dmp/BlackList/blackList";
import {GetBlackList} from "../../../../Service/wpdmp/dmp/categories";
import List from "../../../../Components/wpdmp/dmp/List/list";
import Page from "../../../../Components/wpdmp/dmp/Pagination/pagination";


class BlackWhiteList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            title:title,
            list:[],
            current:'',
            checked:false,
            totalUser:'',
            ip:'',
            dec:'',
            pageNum:1
        }
    }
    componentDidMount() {

    }

    handleChange(e) {
        this.setState({ip: e.target.value})
        //console.log(e.target.value);
    }
    handleChange2(e){
        this.setState({dec: e.target.value})
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

            if (object.code == "000000") {
                let list = this.state.list;
                this.setState({list: list.concat(object.data),totalUser:totalUsers,current:currentPage})
            } else {
                alert(object.msg)
            }
        }else{
            alert('输入内容不能为空哦^_^')
        }

    }
    //页面跳转
    changePage1(current){
        console.log(current);
        this.setState({
            pageNum:current
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
                        <div className="content">
                            <div className="contentBtn clearfix">
                                <div className="setUp btn">
                                    <input type="button" value="新建"/>
                                </div>
                                <div className="revise btn">
                                    <input type="button" value="修改"/>
                                </div>
                                <div className="del btn">
                                    <input type="button" value="删除"/>
                                </div>
                                <div className="publish btn">
                                    <input type="button" value="发布"/>
                                </div>
                            </div>
                            <div className="contentApi">
                                <BlackList list={this.state.list} title={this.state.title} checkboxChange={this.checkboxChange.bind(this)}/>
                                <Page list={this.state.list} handleChange={this.changePage1.bind(this)} totalUser={this.state.totalUser} current={this.state.current}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

let title = ['','地址', "描述", '是否启用', '创建时间', '更新时间', '类型'
];

export default BlackWhiteList;