import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { UserOutlined, SketchOutlined, SolutionOutlined, TransactionOutlined, PropertySafetyOutlined } from "@ant-design/icons";
import axios from "axios";
import EChart from "../components/EChart";
import LineChart from "../components/LineChart";

const DashBoard = () => {
  const [countUser, setCountUser] = useState(0);
  const [constDiamond, setCountDiamond] = useState(0);
  const [constRequest, setCountRequest] = useState(0);
  const [constPayment, setCountPayment] = useState(0);
  const [constProfit, setCountProfit] = useState(0);
  useEffect(() => {
    const getTotalDiamond = async () => {
      await axios
        .get("http://localhost:8080/api/countDiamond", { withCredentials: true })
        .then((res) => {
          setCountDiamond(res.data.count);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getTotalDiamond();
  }, []);
  useEffect(() => {
    const getTotalUser = async () => {
      await axios
        .get("http://localhost:8080/api/countUser", { withCredentials: true })
        .then((res) => {
          setCountUser(res.data.count);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getTotalUser();
  }, []);
  useEffect(() => {
    const getTotalRequest = async () => {
      await axios.get("http://localhost:8080/api/countRequest", { withCredentials: true })
        .then((res) => {
          setCountRequest(res.data.count);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getTotalRequest();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card style={{ width: '19%', border: '1px solid gray', height: '8.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '13px' }}>Total of accounts</h2>
            <UserOutlined
              style={{ fontSize: "25px", borderRadius: '0.25rem', padding: '0.25rem', color: '#3b82f6', backgroundColor: '#bfdbfe' }}
            />
          </div>
          <p style={{ fontWeight: 'bold' }}>
            {countUser}
          </p>
        </Card>
        <Card style={{ width: '19%', border: '1px solid gray', height: '8.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '13px' }}>Total of diamonds</h2>
            <SketchOutlined
              style={{ fontSize: "25px", borderRadius: '0.25rem', padding: '0.25rem', color: '#3b82f6', backgroundColor: '#bfdbfe' }}
            />
          </div>
          <p style={{ fontWeight: 'bold' }}>
            {constDiamond}
          </p>
        </Card>
        <Card style={{ width: '19%', border: '1px solid gray', height: '8.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '13px' }}>Total of requests</h2>
            <SolutionOutlined
              style={{ fontSize: "25px", borderRadius: '0.25rem', padding: '0.25rem', color: '#3b82f6', backgroundColor: '#bfdbfe' }}
            />
          </div>
          <p style={{ fontWeight: 'bold' }}>
            {constRequest}
          </p>
        </Card>
        <Card style={{ width: '19%', border: '1px solid gray', height: '8.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '13px' }}>Total of payments</h2>
            <TransactionOutlined
              style={{ fontSize: "25px", borderRadius: '0.25rem', padding: '0.25rem', color: '#3b82f6', backgroundColor: '#bfdbfe' }}
            />
          </div>
          <p style={{ fontWeight: 'bold' }}>
            10
          </p>
        </Card>
        <Card style={{ width: '19%', border: '1px solid gray', height: '8.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '13px' }}>Profit</h2>
            <PropertySafetyOutlined
              style={{ fontSize: "25px", borderRadius: '0.25rem', padding: '0.25rem', color: '#3b82f6', backgroundColor: '#bfdbfe' }}
            />
          </div>
          <p style={{ fontWeight: 'bold' }}>
            2.000.000 đ
          </p>
        </Card>
      </div>
      <Row gutter={[24, 0]} style={{ marginTop: 20 }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <EChart />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <LineChart />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashBoard;
