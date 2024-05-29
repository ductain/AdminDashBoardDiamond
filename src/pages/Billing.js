import React from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Button,
  List,
  Descriptions,
  Avatar,
} from "antd";

import { PlusOutlined, ExclamationOutlined } from "@ant-design/icons";

function Billing() {
  const services = [
    {
      title: "Dịch vụ định giá thường",
      description: "Dịch vụ định giá cơ bản cho kim cương.",
      price: "$100",
    },
    {
      title: "Dịch vụ định giá chuyên sâu",
      description: "Dịch vụ định giá chuyên sâu cho kim cương.",
      price: "$300",
    },
  ];

  const invoices = [
    {
      title: "01 Tháng 3, 2023",
      description: "#MS-415646",
      amount: "$180",
    },
    {
      title: "12 Tháng 2, 2023",
      description: "#RV-126749",
      amount: "$250",
    },
    {
      title: "05 Tháng 4, 2022",
      description: "#FB-212562",
      amount: "$550",
    },
    {
      title: "25 Tháng 6, 2021",
      description: "#QW-103578",
      amount: "$400",
    },
    {
      title: "03 Tháng 3, 2021",
      description: "#AR-803481",
      amount: "$700",
    },
  ];

  const transactions = [
    {
      heading: <h6>MỚI NHẤT</h6>,
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "Dịch vụ định giá thường",
      description: "01 Tháng 3, 2023, lúc 12:30 PM",
      amount: "+ $100",
      textclass: "text-success",
      amountcolor: "text-success",
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "Dịch vụ định giá chuyên sâu",
      description: "12 Tháng 2, 2023, lúc 04:30 AM",
      amount: "+ $300",
      textclass: "text-success",
      amountcolor: "text-success",
    },
  ];

  const yesterdayTransactions = [
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "Dịch vụ định giá thường",
      description: "26 Tháng 2, 2023, lúc 12:30 AM",
      amount: "+ $100",
      textclass: "text-success",
      amountcolor: "text-success",
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "Dịch vụ định giá chuyên sâu",
      description: "26 Tháng 2, 2023, lúc 11:30 AM",
      amount: "+ $300",
      textclass: "text-success",
      amountcolor: "text-success",
    },
    {
      avatar: <ExclamationOutlined style={{ fontSize: 10 }} />,
      title: "Dịch vụ định giá đang chờ",
      description: "26 Tháng 2, 2023, lúc 04:00 AM",
      amount: "Pending",
      textclass: "text-warning",
      amountcolor: "text-warning",
    },
  ];

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={16}>
          <Row gutter={[24, 0]}>
            <Col xs={24} xl={12} className="mb-24">
              <Card
                title={<h6>Thông tin dịch vụ</h6>}
                bordered={false}
                className="card-service header-solid h-full"
              >
                <h5 className="card-number">Dịch vụ định giá kim cương</h5>
                <div className="card-footer">
                  <div className="mr-30">
                    <p>Loại dịch vụ</p>
                    <h6>Dịch vụ định giá thường và chuyên sâu</h6>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={12} xl={6} className="mb-24">
              <Card bordered={false} className="widget-2 h-full">
                <Statistic
                  title={
                    <>
                      <h6>Dịch vụ định giá thường</h6>
                      <p>Cơ bản</p>
                    </>
                  }
                  value={"$100"}
                  prefix={<PlusOutlined />}
                />
              </Card>
            </Col>
            <Col xs={12} xl={6} className="mb-24">
              <Card bordered={false} className="widget-2 h-full">
                <Statistic
                  title={
                    <>
                      <h6>Dịch vụ định giá chuyên sâu</h6>
                      <p>Chuyên sâu</p>
                    </>
                  }
                  value={"$300"}
                  prefix={<PlusOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[<h6 className="font-semibold m-0">Hóa đơn</h6>]}
            extra={[
              <Button type="primary">
                <span>XEM TẤT CẢ</span>
              </Button>,
            ]}
          >
            <List
              itemLayout="horizontal"
              className="invoice-list"
              dataSource={invoices}
              renderItem={(item) => (
                <List.Item
                  actions={[<Button type="link">PDF</Button>]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <div className="amount">{item.amount}</div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col span={24} md={16} className="mb-24">
          <Card
            className="header-solid h-full"
            bordered={false}
            title={[<h6 className="font-semibold m-0">Thông tin thanh toán</h6>]}
            bodyStyle={{ paddingTop: "0" }}
          >
            <Row gutter={[24, 24]}>
              {services.map((i, index) => (
                <Col span={24} key={index}>
                  <Card className="card-billing-info" bordered="false">
                    <div className="col-info">
                      <Descriptions title={i.title}>
                        <Descriptions.Item label="Mô tả" span={3}>
                          {i.description}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giá" span={3}>
                          {i.price}
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                    <div className="col-action">
                      <Button type="link" danger>
                        Xóa
                      </Button>
                      <Button type="link" className="darkbtn">
                        Sửa
                      </Button>
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
            title={<h6 className="font-semibold m-0">Giao dịch của bạn</h6>}
            extra={
              <p className="card-header-date">
                <span>23 - 30 Tháng 3, 2023</span>
              </p>
            }
          >
            <List
              header={<h6>MỚI NHẤT</h6>}
              className="transactions-list ant-newest"
              itemLayout="horizontal"
              dataSource={transactions}
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
              header={<h6>HÔM QUA</h6>}
              itemLayout="horizontal"
              dataSource={yesterdayTransactions}
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
