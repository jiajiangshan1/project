import React from 'react';;
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router'
import { getSystemList, getAuthMenu } from '../../../Service/sp/ua/server'
import { Menu, Breadcrumb, Icon, Badge, message } from 'antd';

import { Sider, Template } from '../../../Components';
// import Template from "../../Components/Template/template";

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
    let systemId = sessionStorage.getItem('systemId')
    if (systemId) {
      list = await getAuthMenu(systemId);
      return list;
    }
  }

  componentWillMount() {
    let systemId;
    systemId = this.props.location.state.systemId
    systemId ? sessionStorage.setItem("systemId", systemId) : ''
    message.success(this.props.location.state.systemId)
  }

  render() {
    const collapse = this.state.collapse;
    return (
      <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse layout-bg" : "ant-layout-aside layout-bg"}>

        <aside className="ant-layout-sider">
          <div className="ant-layout-logo"></div>

          <Sider handle={this.axiosAuthMenu.bind(this)} systemId={sessionStorage.getItem('systemId')} />

          <div className="ant-aside-action" onClick={this.onCollapseChange.bind(this)}>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>
        </aside>

        <Template systemId={this.props.location.state.systemId} />
        {/* {this.props.children} */}

      </div>
    )
  }
}

export default About;



