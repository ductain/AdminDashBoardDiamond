import { Card, Row, Col } from "antd";
import { UserOutlined, SketchOutlined, SolutionOutlined, TransactionOutlined, PropertySafetyOutlined } from "@ant-design/icons";
import React from "react";
import EChart from "../components/EChart";
import LineChart from "../components/LineChart";

const DashBoard = () => {
  return (
    <>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Card style={{width: '19%', border: '1px solid gray', height: '8.5rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2 style={{fontSize: '13px'}}>Total of accounts</h2>
          <UserOutlined
            style={{ fontSize: "25px", borderRadius: '0.25rem', padding: '0.25rem', color: '#3b82f6', backgroundColor: '#bfdbfe' }}
          />
        </div>
        <p style={{fontWeight: 'bold'}}>
          10
        </p>
      </Card>
      <Card style={{width: '19%', border: '1px solid gray', height: '8.5rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2 style={{fontSize: '13px'}}>Total of diamonds</h2>
          <SketchOutlined
            style={{ fontSize: "25px", borderRadius: '0.25rem', padding: '0.25rem', color: '#3b82f6', backgroundColor: '#bfdbfe' }}
          />
        </div>
        <p style={{fontWeight: 'bold'}}>
          10
        </p>
      </Card>
      <Card style={{width: '19%', border: '1px solid gray', height: '8.5rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2 style={{fontSize: '13px'}}>Total of requests</h2>
          <SolutionOutlined
            style={{ fontSize: "25px", borderRadius: '0.25rem', padding: '0.25rem', color: '#3b82f6', backgroundColor: '#bfdbfe' }}
          />
        </div>
        <p style={{fontWeight: 'bold'}}>
          10
        </p>
      </Card>
      <Card style={{width: '19%', border: '1px solid gray', height: '8.5rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2 style={{fontSize: '13px'}}>Total of payments</h2>
          <TransactionOutlined
            style={{ fontSize: "25px", borderRadius: '0.25rem', padding: '0.25rem', color: '#3b82f6', backgroundColor: '#bfdbfe' }}
          />
        </div>
        <p style={{fontWeight: 'bold'}}>
          10
        </p>
      </Card>
      <Card style={{width: '19%', border: '1px solid gray', height: '8.5rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2 style={{fontSize: '13px'}}>Profit</h2>
          <PropertySafetyOutlined
            style={{ fontSize: "25px", borderRadius: '0.25rem', padding: '0.25rem', color: '#3b82f6', backgroundColor: '#bfdbfe' }}
          />
        </div>
        <p style={{fontWeight: 'bold'}}>
          2.000.000 đ
        </p>
      </Card>
    </div>
    <Row gutter={[24, 0]} style={{marginTop: 20}}>
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
