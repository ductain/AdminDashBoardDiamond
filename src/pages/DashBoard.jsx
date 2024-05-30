import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Typography } from "antd";
import { UserOutlined, SendOutlined, ReconciliationOutlined, WalletOutlined } from "@ant-design/icons";
import Echart from "../components/EChart";
import LineChart from "../components/LineChart";

function DashBoard() {
  const { Title } = Typography;
  const [countUser, setCountUser] = useState(0);
  const [countDiamond, setCountDiamond] = useState(0);
  const [countRequest, setCountRequest] = useState(0);
  const [profit, setProfit] = useState(0);

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
      await axios
        .get("http://localhost:8080/api/countRequest", { withCredentials: true })
        .then((res) => {
          setCountRequest(res.data.count);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getTotalRequest();
  }, []);
  useEffect(() => {
    const getProfit = async () => {
      await axios
        .get("http://localhost:8080/api/profit", { withCredentials: true })
        .then((res) => {
          setProfit(res.data.profit);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getProfit();
  }, []);
  const count = [
    {
      today: "Total Users",
      title: countUser.toString(),
      icon: <UserOutlined style={{ fontSize: '32px' }} />,
    },
    {
      today: "Total Diamonds",
      title: countDiamond.toString(),
      icon: <SendOutlined style={{ fontSize: '32px' }} />,
    },
    {
      today: "Total Requests",
      title: countRequest.toString(),
      icon: <ReconciliationOutlined style={{ fontSize: '32px' }} />,
    },
    {
      today: "Profit",
      title: profit.toString(),
      icon: <WalletOutlined style={{ fontSize: '32px' }} />,
    },
  ];

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[20, 20]} style={{ marginBottom: "10px" }}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox">
                <div className="number">
                  <Row align="middle" gutter={[20, 20]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title}
                      </Title>
                    </Col>
                    <Col>
                      <div
                        className="icon-box"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '50px',
                          height: '50px',
                          borderRadius: '8px',
                          backgroundColor: '#1890ff',
                          color: '#fff'
                        }}>
                        {c.icon}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DashBoard;
