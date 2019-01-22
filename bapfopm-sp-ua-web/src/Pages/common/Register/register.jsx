import React from "react";
import ReactDom from "react-dom";
import { Link, hashHistory } from "react-router";
import { Button, Form, Input, Modal, Tree, message } from "antd";
import { getRegisterData, getTelephoneCode, getSubNodes } from "../../../Service/sp/ua/server";

require('./register.css')

const createForm = Form.create;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

function noop() {
    return false;
}

class Register extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            visible: false,
            treeData: [],

            zoningKey: '',
            zoningName: ''
        };
    }

    handleCancel() {
        this.setState({
            visible: false
        })
    }

    handleOk() {
        this.setState({
            visible: false
        })
    }

    handleShow() {
        this.setState({
            visible: true,
        });
    }

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log(values);
                message.error('注册信息填写有误,请核对后填写完整!')
                return;
            }
            console.log('=========');
            message.success('正在注册');
            this.axiosRegisterData(values);
        });
    }

    onSelect(info, e) {
        console.log('selected', info, e);
        this.props.form.setFieldsValue({
            zoningKey: e.node.props.eventKey
        })
        this.setState({
            zoningName: e.node.props.title
        })
    }

    async onLoadData(treeNode) {
        let zoningKey = treeNode.props.eventKey;
        console.log('=============', zoningKey)
        let res = await this.axiosSubNodes(zoningKey);
        let data = res.responseData;
        treeNode.props.dataRef.children = data;
        console.log('-------------', treeNode);

        let treeData = [...this.state.treeData];
        console.log('-------------',treeData);  

        // debugger
        // if (data.length > 0) {
        //     this.ergodicArr(treeData, data);
        // }

        this.setState({
            treeData: treeData
        })
    }

    //  遍历区划树
    ergodicArr(arr, data) {
        arr.forEach((item) => {
            if (item.zoningCode == data[0].pid) {
                item.children = data;
            }
            else if (item.children) {
                this.ergodicArr(item.children);
            }
        })
    }

    /**
     * 获取手机验证码
     */
    async axiosTelephoneCode() {
        let data;
        if(this.props.form.getFieldValue('telephone')){
            data = await getTelephoneCode(this.props.form.getFieldValue('telephone'));
            if (data.status == "200") {
                message.success(data.dataObject);
            }
            return data;
        }else{
            message.error('请先输入注册所用的手机号码!')
        } 
    }

    /**
     * 注册
     */
    async axiosRegisterData(val) {
        let data = await getRegisterData(val);

        if (data.status == 200) {
            message.success('注册成功!');
            hashHistory.push('/login');
        }
    }

    /** 
     * 获取区划代码
     */
    async axiosSubNodes(val) {
        val = val || "000000000000000";
        let data = await getSubNodes(val);
        return data;
    }

    /**
     * 用户名验证
     */
    checkCustName(rule, value, callback) {
        const nameReg = /^(?!\d+$)[\da-zA-Z]+$/;
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (!nameReg.test(value)) {
                    callback("用户名必须是包含字母和数字的组合，不能使用特殊字符!");
                } else {
                    callback();
                }
            }, 500);
        }
    }

    /**
     * 身份证号码验证
     */
    checkIdNumber(rule, value, callback) {
        const idReg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (!idReg.test(value)) {
                    callback("身份证输入错误,请校验并改正!");
                } else {
                    callback();
                }
            }, 500);
        }
    }

    /**
     * 手机号码验证
     */
    checkTelephone(rule, value, callback) {
        const telephoneReg = /^1[0-9]{10}$/;
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (!telephoneReg.test(value)) {
                    callback("手机号码输入错误,请校验并改正!");
                } else {
                    callback();
                }
            }, 500);
        }
    }

    /**
     * 用户密码验证
     */
    checkPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(["rePasswd"], { force: true });
        }
        callback();
    }

    /**
     * 密码重复验证
     */
    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue("custPwd")) {
            callback("两次输入密码不一致！");
        } else {
            callback();
        }
    }

    async componentWillMount() {
        let data = await this.axiosSubNodes();
        if (data.rtnCode == "000000") {
            this.setState({
                treeData: data.responseData
            })
        }
    }

    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

        const custNameProps = getFieldProps("custName", {
            rules: [
                { required: true, min: 8, message: "用户名至少为 8 个字符" },
                { validator: this.checkCustName }
            ]
        });

        const idNumberProps = getFieldProps("idNumber", {
            rules: [
                { required: true, message: "请输入身份证号" },
                { validator: this.checkIdNumber }
            ]
        });

        const emailProps = getFieldProps("email", {
            validate: [
                {
                    rules: [{ required: true, message: "请输入邮箱地址" }],
                    trigger: "onBlur"
                },
                {
                    rules: [{ type: "email", message: "请输入正确的邮箱地址" }],
                    trigger: ["onBlur", "onChange"]
                }
            ]
        });

        const zoningKeyProps = getFieldProps("zoningKey", {
            rules: [{ required: true, message: "请选择所在区划代码!" }]
        });

        const parentZoningKeyProps = getFieldProps("parentZoningKey", {
            rules: [{ required: false, message: "请选择所在区划代码!" }]
        });

        const userNameProps = getFieldProps("userName", {
            rules: [{ required: false }]
        });

        const telephoneProps = getFieldProps("telephone", {
            rules: [
                { required: true, message: "请输入手机号码!" },
                { validator: this.checkTelephone }
            ]
        });

        const telephoneCodeProps = getFieldProps("telephoneCode", {
            rules: [{ required: true, max: 4, message: "请输入手机验证码!" }]
        });

        const custPwdProps = getFieldProps("custPwd", {
            rules: [
                { required: true, whitespace: true, message: "请填写密码!" },
                { validator: this.checkPass.bind(this) }
            ]
        });

        const rePasswdProps = getFieldProps("rePasswd", {
            rules: [
                { required: true, whitespace: true, message: "请再次输入密码!" },
                { validator: this.checkPass2.bind(this) }
            ]
        });

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 }
        };

        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.divisionName} key={item.zoningCode} dataRef={item}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={item.divisionName} key={item.zoningCode} dataRef={item}/>;
        });

        const treeNodes = loop(this.state.treeData);

        return (
            <div className="register">
                <div className="register-container">

                    <div className="register-logo">
                    </div>

                    <div className="register-form">
                        <Form horizontal form={this.props.form}>
                            <FormItem
                                {...formItemLayout}
                                label="用户姓名"
                                hasFeedback
                                help={
                                    isFieldValidating("custName")
                                        ? "校验中..."
                                        : (getFieldError("custName") || []).join(", ")
                                }
                            >
                                <Input
                                    {...custNameProps}
                                    placeholder="用户名只能使用字母或数字,不能使用特殊字符!"
                                />
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="身份证"
                                hasFeedback
                                help={
                                    isFieldValidating("idNumber")
                                        ? "校验中..."
                                        : (getFieldError("idNumber") || []).join(", ")
                                }
                            >
                                <Input
                                    {...idNumberProps}
                                    placeholder="请输入身份证号"
                                />
                            </FormItem>

                            <FormItem {...formItemLayout} label="邮箱" hasFeedback>
                                <Input
                                    {...emailProps}
                                    type="email"
                                    placeholder="请输入邮箱"
                                />
                            </FormItem>

                            <FormItem {...formItemLayout} label="区划代码" hasFeedback>
                                <Input
                                    {...parentZoningKeyProps}
                                    placeholder="请选择区划"
                                    onClick={this.handleShow.bind(this)}
                                    readOnly
                                    value={this.state.zoningName}
                                />
                            </FormItem>

                            <FormItem {...formItemLayout} label="区划代码" hasFeedback style={{ display: 'none' }}>
                                <Input
                                    {...zoningKeyProps}
                                    value={this.state.zoningKey}
                                />
                            </FormItem>

                            <FormItem {...formItemLayout} label="用户别名" hasFeedback>
                                <Input
                                    {...userNameProps}
                                />
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="手机号"
                                hasFeedback
                                help={
                                    isFieldValidating("telephone")
                                        ? "校验中..."
                                        : (getFieldError("telephone") || []).join(", ")
                                }
                            >
                                <Input
                                    {...telephoneProps}
                                    placeholder="请输入手机号"
                                />
                            </FormItem>

                            <FormItem {...formItemLayout} label="手机验证码" hasFeedback>
                                <Input
                                    {...telephoneCodeProps}
                                    placeholder="输入手机验证码"
                                    style={{ width: "79%", marginRight: 10 }}
                                />
                                <Button type="primary" style={{  marginTop: 0 }} onClick={this.axiosTelephoneCode.bind(this)}>发送</Button>
                            </FormItem>

                            <FormItem {...formItemLayout} label="密码" hasFeedback>
                                <Input
                                    {...custPwdProps}
                                    type="password"
                                    autoComplete="off"
                                    placeholder="请输入密码"
                                    onContextMenu={noop}
                                    onPaste={noop}
                                    onCopy={noop}
                                    onCut={noop}
                                />
                            </FormItem>

                            <FormItem {...formItemLayout} label="确认密码" hasFeedback>
                                <Input
                                    {...rePasswdProps}
                                    type="password"
                                    autoComplete="off"
                                    placeholder="两次输入密码保持一致"
                                    onContextMenu={noop}
                                    onPaste={noop}
                                    onCopy={noop}
                                    onCut={noop}
                                />
                            </FormItem>

                            <FormItem wrapperCol={{ span: 15, offset: 5 }}>
                                <Button type="primary" style={{  marginTop: 0 }} onClick={this.handleSubmit.bind(this)}>注册</Button>
                                <Button type="ghost" onClick={this.handleReset.bind(this)} style={{ color: "#fff", marginLeft: 10 }}>重置</Button>
                                <Link to="/login" style={{ marginLeft: 10, color: '#fff' }}>已有账户 立即登录</Link>
                            </FormItem>
                        </Form>
                    </div>

                    <Modal title="第一个 Modal" visible={this.state.visible}
                        onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                    >
                        <Tree onSelect={this.onSelect.bind(this)} loadData={this.onLoadData.bind(this)}>
                            {treeNodes}
                        </Tree>
                    </Modal>
                </div>
            </div>
        );
    }
}

Register = createForm()(Register);

export default Register;
