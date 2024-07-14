import { Card, Col, Radio, Row, Spin, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

import "../../css/Billing.css";

function Billing() {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceFilter, setServiceFilter] = useState("All");

  useEffect(() => {
    const getAllRequests = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://dvs-be-sooty.vercel.app/api/bill",
          { withCredentials: true }
        );
        console.log(res.data.data);
        setResults(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const getAllServices = async () => {
      try {
        const res = await axios.get(
          "https://dvs-be-sooty.vercel.app/api/services",
          { withCredentials: true }
        );
        setServices(res.data.services);
      } catch (error) {
        console.error(error);
      }
    };
    getAllServices();
    getAllRequests();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!results.length) {
    return <div>No requests found</div>;
  }

  const handleServiceTypeChange = (e) => {
    setServiceFilter(e.target.value);
  };

  const filteredRequests = results.filter((request) => {
    if (serviceFilter !== "All" && request.serviceName !== serviceFilter) {
      return false;
    }
    return true;
  });

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Payment Amount",
      dataIndex: "paymentAmount",
      key: "paymentAmount",
      render: (text) => `${text}$`,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => (
        <Tag color={status === "Paid" ? "green" : "gold"}>{status}</Tag>
      ),
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (text) => formatDate(text),
    },
  ];

  // const today = formatDate(new Date());
  // if (loading) {
  //   return <MySpin />
  // }

  return (

    <>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Card
            className="billing-card"
            bordered={false}

            title={
              <Row justify="space-between" align="middle">
                <Col>
                  <h2 className="font-semibold m-0">Billing Information</h2>
                </Col>
                <Col>
                  <div style={{ margin: "10px 0" }}>
                    <Radio.Group
                      onChange={handleServiceTypeChange}
                      defaultValue="All"
                    >
                      <Radio.Button value="All">All</Radio.Button>
                      {services.map(service => (
                        <Radio.Button key={service.serviceId} value={service.serviceName}>
                          {service.serviceName}
                        </Radio.Button>
                      ))}
                    </Radio.Group>
                  </div>
                </Col>
              </Row>
            }
          >
            <Table
              columns={columns}
              dataSource={filteredRequests}
              rowKey={(record) => record.id || record.email}
              pagination={{ pageSize: 10 }}
            />
            {/* <Row gutter={[24, 24]}>

            title={<h5 className="billing-card-title">Billing Information</h5>}
          >
            <Row gutter={[16, 16]}>

              {filteredRequests.map((result, index) => (
                <Col xs={24} md={12} lg={8} key={index}>
                  <Card className="billing-info-card" bordered={false}>
                    <div className="billing-info-content">
                      <h3 className="billing-info-title">Name: {result.firstName} {result.lastName}</h3>
                      <p className="billing-info-text">Email: {result.email}</p>
                      <p className="billing-info-text">Phone: {result.phone}</p>
                      <p className="billing-info-text">Service: {result.serviceName}</p>
                      <p className="billing-info-text">Payment Amount: ${result.paymentAmount}</p>
                      <p className="billing-info-text">Payment Status: {result.paymentStatus}</p>
                      <p className="billing-info-text">Payment Date: {formatDate(result.paymentDate)}</p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row> */}
          </Card>
        </Col>


        {/* <Col span={24} md={8} className="mb-24">

          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="transactions-card"
            title={<h5 className="billing-card-title">Your Transactions</h5>}
          >
            <List
              header={<p className="transactions-header">{today}</p>}
              className="transactions-list"
              itemLayout="horizontal"
              dataSource={filteredRequests.filter(request => request.paymentStatus === "Paid")}
              renderItem={(item) => (
                <List.Item className="transaction-item">
                  <List.Item.Meta
                    avatar={
                      <Avatar size="small" className="transaction-avatar">
                        {item.serviceName.charAt(0)}
                      </Avatar>
                    }
                    title={item.serviceName}
                    description={`Price: ${item.paymentAmount}`}
                  />
                  <div className="amount">
                    <span className="amount-value">${item.paymentAmount}</span>
                  </div>
                </List.Item>
              )}
            />
            <List
              header={<p className="transactions-header">{filteredRequests.length > 0 ? formatDate(filteredRequests[0].paymentDate) : 'N/A'}</p>}
              className="transactions-list"
              itemLayout="horizontal"
              dataSource={filteredRequests.filter(request => request.paymentStatus === "Pending")}
              renderItem={(item) => (
                <List.Item className="transaction-item">
                  <List.Item.Meta
                    avatar={
                      <Avatar size="small" className="transaction-avatar">
                        {item.serviceName.charAt(0)}
                      </Avatar>
                    }
                    title={item.serviceName}
                    description={`Price: ${item.paymentAmount}`}
                  />
                  <div className="amount">
                    <span className="amount-value">${item.paymentAmount}</span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col> */}
      </Row>
    </>
  );
}

export default Billing;
