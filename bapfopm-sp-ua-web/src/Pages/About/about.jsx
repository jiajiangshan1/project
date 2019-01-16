import React from 'react';;
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router'
import { getSystemList, getAuthMenu } from '../../Service/Login/login'
import { Menu, Breadcrumb, Icon, Badge } from 'antd';

import Sider from '../../Components/Menu/menu';
import Template from "../../Components/Template/template";

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

        <Template />
        {/* {this.props.children} */}

      </div>
    )
  }
}

export default About;



