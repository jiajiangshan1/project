import React from 'react';
import ReactDom from 'react-dom';
import {hashHistory, Link} from "react-router";


class Entry extends React.Component {
    // componentDidMount() {
    //     if(!window.localStorage.getItem("state")){
    //         alert("请登录哦~~")
    //         hashHistory.push('/login')
    //     }
    // }

    render() {
        return (
            <div style={{background:"#2272c5",height:"100%"}}>
                <ul style={{fontSize:'50px'}}>
                    <li style={{color:"#ffffff"}}>
                        <Link to='/entry/apilist'>接口列表与注册</Link>
                    </li>
                    <li>
                        <Link to='/entry/userInfo'>用户信息</Link>
                    </li>
                </ul>

            </div>
        );
    }
}

export default Entry;