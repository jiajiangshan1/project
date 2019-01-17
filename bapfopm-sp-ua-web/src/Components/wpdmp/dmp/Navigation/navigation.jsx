import React from "react";
import {hashHistory, Link} from 'react-router'
import styles from "./navigation.css"

class Navigation extends React.Component{
    constructor(props){
        super(props);
    }

    handleClick(){
        window.localStorage.clear();
        let rex=/login/;
        console.log(rex.test(window.location.hash))
        if(!rex.test(window.location.hash)){
            hashHistory.push('/login')
        }
    }

    render (){
        let nav;
        let rex=/login/;
        if(!rex.test(window.location.hash)){
            nav=<div className='top'>
                <span style={{color:'white',cursor:'pointer'}} onClick={this.handleClick.bind(this)}>点我</span>
            </div>
        }else{
            nav=null;
        }
        return (
            <div style={{background:"#2272c5"}}>
                {nav}
            </div>
        )
    }
}

export default Navigation;