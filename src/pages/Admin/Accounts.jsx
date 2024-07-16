import { Button, Card, Col, Modal, Row, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MySpin from "../../components/MySpin";
import "../../css/Accounts.css";

const Accounts = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllAccounts = async () => {
    setLoading(true);
    await axios
      .get("https://dvs-be-sooty.vercel.app/api/users", { withCredentials: true })
      .then((res) => {
        const nonAdminUsers = res.data.users.filter(user => user.role !== 'Admin' && user.role !== "Manager");
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
          setLoading(true);
          await axios.put(
            `https://dvs-be-sooty.vercel.app/api/deleteUser?username=${username}`,
            { status },
            { withCredentials: true }
          );
          setLoading(false);
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
      render: (_, __, index) => <span className="no-column">{index + 1}</span>,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <span className="first-name-column">{text}</span>,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => <span className="last-name-column">{text}</span>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <span className="username-column">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span className="email-column">{text}</span>,
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <span className="phone-column">{text}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => <span className="role-column">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          className={status === 1 ? "status-switch-active" : "status-switch-inactive"}
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
    <div className="tabled accounts-container">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24 accounts-card"
            title="Accounts Table"
            extra={
              <Link to={"/accounts/create"}>
                <Button type="primary">Create New User</Button>
              </Link>
            }
          >
            <div className="table-responsive accounts-table">
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
