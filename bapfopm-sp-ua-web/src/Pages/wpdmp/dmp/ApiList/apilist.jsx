import React from 'react';
import ReactDom from 'react-dom';
import styles from './apilist.css'
import {hashHistory,Link} from "react-router";
import {List} from "../../../../Components/wpdmp/dmp/List/list1"
import {GetApi} from "../../../../Service/wpdmp/dmp/categories"

class ApiList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiInput: '',
            pageNum:1,
            list: [],
            title: title,
            pageSize:5,
            totalUser:'',
            current:'',
            checked:false,
            selected:true
        }
    }

    // async componentWillMount(){
    //     let data=await GetApi();
    //     console.log(data);
    // }

    // componentDidMount() {
    //     if (!window.localStorage.getItem("state")) {
    //         alert("请登录哦~~")
    //         hashHistory.push('/login')
    //     }
    // }

    handleChange(e) {
        this.setState({apiInput: e.target.value,selected:true})
    }

    // newBuilt(e) {
    //     ModalBox.confirm({
    //         title: 'Demo',
    //         content: 'Hello world!',
    //         okText: '确认',
    //         cancelText: '取消',
    //         onOk: () => console.log('ok'),
    //         onCancel: () => console.log('cancel'),
    //         onClose: () => {
    //         }
    //     })
    // }
    //查询api
    findApi() {
        this.setState({list: [],totalUser:'',current:'',})
        this.find(this.state.apiInput, this.state.pageNum)
    }
    //api接口
    async find(api, page) {
        let api2 = api.replace(/(^\s*)|(\s*$)/g, "");
        if(api2){
            // let {data:{data,totalUsers,currentPage}} = await GetApi(api2, page);
            let {data:{object,totalUsers,currentPage}} = await GetApi(api2, page);
            console.log(object);
            if (object.code == "000000") {
                let list = this.state.list;
                this.setState({list: list.concat(object.data),totalUser:totalUsers,current:currentPage})
               // console.log(this.state.list);
            } else {
                alert(object.msg)
            }
        }else {
            alert('输入内容不能为空哦^_^')
        }

    }
    //修改api内容
    changeApi(){

    }
    //页面跳转
    changePage1(current){
        this.setState({
            pageNum:current,selected:false
        },this.findApi)
    }


    render() {
        return (
            <div>
                <div className="main-container">
                    <div className="container">
                        <div className="main clearfix">
                            <div className="searchTitle clearfix">
                                <div className="apiName">
                                    <span>API名称</span>
                                </div>
                                <div className="search">
                                    <label htmlFor="api" className="apiLabel"></label>
                                    <input type="text" id="api" value={this.state.apiInput}
                                           onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div className="searchBtn">
                                    <input type="button" value="查询" onClick={this.findApi.bind(this)}/>
                                </div>
                            </div>
                            <div className="content api-content">
                                {/*<div className="contentBtn clearfix">*/}
                                    {/*/!*<div className="setUp btn">*!/*/}
                                        {/*/!*<input type="button" value="新建" onClick={this.newBuilt.bind(this)}/>*!/*/}
                                    {/*/!*</div>*!/*/}
                                    {/*<div className="setUp btn">*/}
                                        {/*<Link to='/entry/apilist/apiDetail'>新建</Link>*/}
                                    {/*</div>*/}
                                    {/*<div className="revise btn">*/}
                                        {/*<Link to='/entry/apilist/apiDetailChange' onClick={this.changeApi.bind(this)} >修改</Link>*/}
                                    {/*</div>*/}
                                    {/*<div className="del btn">*/}
                                        {/*<input type="button" value="删除"/>*/}
                                    {/*</div>*/}
                                    {/*<div className="publish btn">*/}
                                        {/*<input type="button" value="发布"/>*/}
                                    {/*</div>*/}
                                    {/*<div className="stopStart btn">*/}
                                        {/*<input type="button" value="启停"/>*/}
                                    {/*</div>*/}
                                    {/*<div className="list btn">*/}
                                        {/*<Link to='/entry/apilist/blackList'>黑白名单</Link>*/}
                                    {/*</div>*/}
                                    {/*/!*<div className="authority btn">*!/*/}
                                        {/*/!*<input type="button" value="授权"/>*!/*/}
                                    {/*/!*</div>*!/*/}
                                {/*</div>*/}
                                <div className="contentApi">
                                    {/*<List list={this.state.list} title={this.state.title} checkboxChange={this.checkboxChange.bind(this)}/>*/}
                                    <List list={this.state.list} totalUser={this.state.totalUser} current={this.state.current} handleChange={this.changePage1.bind(this)} selected={this.state.selected} />
                                    {/*<Page list={this.state.list} handleChange={this.changePage1.bind(this)} totalUser={this.state.totalUser} current={this.state.current}/>*/}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


let title = ['','API名称', "分组", 'API路径', '服务ID', '版本号', '状态', '是否启用', '创建时间', '结束时间', '有效期',
];

export default ApiList;