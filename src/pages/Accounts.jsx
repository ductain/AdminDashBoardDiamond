import React, { useEffect, useState } from "react";
import { Button, Table, Switch } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import MySpin from "../components/MySpin";

const Accounts = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllAccounts = async () => {
      await axios
        .get("http://localhost:8080/api/users", { withCredentials: true })
        .then((res) => {
          setUsers(res.data.users);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllAccounts();
  }, []);
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
      render: (status) => (
        <Switch
          checked={status === 1}
        />
      ),
    },
  ];
  if(!users.length){
    return <MySpin />
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
        <Link to={'/accounts/create'}>
        <Button type="primary">Create New User</Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={users} />;
    </>
  );
};

export default Accounts;
