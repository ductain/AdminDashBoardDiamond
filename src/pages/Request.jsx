import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Card,
  Row,
  Col,
  Radio,
  Typography,
  Button,
  Avatar,
  Progress,
  message,
} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import MySpin from "../components/MySpin";

const { Title } = Typography;

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("All");

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
    getAllRequests();
  }, []);

  const statusColors = {
    Pending: "blue",
    Approved: "green",
    Received: "cyan",
    Valuated: "purple",
    Completed: "gold",
    Locked: "red",
    Lost: "grey",
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
        <img
          src={image}
          alt="Request"
          style={{ width: "50px", height: "50px" }}
        />
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
      title: "Detail",
      key: "detail",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/requests/detail/${record.RequestID}`}>
            <EditOutlined />
          </Link>
        </Space>
      ),
    },
  ];

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredRequests = filter === "All"
    ? requests
    : requests.filter(request => request.processStatus === filter);

  if (!requests.length) return <MySpin />;

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Requests Table"
            extra={
              <Radio.Group onChange={handleFilterChange} defaultValue="All">
                <Radio.Button value="All">All</Radio.Button>
                <Radio.Button value="Pending">Pending</Radio.Button>
                <Radio.Button value="Approved">Approved</Radio.Button>
                <Radio.Button value="Received">Received</Radio.Button>
                <Radio.Button value="Valuated">Valuated</Radio.Button>
                <Radio.Button value="Completed">Completed</Radio.Button>
                <Radio.Button value="Locked">Locked</Radio.Button>
                <Radio.Button value="Lost">Lost</Radio.Button>
              </Radio.Group>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={filteredRequests}
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Request;
