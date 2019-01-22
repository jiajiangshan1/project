import React from "react";
import ReactDom from "react-dom";
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router';
import { Button, Modal, Input, Form, message, Icon, Select } from "antd";
import { getSuperAdminSystemList, getChildrenAuthList, getAddAuth, getAddSystem } from "../../../../Service/sp/ua/server";

require("./createAuth.css")

const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
    return false;
}

class CreateAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            systemList: [],
            authMenuList: [],
            authSubMenuList: [],

            authLevelList: [
                { key: 0, title: '国家级' },
                { key: 1, title: '省级及以上' },
                { key: 2, title: '市级及以上' },
                { key: 3, title: '县级及以上' },
                { key: 4, title: '乡级及以上' },
                { key: 5, title: '村级及以上' }],
            // 0-普通权限，1-管理员权限，2-国家管理员，3-默认权限
            authTypeList: [
                { key: 0, title: "普通权限" },
                { key: 1, title: "管理员权限" },
                { key: 2, title: "国家管理员" },
                { key: 3, title: "默认权限" }
            ],

            systemId: '',
            parent: '',

            formType: true,
            visible: false
        };
    }

    /**
     * 获取系统列表
     */
    async  axiosSuperAdminSystemList() {
        let data = await getSuperAdminSystemList();
        let dataArr;
        let list = [{ key: '0', title: '新增' }];
        let obj;
        if (data.status == 200) {
            dataArr = data.dataObject;
            dataArr.forEach(item => {
                obj = {};
                obj.key = item.systemId;
                obj.title = item.systemName;
                list.push(obj);
            })
            this.setState({
                systemList: [...list]
            })
        }
        console.log(this.state.systemList);
    }

    /**
     *获取系统下权限菜单
     */
    async axiosChildrenAuthList(params) {
        let data = await getChildrenAuthList(params);
        if (data.status == 200) {
            return data.dataObject;
        }
    }

    /**
     * 系统添加
     */
    async axiosAddSystem(params) {
        let data = await getAddSystem(params);
        console.log(data);
        if (data.status == 200) {
            this.axiosSuperAdminSystemList();
        } else {
            message.error(data.description)
        }
    }

    /**
     * 添加权限菜单
     */
    async axiosAddAuth(params) {
        let data = await getAddAuth(params);
        console.log(data);
    }

    handleSystemChange(value, option) {
        if (value == 0) {
            this.setState({
                visible: true,
                authMenuList: [],
                formType: true,
            })
        } else {
            let params = {};
            params.parent = 0;
            params.systemId = value;
            this.axiosChildrenAuthList(params).then(
                data => {
                    let list = [{ key: '0', title: '新增' }];
                    let obj;
                    data.forEach(item => {
                        obj = {};
                        for (var key in item) {
                            obj[key] = item[key];
                        }
                        obj.key = item.authorityId;
                        obj.title = item.authorityName;
                        list.push(obj);
                    })

                    this.setState({
                        systemId: value,
                        authMenuList: [...list]
                    })
                }
            )
        }
        this.setState({
            systemId: value
        })
    }

    handleAuthMenuChange(value, option) {
        console.log(value, option);

        this.setState({
            formType: false,
            parent: value
        })

        this.props.form.setFieldsValue({
            parent: 0,
            systemId: this.state.systemId
        })

        if (value == 0) {
            this.setState({
                visible: true
            })
        } else {
            let params = {};
            let parent = value;
            params.parent = parent;
            params.systemId = this.state.systemId;
            this.axiosChildrenAuthList(params).then(
                data => {
                    let list = [{ key: '0', title: '新增' }];
                    let obj;
                    data.forEach(item => {
                        obj = {};
                        for (var key in item) {
                            obj[key] = item[key];
                        }
                        obj.key = item.authorityId;
                        obj.title = item.authorityName;
                        list.push(obj);
                    })

                    this.setState({
                        parent: value,
                        authSubMenuList: [...list]
                    })
                }
            )
        }
    }

    handleAuthSubMenuChange(value, option){
        this.setState({
            formType: false
        })

        this.props.form.setFieldsValue({
            parent: this.state.parent,
            systemId: this.state.systemId
        })

        if (value == 0) {
            this.setState({
                parent: this.state.parent,
                visible: true
            })
        } else {
            let params = {};
            let parent = value;
            params.parent = this.state.parent;
            params.systemId = this.state.systemId;
            this.axiosChildrenAuthList(params).then(
                data => {
                    let list = [{ key: '0', title: '新增' }];
                    let obj;
                    data.forEach(item => {
                        obj = {};
                        for (var key in item) {
                            obj[key] = item[key];
                        }
                        obj.key = item.authorityId;
                        obj.title = item.authorityName;
                        list.push(obj);
                    })

                    this.setState({
                        parent: value,
                        authSubMenuList: [...list]
                    })
                }
            )
        }
    }

    /**
     * 添加系统提交
     */
    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                message.error(errors);
                return;
            } else {
                const params = this.props.form.getFieldsValue();
                this.axiosAddSystem(params);
            }
        });

        this.setState({
            visible: false
        })
    }

    handleSubmitAuth() {
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                message.error(errors);
                return;
            }else{
                console.log(values);
                this.axiosAddAuth(values);
            }
        });
        // console.log(this.props.form.getFieldsValue());
    }

    hideModal() {
        this.setState({
            visible: false
        })
    }

    componentWillMount() {
        this.axiosSuperAdminSystemList()
    }

    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const { systemList, authMenuList, authSubMenuList, authLevelList, authTypeList } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };

        const systemNameProps = getFieldProps("systemName", {
            // rules: [{ required: true, message: "请输入新添的系统名称!" }]
        });
        
        const modDesProps = getFieldProps("modDes", {});

        const authorityNameProps = getFieldProps("authorityName", {
            rules: [{ required: true, message: "请输入新添的菜单名称!" }]
        });

        const authorityIdProps = getFieldProps("authorityId", {});

        const requestUrlProps = getFieldProps("requestUrl", {});

        const parentProps = getFieldProps("parent", {});

        const authTypeProps = getFieldProps("authType", {
            rules: [{ required: true, message: "请选择权限类型!" }]
        });

        const authLevelProps = getFieldProps("authLevel", {
            rules: [{ required: true, message: "请选择权限级次!" }]
        });

        const systemIdProps = getFieldProps("systemId", {});

        const authDesProps = getFieldProps("authDes", {});

        const systemForm = <div>

            <Modal
                title="系统添加"
                visible={this.state.visible}
                onOk={this.handleSubmit.bind(this)}
                onCancel={this.hideModal.bind(this)}
            >
                <div className="createauth-form">
                    <Form horizontal form={this.props.form}>
                        <FormItem {...formItemLayout} label="系统名称">
                            <Input
                                {...systemNameProps}
                            />
                        </FormItem>

                        <FormItem {...formItemLayout} label="系统描述">
                            <Input
                                {...modDesProps}
                            />
                        </FormItem>
                    </Form>
                </div>
            </Modal>

        </div>

        const authMenuForm = <div>
            <Modal
                title="系统添加"
                visible={this.state.visible}
                onOk={this.handleSubmitAuth.bind(this)}
                onCancel={this.hideModal.bind(this)}
            >
                <div className="createauth-form">
                    <Form horizontal form={this.props.form}>
                        <FormItem {...formItemLayout} label="菜单名称">
                            <Input
                                {...authorityNameProps}
                            />
                        </FormItem>

                        {this.state.parent != 0 &&
                            <FormItem {...formItemLayout} label="菜单id">
                                <Input
                                    {...authorityIdProps}
                                />
                            </FormItem>
                        }

                        <FormItem {...formItemLayout} label="菜单路径">
                            <Input
                                {...requestUrlProps}
                            />
                        </FormItem>

                        <FormItem {...formItemLayout} label="上级菜单">
                            <Input
                                {...parentProps}
                                readOnly
                            />
                        </FormItem>

                        <FormItem {...formItemLayout} label="权限类型">
                            {/* <Input
                                {...authTypeProps}
                            /> */}

                            <Select {...authTypeProps}>
                                {
                                    authLevelList.length && authLevelList.map(item => (
                                        <Select.Option value={item.key}>{item.title}</Select.Option>)
                                    )
                                }
                            </Select>
                        </FormItem>

                        <FormItem {...formItemLayout} label="权限级次">
                            {/* <Input
                                {...authLevelProps}
                            /> */}

                            <Select {...authLevelProps}>
                                {
                                    authTypeList.length && authTypeList.map(item => (
                                        <Select.Option value={item.key}>{item.title}</Select.Option>)
                                    )
                                }
                            </Select>
                        </FormItem>

                        <FormItem {...formItemLayout} label="系统ID">
                            <Input
                                {...systemIdProps}
                                readOnly
                            />
                        </FormItem>

                        <FormItem {...formItemLayout} label="菜单说明">
                            <Input
                                {...authDesProps}
                            />
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        </div>

        const formDom = this.state.formType ? systemForm : authMenuForm


        return (
            <div className="createauth">
                <div className="createauth-select-type">
                    <Select style={{ width: 200 }} onSelect={this.handleSystemChange.bind(this)} placeholder="请选择">
                        {
                            systemList.length && systemList.map(item => (
                                <Select.Option value={item.key}>{item.title}</Select.Option>)
                            )
                        }
                    </Select>

                    {   authMenuList.length &&
                        <Select style={{ width: 200 }} onSelect={this.handleAuthMenuChange.bind(this)} placeholder="请选择">
                            {
                                authMenuList.length && authMenuList.map(item => (
                                    <Select.Option value={item.key}>{item.title}</Select.Option>)
                                )
                            }
                        </Select>
                    }

                    {   authSubMenuList.length &&
                        <Select style={{ width: 200 }} onSelect={this.handleAuthSubMenuChange.bind(this)} placeholder="请选择">
                            {
                                authSubMenuList.length && authSubMenuList.map(item => (
                                    <Select.Option value={item.key}>{item.title}</Select.Option>)
                                )
                            }
                        </Select>
                    }
                </div>

                {formDom}

            </div>
        )
    }
}

CreateAuth = createForm()(CreateAuth);
export default CreateAuth;