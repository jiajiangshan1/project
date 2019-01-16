import {} from "../scss/GlobalCSS"
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router'

import Login from "./Pages/Login/login";
import Register from "./Pages/Register1/register";
import Home from "./Pages/Home/home";
import About from "./Pages/About/about";
import Busin from "./Pages/Business/business";
import Manage from "./Pages/Manage/manage";
import Approval from "./Pages/Approval/approval";
import UserInfo from "./Pages/userInfo/userInfo"

import Test from "./Pages/Test/test";


import 'antd/dist/antd.css';

import axios from "axios";
import Business from "./Pages/Business/business";

axios.defaults.baseURL = `http://localhost:9999`;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

class App extends React.Component{
    render() {
        return (
            <div style={{width:"100%",height:"100%"}}>
                <div className="main" style={{width:"100%",height:"100%"}}>{this.props.children}</div>
            </div>
        )
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>

            {/*<Route path="inbox" component={PageInbox}>*/}
                {/*<Route path="messages/:id" component={PageInboxMessage} />*/}
            {/*</Route> *!/*/}

            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/home' component={Home}/>
            <Route path='/home/userInfo' component={UserInfo}/>
            <Route path='/about' component={About}/>
            {/* <Route path='/about/business' component={Busin}/>
            <Route path='/about/approval' component={Approval}/>
            <Route path='/about/manage' component={Manage}/> */}

            <Router path='/test' component={Test}/>
            
            <IndexRedirect to='/login'/>
        </Route>
    </Router>,
    document.getElementById("app")
)