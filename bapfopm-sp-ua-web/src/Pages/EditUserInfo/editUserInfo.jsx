import React from "react";
import ReactDom from "react-dom";
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router';
import { Button, Modal, Input, Form, message, Icon } from "antd";
import { getTelephoneCode, getUserInfo } from "../../Service/Login/login";

require("./editUserInfo.css")

const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
    return false;
}

class EditUserInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            oldTelephone: ''
        }
    }

    /**
     * 手机号码验证
     */
    checkTelephone(rule, value, callback) {
        const telephoneReg = /^1[0-9]{10}$/;
        console.log(this)
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (!telephoneReg.test(value)) {
                    callback("手机号码输入错误,请校验并改正!");
                } else{
                    callback();
                }
            }, 500);
        }   
    }

     /**
     * 查询个人信息
     */

    async axiosUserInfo() {
        let data = await getUserInfo();
        this.props.form.setFieldsValue({oldTelephone: data.dataObject.telephone});
        this.setState({
            oldTelephone: data.dataObject.telephone
        })
    }

    /**
     * 获取手机验证码
     */
    async axiosTelephoneCode() {
        let data;
        if(this.props.form.getFieldValue('oldTelephone')){
            data = await getTelephoneCode(this.props.form.getFieldValue('oldTelephone'));
            if (data.status == "200") {
                message.success(data.dataObject);
            }else{
                message.error(data.description);
            }
            return data;
        }else{
            message.error('请先输入注册所用的手机号码!')
        } 
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }

            console.log(values);
        });
    }

    componentWillMount() {
        this.axiosUserInfo();
    }

    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };

        const userNameProps = getFieldProps("userName", {
            rules: [
                { required: false, min: 8, message: "用户名至少为 8 个字符" },
                { validator: this.checkCustName }
            ]
        });

        const emailProps = getFieldProps("email", {
            validate: [
                {
                    rules: [{ required: false, message: "请输入邮箱地址" }],
                    trigger: "onBlur"
                },
                {
                    rules: [{ type: "email", message: "请输入正确的邮箱地址" }],
                    trigger: ["onBlur", "onChange"]
                }
            ]
        });

        const oldTelephoneProps = getFieldProps("oldTelephone", {});

        const newTelephoneProps = getFieldProps("newTelephone", {
            rules: [
                { required: false, message: "请输入手机号码!" },
                { validator: this.checkTelephone }
            ]
        });

        const telephoneCodeProps = getFieldProps("telephoneCode", {
            rules: [{ required: false, max: 4, message: "" }]
        });



        return (
            <div className="userInfo">

                <div className="userInfo-content">
                    <div className="userInfo-title">
                        用户信息修改
                    </div>

                    <div className="userInfo-form">
                        <Form horizontal form={this.props.form}>
                            <FormItem {...formItemLayout} label="用户别名">
                                <Input
                                    {...userNameProps}
                                />
                            </FormItem>
                        </Form>

                        <Form horizontal form={this.props.form}>
                            <FormItem {...formItemLayout} label="邮箱">
                                <Input
                                    {...emailProps}
                                />
                            </FormItem>
                        </Form>

                        <Form form={this.props.form}>
                            <FormItem {...formItemLayout} label="原手机号">
                                <Input
                                    {...oldTelephoneProps}
                                    style={{width: '75%'}}
                                    readOnly
                                />
                                <Button type="primary" style={{  marginTop: 0, marginLeft: '10px' }} onClick={this.axiosTelephoneCode.bind(this)}>发送</Button>
                            </FormItem>
                        </Form>

                        <Form horizontal form={this.props.form}>
                            <FormItem {...formItemLayout} label="新手机号">
                                <Input
                                    {...newTelephoneProps}
                                />
                            </FormItem>
                        </Form>

                        <Form horizontal form={this.props.form}>
                            <FormItem {...formItemLayout} label="验证码">
                                <Input
                                    {...telephoneCodeProps}
                                    maxLength = "4"
                                />
                            </FormItem>
                        </Form>

                        <FormItem wrapperCol={{ span: 18, offset: 6 }}>
                            <Button type="primary" style={{  marginTop: 0, width: '100%' }} onClick={this.handleSubmit.bind(this)}>保存</Button>
                        </FormItem>

                    </div>
                </div>

            </div>
        )
    }
}

EditUserInfo = createForm()(EditUserInfo);
export default EditUserInfo;