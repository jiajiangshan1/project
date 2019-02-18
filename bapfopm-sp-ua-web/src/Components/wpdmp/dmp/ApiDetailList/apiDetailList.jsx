import React from 'react';
import ReactDom from 'react-dom';
import {Table, Button, Form, Input, Modal, Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const columns = [{
    title: '地址',
    dataIndex: 'ip',
}, {
    title: '端口',
    dataIndex: 'port',
}, {
    title: '后端服务地址',
    dataIndex: 'severPath',
},
    {
    title: '状态',
    dataIndex: 'status',
},{
    title: '策略',
    dataIndex: 'balanceStrategy',
}];

let ApiDetailList = React.createClass({
    getInitialState() {
        return {
            selectedRowKeys: [],  // 这里配置默认勾选列
            selectRows:{},
            loading: false,
            visible: false,
            tableData:[]
        };
    },
    componentDidMount(){

    },
    showModal() {
        this.setState({ loading: true , visible: true});
        // 模拟 ajax 请求，完成后清空
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    },
    hideModal() {
        this.setState({ visible: false });
    },
    delete(){
        var keys=this.state.selectedRowKeys;
        let tableData=this.state.tableData
        keys.forEach((item)=>{
            delete tableData[item]
        })
        let newTable=tableData.filter((item)=>{
            if(item){
                return item
            }
        })
        this.setState({tableData:newTable,selectedRowKeys: []})
    },
    //提交新建接口地址
    handleSubmit() {
        let data=this.props.form.getFieldsValue()
        if(data.status=='1'){
            data.status="启用"
        }else {
            data.status='停用'
        }
        switch(data.balanceStrategy){
            case"1":
                data.balanceStrategy="随机" ;
                break;
            case"2": data.balanceStrategy="轮询";break;
            case"3": data.balanceStrategy="加权";break;
            case"4": data.balanceStrategy="一致性哈希";break;
            case"5": data.balanceStrategy="哈希";break;
        }
        let newData=[]
        newData.push(data)
        let table=this.state.tableData;
        this.setState({tableData:table.concat(newData)})
        this.hideModal();
    },
    onSelectChange(selectedRowKeys,selectedRows) {
        let arr = Array.from(new Set(selectedRowKeys))
        this.setState({ selectedRowKeys:arr});
        //将自动加到key字段删掉
        selectedRows.forEach((item,index)=>{
            delete item.key;
            item.port=parseFloat(item.port)
            if(item.status=="启用"){
                item.status=1
            }else {
                item.status=2
            }
            switch(item.balanceStrategy){
                case"随机": item.balanceStrategy=1;break;
                    case"轮询": item.balanceStrategy=2;break;
                    case"加权": item.balanceStrategy=3;break;
                    case"一致性哈希": item.balanceStrategy=4;break;
                    case"哈希": item.balanceStrategy=5;break;
            }
        })
        console.log('gggggggg',selectedRows);
        this.props.getIpList(selectedRows);
    },
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const { getFieldProps } = this.props.form;

        const wayProps = getFieldProps('balanceStrategy', {
            rules: [
                { required: true, message: '请选择您的策略' },
            ],
        });
        const statusProps=getFieldProps('status', {
            rules: [
                { required: true, message: '请选择您的策略' },
            ],
        });
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        return (
            <div>
                <div style={{ marginLeft:"-11%"}}>
                    <Button type="primary" onClick={this.showModal} size={"large"}

                    >新建</Button>
                    <Button type="primary" onClick={this.delete} size={"large"}
                            disabled={!hasSelected} loading={loading} style={{ marginLeft: 30 }}
                    >删除</Button>

                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.tableData} />
                <Modal title="新建地址" visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.hideModal}  okText="保存">
                    <Form horizontal form={this.props.form}>
                        <FormItem
                            {...formItemLayout}
                            label="地址"
                            className="color"
                        >
                            <Input {...getFieldProps('ip', {})} type="text" autoComplete="off" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="端口"
                            className="color"
                        >
                            <Input {...getFieldProps('port', {})} type="text" autoComplete="off" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="后端服务地址"
                            className="color"
                        >
                            <Input {...getFieldProps('severPath', {})} type="text" autoComplete="off" />
                        </FormItem>
                        <FormItem
                            id="way"
                            label="策略"
                            {...formItemLayout}
                            className="color"

                        >
                            <Select  {...wayProps} id="selectGroup" size="large" placeholder="请选择策略" >
                                <Option value="1">随机</Option>
                                <Option value="2">轮询</Option>
                                <Option value="3">加权</Option>
                                <Option value="4">一致性哈希</Option>
                                <Option value="5">哈希</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            id="status"
                            label="状态"
                            {...formItemLayout}
                            className="color"
                        >
                            <Select {...statusProps} id="status" size="large" placeholder="请选择状态"  >
                                <Option value="1">启用</Option>
                                <Option value="2">停用</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    },
});

ApiDetailList=Form.create()(ApiDetailList)

export default ApiDetailList;