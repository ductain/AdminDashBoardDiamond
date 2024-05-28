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
      setCurrentYear(processedData.years[0]); // Set the initial year
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
      updateChartDataForYear(chartData.years[currentIndex - 1]);
    }
  };

  const handleNextYear = () => {
    const currentIndex = chartData.years.indexOf(currentYear);
    if (currentIndex < chartData.years.length - 1) {
      updateChartDataForYear(chartData.years[currentIndex + 1]);
    }
  };

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: chartData.categories,
    },
    yaxis: {
      title: {
        text: 'Number of Users'
      },
      min: 0,
      max: chartData.series.length > 0 ? Math.ceil(Math.max(...chartData.series[0].data)) + 1 : 10,
      tickAmount: chartData.series.length > 0 ? Math.ceil(Math.max(...chartData.series[0].data)) + 1 : 10,
      forceNiceScale: true,
      labels: {
        formatter: function (val) {
          return Math.floor(val);
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " users";
        }
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="loading"><Spin size="large" /></div>
      ) : (
        <>
          <div id="chart">
            <Title level={5}>User Registrations by Month</Title>
            <div className="year-navigation">
              <Button
                icon={<LeftOutlined />}
                onClick={handlePrevYear}
                disabled={chartData.years.indexOf(currentYear) === 0}
              />
              <Paragraph className="year-info">{currentYear}</Paragraph>
              <Button
                icon={<RightOutlined />}
                onClick={handleNextYear}
                disabled={chartData.years.indexOf(currentYear) === chartData.years.length - 1}
              />
            </div>
            <ReactApexChart
              className="bar-chart"
              options={chartOptions}
              series={chartData.series.filter(s => s.name === currentYear)}
              type="bar"
              height={350}
            />
          </div>
        </>
      )}
    </>
  );
}

export default EChart;
