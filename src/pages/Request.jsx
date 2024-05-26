import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const Request = () => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const getAllRequests = async () => {
      await axios
        .get("http://localhost:8080/api/requests", { withCredentials: true })
        .then((res) => {
          setRequests(res.data.requests);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllRequests()
  }, []);
  const statusColors = {
    Pending: 'blue',
    Approved: 'green',
    Received: 'cyan',
    Valuated: 'purple',
    Completed: 'gold',
    Locked: 'red',
    Lost: 'grey',
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "requestImage",
      key: "requestImage",
      render: (image) => (
        <img src={image} alt="Request" style={{ width: '50px', height: '50px' }} />
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (date) => new Date(date).toLocaleDateString("en-GB"),
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      key: "updatedDate",
      render: (date) => new Date(date).toLocaleDateString("en-GB"),
    },
    {
      title: "Process",
      key: "process",
      render: (text, record) => (
        <Tag color={statusColors[record.processStatus]}>
          {record.processStatus}
        </Tag>
      ),
    },
    {
      title: 'Detail',
      key: 'detail',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/requests/detail/${record.RequestID}`}>
            . . .
          </Link>
        </Space>
      ),
    },

  ];

  return (
    <>
      <Table columns={columns} dataSource={requests} />;
    </>
  );
}

export default Request