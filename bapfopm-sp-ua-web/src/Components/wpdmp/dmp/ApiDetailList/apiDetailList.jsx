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

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        ip: `李大嘴${i}`,
        port: 32,
        severPath: `西湖区湖底公园${i}号`,
        status:2,
        balanceStrategy:4,
    });
}

let ApiDetailList = React.createClass({
    getInitialState() {
        return {
            selectedRowKeys: [],  // 这里配置默认勾选列
            loading: false,
            visible: false
        };
    },
    //
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
    //提交新建接口地址
    handleSubmit() {
       // console.log(this.props.form.getFieldsValue());
        this.hideModal();
    },
    onSelectChange(selectedRowKeys,selectedRows) {
        let arr = Array.from(new Set(selectedRowKeys))
        this.setState({ selectedRowKeys:arr});
        //console.log('selectedRowKeys changed: ', selectedRows);
        var newRows=[];
        selectedRows.forEach((item,index)=>{
            delete item.key;
        })
        //console.log(selectedRows);
        this.props.getIpList(selectedRows);
       // console.log(data[selectedRowKeys]);
    },
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const { getFieldProps } = this.props.form;

        const wayProps = getFieldProps('way', {
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
                <div style={{ marginLeft:-170}}>
                    <Button type="primary" onClick={this.showModal}
                             style={{ marginLeft: 15 }}
                    >新建</Button>
                    <Button type="primary" onClick={this.start}
                            disabled={!hasSelected} loading={loading} style={{ marginLeft: 15 }}
                    >修改</Button>
                    <Button type="primary" onClick={this.start}
                            disabled={!hasSelected} loading={loading} style={{ marginLeft: 15 }}
                    >删除</Button>

                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={{pageSize:5}} />
                <Modal title="新建地址" visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.hideModal}  okText="保存">
                    <Form horizontal form={this.props.form}>
                        <FormItem
                            {...formItemLayout}
                            label="地址"
                            className="color"
                        >
                            <Input {...getFieldProps('address', {})} type="text" autoComplete="off" />
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
                            <Input {...getFieldProps('server', {})} type="text" autoComplete="off" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="描述"
                            className="color"
                        >
                            <Input {...getFieldProps('desc', {})} type="text" autoComplete="off" />
                        </FormItem>
                        <FormItem
                            id="way"
                            label="策略"
                            {...formItemLayout}
                            className="color"

                        >
                            <Select  {...wayProps} id="selectGroup" size="large" placeholder="请选择策略" >
                                <Option value="group1">分组一</Option>
                                <Option value="group2">分组二</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            id="status"
                            label="状态"
                            {...formItemLayout}
                            className="color"
                        >
                            <Select {...statusProps} id="status" size="large" placeholder="请选择状态"  >
                                <Option value="group1">编辑</Option>
                                <Option value="group2">上线</Option>
                                <Option value="group3">下线</Option>
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