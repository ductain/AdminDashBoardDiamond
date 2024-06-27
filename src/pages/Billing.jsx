import React, { useEffect, useState } from "react";
import { Row, Col, Card, Radio, List, Avatar, Spin } from "antd";
import axios from "axios";

import "../css/Billing.css";

function Billing() {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [serviceType, setServiceType] = useState("All");

  useEffect(() => {
    const getAllRequests = async () => {
      await axios
        .get("https://dvs-be-sooty.vercel.app/api/results", { withCredentials: true })
        .then((res) => {
          setResults(res.data.results);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllRequests();
  }, []);

  if (loading) {
    return <div className="loading"><Spin size="large" /></div>;
  }

  if (!results) {
    return <div>No request found</div>;
  }

  const handleServiceTypeChange = (e) => {
    setServiceType(e.target.value);
  };

  const filteredResults = serviceType === "All" ? results : results.filter(result => result.companyName === serviceType);

  return (
    <>
      <div style={{ margin: " 10px 0 10px 0" }}>
        <Radio.Group onChange={handleServiceTypeChange} defaultValue="All">
          <Radio.Button value="All">All</Radio.Button>
          {results.map(result => (
            <Radio.Button key={result.companyName} value={result.companyName}>{result.companyName}</Radio.Button>
          ))}
        </Radio.Group>
      </div>
      <Row gutter={[12, 12]}>
        <Col xs={24} md={16} className="mb-24">
          <Card
            className="header-solid h-full billing-header"
            bordered={false}
            title={<h6 className="font-semibold m-0">Billing Information</h6>}
          >
            <Row gutter={[24, 24]}>
              {filteredResults.map((result, index) => (
                <Col span={24} key={index}>
                  <Card className="billing-info-card" bordered={false}>
                    <div className="billing-info-content">
                      <h3> Tên: {result.firstName} {result.lastName}</h3>
                      <p>Company Name: {result.companyName}</p>
                      <p>Email Address: {result.email}</p>
                      <p>Price diamond: {result.price}</p>
                      <p>Service price: {result.servicePrice}</p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="header-solid h-full  ant-list-yes"
            title={<h6 className="font-semibold m-0">Your Transactions</h6>}
            extra={
              <p className="card-header-date">
                <span>23 - 30 March 2021</span>
              </p>
            }
          >
            <List
              header={<h6>NEWEST</h6>}
              className="transactions-list ant-newest"
              itemLayout="horizontal"

              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar size="small" className={item.textclass}>
                        {item.avatar}
                      </Avatar>
                    }
                    title={item.title}
                    description={item.description}
                  />
                  <div className="amount">
                    <span className={item.amountcolor}>{item.amount}</span>
                  </div>
                </List.Item>
              )}
            />

            <List
              className="yestday transactions-list"
              header={<h6>YESTERDAY</h6>}
              itemLayout="horizontal"

              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar size="small" className={item.textclass}>
                        {item.avatar}
                      </Avatar>
                    }
                    title={item.title}
                    description={item.description}
                  />
                  <div className="amount">
                    <span className={item.amountcolor}>{item.amount}</span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Billing;
