import { hashHistory, Link } from 'react-router';
import { Menu, Icon, Switch } from 'antd';

require('./menu.css')

const { SubMenu } = Menu;

class Sider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'inline',
      theme: 'dark',
      menuData: []
    }
  }

  changeMode(value) {
    this.setState({
      mode: value ? 'vertical' : 'inline',
    });
  }

  changeTheme(value) {
    this.setState({
      theme: value ? 'light' : 'dark',
    });
  }

  async componentWillMount() {
    console.log(this.props.systemId);

    var data = await this.props.handle();
    console.log(data.dataObject)
    var listData = data.dataObject;
    var arrData = [];
    for (var i = 0; i < listData.length; i++) {
      var obj = {};
      obj.authorityId = listData[i].authorityId;
      obj.authorityName = listData[i].authorityName;
      obj.systemId = listData[i].systemId;
      obj.parent = listData[i].parent;
      obj.requestUrl = listData[i].requestUrl ? listData[i].requestUrl : '';
      if (obj.parent == 0) {
        obj.subMenu = [];
        arrData.push(obj)
        for (var j = 0; j < listData.length; j++) {
          if (listData[j].parent == listData[i].authorityId) {
            var obj = {};
            obj.authorityId = listData[j].authorityId;
            obj.authorityName = listData[j].authorityName;
            obj.systemId = listData[j].systemId;
            obj.parent = listData[j].parent;
            obj.requestUrl = listData[j].requestUrl ? listData[j].requestUrl : '';
            arrData[arrData.length - 1].subMenu.push(obj);
          }
        }
      }
    }
    console.log('菜单数据=========', arrData)
    this.setState({ menuData: arrData });
  }

  render() {
    return (
      this.state.menuData ? <div>
        <Switch onChange={this.changeMode.bind(this)} /> Mode
        {/* <span className="ant-divider" style={{ margin: '0 1em' }} /> */}
        {/* <Switch onChange={this.changeTheme.bind(this)} /> Theme */}
        <br />
        <br />
        <Menu
          style={{ width: `100%` }}
          mode={this.state.mode}
          theme={this.state.theme}
        >
          {
            this.state.menuData.map(function (item) {
              return (<SubMenu key={item.authorityId}
                title={<span><Icon type="appstore" /><span className="nav-text">
                  <Link to={{pathname: item.requestUrl, state: {systemId: item.systemId}}}>{item.authorityName}</Link>
                </span></span>}>

                {item.subMenu.map((el) => (
                  <Menu.Item key={el.authorityId}>{el.authorityName}</Menu.Item>
                ))}
              </SubMenu>)
            }
            )
          }
        </Menu>
      </div> : <div></div>
    );
  }
}

export default Sider;