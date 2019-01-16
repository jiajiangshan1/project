import React from 'react'
import { Menu, Breadcrumb, Icon, Switch } from 'antd';
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router'

import About from "../../Pages/About/about";
import Busin from "../../Pages/Business/business";
import Sider from "../../Components/Menu/menu"

export const Template = (props) => (

        <div className="ant-layout-main">
            <div className="ant-layout-header"></div>

            <div className="ant-layout-breadcrumb">
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>应用列表</Breadcrumb.Item>
                    <Breadcrumb.Item>某应用</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className="ant-layout-container">
                <div className="ant-layout-content">
                    <div>
                        {/* {props.children} */}
                    </div>
                </div>
            </div>

            <div className="ant-layout-footer">
            </div>
        </div>
)


export default Template;