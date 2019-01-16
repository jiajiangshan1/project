import React from 'react'
import { Menu, Breadcrumb, Icon, Badge } from 'antd';
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router'

import About from "../../Pages/About/about";
import Home from "../../Pages/Home/home";
import Busin from "../../Pages/Business/business";
import Manage from "../../Pages/Manage/manage";
import Approval from "../../Pages/Approval/approval";

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
                    {/* <Router history={hashHistory}>
                        <Route exact path='about/approval' component={Approval} />
                        <Route exact path='about/manage' component={Manage} />
                        <Route exact path='about/business' component={Busin} />
                    </Router> */}
                    {this.props.children}
                </div>
            </div>
        </div>

        {/* <div className="ant-layout-footer">
            </div> */}
    </div>
)


export default Template;