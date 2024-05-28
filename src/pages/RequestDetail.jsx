import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Spin, Typography } from "antd";
import { UserOutlined, InfoCircleOutlined, SketchOutlined } from "@ant-design/icons";
import "../css/RequestDetail.css";

const { Title, Text } = Typography;

const RequestDetail = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRequestDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/requests/${id}`, { withCredentials: true });
        setRequest(res.data.request[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getRequestDetail();
  }, [id]);

  if (loading) {
    return <div className="loading"><Spin size="large" /></div>;
  }

  if (!request) {
    return <div>No request found</div>;
  }

  return (
    <div className="request-detail-container">
      <Title level={1} className="page-title">Request Detail</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Request Information" bordered={false} className="info-card">
            <InfoCircleOutlined className="icon" />
            <p><Text strong>Created Date:</Text> {new Date(request.createdDate).toLocaleDateString("en-GB")}</p>
            <p><Text strong>Updated Date:</Text> {new Date(request.updatedDate).toLocaleDateString("en-GB")}</p>
            <p><Text strong>Note:</Text> {request.note}</p>
            <p><Text strong>Process Status:</Text> {request.processStatus}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Diamond Information" bordered={false} className="info-card">
            <SketchOutlined className="icon" />
            <img src={request.requestImage} alt="Request" className="diamond-image" />
            <p><Text strong>Carat Weight:</Text> {request.caratWeight}</p>
            <p><Text strong>Clarity:</Text> {request.clarity}</p>
            <p><Text strong>Color:</Text> {request.color}</p>
            <p><Text strong>Cut:</Text> {request.cut}</p>
            <p><Text strong>Diamond Origin:</Text> {request.diamondOrigin}</p>
            <p><Text strong>Flourescence:</Text> {request.flourescence}</p>
            <p><Text strong>Measurements:</Text> {request.measurements}</p>
            <p><Text strong>Polish:</Text> {request.polish}</p>
            <p><Text strong>Proportions:</Text> {request.proportions}</p>
            <p><Text strong>Shape:</Text> {request.shape}</p>
            <p><Text strong>Symmetry:</Text> {request.symmetry}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="User Information" bordered={false} className="info-card">
            <UserOutlined className="icon" />
            <p><Text strong>First Name:</Text> {request.firstName}</p>
            <p><Text strong>Last Name:</Text> {request.lastName}</p>
            <p><Text strong>Email:</Text> {request.email}</p>
            <p><Text strong>Phone:</Text> {request.phone}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default RequestDetail;
