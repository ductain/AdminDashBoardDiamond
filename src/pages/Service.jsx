import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Modal, Row, Space, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Service = () => {
    const [service, setService] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingService, setEditingService] = useState(null);

    useEffect(() => {
        getAllService();
    }, []);

    const getAllService = async () => {
        setLoading(true);
        try {
            const res = await axios.get("https://dvs-be-sooty.vercel.app/api/services", { withCredentials: true });
            console.log(res.data.services);
            setService(res.data.services);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = (checked, serviceId) => {
        Modal.confirm({
            title: "Are you sure you want to change the status of this service?",
            onOk: async () => {
                const status = checked ? 1 : 0;
                try {
                    await axios.put(
                        `https://dvs-be-sooty.vercel.app/api/service/${serviceId}`,
                        { status },
                        { withCredentials: true }
                    );
                    getAllService();
                } catch (error) {
                    console.log(error);
                }
            },
        });
    };

    const handleCreateService = () => {
        setEditingService(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditService = (service) => {
        setEditingService(service);
        form.setFieldsValue(service);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const onFinish = async (values) => {
        if (editingService) {
            // Update existing service
            try {
                const updatedService = { ...values, serviceId: editingService.serviceId };
                await axios.put(
                    `https://dvs-be-sooty.vercel.app/api/service`,
                    updatedService,
                    { withCredentials: true }
                );
                getAllService();
                form.resetFields();
                setIsModalVisible(false);
            } catch (error) {
                console.log(error.response.data.message);
            }
        } else {
            // Create new service
            try {
                await axios.post(
                    "https://dvs-be-sooty.vercel.app/api/service",
                    values,
                    { withCredentials: true }
                );
                getAllService();
                form.resetFields();
                setIsModalVisible(false);
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
    };

    const columns = [
        {
            title: "No.",
            dataIndex: "serviceId",
            key: "serviceId",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Service Name",
            dataIndex: "serviceName",
            key: "serviceName",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Action",
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEditService(record)}>
                        <EditOutlined />
                    </Button>
                </Space>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status, record) => (
                <Switch
                    checked={status === true}
                    onChange={(checked) => handleStatusChange(checked, record.serviceId)}
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
                        title="Services Table"
                        extra={
                            <Button type="primary" onClick={handleCreateService}>Create Service</Button>
                        }
                    >
                        <div className="table-responsive">
                            <Table
                                columns={columns}
                                dataSource={service}
                                pagination={{ pageSize: 10 }}
                                loading={loading}
                                rowKey="serviceId"
                                className="ant-border-space"
                            />
                        </div>
                    </Card>
                </Col>
            </Row>

            <Modal
                title={editingService ? "Edit Service" : "Create New Service"}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    name="service-form"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="serviceName"
                        label="Service Name"
                        rules={[{ required: true, message: "Please input the service name!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: "Please input the price!" }]}
                    >
                        <Input />
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

export default Service;