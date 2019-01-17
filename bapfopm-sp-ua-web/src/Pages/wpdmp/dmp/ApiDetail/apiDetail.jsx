import React from 'react';
import ReactDom from 'react-dom';
import style from './apiDetail.css';
import { Form, Input, Select, Checkbox ,Row,Button,Col } from 'antd';
import ApiDetailList from "../../../../Components/wpdmp/dmp/ApiDetailList/apiDetailList";
import {addApi} from "../../../../Service/wpdmp/dmp/categories"
const FormItem = Form.Item;
const Option = Select.Option;

function turnInt (data){
    data.groupId=parseFloat(data.groupId)
    data.apiType=parseFloat(data.apiType)
    data.sendMethod=parseFloat(data.sendMethod)
    data.protocool=parseFloat(data.protocool)
    return data
}
let ApiDetail=React.createClass({
    getInitialState(){
        return{
            selectedRows:[]
        }
    },
    componentDidMount() {

    },


    handleSubmit(){
       var res= this.props.form.getFieldsValue()
       res=turnInt(res)
       res['severs']=this.state.selectedRows;
       res['method']='method';
       this.getApi(res);
    },
    async getApi(data){
       if(data.apiName&&data.apiDesc&&data.apiPath&&data.timeOut){
           let response=await addApi(data);
           console.log(response);
       }else{
           alert('还有没填的哦~')
       }
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
    getIpList(rows){
        this.setState({selectedRows:rows})
         console.log(this.state.selectedRows);
    },
    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6},
            wrapperCol: { span:18 },
        }
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
            trigger: 'onBlur'
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
                                <div className="content clearfix">
                                    <Form inline className='form1 clearfix'>

                                        <Row justify='start' type="flex" style={{marginBottom:18}}>

                                            <FormItem
                                                id="name"
                                                label="api名称"
                                                {...formItemLayout}
                                                style={{width:'38%',height:34}}
                                                hasFeedback
                                                help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
                                            >
                                                <Input id="name" {...nameProps} placeholder="Please enter..." />
                                            </FormItem>

                                            <FormItem
                                                id="selectGroup"
                                                label="API分组"
                                                {...formItemLayout}
                                                style={{width:'38%',height:34}}
                                            >
                                                <Select {...groupProps}  id="selectGroup" size="large" placeholder='请选择您的分组呦~'  >
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
                                                label="API路径"
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
                                                label="API类型"
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
                                                label="HTTP方法"
                                                {...formItemLayout}
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
                                                    {/*<Option value="1">代理</Option>*/}
                                                    {/*<Option value="2">实例</Option>*/}
                                                    {/*<Option value="3">Eureka</Option>*/}
                                                {/*</Select>*/}
                                                <Input id="target" {...targetProps} placeholder="Please enter..." />
                                            </FormItem>
                                            <FormItem
                                                id="timeout"
                                                label="超出时间"
                                                span={12}
                                                {...formItemLayout}
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
                                        <Row >
                                            <ApiDetailList getIpList={this.getIpList}/>
                                        </Row>

                                        <Row justify='start' type="flex" style={{marginBottom:18}}>
                                            <FormItem
                                                wrapperCol={{ span:24 ,offset:1}}
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

ApiDetail=Form.create()(ApiDetail)
export default ApiDetail;