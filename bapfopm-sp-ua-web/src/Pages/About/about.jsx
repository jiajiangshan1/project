import React from 'react';;
require('./about.css');

import {getSystemList, getAuthMenu} from '../../Service/Login/login'
import { Menu, Breadcrumb, Icon } from 'antd';

import Sider from '../../Components/Menu/menu';
import Template from "../../Components/Template/template";

// import BrowserDemo from 'site/theme/template/BrowserDemo';

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
  async axiosAuthMenu(){
    var list;
    if(this.props.location.state.systemId == 99){
      list = {dataObject:[{
        authorityId: 1000, authorityName: "权限审批", parent: "0", systemId: 99}
      ]};
      return list;
    }else{
      list = await getAuthMenu(this.props.location.state.systemId);
      return list;
    }
  }

  componentWillMount(){
    // this.axiosAuthMenu();
  }

  render() {
    const collapse = this.state.collapse;
    return (
        <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>

        <aside className="ant-layout-sider">
          <div className="ant-layout-logo"></div>

            <Sider handle={this.axiosAuthMenu.bind(this)} systemId={this.props.location.state.systemId}/>

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



