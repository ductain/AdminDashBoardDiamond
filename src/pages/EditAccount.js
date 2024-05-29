import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Card, Spin, Select, message } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const { Option } = Select;

const roleMapping = {
    1: "Customer",
    2: "Valuation Staff",
    3: "Consulting Staff",
};

const EditAccount = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [userEdited, setUserEdited] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/${id}`, { withCredentials: true });
                const user = response.data.user[0];
                setUserEdited({ ...user, roleId: roleMapping[user.roleId] });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserEdited({ ...userEdited, [name]: value });
    };

    const handleRoleChange = (value) => {
        setUserEdited({ ...userEdited, roleId: value });
    };

    const handleSave = async () => {
        try {
            const updatedUser = { ...userEdited, roleId: Object.keys(roleMapping).find(key => roleMapping[key] === userEdited.roleId) };
            await axios.put(`http://localhost:8080/api/editUser`, updatedUser, { withCredentials: true });
            message.success("User information updated successfully!");
            navigate("/accounts");
        } catch (error) {
            console.error(error);
            message.error("Failed to update user information.");
        }
    };

    if (loading) {
        return <Spin size="large" style={{ display: 'block', margin: 'auto', marginTop: '20%' }} />;
    }

    return (
        <Card title="Edit Account" style={{ maxWidth: 600, margin: "auto", marginTop: 50 }}>
            <Form layout="vertical">
                <Form.Item label="First Name">
                    <Input
                        prefix={<UserOutlined />}
                        name="firstName"
                        value={userEdited.firstName}
                        onChange={handleInputChange}
                    />
                </Form.Item>
                <Form.Item label="Last Name">
                    <Input
                        prefix={<UserOutlined />}
                        name="lastName"
                        value={userEdited.lastName}
                        onChange={handleInputChange}
                    />
                </Form.Item>
                <Form.Item label="Email">
                    <Input
                        prefix={<MailOutlined />}
                        name="email"
                        value={userEdited.email}
                        onChange={handleInputChange}
                    />
                </Form.Item>
                <Form.Item label="Phone Number">
                    <Input
                        prefix={<PhoneOutlined />}
                        name="phone"
                        value={userEdited.phone}
                        onChange={handleInputChange}
                    />
                </Form.Item>
                <Form.Item label="Role">
                    <Select
                        value={userEdited.roleId}
                        onChange={handleRoleChange}
                    >
                        <Option value="Customer">Customer</Option>
                        <Option value="Valuation Staff">Valuation Staff</Option>
                        <Option value="Consulting Staff">Consulting Staff</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" block onClick={handleSave}>
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default EditAccount;
