import React from 'react';
import ReactDom from 'react-dom';
import { Form, Input, Select, Checkbox ,Row,Button,Col,message ,Modal} from 'antd';
import {BlackWhiteApi} from "../../../../Components/wpdmp/dmp/BlackWhiteApi/blackWhiteApi";
import {AddBlackList} from "../../../../Service/wpdmp/dmp/categories"
import {hashHistory} from "react-router";
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

let BlackWhiteDetail=React.createClass({
    getInitialState(){
        return{
            selectedRows:[]
        }
    },
    componentDidMount() {

    },


    handleSubmit(){
        var res= this.props.form.getFieldsValue()
        if(this.state.selectedRows.length){
            this.addWBApi(res.wbName,res.ip,res.wbDesc,parseFloat(res.wbType),this.state.selectedRows[0].apiId);
        }else{
            message.warning('您还没选择接口哦~')
        }

    },
    async addWBApi(wbName,ip,wbDesc,wbType,apiId){
        if(wbName&&ip&&wbDesc&&wbType){
            let {data:{code,msg}} =await AddBlackList(wbName,ip,wbDesc,wbType,apiId);
            if (code == "000000") {
                message.success('恭喜你,数据保存成功!');
                hashHistory.push({pathname:'/about/wpdmp/dmp/apilist/blackList',state:sessionStorage.getItem("systemId")})
            } else {
                message.error(msg);
            }
        }else{
            message.warning('还有没填的选项哦~')
        }
    },
    getIpList(rows){
        this.setState({selectedRows:rows})
         console.log('jjjjjjjjjjj',this.state.selectedRows);
    },
    returnBack(){
        confirm({
            title: '您确定要离开吗?',
            content: '这些内容还没有保存呦~',
            onOk() {
                console.log('确定');
                hashHistory.push({pathname:'/about/wpdmp/dmp/apilist/blackList',state:sessionStorage.getItem("systemId")})
            },
            onCancel() {},
        });

    },
    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8},
            wrapperCol: { span:16 },
        }
        const nameProps = getFieldProps('wbName', {
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
        const path=getFieldProps('ip', {
            validate:[{
                rules: [
                    { required: true,message:'嘿,你好像忘写什么了~~' },
                ],
                trigger: 'onBlur'
            }]
        });
        const description=getFieldProps('wbDesc',{
            validate:[{
                rules: [
                    { max:200, message: '描述至多为200 个字哦~~' },
                ],
                trigger: 'onChange'
            },{
                rules: [
                    { required: true,message:'嘿,你好像忘写什么了~~' },
                ],
                trigger: 'onBlur'
            }]
        })
        const typeProps=getFieldProps('wbType', {
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
                                    <Form inline className='clearfix' style={{width:"90%",paddingTop:'20px',margin:"0 auto"}}>
                                    <div style={{width:'90%',marginLeft:"10%"}}>
                                        <Row justify='start' type="flex" style={{marginBottom:18}}>

                                            <FormItem
                                                id="name"
                                                label="黑白名单名称"
                                                {...formItemLayout}
                                                style={{width:'38%',height:34}}
                                            >
                                                <Input id="name" {...nameProps} placeholder="Please enter..." />
                                            </FormItem>

                                            <FormItem
                                                id="timeout"
                                                label="黑白名单地址"
                                                span={12}
                                                {...formItemLayout}
                                                style={{width:'38%',height:34}}
                                            >
                                                <Input id="timeout" {...path} placeholder="Please enter..." />
                                            </FormItem>

                                        </Row>

                                        <Row justify='start' type="flex" style={{marginBottom:18}}>
                                            <FormItem
                                                id="description"
                                                label="黑白名单描述"
                                                labelCol={{ span:4 }}
                                                wrapperCol={{ span: 20 }}
                                                style={{width:'76%'}}
                                            >
                                                <Input type="textarea" {...description} id="description" rows="3" />
                                            </FormItem>
                                        </Row>

                                        <Row justify='start' type="flex" style={{marginBottom:18}}>
                                            <FormItem
                                                id="type"
                                                label="黑白名单类型"
                                                {...formItemLayout}
                                                style={{width:'38%',height:34}}
                                            >
                                                <Select {...typeProps} id="type" size="large"   placeholder='请选择api类型呦~'>
                                                    <Option value="1">黑</Option>
                                                    <Option value="2">白</Option>
                                                </Select>
                                            </FormItem>
                                        </Row>

                                        <Row >
                                            <div style={{width:'80%'}}>
                                                <BlackWhiteApi getIpList={this.getIpList}/>
                                            </div>

                                        </Row>

                                        <Row justify='start' type="flex" style={{marginBottom:18}}>
                                            <FormItem
                                                wrapperCol={{ span:24 }}
                                                style={{width:'76%',height:34}}
                                            >
                                                <Button type="primary" onClick={this.handleSubmit}  style={{marginRight:"30px"}} >保存</Button>
                                                <Button type="primary" onClick={this.returnBack} style={{marginRight:"30px"}}>返回</Button>

                                            </FormItem>
                                        </Row>
                                    </div>
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

BlackWhiteDetail=Form.create()(BlackWhiteDetail)

export {BlackWhiteDetail} ;