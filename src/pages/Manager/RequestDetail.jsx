import { ArrowLeftOutlined, InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Image, Row, Space, Spin, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/RequestDetail.css";

const { Title, Text } = Typography;

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRequestDetail = async () => {
      try {
        const res = await axios.get(`https://dvs-be-sooty.vercel.app/api/requests/${id}`, { withCredentials: true });
        setRequest(res.data.request);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getRequestDetail();
  }, [id]);


  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="loading"><Spin size="large" /></div>;
  }

  if (!request) {
    return <div>No request found</div>;
  }


  return (
    <div className="request-detail-container">
      <Title level={1} className="page-title">
      Requirements Details
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          style={{ width: '100px', height: '50px', position: 'absolute', top: 16, right: 16 }}
        />
      </Title>
      <Row gutter={16}>
        <Col span={10}>
          <Card title={<span style={{ color: 'black' }}>Order Information</span>} bordered={false} className="info-card">
            <div className="header-container">
              <p className="info-text"><Text strong>Create Date:</Text> {new Date(request.createdDate).toLocaleDateString("en-GB")}</p>
              <div className="icon-request">
                <InfoCircleOutlined className="icon" />
              </div>
            </div>
            <p className="info-text"><Text strong>Update Date:</Text> {new Date(request.updatedDate).toLocaleDateString("en-GB")}</p>
            <p className="info-text"><Text strong>Note:</Text> {request.note}</p>
            <p className="info-text"><Text strong>Service Name:</Text> {request.serviceName}</p>
            <p className="info-text"><Text strong>Process Status:</Text> {request.processStatus}</p>
          </Card>


          <Card title={<span style={{ color: 'black' }}>Owner Diamond Information</span>} bordered={false} className="info-card">  
            <div className="icon-customer">
              <UserOutlined className="icon" />
            </div>
            <p><Text strong>First name:</Text> {request.firstName}</p>
            <p><Text strong>Last name:</Text> {request.lastName}</p>
            <p><Text strong>Email:</Text> {request.email}</p>
            <p><Text strong>Phone number:</Text> {request.phone}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title={<span style={{ color: 'black' }}>Diamond Information</span>} bordered={false} className="info-card">
            <p><Text strong>Carat weight:</Text> {request.caratWeight}</p>
            <p><Text strong>Clarity:</Text> {request.clarity}</p>
            <p><Text strong>Color:</Text> {request.color}</p>
            <p><Text strong>Cut:</Text> {request.cut}</p>
            <p><Text strong>Diamond origin:</Text> {request.diamondOrigin}</p>
            <p><Text strong>Fluorescence:</Text> {request.fluorescence}</p>
            <p><Text strong>Size:</Text> {request.measurements}</p>
            <p><Text strong>Polish:</Text> {request.polish}</p>
            <p><Text strong>Proportions:</Text> {request.proportions}</p>
            <p><Text strong>Shape:</Text> {request.shape}</p>
            <p><Text strong>Symmetry:</Text> {request.symmetry}</p>
          </Card>
        </Col>
        <Col span={6} className="diamond-card-container">
          <Card title={<span style={{ color: 'black' }}>Diamond Image</span>} bordered={false} className="info-card">
            <Image.PreviewGroup>
              <Space size={12}>
                <Image
                  width={200}
                  src={request.requestImage}
                  placeholder={
                    <Image
                      preview={false}
                      src={request.requestImage}
                      width={200}
                    />
                  }
                />
              </Space>
            </Image.PreviewGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default RequestDetail;
