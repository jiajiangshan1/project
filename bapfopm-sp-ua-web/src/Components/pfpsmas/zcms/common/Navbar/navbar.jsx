import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';

import "./navbar.css"

class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state={
            navbarData: []
        }
    }

    componentWillMount(){
        this.setState({
            navbarData: this.props.data
        })
    }

    render() {
        const loop = data => data.map(item => {
            return (
                <Link to={item.routerPath} className="navbar-a">
                    <img src={item.imgPath} alt="导航背景" />
                    <span className="">{item.name}</span>
                </Link>
            )
        })

        return (
            <div className="nav">
                    {loop(this.state.navbarData)}
            </div>
        );
    }
}

export default Navbar;