import React from 'react';
import ReactDom from 'react-dom';
import { Form, Input, Select, Checkbox ,Row,Button,Col,message ,Modal} from 'antd';
import {hashHistory} from "react-router";
import {ReviewApplyList} from "../../../../Components/wpdmp/dmp/ReviewApiLIst/reviewApiList";
import {ReviewApi1} from '../../../../Service/wpdmp/dmp/categories'
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
function turnInt (data){
    data.groupId=parseFloat(data.groupId)
    data.apiType=parseFloat(data.apiType)
    data.sendMethod=parseFloat(data.sendMethod)
    data.protocool=parseFloat(data.protocool)
    return data
}
let ReviewApi=React.createClass({
    getInitialState(){
        return{
            selectedRow:[]
        }
    },
    componentDidMount() {

    },


    handleSubmit(e){
        console.log(e.target.innerText);
        var res= this.props.form.getFieldsValue()
        let selectedRow=this.state.selectedRow[0]
        let approvalStatus=1;
        if(e.target.innerText=='通 过'){
            approvalStatus=1;
        }else{
            approvalStatus=2;
        }
         this.getReviewApi(selectedRow.approvalId,"审核完成",res.approvalProposer,res.approvalComments,approvalStatus);
        // this.props.form.setFieldsValue({approvalInterface:'',approvalProvince:'',approvalComments:'',approvalProposer:''})
    },
    async getReviewApi(approvalId,approvalAction,approvalUserName,approvalComments,approvalStatus){
        if(approvalComments){
            let {data:{code,msg}} =await ReviewApi1(approvalId,approvalAction,approvalUserName,approvalComments,approvalStatus);
            console.log(code,msg);
            if (code == "000000") {
                message.success('恭喜你,审批成功!');
                setTimeout(()=>{
                    hashHistory.push({pathname:'/about/wpdmp/dmp/applyCHeck',state:sessionStorage.getItem("systemId")})
                },1000)
            } else {
                message.error(msg);
            }
        }else{
            // console.log('llllllllll',this.state.selectedRow[0]);
            // this.props.form.setFieldsValue(this.state.selectedRow[0])
            message.warning('还有没填的选项哦~')
        }

    },
    getApplyApi(selectedApi){
        this.setState({selectedRow:selectedApi})
        // console.log(this.state.selectedRows);
        this.props.form.setFieldsValue(selectedApi[0])
    },
    returnBack(){
        confirm({
            title: '您确定要离开吗?',
            content: '这些内容还没有保存呦~',
            onOk() {
                console.log('确定');
                hashHistory.push({pathname:'/about/wpdmp/dmp/applyCHeck',state:sessionStorage.getItem("systemId")})
            },
            onCancel() {},
        });

    },
    // apiId: 2
    // approvalApplication: "1"
    // approvalId: 2
    // approvalInterface: "接口"
    // approvalProposer: "777"
    // approvalProvince: "河北"
    // approvalStatus: 0
    // createDate: 1548058532000
    render() {
        const { getFieldProps, getFieldError, isFieldValidating ,setFieldsValue} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6},
            wrapperCol: { span:18 },
        }
        const Interface = getFieldProps('approvalInterface', {
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
        const Province=getFieldProps('approvalProvince',{
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
        const Proposer=getFieldProps('approvalProposer', {
            validate:[{
                rules: [
                    { required: true,message:'嘿,你好像忘写什么了~~' },
                ],
                trigger: 'onBlur'
            }]
        });
        const Comments=getFieldProps('approvalComments', {
            validate:[{
                rules: [
                    { required: true,message:'嘿,你好像忘写什么了~~' },
                ],
                trigger: 'onBlur'
            }]
        });
        const Action=getFieldProps('approvalStatus', {
            rules: [
                { required: true, message: '请选择' },
            ],
        });
        return (
            <div className="main-container">
                <div className="container">
                    <div className="main clearfix">
                        <div className="outer-container">
                            <div className="inner-container">
                                <div className="content scroll-content clearfix">
                                    <Form inline className='form1 clearfix' style={{width:'100%'}}>
                                    <div style={{width: '74%',
    margin:'0 auto'}}>
                                        <Row >
                                            <div>
                                                <ReviewApplyList getApplyApi={this.getApplyApi}/>
                                            </div>

                                        </Row>
                                    </div>
                                        <div style={{width:'100%' ,marginLeft: '10%'}}>
                                        <Row  type="flex" style={{marginBottom:18}}>

                                            <FormItem
                                                id="name"
                                                label="接口描述"
                                                {...formItemLayout}
                                                style={{width:'38%',height:34}}
                                                
                                            >
                                                <Input id="name" {...Interface} placeholder="Please enter..." />
                                            </FormItem>

                                            <FormItem 
                                                id="selectGroup"
                                                label="申请人所属省份"
                                                labelCol={{ span: 8 }}
                                                wrapperCol={{ span: 16 }}
                                                style={{width:'38%',height:34}}
                                            >
                                                <Input id="name" {...Province} placeholder="Please enter..." />
                                            </FormItem>

                                        </Row>
                                        <Row type="flex" style={{marginBottom:18}}>
                                            <FormItem 
                                                id="http"
                                                label="申请人"
                                                {...formItemLayout}
                                                style={{width:'38%',height:34}}
                                            >
                                                <Input id="name" {...Proposer} placeholder="Please enter..." />
                                            </FormItem>                                            
                                        </Row>
                                        <Row  type="flex" style={{marginBottom:18}}>
                                            <FormItem 
                                                id="description"
                                                label="审批意见"
                                                labelCol={{ span: 3 }}
                                                wrapperCol={{ span: 18 }}
                                                style={{width:'76%'}}
                                            >
                                                <Input type="textarea" {...Comments} id="description" rows="3" />
                                            </FormItem>
                                        </Row>


                                        <Row  type="flex" style={{marginBottom:18}}>
                                            <FormItem 
                                                wrapperCol={{ span:24 }}
                                                style={{width:'76%',height:34}}
                                            >
                                                <Button type="primary" onClick={this.handleSubmit}  style={{marginRight:"30px"}}  >通过</Button>
                                                <Button type="primary" onClick={this.handleSubmit}  style={{marginRight:"30px"}} >驳回</Button>
                                                {/*<Button type="primary" onClick={this.returnBack} style={{marginRight:"30px"}}>暂存</Button>*/}
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

ReviewApi=Form.create()(ReviewApi)

export {ReviewApi};