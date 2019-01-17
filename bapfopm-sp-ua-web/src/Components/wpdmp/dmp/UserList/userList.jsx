import React from 'react';
import ReactDom from 'react-dom';


class UserList extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        let row;
        row=this.props.list.map((item,index)=>{
                if(index %2){
                    return  <tr className='doubleLine'>
                        <td>{item.userId}</td>
                        <td>{item.userName}</td>
                        <td>{item.groupId}</td>
                        <td>{item.isUse}</td>
                        <td>{item.createDate}</td>
                        <td>{item.updateDate}</td>
                        <td>{item.useable}</td>
                        <td>{item.createTime}</td>
                    </tr>
                } else {
                    return  <tr >
                        <td>{item.userId}</td>
                        <td>{item.userName}</td>
                        <td>{item.groupId}</td>
                        <td>{item.isUse}</td>
                        <td>{item.createDate}</td>
                        <td>{item.updateDate}</td>
                        <td>{item.useable}</td>
                        <td>{item.createTime}</td>
                    </tr>
                }
            }
        )
        let content=this.props.title.map((item,index)=>{return<th>{item}</th>})

        return (
            <table className='table'>
                <tr>
                    {content}
                </tr>
                {row}
            </table>
        );
    }
}
export default UserList;