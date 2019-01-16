import React from 'react';;
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router'
import { getSystemList, getAuthMenu } from '../../Service/Login/login'
import { Menu, Breadcrumb, Icon, Badge } from 'antd';

import Sider from '../../Components/Menu/menu';
import Template from "../../Components/Template/template";

import Busin from "../Business/business";
import Manage from "../Manage/manage";
import Approval from "../Approval/approval";

require('./about.css');

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      systemId: '',
    };
  }

  onCollapseChange() {
    console.log(this);
    this.setState({
      collapse: !this.state.collapse,
    })
  }

  /**
   * 用户点击系统之后加载的系统菜单
   */
  async axiosAuthMenu() {
    let list;
    let systemId = this.props.location.state.systemId
    if(systemId){
      list = await getAuthMenu(systemId);
      return list;
    }
  }

  componentWillMount() {
    // this.axiosAuthMenu();
  }

  render() {
    const collapse = this.state.collapse;
    return (
      <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse layout-bg" : "ant-layout-aside layout-bg" }>

        <aside className="ant-layout-sider">
          <div className="ant-layout-logo"></div>

          <Sider handle={this.axiosAuthMenu.bind(this)} systemId={this.props.location.state.systemId} />

          <div className="ant-aside-action" onClick={this.onCollapseChange.bind(this)}>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>
        </aside>

        {/* <Template /> */}
        {/* {this.props.children} */}

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
                        <Route exact path='about/approval' component={Approval} />
                        <Route exact path='about/manage' component={Manage} />
                        <Route exact path='about/business' component={Busin} />
                    </Router>
                    {/* {this.props.children} */}
                </div>
            </div>
        </div>

        {/* <div className="ant-layout-footer">
            </div> */}
    </div>

      </div>
    )
  }
}

export default About;



