import React from 'react';
import { Tree, Modal, Button, Table, Icon, message } from 'antd';
import { getAuthList, getApplyAdminAuth } from "../../../../Service/sp/ua/server"

// require('./business.css')

const TreeNode = Tree.TreeNode;

class Busin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],   //  权限树数据存放

            //  ant tree 配置项
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],

            visible: false,

            authData: [],   //  该账户已有权限菜单数组
            postData: [],   //  权限申请提交发送数据 
            displayData: [], //  权限申请展示数据
            
            temp: []
        }
    }

    /**
     * 获取可操作的权限菜单
     * 处理数据成树结构
     */
    async axiosAuthList() {
        let data = await getAuthList(1);
        if (data.status == 400) {
            message.error(data.description);
            return;
        }

        this.setState({
            visible: true,
        });

        let dataArr = data.dataObject;  //  用户全部数据
        let checkedKeys = [];
        //  遍历权限数据,将各个系统下的权限菜单数据存放的数组
        dataArr.forEach(item => {
            console.log(item);
            if(item.isOwn == 1){
                checkedKeys.push(item.systemId + '');     
            }
        })

        //  更新区划树数据
        //  获取该用户已有权限数据
        this.setState({
            checkedKeys: checkedKeys,
            treeData: dataArr,
            authData: checkedKeys
        })
    }

    /**
     * 权限申请
     */
    async axiosApplyAdminAuth() {
        let data = await getApplyAdminAuth(this.state.postData);
        // console.log(data);
        if (data.status == 200) {
            message.success(data.description);
            this.setState({
                postData: [],
                displayData: []
            })
        } else {
            message.error(data.description);
        }
    }

    /**
     * 数组去重
     */
    clearArr(arr){
        var obj = {};
        var temp = [];
        arr.forEach(function(el){
        obj[el] ? obj[el]++ : obj[el] = 1;
        });
      
        for(var k in obj) {
        if(obj[k] % 2 !== 0) temp.push(k);
        }
    
        return temp;
    }

    /**
     * 点击复选框事件
     */
    onCheck(checkedKeys, info) {
        console.log('onCheck',checkedKeys);

        let authData = this.state.authData;
        let newAuth = [...checkedKeys, ...authData];
        let data = this.clearArr(newAuth);
        let dataList = [];
        let displayList = [];
        let temp;
        let flagIndex;
        let obj;

        temp = [...this.state.temp, info];
        this.setState({temp: temp})

        //  处理权限申请发送数据
        data.forEach(item =>{
            obj = {};
            obj.systemId = item;
            obj.applyType = authData.includes(item) ? 0 : 1;  //    已拥有权限是否包含  true为删  false为增
            dataList.push(obj);
        })
        console.log("postData", dataList);

        temp.forEach((item,index) => {
            obj = {};
            obj.authorityId = item.node.props.title;
            obj.systemId = item.node.props.eventKey;
            obj.applyType = dataList[index].applyType == 0 ? "删除" : "添加";
            obj.caseType = "管理权限申请";
            displayList.push(obj);
        })


        
        // console.log('============',dataList);
        
        this.setState({ 
            checkedKeys: checkedKeys,
            postData: dataList,
            displayData: displayList
        });
    }

    onSelect(selectedKeys,info){
        console.log('onSelect', selectedKeys);

        // let expandedKey = this.state.expandedKeys;
        // if(!info.node.props.isLeaf){
        //     expandedKey = [...this.state.expandedKeys, ...selectedKeys];   
        // }

        this.setState({
            expandedKeys: selectedKeys
        })
    }

    showModal() {
        this.axiosAuthList();
    }

    handleOk() {
        console.log('点击了确定');
        this.setState({
            visible: false,
            temp: []
        });
        console.log('---处理结果', this.state.postData);
    }

    handleCancel() {
        this.setState({
            visible: false,
            postData: []
        });
    }

    handleSubmitAdd() {
        if(this.state.postData.length>0){
            this.axiosApplyAdminAuth();
        }else{
            message.error('请选择需要修改的权限!')
        }   
    }

    componentWillMount() {
    }

    render() {
        const loop = data => data.map((item) => {
            if (item.authorities) {
              return (
                <TreeNode key={!item.authorityId ? `${item.systemId}` : `${item.systemId}-${item.authorityId}`} 
                    title={item.systemName || item.authorityName}>
                  {loop(item.authorities)}
                </TreeNode>
              );
            }
            return <TreeNode key={!item.authorityId ? `${item.systemId}` : `${item.systemId}-${item.authorityId}`} 
                title={item.systemName || item.authorityName}/>;
          });

        const columns = [{
            title: '菜单名字',
            dataIndex: 'authorityId',
            key: 'authorityId',
            width: 150,
        }, {
            title: '系统id',
            dataIndex: 'systemId',
            key: 'systemId',
            width: 150,
        }, {
            title: '操作类型',
            dataIndex: 'applyType',
            key: 'applyType',
            width: 150,
        }, {
            title: '权限类型',
            dataIndex: 'caseType',
            key: 'caseType',
            width: 150,
        }];

        return (
            <div className="business">
                <Button type="primary" size="large" onClick={this.showModal.bind(this)}>申请添加权限</Button>

                <div style={{ width: '80%', margin: '10px auto' }}>
                    {/* <Table dataSource={this.state.displayData} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} /> */}
                    <Table dataSource={this.state.displayData} columns={columns} pagination={{ pageSize: 10 }} />
                </div>

                <Button type="primary" onClick={this.handleSubmitAdd.bind(this)} style={{ position: 'relative', left: '50%' }}>提交</Button>

                <Modal title="申请添加权限" visible={this.state.visible}
                    onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <Tree
                        checkable
                        checkStrictly
                        checkedKeys={this.state.checkedKeys} 
                        // expandedKeys={this.state.expandedKeys}  
                        onCheck={this.onCheck.bind(this)} 
                        // onSelect={this.onSelect.bind(this)}
                    >
                        {loop(this.state.treeData)}
                    </Tree>
                    
                </Modal>
            </div>
        );
    }
}

export default Busin;