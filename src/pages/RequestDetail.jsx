import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Spin, Typography, Button, Modal, Select, message } from "antd";
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

  useEffect(() => {
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
    getRequestDetail();
  }, [id]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      await axios.put(`http://localhost:8080/api/changeProcess/${id}`, {
        processId
      }, { withCredentials: true });
      setRequest(prev => ({ ...prev, processId }));
      message.success("Trạng thái xử lý đã được cập nhật thành công");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Cập nhật trạng thái xử lý thất bại");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) {
    return <div className="loading"><Spin size="large" /></div>;
  }

  if (!request) {
    return <div>No request found</div>;
  }

  const processStatusMap = {
    1: "Pending",
    2: "Approved",
    3: "Received",
    4: "Valuated",
    5: "Completed",
    6: "Locked",
    7: "Losted"
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
            <InfoCircleOutlined className="icon" />
            <p><Text strong>Ngày tạo:</Text> {new Date(request.createdDate).toLocaleDateString("en-GB")}</p>
            <p><Text strong>Ngày cập nhật:</Text> {new Date(request.updatedDate).toLocaleDateString("en-GB")}</p>
            <p><Text strong>Ghi chú:</Text> {request.note}</p>
            <p><Text strong>Trạng thái xử lý:</Text> {processStatusMap[request.processId]}</p>
            <Button type="primary" onClick={showModal}>Chỉnh trạng thái xử lý</Button>
          </Card>
          <Card title="Thông tin chủ kim cương" bordered={false} className="info-card">
            <UserOutlined className="icon" />
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
            <img src={request.requestImage} alt="Request" className="diamond-image" />
          </Card>
        </Col>
      </Row>

      <Modal title="Chỉnh trạng thái xử lý" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Select
          value={processId}
          onChange={setProcessId}
          style={{ width: "100%" }}
        >
          <Option value={1}>Pending</Option>
          <Option value={2}>Approved</Option>
          <Option value={3}>Received</Option>
          <Option value={4}>Valuated</Option>
          <Option value={5}>Completed</Option>
          <Option value={6}>Locked</Option>
          <Option value={7}>Losted</Option>
        </Select>
      </Modal>
    </div>
  );
}

export default RequestDetail;
