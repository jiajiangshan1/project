import React from 'react'
import { Menu, Breadcrumb, Icon, Badge } from 'antd';
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router'

// sp-ua
import UserInfo from "../../../../Pages/sp/ua/UserInfo/userInfo";
import Busin from "../../../../Pages/sp/ua/Business/business";
import Manage from "../../../../Pages/sp/ua/Manage/manage";
import Approval from "../../../../Pages/sp/ua/Approval/approval";
import EditUserInfo from "../../../../Pages/sp/ua/EditUserInfo/editUserInfo";
import CreateAuth from "../../../../Pages/sp/ua/CreateAuth/createAuth";

//  wpdmp-dmp
import ApiList from '../../../../Pages/wpdmp/dmp/ApiList/apilist'
import ApiDetail from "../../../../Pages/wpdmp/dmp/ApiDetail/apiDetail";
import BlackWhiteList from "../../../../Pages/wpdmp/dmp/BlackWhiteList/blackWhiteList";
import ApiDetailChange from "../../../../Components/wpdmp/dmp/ApiDetailChange/apiDetailChange";

require('./template.css')

export const Template = (props) => (

    <div className="ant-layout-main template-bg">
        <div className="ant-layout-header">
            <div>
                <Badge count={99}>
                    {/* <a href="#" className="head-example"> */}
                        <Icon type="mail" style={{fontSize: "40px", color: '#fff', margin: '10px'}}/>
                    {/* </a> */}
                </Badge>
                <Badge count={200}>
                    {/* <a href="#" className="head-example"> */}
                        <Icon type="book" style={{fontSize: "40px", color: '#fff', margin: '10px'}}/>
                    {/* </a> */}
                </Badge>
            </div>
        </div>

        <div className="ant-layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>当前位置</Breadcrumb.Item>
            </Breadcrumb>
        </div>

        <div className="ant-layout-container">
            <div className="ant-layout-content template-content">
                <div>
                    <Router history={hashHistory}>
                        <Route path='/about' exact component={UserInfo} />
                        <Route path='/about/sp/ua/approval' component={Approval} />
                        <Route path='/about/sp/ua/manage' component={Manage} />
                        <Route path='/about/sp/ua/business' component={Busin} />
                        <Route path='/about/sp/ua/editUserInfo' component={EditUserInfo} />
                        <Route path='/about/sp/ua/createAuth' component={CreateAuth} />

                        <Route path='/about/wpdmp/dmp/apilist' component={ApiList}/>
                        <Route path='/about/wpdmp/dmp/apilist/apiDetail' component={ApiDetail}/>
                        <Route path='/about/wpdmp/dmp/apilist/apiDetailChange' component={ApiDetailChange}/>
                        <Route path='/about/wpdmp/dmp/apilist/blackList' component={BlackWhiteList}/>
                    </Router>
                </div>
            </div>
        </div>

        {/* <div className="ant-layout-footer">
            </div> */}
    </div>
)


export default Template;