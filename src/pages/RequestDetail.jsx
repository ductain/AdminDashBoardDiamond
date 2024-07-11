import { ArrowLeftOutlined, InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Image, Row, Space, Spin, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/RequestDetail.css";

const { Title, Text } = Typography;

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);


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

  useEffect(() => {
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
        Chi Tiết Yêu Cầu
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          style={{ width: '100px', height: '50px', position: 'absolute', top: 16, right: 16 }}
        />
      </Title>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Thông tin đơn hàng" bordered={false} className="info-card">
            <div className="header-container">
              <p className="info-text"><Text strong>Ngày tạo:</Text> {new Date(request.createdDate).toLocaleDateString("en-GB")}</p>
              <div className="icon-request">
                <InfoCircleOutlined className="icon" />
              </div>
            </div>
            <p className="info-text"><Text strong>Ngày cập nhật:</Text> {new Date(request.updatedDate).toLocaleDateString("en-GB")}</p>
            <p className="info-text"><Text strong>Ghi chú:</Text> {request.note}</p>
            <p className="info-text"><Text strong>Loại dịch vụ:</Text> {request.serviceName}</p>
            <p className="info-text"><Text strong>Trạng thái xử lý:</Text> {request.processStatus}</p>
          </Card>


          <Card title="Thông tin chủ kim cương" bordered={false} className="info-card">
            <div className="icon-customer">
              <UserOutlined className="icon" />
            </div>
            <p><Text strong>Họ:</Text> {request.firstName}</p>
            <p><Text strong>Tên:</Text> {request.lastName}</p>
            <p><Text strong>Email:</Text> {request.email}</p>
            <p><Text strong>Số điện thoại:</Text> {request.phone}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Thông tin kim cương" bordered={false} className="info-card">
            <p><Text strong>Trọng lượng Carat:</Text> {request.caratWeight}</p>
            <p><Text strong>Độ trong:</Text> {request.clarity}</p>
            <p><Text strong>Màu sắc:</Text> {request.color}</p>
            <p><Text strong>Giác cắt:</Text> {request.cut}</p>
            <p><Text strong>Xuất xứ kim cương:</Text> {request.diamondOrigin}</p>
            <p><Text strong>Huỳnh quang:</Text> {request.fluorescence}</p>
            <p><Text strong>Kích thước:</Text> {request.measurements}</p>
            <p><Text strong>Đánh bóng:</Text> {request.polish}</p>
            <p><Text strong>Tỷ lệ:</Text> {request.proportions}</p>
            <p><Text strong>Hình dạng:</Text> {request.shape}</p>
            <p><Text strong>Độ đối xứng:</Text> {request.symmetry}</p>
          </Card>
        </Col>
        <Col span={8} className="diamond-card-container">
          <Card title="Ảnh kim cương" bordered={false} className="info-card">
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
