import { Card, Col, Row, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MySpin from "../../components/MySpin";

const FeedBack = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllFeedbacks = async () => {
      setLoading(true);
      await axios
        .get("https://dvs-be-sooty.vercel.app/api/get-feedback", { withCredentials: true })
        .then((res) => {
          setLoading(false);
          setFeedbacks(res.data.data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    };
    getAllFeedbacks();
  }, []);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Feedback",
      dataIndex: "feedbackText",
      key: "feedbackText",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("en-GB"),
    },
  ];

  if (loading) return <MySpin />;

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card bordered={false} className="criclebox tablespace mb-24">
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={feedbacks}
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

export default FeedBack;
