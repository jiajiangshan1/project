import React from "react";
import ReactDom from "react-dom";
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router';
import { Card, Col, Row, Button, Modal, Input, Form, message, Icon } from "antd";
import { getSystemList, getUpdatePassword, doLogOut, getUserInfo } from "../../Service/Login/login";

require("./userInfo.css")

const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
    return false;
}

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * 查询个人信息
     */

    async axiosUserInfo() {
        let data = await getUserInfo();
        this.props.form.setFieldsValue(data.dataObject);
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

        const custNameProps = getFieldProps("custName", {
            rules: [
                // { required: true, min: 8, message: "用户名至少为 8 个字符" },
                // { validator: this.checkCustName }
            ]
        });

        const userNameProps = getFieldProps("userName", {});

        const telephoneProps = getFieldProps("telephone", {});

        const emailProps = getFieldProps("email", {});

        const zoningNameProps = getFieldProps("zoningName", {});



        return (
            <div className="userInfo">

                <div className="userInfo-content">
                    <div className="userInfo-title">
                        用户信息
                        <Icon type="edit">
                            <Link to="/about/editUserInfo" />
                        </Icon>
                    </div>

                    <div className="userInfo-form">
                        <Form horizontal form={this.props.form}>
                            <FormItem {...formItemLayout} label="用户姓名">
                                <Input
                                    {...custNameProps}
                                    readOnly
                                />
                            </FormItem>
                        </Form>

                        <Form horizontal form={this.props.form}>
                            <FormItem {...formItemLayout} label="用户别名">
                                <Input
                                    {...userNameProps}
                                    readOnly
                                />
                            </FormItem>
                        </Form>

                        <Form horizontal form={this.props.form}>
                            <FormItem {...formItemLayout} label="手机">
                                <Input
                                    {...telephoneProps}
                                    readOnly
                                />
                            </FormItem>
                        </Form>

                        <Form horizontal form={this.props.form}>
                            <FormItem {...formItemLayout} label="邮箱">
                                <Input
                                    {...emailProps}
                                    readOnly
                                />
                            </FormItem>
                        </Form>

                        <Form horizontal form={this.props.form}>
                            <FormItem {...formItemLayout} label="行政区划">
                                <Input
                                    {...zoningNameProps}
                                    readOnly
                                    readOnly
                                />
                            </FormItem>
                        </Form>

                    </div>
                </div>

            </div>
        )
    }
}

UserInfo = createForm()(UserInfo);
export default UserInfo;