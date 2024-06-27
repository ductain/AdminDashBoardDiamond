import { CheckCircleOutlined, ClockCircleOutlined, EditOutlined, ExclamationCircleOutlined, InboxOutlined, MinusCircleOutlined, PhoneOutlined } from "@ant-design/icons";
import { Card, Col, FloatButton, Radio, Row, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MySpin from "../components/MySpin";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllRequests = async () => {
      setLoading(true);
      await axios
        .get("https://dvs-be-sooty.vercel.app/api/requests", { withCredentials: true })
        .then((res) => {
          setLoading(false);
          setRequests(res.data.requests);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllRequests();
  }, []);

  const statusColors = {
    "Pending": "blue",
    "Booked Appointment": "cyan",
    "Received": "green",
    "Approved": "gold",
    "In Progress": "gold",
    "Sent to Valuation": "purple",
    "Completed": "green",
    "Start Valuated": "gold",
    "Valuated": "purple",
    "Commitment": "orange",
    "Sealing": "orange",
    "Result Sent to Customer": "purple",
    "Received for Valuation": "cyan",
    "Sent to Consulting": "cyan",
    "Unprocessed": "red",
    "Ready for valuation": "blue",
    "Done": "green"
  };

  const serviceColors = {
    Vip: "black",
    Normal: "",
  };

  const statusIcons = {
    "Pending": <ClockCircleOutlined />,
    "Booked Appointment": <PhoneOutlined />,
    "Received": <InboxOutlined />,
    "Approved": <ExclamationCircleOutlined />,
    "In Progress": <ClockCircleOutlined />,
    "Sent to Valuation": <ClockCircleOutlined />,
    "Completed": <CheckCircleOutlined />,
    "Start Valuated": <ClockCircleOutlined />,
    "Valuated": <ExclamationCircleOutlined />,
    "Commitment": <ClockCircleOutlined />,
    "Sealing": <ClockCircleOutlined />,
    "Result Sent to Customer": <ExclamationCircleOutlined />,
    "Received for Valuation": <InboxOutlined />,
    "Sent to Consulting": <InboxOutlined />,
    "Unprocessed": <MinusCircleOutlined />,
    "Ready for valuation": <CheckCircleOutlined />,
    "Done": <CheckCircleOutlined />
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
        <Tag icon={statusIcons[record.processStatus]} color={statusColors[record.processStatus]}>
          {record.processStatus || "Unprocessed"}
        </Tag>
      ),
    },
    {
      title: "Service",
      key: "service",
      render: (text, record) => (
        <Tag color={serviceColors[record.serviceName]}>
          {record.serviceName}
        </Tag>
      ),
    },
    {
      title: "Detail",
      key: "detail",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/manager/requests/detail/${record.RequestID}`}>
            <EditOutlined />
          </Link>
        </Space>
      ),
    },
  ];

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleServiceFilterChange = (e) => {
    setServiceFilter(e.target.value);
  };

  const filteredRequests = requests.filter(request => {
    if (filter !== "All" && request.processStatus !== filter) {
      return false;
    }
    if (serviceFilter !== "All" && request.serviceName !== serviceFilter) {
      return false;
    }
    return true;
  });

  if (!requests.length) return <MySpin />;

  return (
    <div className="tabled">
      <FloatButton
        href=""
        tooltip={<div>New diamond for valuate</div>}
        badge={{
          count: filteredRequests.length,
          color: 'blue',
        }}
      />
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Requests Table"
            extra={
              <>
                <div style={{ margin: " 10px 0 10px 0" }}>
                  <Radio.Group onChange={handleFilterChange} defaultValue="All">
                    <Radio.Button value="All">All</Radio.Button>
                    <Radio.Button value="Unprocessed">Unprocessed</Radio.Button>
                    <Radio.Button value="Pending">Pending</Radio.Button>
                    <Radio.Button value="Booked Appointment">Booked Appointment</Radio.Button>
                    <Radio.Button value="Approved">Approved</Radio.Button>
                    <Radio.Button value="Received">Received</Radio.Button>
                    <Radio.Button value="Sent to Valuation">Sent Valuation</Radio.Button>
                    <Radio.Button value="Completed">Completed</Radio.Button>
                    <Radio.Button value="Valuated">Valuated</Radio.Button>
                    <Radio.Button value="Ready for valuation">Ready valuation</Radio.Button>
                    <Radio.Button value="Done">Done</Radio.Button>
                  </Radio.Group>
                </div>
                <div style={{ margin: " 10px 0 10px 0" }}>
                  <Radio.Group onChange={handleServiceFilterChange} defaultValue="All">
                    <Radio.Button value="All">All</Radio.Button>
                    <Radio.Button value="Advanced Valuation">Advanced Valuation</Radio.Button>
                    <Radio.Button value="Basic Valuation">Basic Valuation</Radio.Button>
                  </Radio.Group>
                </div>
              </>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={filteredRequests}
                pagination={{ pageSize: 10 }}
                loading={loading}
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
