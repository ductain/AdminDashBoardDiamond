import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InboxOutlined,
  MinusCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MySpin from "../../components/MySpin";

const RequestApproval = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllRequests = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://dvs-be-sooty.vercel.app/api/request-approved",
          { withCredentials: true }
        );
        console.log(res.data.data);
        setLoading(false);
        setRequests(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllRequests();
  }, []);

  const statusColors = {
    Pending: "blue",
    "Booked Appointment": "cyan",
    Received: "green",
    Approved: "gold",
    "In Progress": "gold",
    "Sent to Valuation": "purple",
    Completed: "green",
    "Start Valuated": "gold",
    Valuated: "purple",
    Commitment: "orange",
    Sealing: "orange",
    "Result Sent to Customer": "purple",
    "Received for Valuation": "cyan",
    "Sent to Consulting": "cyan",
    Unprocessed: "red",
    "Ready for valuation": "blue",
    Done: "green",
  };

  const statusIcons = {
    Pending: <ClockCircleOutlined />,
    "Booked Appointment": <PhoneOutlined />,
    Received: <InboxOutlined />,
    Approved: <ExclamationCircleOutlined />,
    "In Progress": <ClockCircleOutlined />,
    "Sent to Valuation": <ClockCircleOutlined />,
    Completed: <CheckCircleOutlined />,
    "Start Valuated": <ClockCircleOutlined />,
    Valuated: <ExclamationCircleOutlined />,
    Commitment: <ClockCircleOutlined />,
    Sealing: <ClockCircleOutlined />,
    "Result Sent to Customer": <ExclamationCircleOutlined />,
    "Received for Valuation": <InboxOutlined />,
    "Sent to Consulting": <InboxOutlined />,
    Unprocessed: <MinusCircleOutlined />,
    "Ready for valuation": <CheckCircleOutlined />,
    Done: <CheckCircleOutlined />,
  };

  const columns = [
    {
      title: <span style={{ color: '#c09c1a' }}><strong>No.</strong></span>,
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    {
      title:<span style={{ color: '#c09c1a' }}><strong>Image</strong></span>,
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
      title: <span style={{ color: '#c09c1a' }}><strong>Note</strong></span>,
      dataIndex: "note",
      key: "note",
    },
    {
      title: <span style={{ color: '#c09c1a' }}><strong>Created Date</strong></span>,
      dataIndex: "createdDate",
      key: "createdDate",
      render: (date) => new Date(date).toLocaleDateString("en-GB"),
    },
    {
      title: <span style={{ color: '#c09c1a' }}><strong>Description</strong></span>,
      dataIndex: "description",
      key: "description",
    },
    {
      title:<span style={{ color: '#c09c1a' }}><strong>Process</strong></span>,
      dataIndex: "process",
      filters: [
        {
          text: "Sealing",
          value: "Sealing",
        },
        {
          text: "Commitment",
          value: "Commitment",
        },
      ],
      onFilter: (value, record) => record.processStatus.indexOf(value) === 0,
      render: (text, record) => (
        <Tag
          icon={statusIcons[record.processStatus]}
          color={statusColors[record.processStatus]}
        >
          {record.processStatus || "Unprocessed"}
        </Tag>
      ),
    },
    {
      title: <span style={{ color: '#c09c1a' }}><strong>Detail	</strong></span>,
      key: "detail",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/manager/requests/detail/${record.requestId}`}>
            <EditOutlined />
          </Link>
        </Space>
      ),
    },
    {
      title: <span style={{ color: '#c09c1a' }}><strong>Action</strong></span>,
      key: "action",
      render: (_, record) => {
        const isDisabled =
          record.processStatus === "Commitment" ||
          record.processStatus === "Sealing" ||
          record.processStatus === "Rejected Commitment" ||
          record.processStatus === "Rejected Sealing";
        return (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() =>
                handleApprove(record.requestId, record.requestType)
              }
              disabled={isDisabled}
            >
              Approve
            </Button>
            <Button
              style={{ backgroundColor: "#87CEEB", color: 'black' }}
              type="primary"
              onClick={() => handleReject(record.requestId, record.requestType)}
              disabled={isDisabled}
            >
              Reject
            </Button>
          </Space>
        );
      },
    },
  ];

  const handleApprove = async (approvalId, requestType) => {
    setLoading(true);
    let status = "Approved";
    if (requestType === "Commitment") {
      status = "Commitment";
    } else if (requestType === "Sealing") {
      status = "Sealing";
    }

    try {
      const res = await axios.put(
        `https://dvs-be-sooty.vercel.app/api/approve-request`,
        { approvalId, status },
        { withCredentials: true }
      );
      setLoading(false);
      if (res.data && res.data.errCode === 0) {
        // Update local state or re-fetch requests
        const updatedRequests = requests.map((req) =>
          req.requestId === approvalId ? { ...req, processStatus: status } : req
        );
        setRequests(updatedRequests);
      } else {
        console.error("Failed to approve request:", res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error while approving request:", error);
    }
  };

  const handleReject = async (approvalId, requestType) => {
    setLoading(true);
    let status = "Rejected";
    if (requestType === "Commitment") {
      status = "Rejected Commitment";
    } else if (requestType === "Sealing") {
      status = "Rejected Sealing";
    }

    try {
      const res = await axios.put(
        `https://dvs-be-sooty.vercel.app/api/approve-request`,
        { approvalId, status },
        { withCredentials: true }
      );
      setLoading(false);
      if (res.data && res.data.errCode === 0) {
        // Update local state or re-fetch requests
        const updatedRequests = requests.map((req) =>
          req.requestId === approvalId ? { ...req, processStatus: status } : req
        );
        setRequests(updatedRequests);
      } else {
        console.error("Failed to reject request:", res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error while rejecting request:", error);
    }
  };

  if (loading) return <MySpin />;

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs={24} xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={requests}
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

export default RequestApproval;
