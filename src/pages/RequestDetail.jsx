import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Spin, Typography, Button, Modal, Select, message, Image, Space } from "antd";
import { UserOutlined, InfoCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import "../css/RequestDetail.css";

const { Title, Text } = Typography;
const { Option } = Select;

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processId, setProcessId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getRequestDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/requests/${id}`, { withCredentials: true });
      setRequest(res.data.request[0]);
      setProcessId(res.data.request[0].processId);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequestDetail();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const valuation = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/changeProcess/${id}`,
        {
          processId: 5,
        },
        { withCredentials: true }
      );
    } catch (error) {
      message.error("Cập nhật trạng thái xử lý thất bại");
    }
    navigate(`/valuation/${request.RequestID}`);
  };
  const handleOk = async () => {
    try {
      await axios.put(`http://localhost:8080/api/changeProcess/${id}`, {
        processId
      }, { withCredentials: true });
      message.success("Trạng thái xử lý đã được cập nhật thành công");
      setIsModalVisible(false);
      getRequestDetail();
    } catch (error) {
      message.error("Cập nhật trạng thái xử lý thất bại");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="loading"><Spin size="large" /></div>;
  }

  if (!request) {
    return <div>No request found</div>;
  }

  const processStatusMap = {
    1: "Pending",
    2: "Called",
    3: "Received",
    4: "Start Valuated",
    5: "Valuated",
    6: "Completed",
    9: "Losted",
    10: "Locked"
  };

  return (
    <div className="request-detail-container">
      <Title level={1} className="page-title">
        Chi Tiết Yêu Cầu Định Giá
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
            <Button type="primary" onClick={showModal}>Chỉnh trạng thái xử lý</Button>
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
      <Button
        style={{ width: '200px', height: '50px', position: 'absolute', bottom: 0, right: 16 }}
        type="primary" onClick={valuation}
      > Bắt đầu định giá
      </Button>
      <Modal title="Chỉnh trạng thái xử lý" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Select
          value={processId}
          name="processId"
          onChange={(value) => setProcessId(value)}
          style={{ width: "100%" }}
        >
          {Object.entries(processStatusMap).map(([key, value]) => (
            <Option key={key} value={key}>{value}</Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
}

export default RequestDetail;
