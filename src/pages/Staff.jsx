import { Button, Card, Col, Form, Input, Modal, Row, Select, Space, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const { Option } = Select;
const { confirm } = Modal;

const Staff = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility

    useEffect(() => {
        getAllAccounts();
    }, []);

    const getAllAccounts = async () => {
        setLoading(true);
        try {
            const res = await axios.get("https://dvs-be-sooty.vercel.app/api/staff", { withCredentials: true });
            const nonAdminUsers = res.data.data.filter(user => user.role === 'Consulting Staff' || user.role === 'Valuation Staff');
            setUsers(nonAdminUsers);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (checked, username) => {
        confirm({
            title: "Are you sure you want to change the status?",
            onOk: async () => {
                const status = checked ? 1 : 0;
                try {
                    await axios.put(
                        `https://dvs-be-sooty.vercel.app/api/deleteUser?username=${username}`,
                        { status },
                        { withCredentials: true }
                    );
                    getAllAccounts();
                } catch (error) {
                    console.log(error);
                }
            },
        });
    };

    const onFinish = (values) => {
        axios
            .post("https://dvs-be-sooty.vercel.app/api/users", values, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data);
                getAllAccounts();
                form.resetFields();
                setIsModalVisible(false);
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };

    const handleCreateStaff = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: "No.",
            dataIndex: "id",
            key: "id",
            render: (_, __, index) => index + 1,
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone number",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status, record) => (
                <Switch
                    checked={status === 1}
                    onChange={(checked) => handleStatusChange(checked, record.username)}
                />
            ),
        },
    ];

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs={24} xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Accounts Table"
                        extra={
                            <Button type="primary" onClick={handleCreateStaff}>Create New Staff</Button>
                        }
                    >
                        <div className="table-responsive">
                            <Table
                                columns={columns}
                                dataSource={users}
                                pagination={{ pageSize: 10 }}
                                loading={loading}
                                className="ant-border-space"
                            />
                        </div>
                    </Card>
                </Col>
            </Row>

            <Modal
                title="Create New Staff"
                visible={isModalVisible} // Manage visibility with state variable
                onCancel={handleCancel} // Handle modal close
                footer={null}
            >
                <Form
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your first name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your last name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Please enter a valid email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: "Please input your phone number!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="roleId"
                        label="Role"
                        rules={[
                            {
                                required: true,
                                message: "Please select a role!",
                            },
                        ]}
                    >
                        <Select placeholder="Select a role">
                            <Option value={1}>Customer</Option>
                            <Option value={2}>Valuation Staff</Option>
                            <Option value={3}>Consulting Staff</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button onClick={handleCancel}>Cancel</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Staff;
