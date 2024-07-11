import { ReconciliationOutlined, SendOutlined, UserOutlined, WalletOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Echart from "../components/EChart";
import LineChart from "../components/LineChart";
import MySpin from "../components/MySpin";
import ConsultingStatistic from "../components/consultingStatitic";
import ValuationStatistic from "../components/valuationStatitic";

function DashBoard() {
  const { Title } = Typography;
  const [loading, setLoading] = useState(false);
  const [countUser, setCountUser] = useState(0);
  const [countDiamond, setCountDiamond] = useState(0);
  const [countRequest, setCountRequest] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    setLoading(true)
    const getTotalDiamond = async () => {
      await axios
        .get("https://dvs-be-sooty.vercel.app/api/countDiamond", { withCredentials: true })
        .then((res) => {
          setCountDiamond(res.data.count);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });
    };
    getTotalDiamond();
  }, []);

  useEffect(() => {
    setLoading(true)
    const getTotalUser = async () => {
      await axios
        .get("https://dvs-be-sooty.vercel.app/api/countUser", { withCredentials: true })
        .then((res) => {
          setCountUser(res.data.count);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });
    };
    getTotalUser();
  }, []);

  useEffect(() => {
    setLoading(true)
    const getTotalRequest = async () => {
      await axios
        .get("https://dvs-be-sooty.vercel.app/api/countRequest", { withCredentials: true })
        .then((res) => {
          setCountRequest(res.data.count);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });
    };
    getTotalRequest();
  }, []);
  useEffect(() => {
    setLoading(true)
    const getProfit = async () => {
      await axios
        .get("https://dvs-be-sooty.vercel.app/api/profit", { withCredentials: true })
        .then((res) => {
          setProfit(res.data.profit);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
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
      title: `$${(profit).toLocaleString('en-US')}`,
      icon: <WalletOutlined style={{ fontSize: '32px' }} />,
    },
  ];


  if (loading) {
    return <MySpin />
  }

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

        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <ConsultingStatistic />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <ValuationStatistic />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DashBoard;
