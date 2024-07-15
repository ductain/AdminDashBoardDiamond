import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography, Spin, Button } from "antd";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { fetchUserData, processUserData } from '../data/eChart';
import '../css/EChart.css';

const { Title, Paragraph } = Typography;

function EChart() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ series: [], categories: [], years: [] });
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userData.length > 0) {
      const processedData = processUserData(userData);
      setChartData(processedData);
      const thisYear = new Date().getFullYear();
      if (processedData.years.includes(thisYear)) {
        setCurrentYear(thisYear);
      } else {
        setCurrentYear(processedData.years[0]);
      }
    }
  }, [userData]);

  const updateChartDataForYear = (year) => {
    const filteredData = userData.filter(user => new Date(user.createdAt).getFullYear() === year);
    const processedData = processUserData(filteredData);
    setChartData(processedData);
    setCurrentYear(year);
  };

  const handlePrevYear = () => {
    const currentIndex = chartData.years.indexOf(currentYear);
    if (currentIndex > 0) {
      const prevYear = chartData.years[currentIndex - 1];
      updateChartDataForYear(prevYear);
    }
  };

  const handleNextYear = () => {
    const currentIndex = chartData.years.indexOf(currentYear);
    if (currentIndex < chartData.years.length - 1) {
      const nextYear = chartData.years[currentIndex + 1];
      updateChartDataForYear(nextYear);
    }
  };

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: '#fff'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Number of Users',
        style: {
          color: '#fff'
        }
      },
      labels: {
        style: {
          colors: '#fff'
        },
        formatter: function (val) {
          return Math.floor(val);
        }
      },
      min: 0,
      forceNiceScale: true
    },
    fill: {
      opacity: 1,
      colors: ['#7CB9E8', '#ADD8E6'] 
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " users";
        }
      }
    },
    grid: {
      borderColor: '#90A4AE',
      strokeDashArray: 3
    }
  };

  return (
    <>
      {loading ? (
        <div className="loading"><Spin size="large" /></div>
      ) : (
        <>
          <div id="chart" className="chart-container full-width">
            <Title level={5} className="chart-title">User Registrations by Month</Title>
            <div className="year-navigation">
              <Button
                icon={<LeftOutlined />}
                onClick={handlePrevYear}
                disabled={chartData.years.indexOf(currentYear) === 0}
                className="year-nav-button"
              />
              <Paragraph className="year-info">{currentYear}</Paragraph>
              <Button
                icon={<RightOutlined />}
                onClick={handleNextYear}
                disabled={chartData.years.indexOf(currentYear) === chartData.years.length - 1}
                className="year-nav-button"
              />
            </div>
            <ReactApexChart
              className="bar-chart"
              options={chartOptions}
              series={chartData.series}
              type="bar"
              height={350}
              width={"100%"}
            />
          </div>
        </>
      )}
    </>
  );
}

export default EChart;
