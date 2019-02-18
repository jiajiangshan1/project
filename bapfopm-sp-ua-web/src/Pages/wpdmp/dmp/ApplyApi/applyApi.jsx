import React from 'react';
import ReactDom from 'react-dom';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, Upload, message,Modal } from 'antd';
import {hashHistory,Link} from "react-router";
import {UpLoadFile,UserInfo,ApplyApi1} from '../../../../Service/wpdmp/dmp/categories'
const FormItem = Form.Item;
const confirm = Modal.confirm;
import axios from 'axios'
let ApplyApi = React.createClass({
    getInitialState() {
        return{
            params:'',
            username:'',
            zoningName:'',
        }
    },
    async componentDidMount(){
        console.log(this.props.location.query);
        const {apiName}=this.props.location.query;
        if(!apiName){
            confirm({
                title: '您还没有选择接口哦~',
                content: '点确认回待申请接口页面',
                onOk() {
                    hashHistory.push('/about/wpdmp/dmp/applyCHeck/apiList')
                },
                onCancel() {},
            });
        }
        let {data:{data:{custName,zoningName},code,msg}}=await UserInfo();
        if(code=='000000'){
            this.setState({
                username:custName,
                zoningName:zoningName
            })
        }else{
            alert(msg)
        }
    },
    handleSubmit(e) {
        e.preventDefault();
        let instance = axios.create();
        // if(this.state.params){
        //     instance.post("http://localhost:3001/dmp/api1/upload/file",this.state.params).then(res=>{
        //             console.log(res);
        //         if(code=='0'){
        //
        //         }else{
        //             message.error('文件上传失败了~')
        //         }
        //         }
        //     )
        // }else{
        //     alert('您还未上传文件哦~')
        // }
        instance.post("http://localhost:3001/dmp/api1/upload/file",this.state.params).then(res=>{
                            console.log(res);
                        if(code=='0'){

                        }else{
                            message.error('文件上传失败了~')
                        }
                        }
                    )
        let {approvalApplication}=this.props.form.getFieldsValue();
        this.applyApi(approvalApplication,this.props.location.query.apiName,this.state.username,this.state.zoningName,this.props.location.query.apiId)
    },
    async applyApi(approvalApplication,approvalInterface,approvalProposer,approvalProvince,apiId){
        let {data:{code,msg}}=await ApplyApi1(approvalApplication,approvalInterface,approvalProposer,approvalProvince,apiId)
        if(code=='000000'){
            message.success('已上传申请!')
            setTimeout(()=>{hashHistory.push({pathname:'/about/wpdmp/dmp/applyCHeck',state:sessionStorage.getItem("systemId")})},1000)
        }else{
            message.error('上传失败了~')
        }
    },
    update(e){
        let file = e.target.files[0];
        let param = new FormData();
        param.append('file',file);
        console.log(param.get('file'));
        this.setState({params:param})

    },
    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <div className="main-container">
                <div className="container">
                    <div className="main clearfix">
                        <div className="outer-container">
                            <div className="inner-container">
                                <div className="content clearfix">
            <Form horizontal className='form1 clearfix' onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="申请人"

                >
                    <p c="ant-form-text" id="userName" name="userName" style={{color:'white'}}>{this.state.username}</p>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="申请用途"
                >
                    <Input type="text" {...getFieldProps('approvalApplication', { initialValue: '' })} placeholder="请输入" />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="申请接口"
                >
                    <p className="ant-form-text" id="zoningName" name="zoningName" style={{color:'white'}}>{this.props.location.query.apiName}</p>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所属区划"
                >
                    {/*<Input type="password" {...getFieldProps('quhua', { initialValue: '' })} placeholder="请输入" />*/}
                    <p className="ant-form-text" id="zoningName" name="zoningName" style={{color:'white'}}>{this.state.zoningName}</p>
                </FormItem>

                <div className='file-div' >
                    <span>附件信息：</span>
                    <input type="file"  className="file" name="file" style={{display:'inline-block'}} onChange={this.update}/>
                </div>
                <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                    {/*<Button type="primary" htmlType="submit" style={{marginRight:'5%'}}>暂存</Button>*/}
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});

ApplyApi = Form.create()(ApplyApi);

export {ApplyApi};