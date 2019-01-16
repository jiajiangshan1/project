import React from 'react';
import { Modal, Button, Table, Icon, message, Input } from 'antd';
import { getApplyAuthList, getDealApplyAuthList } from "../../Service/Login/login"

class Approval extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authList: [],
            visible: false,
            dealMessage: '',
            postData: {}
        }
    }

    componentWillMount() {
        // message.error(this.props.location.state.systemId);
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
            obj.caseId = item.caseId;
            obj.applyUserId = item.applyUserId;
            obj.systemName = item.systemModule.systemName;
            obj.auZoningKey = item.auZoningKey;
            obj.applyTime = item.applyTime;
            obj.caseType = item.caseType;
            return obj;
        })

        this.setState({
            authList: res
        })
    }

    async axiosDealApplyAuthList(params){
        let data = getDealApplyAuthList(params);
        if(data.status == 200){
            message.success(data.description);
        }else{
            message.error(data.description);
        }
        this.setState({
            visible: false
        })
    }

    busAuthApp(){
        let systemId = this.props.location.state.systemId;
        let params = {
            systemId: systemId,
            caseType: 0
        }
        this.axiosApplyAuthList(params);
    }

    manAuthApp(){
        let systemId = this.props.location.state.systemId;
        let params = {
            systemId: systemId,
            caseType: 1
        }
        this.axiosApplyAuthList(params);
    }

    handleCancel(){
        this.setState({
            visible: false
        })
    }

    handleOk(){
        let data = this.state.postData;
        data.dealMessage = this.state.dealMessage;
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
        obj.caseType = record.caseType;
        this.setState({
            postData: obj
        })
    }

    changeValue(e){
        this.setState({
            dealMessage: e.target.value
        })
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
                <Button type="primary">查看详情</Button>
                <span className="ant-divider"></span>
                <Button type="primary" onClick={this.handleShow.bind(this,record,1)}>同意</Button>
                <span className="ant-divider"></span>
                <Button type="primary" onClick={this.handleShow.bind(this,record,2)}>拒绝</Button>
              </span>
            ),
          }];

        return (
            <div>
                <div style={{ width: '80%', margin: '10px auto' }}>
                    <Button type="primary" size="large" onClick={this.busAuthApp.bind(this)}>业务权限审批</Button>
                    <Button type="primary" size="large" onClick={this.manAuthApp.bind(this)}>管理权限审批</Button>
                </div>

                <div style={{ width: '80%', margin: '10px auto' }}>
                    <Table dataSource={this.state.authList} columns={columns} pagination={{ pageSize: 10 }} scroll={{ y: 240 }}/>
                </div>

                <Modal title="权限审批" visible={this.state.visible}
                    onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <Input type="textarea" rows={4} onChange={this.changeValue.bind(this)}/>
                </Modal>
            </div>

            
        )
    }
}

export default Approval;