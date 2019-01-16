import React from "react";
import ReactDom from "react-dom";
import { Card, Col, Row, Button, Modal, Input, Form, message } from "antd";
import { getSystemList, getUpdatePassword, doLogOut, getUserInfo } from "../../Service/Login/login";

const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
    return false;
}

class UserInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * 查询个人信息
     */

    async axiosUserInfo(){
        let data = await getUserInfo();
        this.props.form.setFieldsValue(data.dataObject);
    } 

    componentWillMount(){
        this.axiosUserInfo();
    }

    render(){
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        const custNameProps = getFieldProps("custName", {
            rules: [
                // { required: true, min: 8, message: "用户名至少为 8 个字符" },
                // { validator: this.checkCustName }
            ]
        });

        const userNameProps = getFieldProps("userName", {});

        const telephoneProps =  getFieldProps("telephone", {});

        const emailProps =  getFieldProps("email", {});

        const zoningNameProps =  getFieldProps("zoningName", {});



        return (
            <div className="userInfo">
            
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
                        />
                    </FormItem>
                </Form>

                <Form horizontal form={this.props.form}>
                    <FormItem {...formItemLayout} label="手机">
                        <Input
                            {...telephoneProps}
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

                <Form horizontal form={this.props.form}>
                    <FormItem {...formItemLayout} label="行政区划">
                        <Input
                            {...zoningNameProps}
                            readOnly
                        />
                    </FormItem>
                </Form>


            </div>
        )
    }
}

UserInfo = createForm()(UserInfo);
export default UserInfo;