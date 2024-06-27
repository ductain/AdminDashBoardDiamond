import { Button, Card, Col, Form, Input, List, Row, Select, Spin, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

function Valuation() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        const getAllRequests = async () => {
            await axios
                .get("https://dvs-be-sooty.vercel.app/api/results", { withCredentials: true })
                .then((res) => {
                    setResults(res.data.results);

                    form.setFieldsValue(res.data.results[0]);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getAllRequests();
    }, [form]);
    const valuation = () => {
        navigate(`/requests/detail/${id}`);
    }
    if (loading) {
        return <div className="loading"><Spin size="large" /></div>;
    }

    if (!results) {
        return <div>No request found</div>;
    }

    const handleResultChange = (result) => {
        setSelectedResult(result);
        form.setFieldsValue(result);
    };

    const handleFormChange = (changedFields) => {
        setSelectedResult((prevResult) => ({ ...prevResult, ...changedFields }));
    };

    const handleSubmit = async () => {
        try {
            await form.validateFields();
            const values = form.getFieldsValue();
            const response = await axios.put(`https://dvs-be-sooty.vercel.app/api/valuation/${id}`, values, { withCredentials: true });
            if (response.data.errCode === 0) {
                message.success(response.data.message);
                valuation();
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            message.error("An error occurred while submitting the valuation.");
        }
    };

    return (
        <>
            <Row gutter={[24, 0]}>
                <Col span={24} md={8} className="mb-24">
                    <Card
                        bordered={false}
                        className="header-solid h-full ant-invoice-card"
                        title={<h6 className="font-semibold m-0">Invoices</h6>}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={results}
                            renderItem={(item) => (
                                <List.Item onClick={() => handleResultChange(item)}>
                                    <List.Item.Meta
                                        title={<a href="#">{item.companyName}</a>}
                                        description={`Date Valued: ${new Date(item.dateValued).toLocaleDateString("en-GB")}`}
                                    />
                                    <div className="amount">{`$${item.price}`}</div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={24} md={16} className="mb-24">
                    <Card
                        className="header-solid h-full"
                        bordered={false}
                        title={<h3 className="font-semibold m-0">Diamond Information</h3>}
                        bodyStyle={{ paddingTop: "0" }}
                    >
                        <Form form={form} layout="vertical" onValuesChange={handleFormChange}>
                            <Row gutter={[24, 24]}>
                                <Col span={12}>
                                    <Form.Item label="Proportions" name="proportions" rules={[{ required: true, message: 'Please enter proportions' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Diamond Origin" name="diamondOrigin" rules={[{ required: true, message: 'Please enter diamond origin' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Carat Weight" name="caratWeight" rules={[{ required: true, message: 'Please enter carat weight' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Measurements" name="measurements" rules={[{ required: true, message: 'Please enter measurements' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Polish" name="polish" rules={[{ required: true, message: 'Please enter polish' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Fluorescence" name="flourescence" rules={[{ required: true, message: 'Please enter fluorescence' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Color" name="color" rules={[{ required: true, message: 'Please enter color' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Cut" name="cut" rules={[{ required: true, message: 'Please enter cut' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Clarity" name="clarity" rules={[{ required: true, message: 'Please enter clarity' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Symmetry" name="symmetry" rules={[{ required: true, message: 'Please enter symmetry' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Shape" name="shape" rules={[{ required: true, message: 'Please select a shape' }]}>
                                        <Select placeholder="Select a shape">
                                            <Option value="Round">Round</Option>
                                            <Option value="Princess">Princess</Option>
                                            <Option value="Emerald">Emerald</Option>
                                            <Option value="Cushion">Cushion</Option>
                                            <Option value="Radiant">Radiant</Option>
                                            <Option value="Asscher">Asscher</Option>
                                            <Option value="Heart">Heart</Option>
                                            <Option value="Trilliant">Trilliant</Option>
                                            <Option value="Oval">Oval</Option>
                                            <Option value="Pear">Pear</Option>
                                            <Option value="Marquise">Marquise</Option>
                                            <Option value="Baguette">Baguette</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Button type="primary" onClick={handleSubmit}>Submit Valuation</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Valuation;
