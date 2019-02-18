import React from 'react';
import ReactDom from 'react-dom';
import { Form, Input, Select, Checkbox ,Row,Button,Col } from 'antd';
import ApiDetailList from "../ApiDetailList/apiDetailList";
const FormItem = Form.Item;
const Option = Select.Option;

let ApiDetailChange=React.createClass({
    getInitialState(){
        return{}
    },
    componentDidMount() {
        var value=this.props.location.query;
        value.groupId=value.groupId+'';
        value.apiType=value.apiType+'';
        value.protocool=value.protocool+'';
       this.props.form.setFieldsValue(value);
    },


    handleSubmit(){
        var res= this.props.form.getFieldsValue()
        console.log(res);
    },
    checkNum(rule, value, callback){
        var reg=/^[0-9]+$/;
        console.log(reg.test(value));
        if(!reg.test(value)){
            callback('必须输入数字哦!!');
        }else {
            callback()
        }
    },
    render() {
        const { getFieldProps, getFieldError, isFieldValidating ,setFieldsValue} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6},
            wrapperCol: { span:18 },
        }
       // setFieldsValue({"name":"hhhhhh"})
        apiDesc: "233"
        apiId: 30
        apiName: "hhh"
        apiPath: "444"
        apiType: 2
        balanceStrategy: 4
        createDate: "2019-01-16"
        groupId: 2
        ip: "李大嘴4"
        isUse: false
        method: "method"
        port: 32
        protocool: 2
        sendMethod: "3"
        serviceSource: "333"
        severId: 21
        severPath: "西湖区湖底公园4号"
        status: 2
        timeOut: 11
        versionNumber: "1.0"
        const nameProps = getFieldProps('apiName', {
            validate:[{
                rules: [
                    { max:20, message: '用户名至多为20 个字哦~~' },
                ],
                trigger: 'onChange'
            },{
                rules: [
                    { required: true,message:'嘿,你好像忘写什么了~~' },
                ],
                trigger: 'onBlur'
            }]

        });
        const description=getFieldProps('apiDesc',{
            validate:[{
                rules: [
                    { max:200, message: '用户名至多为200 个字哦~~' },
                ],
                trigger: 'onChange'
            },{
                rules: [
                    { required: true,message:'嘿,你好像忘写什么了~~' },
                ],
                trigger: 'onBlur'
            }]
        })
        const url=getFieldProps('apiPath', {
            validate:[{
                rules: [
                    { required: true,message:'嘿,你好像忘写什么了~~' },
                ],
                trigger: 'onBlur'
            }]
        });
        const timeout=getFieldProps('timeOut', {
            validate:[{
                rules: [
                    { required: true,message:'嘿,你好像忘写什么了~~' },
                ],
                trigger: 'onBlur'
            },{
                rules: [
                    { validator:this.checkNum}
                ],
                trigger: 'onChange'
            }]
        });

        const groupProps= getFieldProps('groupId', {
            rules: [
                { required: true, message: '请选择您的分组' },
            ],
            trigger: 'onBlur'
        });
        const httpProps=getFieldProps('sendMethod', {
            rules: [
                { required: true, message: '请选择您的方法' },
            ],
        });
        const targetProps=getFieldProps('serviceSource', {
            rules: [
                { required: true, message: '请选择您的方法' },
            ],
        });
        const protocolProps=getFieldProps('protocool', {
            rules: [
                { required: true, message: '请选择您的方法' },
            ],
        });
        const typeProps=getFieldProps('apiType', {
            rules: [
                { required: true, message: '请选择您的方法' },
            ],
        });
        return (
            <div className="main-container">
                <div className="container">
                    <div className="main clearfix">
                        <div className="outer-container">
                            <div className="inner-container">
                                <div className="content scroll-content clearfix">
                                    <Form inline className='form1 clearfix'>

                                        <Row justify='start' type="flex" style={{marginBottom:18}}>

                                            <FormItem
                                                id="apiName"
                                                label="api名称"
                                                {...formItemLayout}
                                                style={{width:'38%',height:34}}
                                                hasFeedback
                                                help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
                                            >
                                                <Input id="apiName" {...nameProps} placeholder="Please enter..." />
                                            </FormItem>

                                            <FormItem
                                                id="groupId"
                                                label="api分组"
                                                {...formItemLayout}
                                                style={{width:'38%',height:34}}
                                            >
                                                <Select {...groupProps}  id="groupId" size="large" placeholder='请选择您的分组呦~'  >
                                                    <Option value="1">分组一</Option>
                                                    <Option value="2">分组二</Option>
                                                </Select>
                                            </FormItem>

                                        </Row>

                                        <Row justify='start' type="flex" style={{marginBottom:18}}>
                                            <FormItem
                                                id="description"
                                                label="api描述"
                                                labelCol={{ span: 3 }}
                                                wrapperCol={{ span: 18 }}
                                                style={{width:'76%'}}
                                            >
                                                <Input type="textarea" {...description} id="description" rows="3" />
                                            </FormItem>
                                        </Row>

                                        <Row justify='start' type="flex" style={{marginBottom:18}}>
                                            <FormItem
                                                id="url"
                                                label="api路径"
                                                labelCol={{ span: 3 }}
                                                wrapperCol={{ span: 18 }}
                                                style={{width:'76%',height:34}}
                                            >
                                                <Input id="url" {...url} placeholder="Please enter..." />
                                            </FormItem>
                                        </Row>

                                        <Row justify='start' type="flex" style={{marginBottom:18}}>
                                            <FormItem
                                                id="type"
                                                label="api类型"
                                                {...formItemLayout}
                                                style={{width:'38%',height:34}}
                                            >
                                                <Select {...typeProps} id="type" size="large"   placeholder='请选择api类型呦~'>
                                                    <Option value="1">rest webservice</Option>
                                                    <Option value="2">soap webservice</Option>
                                                </Select>
                                            </FormItem>
                                            <FormItem
                                                id="http"
                                                label="http方法"
                                                labelCol={{ span: 7 }}
                                                wrapperCol={{ span: 17 }}
                                                style={{width:'38%',height:34}}
                                            >
                                                <Select {...httpProps} id="http"  size="large" defaultValue="get"  placeholder='请选择http方法呦~'>
                                                    <Option value="1">get</Option>
                                                    <Option value="2">post</Option>
                                                    <Option value="3">options</Option>
                                                    <Option value="4">put</Option>
                                                    <Option value="5">delete</Option>
                                                    <Option value="6">patch</Option>
                                                    <Option value="7">head</Option>
                                                </Select>
                                            </FormItem>
                                        </Row>
                                        <Row justify='start' type="flex" style={{marginBottom:18}}>
                                            <FormItem
                                                id="target"
                                                label="服务源"
                                                {...formItemLayout}
                                                style={{width:'38%',height:34}}
                                            >
                                                {/*<Select {...targetProps} id="type" size="large"  placeholder='请选择服务源呦~'>*/}
                                                    {/*<Option value="agent">代理</Option>*/}
                                                    {/*<Option value="case">实例</Option>*/}
                                                    {/*<Option value="Eureka">Eureka</Option>*/}
                                                {/*</Select>*/}
                                                <Input id="target" {...targetProps} placeholder="Please enter..." />
                                            </FormItem>
                                            <FormItem
                                                id="timeout"
                                                label="超出时间"
                                                span={12}
                                                labelCol={{ span: 7 }}
                                                wrapperCol={{ span: 17 }}
                                                style={{width:'38%',height:34}}
                                            >
                                                <Input id="timeout" {...timeout} placeholder="Please enter..." />
                                            </FormItem>
                                        </Row>
                                        <Row justify='start' type="flex" style={{marginBottom:18}}>
                                            <FormItem
                                                id="protocol"
                                                label="协议"
                                                {...formItemLayout}
                                                style={{width:'38%',height:34}}
                                            >
                                                <Select {...protocolProps} id="protocol" size="large" defaultValue="http"  placeholder='请选择协议呦~'>
                                                    <Option value="1">http</Option>
                                                    <Option value="2">https</Option>
                                                </Select>
                                            </FormItem>
                                        </Row>
                                        <Row justify='start' type="flex" style={{marginBottom:18}}>
                                            <div className='server-path'>后端服务地址</div>
                                        </Row>
                                        <Row >
                                            <div style={{width:'80%'}}>
                                            <ApiDetailList />
                                            </div>
                                        </Row>

                                        <Row justify='start' type="flex" style={{marginBottom:18}}>
                                            <FormItem
                                                wrapperCol={{ span:24 }}
                                                style={{width:'76%',height:34}}
                                            >
                                                <Button type="primary" onClick={this.handleSubmit}  style={{marginRight:"30px"}}>保存</Button>
                                                <Button type="primary" onClick={this.handleReset} style={{marginRight:"30px"}}>返回</Button>

                                            </FormItem>
                                        </Row>

                                    </Form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
})

ApiDetailChange=Form.create()(ApiDetailChange)
export default ApiDetailChange;