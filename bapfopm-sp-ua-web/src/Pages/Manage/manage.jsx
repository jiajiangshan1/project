import React from 'react';
import { Tree, Modal, Button, Table, Icon, message } from 'antd';
import { getAuthList, getApplyAuth } from "../../Service/Login/login"
import { debug } from 'util';

const TreeNode = Tree.TreeNode;

class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addTreeData: [],
            delTreeData: [],

            autoExpandParent: true,
            checkedKeys: [],

            postData: [],

            addVisible: false,
            delVisible: false
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
            addVisible: true,
        });

        let dataArr = data.dataObject;  //  用户全部数据'
        let listArr = [];   //  存放系统下权限菜单的数组

        let list = [];  //  存放已处理完的系统下权限菜单的数组  权限添加
        let delList = [];   //  存放已处理完的系统下权限菜单的数组  权限删除


        let checkedArr = []; // 存放已有权限菜单的数组

        dataArr.forEach((item) => {
            listArr.push(item.authorities)
        })

        console.log(listArr);

        listArr.forEach((item) => {
            var arrData = [];
            var childrenArr;
            var falg = false;
            for (var i = 0; i < item.length; i++) {

                if (item[i].parent == 0) {
                    childrenArr = []
                    for (var j = 0; j < item.length; j++) {
                        //  当二级菜单的父id跟一级菜单的id想匹配
                        if (item[j].parent == item[i].authorityId) {
                            var obj = {};
                            obj.authorityId = item[j].authorityId;
                            obj.systemId = item[j].systemId;
                            obj.authorityName = item[j].authorityName;
                            obj.parent = item[j].parent;
                            obj.isOwn = item[j].isOwn;
                            if (item[j].isOwn == 0) {
                                falg = true;
                                // 并且没有该权限(isOwn == 0)时
                                childrenArr.push(obj);
                            }
                        }
                    }
                    if (falg) {
                        var obj = {};
                        obj.authorityId = item[i].authorityId;
                        obj.systemId = item[i].systemId;
                        obj.authorityName = item[i].authorityName;
                        obj.parent = item[i].parent;
                        obj.isOwn = item[i].isOwn;
                        obj.authorities = childrenArr;
                        arrData.push(obj);
                    }
                }
            }
            list.push(arrData);
            console.log(list);
        })

        //  删除自身已有权限
        // list.forEach((item) => {
        //     console.log(item);
        //     item.forEach((el, index) => {
        //         if(el.isOwn == 1 && el.authorities.length == 0){
        //            item.splice(--index, 1);
        //         }
        //     })
        // })

        dataArr.forEach((item, index) => {
            item.authorities = list[index];
        })

        this.setState({
            addTreeData: dataArr,
        })
    }

    async axiosApplyAuth() {
        let data = await getApplyAuth(this.state.postData);
        console.log(data);
    }

    /**
     * 点击复选框事件
     */
    onCheck(checkedKeys, info) {
        console.log('onCheck', checkedKeys);
        var firstIndex, lastIndex;
        var obj;
        var data = checkedKeys.map((el) => {
            obj = {}
            firstIndex = el.indexOf('s');
            lastIndex = el.indexOf('a');
            obj.systemId = el.substring(firstIndex + 1, lastIndex);
            obj.authorityId = el.substring(lastIndex + 1);
            obj.caseType = 1;
            obj.applyType = 1;

            if (Number(obj.systemId)) {
                return obj;
            } else {
                return;
            }
        })

        data.forEach((el, index) => {
            if (el == undefined) {
                data.splice(index, 1);
            }
        })

        console.log('--------------',data);

        this.setState({
            postData: data
        })

    }

    showAddModal() {
        this.axiosAuthList();
    }

    showDelModal() {
        this.setState({
            delVisible: true,
        });
    }

    handleOk() {
        console.log('点击了确定');
        this.setState({
            addVisible: false,
        });
    }

    handleCancel() {
        this.setState({
            addVisible: false,
            delVisible: false
        });
    }

    handleSubmitAdd() {
        this.axiosApplyAuth();
    }

    componentWillMount() {
        // this.axiosAuthList();
    }

    render() {

        const loop = data => data.map((item) => {
            if (item.authorities) {
                return (
                    <TreeNode key={!item.authorityId ? `s${item.systemId}` : `s${item.systemId}a${item.authorityId}`}
                        title={item.systemName || item.authorityName}
                        disableCheckbox={!item.authorityId}>

                        {loop(item.authorities)}
                    </TreeNode>
                );
            }
            return <TreeNode key={!item.authorityId ? `s${item.systemId}` : `s${item.systemId}a${item.authorityId}`} title={item.systemName || item.authorityName} />;
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
                <Button type="primary" size="large" onClick={this.showAddModal.bind(this)}>申请添加权限</Button>
                <Button type="primary" size="large" onClick={this.showDelModal.bind(this)}>申请删除权限</Button>

                <div style={{ width: '80%', margin: '10px auto' }}>
                    <Table dataSource={this.state.postData} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                </div>


                <Button type="primary" onClick={this.handleSubmitAdd.bind(this)} style={{ position: 'relative', left: '50%' }}>提交</Button>



                <Modal title="申请添加权限" visible={this.state.addVisible}
                    onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <Tree
                        checkable
                        // checkedKeys={this.state.checkedKeys}
                        onCheck={this.onCheck.bind(this)}
                    >
                        {loop(this.state.addTreeData)}
                    </Tree>
                </Modal>

                {/* <Modal title="申请删除权限" visible={this.state.delVisible}
                    onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <Tree
                        checkable
                        checkedKeys={this.state.checkedKeys}
                        onCheck={this.onCheck.bind(this)}
                    >
                        {loop(this.state.delTreeData)}
                    </Tree>
                </Modal> */}
            </div>
        );
    }
}

export default Manage;