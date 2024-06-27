import { Button, Card, Col, Modal, Row, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MySpin from "../components/MySpin";


const Accounts = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllAccounts = async () => {
    setLoading(true);
    await axios
      .get("https://dvs-be-sooty.vercel.app/api/users", { withCredentials: true })
      .then((res) => {
        const nonAdminUsers = res.data.users.filter(user => user.role !== 'Admin');
        setUsers(nonAdminUsers);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllAccounts();
  }, []);

  const handleStatusChange = (checked, username) => {
    Modal.confirm({
      title: "Are you sure you want to change the status?",
      onOk: async () => {
        const status = checked ? 1 : 0;
        try {
          await axios.put(
            `https://dvs-be-sooty.vercel.app/api/deleteUser?username=${username}`,
            { status },
            { withCredentials: true }
          );
          // Refresh the user list after updating the status
          getAllAccounts();
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
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

  if (loading) {
    return <MySpin />;
  }

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Accounts Table"
            extra={
              <Link to={"/accounts/create"}>
                <Button type="primary">Create New User</Button>
              </Link>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={users}
                pagination={{ pageSize: 10 }}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Accounts;
