import React, { useEffect, useState } from "react";
import { Button, Table, Switch, Modal } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import MySpin from "../components/MySpin";

const Accounts = () => {
  const [users, setUsers] = useState([]);
  const getAllAccounts = async () => {
    await axios
      .get("http://localhost:8080/api/users", { withCredentials: true })
      .then((res) => {
        const nonAdminUsers = res.data.users.filter(user => user.role !== 'Admin');
        setUsers(nonAdminUsers);
      })
      .catch((error) => {
        console.log(error);
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
            `http://localhost:8080/api/deleteUser?username=${username}`,
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
    {
      title: "Action", key: "action", render: (text, record) => (
        <Link to={`/accounts/edit/${record.id}`}>
          <Button type="primary">Edit</Button>
        </Link>
      )
    }
  ];
  if (!users.length) {
    return <MySpin />;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Link to={"/accounts/create"}>
          <Button type="primary">Create New User</Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={users} />;
    </>
  );
};

export default Accounts;
