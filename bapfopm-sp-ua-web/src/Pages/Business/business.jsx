import React from 'react';
import { Tree, Modal, Button, Table, Icon, message } from 'antd';
import { getAuthList, getApplyAuth } from "../../Service/Login/login"
import { debug } from 'util';

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
            postData: []    //  权限申请提交发送数据 
            
        }
    }

    /**
     * 获取可操作的权限菜单
     * 处理数据成树结构
     */
    async axiosAuthList() {
        let data = await getAuthList(0);
        if (data.status == 400) {
            message.error(data.description);
            return;
        }

        this.setState({
            visible: true,
        });

        let dataArr = data.dataObject;  //  用户全部数据
        //  遍历权限数据,将各个系统下的权限菜单数据存放的数组
        let listArr = [];
        let checkedKeys = [];
        let list = [];

        dataArr.forEach((item) => {
            listArr.push(item.authorities)
        })

        listArr.forEach((item) => {
            var arrData = [];
            var childrenArr;
            var flag = false;
            
            item.forEach((parMenu) => {
                //  寻找到权限菜单中的一级菜单
                if (parMenu.parent == 0) {
                    //  创建一个存放二级菜单的数组
                    childrenArr = []
                    item.forEach((subMenu) => {
                        //  当二级菜单的父id跟一级菜单的id相匹配
                        if (subMenu.parent == parMenu.authorityId) {
                            //  如果匹配成功,则证明该一级菜单拥有子菜单,开启标志
                            flag = true;
                            //  创建二级菜单对象,将数据存放进去
                            var obj = {};
                            for(var key in subMenu){
                                obj[key] = subMenu[key];
                            }
                            //  设置该节点为叶子节点
                            obj.isLeaf = true;
                            if(subMenu.isOwn == 1){
                                checkedKeys.push(`${subMenu.systemId}-${subMenu.authorityId}`)
                                this.setState({
                                    checkedKeys,
                                })
                            }
                            //  将二级菜单存放到数组中
                            childrenArr.push(obj);
                        }
                    })
                    //  创建一级菜单对象,将数据存放进去
                    var obj = {};
                    for(var key in parMenu){
                        obj[key] = parMenu[key];
                    }
                    obj.isLeaf = true;
                    //  验证标志,如果开启,一级菜单创建子菜单数组
                    if (flag) {
                        obj.authorities = childrenArr;
                        obj.isLeaf = false;
                    }
                    //  每个系统下存放一级菜单
                    arrData.push(obj);
                }
            })

            list.push(arrData);
        })

        dataArr.forEach((item, index) => {
            item.authorities = list[index];
        })

        //  更新区划树数据
        //  获取该用户已有权限数据
        this.setState({
            treeData: dataArr,
            authData: this.state.checkedKeys
        })
    }

    /**
     * 权限申请
     */
    async axiosApplyAuth() {
        let data = await getApplyAuth(this.state.postData);
        // console.log(data);
        if (data.status == 200) {
            message.success(data.description);
            this.setState({
                postData: []
            })
        } else {
            message.error(data.description);
        }
    }

    /**
     * 点击复选框事件
     */
    onCheck(checkedKeys, info) {
        console.log('onCheck', [...checkedKeys]);
        let data;
        this.setState({ 
            checkedKeys: checkedKeys,
            postData: data
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
            // postList: this.state.postList.concat(this.state.postData)
        });
    }

    handleCancel() {
        this.setState({
            visible: false,
            postData: []
        });
    }

    handleSubmitAdd() {
        if(this.state.postData.length>0){
            this.axiosApplyAuth();
        }else{
            message.error('请选择需要修改的权限!')
        }   
    }

    componentWillMount() {
        // this.axiosAuthList();
    }

    render() {

        const loop = data => data.map((item) => {
            if (item.authorities) {
                return (
                    <TreeNode key={!item.authorityId ? `${item.systemId}` : `${item.systemId}-${item.authorityId}`}
                        title={item.systemName || item.authorityName}
                        // isLeaf={item.isLeaf}
                        // disableCheckbox={!item.isLeaf}
                        >

                        {loop(item.authorities)}
                    </TreeNode>
                );
            }
            return <TreeNode key={!item.authorityId ? `${item.systemId}` : `${item.systemId}-${item.authorityId}`} 
                title={item.systemName || item.authorityName} 
                // isLeaf={item.isLeaf}
                // disableCheckbox={!item.isLeaf} 
                />
        });

        const columns = [{
            title: '菜单id',
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
            <div>
                <Button type="primary" size="large" onClick={this.showModal.bind(this)}>申请添加权限</Button>

                <div style={{ width: '80%', margin: '10px auto' }}>
                    <Table dataSource={this.state.postData} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                </div>

                <Button type="primary" onClick={this.handleSubmitAdd.bind(this)} style={{ position: 'relative', left: '50%' }}>提交</Button>

                <Modal title="申请添加权限" visible={this.state.visible}
                    onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <Tree
                        checkable
                        checkStrictly
                        checkedKeys={this.state.checkedKeys} 
                        expandedKeys={this.state.expandedKeys}  
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