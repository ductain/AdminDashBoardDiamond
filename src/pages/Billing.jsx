import { Avatar, Card, Col, Table, Radio, Row, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

import MySpin from "../components/MySpin";
import "../css/Billing.css";

function Billing() {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
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
      render: (text) => `$${text}`,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
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
            className="header-solid h-full billing-header"
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
                      <Radio.Button value="Advanced Valuation">
                        Advanced Valuation
                      </Radio.Button>
                      <Radio.Button value="Basic Valuation">
                        Basic Valuation
                      </Radio.Button>
                      <Radio.Button value="Diamond Inspection">
                        Diamond Inspection
                      </Radio.Button>
                      <Radio.Button value="Lower valuation">
                        Lower Valuation
                        </Radio.Button>
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
              pagination={false}
            />
            {/* <Row gutter={[24, 24]}>
              {filteredRequests.map((result, index) => (
                <Col span={24} key={index}>
                  <Card className="billing-info-card" bordered={false}>
                    <div className="billing-info-content">
                      <h3>Tên: {result.firstName} {result.lastName}</h3>
                      <p>Email Address: {result.email}</p>
                      <p>Phone: {result.phone}</p>
                      <p>Service Name: {result.serviceName}</p>
                      <p>Payment Amount: ${result.paymentAmount}</p>
                      <p>Payment Status: {result.paymentStatus}</p>
                      <p>Payment Date: {formatDate(result.paymentDate)}</p>
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
            className="header-solid h-full ant-list-yes"
            title={<h6 className="font-semibold m-0">Your Transactions</h6>}
          >
            <List
              header={<p className="card-header-date">
                <span>{today}</span>
              </p>}
              className="transactions-list ant-newest"
              itemLayout="horizontal"
              dataSource={filteredRequests.filter(request => request.paymentStatus === "Paid")}
              renderItem={(item) => (
                <List.Item>
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
              className="yestday transactions-list"
              header={<p className="card-header-date">
                <span>{filteredRequests.length > 0 ? formatDate(filteredRequests[0].paymentDate) : 'N/A'}</span>
              </p>}
              itemLayout="horizontal"
              dataSource={filteredRequests.filter(request => request.paymentStatus === "Pending")}
              renderItem={(item) => (
                <List.Item>
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
