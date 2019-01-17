import React from "react";
import ReactDom from "react-dom";
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router';
import { Button, Modal, Input, Form, message, Icon, Select } from "antd";
import { getTelephoneCode, getUserInfo } from "../../../../Service/sp/ua/server";

const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
    return false;
}

class CreateAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };

        const systemIdProps = getFieldProps("systemId", {
        });


        return (
            <div className="createauth">
                <div className="createauth-select-type">
                    
                </div>

                <div className="createauth-form">
                    <Form horizontal form={this.props.form}>
                        <FormItem {...formItemLayout} label="系统名称">
                            <Input
                                {...systemIdProps}
                            />
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}




CreateAuth = createForm()(CreateAuth);
export default CreateAuth;