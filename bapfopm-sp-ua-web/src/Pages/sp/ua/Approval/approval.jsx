import React from 'react';
import { Modal, Button, Table, Icon, message, Input, Popconfirm } from 'antd';
import { getApplyAuthList, getDealApplyAuthList, getDetailAuthMessage } from "../../../../Service/sp/ua/server"

require("./approval.css")

class Approval extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authList: [],   //  业务权限展示数据
            adminAuthList: [],  //  管理权限展示数据

            visible: false,
            visible1: false,

            dealMessage: '',    //  审批意见

            postData: {},   //  业务权限传送数据
            postAdminData: {}   //  管理权限传送数据
        }
    }

    componentWillMount() {
    }

    /**
     * 查询权限审批列表
     */
    async axiosApplyAuthList(params){
        let data = await getApplyAuthList(params);
        let obj;
        if(data.status == 400){
            message.error(data.description);
            return ;
        }else{
            message.success(data.description);
        }
        let res = data.dataObject.map((item) =>{
            obj = {};
            for(var k in item){
                obj[k] = item[k];
            }
            obj.caseType = obj.caseType == 0 ? "业务权限" : "管理权限";
            obj.systemName = item.systemModule.systemName;
            return obj;
        })

        console.log(params.caseType)
        params.caseType == 0 ? this.setState({
            authList: res
        }) : this.setState({
            adminAuthList: res
        })
    }

    async axiosDetailAuthMessage(params){
        let data = await getDetailAuthMessage(params);
        console.log('详情=========',data);
    }

    async axiosDealApplyAuthList(params){
        let data = await getDealApplyAuthList(params);
        console.log(data);
        if(data.status == 200){
            this.authApp(0);
            this.authApp(1);
            this.setState({
                visible: false,
                visible1: false,
                postData: {}
            })
            message.success(data.description);
        }else if(data.status == 400 && data.description == "该系统已有管理员"){
           this.setState({
            visible1: true
           })
        }else{
            message.error(data.description);
        }

        this.setState({
            visible: false
        })
    }

    authApp(caseId){
        let systemId = this.props.location.state.systemId;
        let params = {
            systemId: systemId,
            caseType: caseId
        }
        this.axiosApplyAuthList(params);
    }

    handleCancel(){
        this.setState({
            visible: false,
            visible1: false
        })
    }

    handleOk(){
        let data = this.state.postData;
        data.dealMessage = this.state.dealMessage;
        this.axiosDealApplyAuthList(data); 
    }

    handleConfirm(){
        let data = this.state.postData;
        data.dealMessage = this.state.dealMessage;
        data.isForcible = true;
        this.axiosDealApplyAuthList(data);
    }

    handleShow(record,dealResult){
        this.setState({
            visible: true
        })
        var obj = {};
        obj.caseId = record.caseId;
        obj.dealResult = dealResult;
        obj.applyUserId = record.applyUserId;
        obj.caseType = record.caseType == "业务权限" ? 0 : 1;
        obj.auZoningKey = record.auZoningKey;
        obj.systemId = record.systemId;
        this.setState({
            postData: obj
        })
    }

    handleView(record){
        console.log(record);
        var params = {};
        params.caseId = record.caseId; 
        this.axiosDetailAuthMessage(params);
    }

    changeValue(e){
        this.setState({
            dealMessage: e.target.value
        })
    }

    componentWillMount(){
        this.authApp(0);
        this.authApp(1);
    }

    render() {
        const columns = [{
            title: '权限申请单id',
            dataIndex: 'caseId',
            key: 'caseId',
            width: 150,
          },{
            title: '申请人id',
            dataIndex: 'applyUserId',
            key: 'applyUserId',
            width: 150,
          }, {
            title: '系统名称',
            dataIndex: 'systemName',
            key: 'systemName',
            width: 150,
          }, {
            title: '申请人区划',
            dataIndex: 'auZoningKey',
            key: 'auZoningKey',
            width: 150,
          }, {
            title: '权限类型',
            dataIndex: 'caseType',
            key: 'caseType',
            width: 150,
          }, {
            title: '申请时间',
            dataIndex: 'applyTime',
            key: 'applyTime',
            width: 150,
          }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
              <span>
                <Button type="primary" onClick={this.handleView.bind(this,record)}>查看详情</Button>
                <span className="ant-divider"></span>
                <Button type="primary" onClick={this.handleShow.bind(this,record,1)}>同意</Button>
                <span className="ant-divider"></span>
                <Button type="primary" onClick={this.handleShow.bind(this,record,2)}>拒绝</Button>
              </span>
            ),
          }];

          const columnsAdmin = [{
            title: '权限申请单id',
            dataIndex: 'caseId',
            key: 'caseId',
            width: 150,
          },{
            title: '申请人id',
            dataIndex: 'applyUserId',
            key: 'applyUserId',
            width: 150,
          }, {
            title: '系统名称',
            dataIndex: 'systemName',
            key: 'systemName',
            width: 150,
          }, {
            title: '申请人区划',
            dataIndex: 'auZoningKey',
            key: 'auZoningKey',
            width: 150,
          }, {
            title: '权限类型',
            dataIndex: 'caseType',
            key: 'caseType',
            width: 150,
          }, {
            title: '申请时间',
            dataIndex: 'applyTime',
            key: 'applyTime',
            width: 150,
          }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
              <span>
                {/* <Button type="primary">查看详情</Button>
                <span className="ant-divider"></span> */}
                <Button type="primary" onClick={this.handleShow.bind(this,record,1)}>同意</Button>
                <span className="ant-divider"></span>
                <Button type="primary" onClick={this.handleShow.bind(this,record,2)}>拒绝</Button>
              </span>
            ),
          }];

        return (
            <div className="approval">
                {/* <div style={{ width: '80%', margin: '10px auto' }}>
                    <Button type="primary" size="large" onClick={this.authApp.bind(this,0)}>业务权限审批</Button>
                    <Button type="primary" size="large" onClick={this.authApp.bind(this,1)}>管理权限审批</Button>
                </div> */}

                <div style={{ width: '80%', margin: '10px auto' }}>
                    <div className="approval-table-title">业务权限审批</div>
                    <Table dataSource={this.state.authList} columns={columns} pagination={{ pageSize: 10 }}/>
                </div>

                <div style={{ width: '80%', margin: '10px auto' }}>
                    <div className="approval-table-title">管理权限审批</div>
                    <Table dataSource={this.state.adminAuthList} columns={columnsAdmin} pagination={{ pageSize: 10 }}/>
                </div>

                <Modal title="权限审批" visible={this.state.visible}
                    onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <Input type="textarea" rows={4} onChange={this.changeValue.bind(this)}/>
                </Modal>

                <Modal title="权限审批" visible={this.state.visible1}
                    onOk={this.handleConfirm.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <p>该系统已有管理员,是否强制审批该用户为新任管理员!</p>
                </Modal>

            </div>
        )
    }
}

export default Approval;