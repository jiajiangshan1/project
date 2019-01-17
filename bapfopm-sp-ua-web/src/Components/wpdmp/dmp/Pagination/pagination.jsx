import React from 'react';
import ReactDom from 'react-dom';
import {Pagination} from "antd";


class Page extends React.Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount() {
    }

    changePage(current){
        this.props.handleChange(current);
    }
    render() {
        return (
            <div>
                <Pagination
                    showQuickJumper
                    defaultCurrent={1}
                    current={this.props.current}
                    total={this.props.totalUser}
                    pageSize={5}
                    //pageSizeOptions={["2","3"]}
                    onChange={this.changePage.bind(this)}
                />
            </div>
        );
    }
}

export default Page;