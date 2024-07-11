import { CheckCircleOutlined, ClockCircleOutlined, EyeOutlined , ExclamationCircleOutlined, InboxOutlined, MinusCircleOutlined, PhoneOutlined } from "@ant-design/icons";
import { Card, Col, FloatButton, Row, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MySpin from "../components/MySpin";

const Request = () => {
  const [requests, setRequests] = useState([]);
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
          style={{ width: "50px", height: "50px", borderRadius: 180 }}
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
      title: "Process",
      dataIndex: "process",
      filters: [
        {
          text: 'Unprocessed',
          value: 'Unprocessed',
        },
        {
          text: 'Pending',
          value: 'Pending',
        },
        {
          text: 'Booked Appointment',
          value: 'Booked Appointment',
        },
        {
          text: 'Approved',
          value: 'Approved',
        },
        {
          text: 'Received',
          value: 'Received',
        },
        {
          text: 'Sent Valuation',
          value: 'Sent to Valuation',
        },
        {
          text: 'Completed',
          value: 'Completed',
        },
        {
          text: 'Valuated',
          value: 'Valuated',
        },
        {
          text: 'Ready valuation',
          value: 'Ready for valuation',
        },
        {
          text: 'Valuated',
          value: 'Valuated',
        },
        {
          test: "Done",
          value: "Done"
        }
      ],
      onFilter: (value, record) => record.processStatus.indexOf(value) === 0,
      render: (text, record) => (
        <Tag icon={statusIcons[record.processStatus]} color={statusColors[record.processStatus]}>
          {record.processStatus || "Unprocessed"}
        </Tag>
      ),
    },
    {
      title: "Service",
      dataIndex: "service",
      filters: [
        {
          text: 'Advanced Valuation',
          value: 'Advanced Valuation',
        },
        {
          text: 'Basic Valuation',
          value: 'Basic Valuation',
        }
      ],
      onFilter: (value, record) => record.serviceName.indexOf(value) === 0,
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
            <EyeOutlined  />
          </Link>
        </Space>
      ),
    },
  ];

  if (!requests.length) return <MySpin />;

  return (
    <div className="tabled">
      <FloatButton
        href=""
        tooltip={<div>New diamond for valuate</div>}
        badge={{
          color: 'blue',
        }}
      />
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={requests}
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
