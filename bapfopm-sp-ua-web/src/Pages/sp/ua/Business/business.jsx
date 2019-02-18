import React from 'react';
import { Tree, Modal, Button, Table, Icon, message } from 'antd';
import { getAuthList, getApplyAuth } from "../../../../Service/sp/ua/server"
import { debug } from 'util';

// require('./business.css')

const TreeNode = Tree.TreeNode;

class Busin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],   //  权限树数据存放

            //  ant tree 配置项
            checkedKeys: [],

            visible: false, //  权限树模态框显隐标志

            authData: [],   //  该账户已有权限菜单数组
            postData: [],   //  权限申请提交发送数据 
            displayData: [], //  权限申请展示数据
            authList: [], //    权限菜单映射字典
            systemList: [], //  权限系统映射字典
            
            temp: [],    // 用户当前选中权限存放的临时数组

            checkedKeysTemp: [] //  用户每次勾选完的勾选数
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
        let listArr = []; //  遍历权限数据,将各个系统下的权限菜单数据存放的数组
        let checkedKeys = [];
        let proCheckedKeys = [];
        let list = [];
        let authData = [];
        let listData = [];  //   处理菜单id 跟 菜单名称的数据字典
        let systemData = [];    //  处理系统id 跟 系统名称的数据字典

        //  生成一个权限菜单数据字典
        dataArr.forEach((item) => {
            systemData = [...systemData, ...item];
            listArr.push(item.authorities);
        })


        listArr.forEach(item => {
            listData = [...listData, ...item];
        })
        this.setState({
            systemList: systemData,
            authList: listData
        })

        listArr.forEach((item) => {
            var arrData = [];
            var childrenArr;
            var flag = false;   //  是否创建子菜单数组的标志
            var checkFlag = true;   //  是否将父级的选中状态存入数组的标志
            
            item.forEach((parMenu) => {
                //  寻找到权限菜单中的一级菜单
                if (parMenu.parent == 0) {
                    //  创建一个存放二级菜单的数组
                    childrenArr = [];
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
                                checkedKeys.push(`${subMenu.systemId}-${subMenu.authorityId}`);
                                authData.push(`${subMenu.systemId}-${subMenu.authorityId}`);
                            }else{
                                checkFlag = false;
                            }
                            //  将二级菜单存放到数组中
                            childrenArr.push(obj);
                            
                            if(checkFlag){
                                proCheckedKeys.push(`${subMenu.systemId}-${parMenu.authorityId}`);
                            }
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
                        if(obj.authorities.length != 0){
                            obj.isLeaf = false;
                        }     
                    }
                    //  如果是叶子节点,并且是拥有权限状态,放入勾选菜单中
                    if(obj.isLeaf == true && obj.isOwn == 1){
                        checkedKeys.push(`${obj.systemId}-${obj.authorityId}`);
                        authData.push(`${obj.systemId}-${obj.authorityId}`);
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
            checkedKeys: [...checkedKeys, ...proCheckedKeys],
            treeData: dataArr,
            authData: authData
        })
    }

    /**
     * 权限申请
     */
    async axiosApplyAuth() {
        let data = await getApplyAuth(this.state.postData);
        // // console.log(data);
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
     * 过滤传送数据
     * 将勾选后的数据和已拥有的权限数据进行组合
     * 将重复部分(未做更改的数据)过滤
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
     * 根据权限id 匹配相应权限名称
     * @param {*} arr 数据字典
     * @param {*} number 权限id
     */
    findName(arr, number){
        var res;
        arr.forEach(item => {
            if(item.authorityId == number){
                res = item.authorityName;
            }
        })
        return res;
    }

    /**
     * 根据权限id 匹配相应系统名称
     * @param {*} arr 数据字典
     * @param {*} number 系统id
     */
    findSystemName(arr, number){
        var res;
        arr.forEach(item => {
            if(item.systemId == number){
                res = item.systemName;
            }
        })
        return res;
    }

    /**
     * 点击复选框事件
     */
    onCheck(checkedKeys, info) {
        let nodeList = [];  //  已勾选的节点列表
        let authData = this.state.authData; //  用户已经拥有的权限  
        let newAuth = [];    //   用户现在勾选完的权限
        let data;   //   过滤之后的数据
        let dataList = [];
        let displayList = [];
        let temp;   
        let obj;

        nodeList = info.checkedNodes;
        // // console.log(nodeList);

        nodeList.forEach(item => {
            if(item.props.isLeaf){
                newAuth.push(item.key);
            }
        }) 
        
        data = this.clearArr([...newAuth, ...authData]);

        //  处理权限申请发送数据
        data.forEach(item =>{
            obj = {};
            let flagIndex = item.indexOf('-');
            obj.systemId = item.substr(0, flagIndex);
            obj.authorityId = item.substr(flagIndex + 1);
            obj.applyType = authData.includes(item) ? 0 : 1;  //    已拥有权限是否包含  true为删  false为增
            obj.caseType = 0;
            dataList.push(obj);
        })
        // console.log("dataList========   ",dataList);  

        data.forEach((item,index) => {
            // console.log(item);
            obj = {};
            obj.authorityId = this.findName(this.state.authList, dataList[index].authorityId);
            obj.systemId = this.findSystemName(this.state.systemList, dataList[index].systemId);
            obj.applyType = dataList[index].applyType == 0 ? "删除" : "添加";
            obj.caseType = "业务权限申请";
            displayList.push(obj);  
        })

        this.setState({ 
            checkedKeys: checkedKeys,
            checkedKeysTemp: checkedKeys,
            postData: dataList,
            displayData: displayList
        });
    }

    showModal() {
        this.axiosAuthList();
    }

    handleOk() {
        // console.log('点击了确定');
        this.setState({
            visible: false,
            temp: []
        });
        // console.log('---处理结果', this.state.postData);
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
        // console.log(this.state.checkedKeys)
    }

    render() {
        const loop = data => data.map((item) => {
            if (item.authorities) {
              return (
                <TreeNode key={!item.authorityId ? `${item.systemId}` : `${item.systemId}-${item.authorityId}`} 
                // title={!item.authorityId ? `${item.systemId}` : `${item.systemId}-${item.authorityId}`} 
                    title={item.systemName || item.authorityName}
                    isLeaf={item.isLeaf}
                >
                  {loop(item.authorities)}
                </TreeNode>
              );
            }
            return <TreeNode key={!item.authorityId ? `${item.systemId}` : `${item.systemId}-${item.authorityId}`} 
                // title={!item.authorityId ? `${item.systemId}` : `${item.systemId}-${item.authorityId}`} 
                title={item.systemName || item.authorityName} 
                isLeaf={item.isLeaf}
                />;
          });

        const columns = [{
            title: '菜单名字',
            dataIndex: 'authorityId',
            key: 'authorityId',
            width: 150,
        }, {
            title: '系统名称',
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
                {/* <Button type="primary" size="large" onClick={this.showModal.bind(this)}>业务权限修改申请</Button> */}

                <div style={{ width: '80%', margin: '10px auto', position: "relative" }} className="business-table-container">
                    <Button style={
                        {position: "absolute", right: 10, top: 9, zIndex: 10}
                    } type="primary" size="small" onClick={this.showModal.bind(this)}>业务权限修改申请</Button>
                    <Table dataSource={this.state.displayData} columns={columns} pagination={{ pageSize: 5 }} />
                </div>

                <Button type="primary" onClick={this.handleSubmitAdd.bind(this)} style={{ position: 'relative', left: '50%' }}>提交</Button>

                <Modal title="业务权限修改申请" visible={this.state.visible}
                    onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <Tree
                        checkable
                        checkedKeys={this.state.checkedKeys.length==0?[]:this.state.checkedKeys}
                        onCheck={this.onCheck.bind(this)} 
                    >
                        {loop(this.state.treeData)}
                    </Tree>
                    
                </Modal>
            </div>
        );
    }
}

export default Busin;