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
    var listData = data.dataObject;
    console.log('---',listData);
    var arrData = [];
    
    listData.forEach(item => {
      var obj = {};
      for(var key in item){
        if(key == "requestUrl"){
          obj[key] = item[key] ? item[key] : 'javascript:;';
        }else{
          obj[key] = item[key];
        }
      }

      if (item.parent == 0) {
        obj.subMenu = [];
        arrData.push(obj);

        listData.forEach(el => {
          if (el.parent == item.authorityId) {
            var obj = {};
            for(var key in el){
              if(key == "requestUrl"){
                obj[key] = el[key] ? el[key] : 'javascript:;';
              }else{
                obj[key] = el[key];
              }
            }
            arrData[arrData.length - 1].subMenu.push(obj);
          }
        })
      }
    })
    console.log('菜单数据=========', arrData)
    this.setState({ menuData: arrData });
  }

  render() {
    return (
      this.state.menuData ? <div>
        <Switch onChange={this.changeMode.bind(this)} />
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
              if(item.authorityId >= 28 && item.authorityId <= 35){
                return (
                  <SubMenu key={item.authorityId}
                    title={<span><Icon type="appstore" /><span className="nav-text">
  
                      <a href={item.requestUrl}>
                        {item.authorityName}
                      </a> 
                      
                    </span></span>}
                  >
  
                  {
                    item.subMenu.map((el) => (
                      <Menu.Item key={el.authorityId}>
                        <span className="nav-text">
                          <a href={el.requestUrl}>
                            {el.authorityName}
                          </a>
                        </span>
                      </Menu.Item>
                    ))
                  }
                </SubMenu>)

              }else{
                return (
                  <SubMenu key={item.authorityId}
                    title={<span><Icon type="appstore" /><span className="nav-text">
  
                      <Link to={{pathname: `/about${item.requestUrl}`, state: {systemId: item.systemId}}}>
                        {item.authorityName}
                      </Link>
                      
                    </span></span>}
                  >
  
                  {
                    item.subMenu.map((el) => (
                      <Menu.Item key={el.authorityId}>
                        <span className="nav-text">
                          <Link to={{pathname: `/about${el.requestUrl}`, state: {systemId: el.systemId}}}>
                            {el.authorityName}
                          </Link>
                        </span>
                      </Menu.Item>
                    ))
                  }
                </SubMenu>)
              }
              
            } 
            )
          }
        </Menu>
      </div> : <div></div>
    );
  }
}

export default Sider;