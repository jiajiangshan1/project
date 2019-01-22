import {} from "../scss/GlobalCSS"
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router'
import { relative } from "path";

import {Navigation} from "./Components"

import Login from "./Pages/common/Login/login";
import Register from "./Pages/common/Register/register";
import Home from "./Pages/common/Home/home";
import About from "./Pages/common/About/about";
import Test from "./Pages/common/Test/test";

import 'antd/dist/antd.css';

import axios from "axios";

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
            <Route path='/about' component={About}/>

            <Router path='/test' component={Test}/>
            
            <IndexRedirect to='/login'/>
        </Route>
    </Router>,
    document.getElementById("app")
)