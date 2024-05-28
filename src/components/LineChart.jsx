import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography, Spin } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { fetchRequestsAndResultsData, processApiData } from '../data/lineChart';
import '../css/LineChart.css';

const { Title, Paragraph } = Typography;

function LineChart() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ series: [], categories: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { requests, results } = await fetchRequestsAndResultsData();

        const requestsData = processApiData(requests, 'createdDate');
        const resultsData = processApiData(results, 'dateValued');

        const allKeys = Object.keys({ ...requestsData, ...resultsData }).sort((a, b) => new Date(a) - new Date(b));
        const categories = allKeys.map(cat => new Date(cat).toLocaleString('en-US', { month: 'short', year: 'numeric' }));
        const requestsSeries = allKeys.map(key => requestsData[key] || 0);
        const resultsSeries = allKeys.map(key => resultsData[key] || 0);

        setChartData({
          series: [
            { name: 'Requests', data: requestsSeries },
            { name: 'Results', data: resultsSeries },
          ],
          categories
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      type: 'line',
      height: 350
    },
    stroke: {
      curve: 'smooth'
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: chartData.categories,
      title: {
        text: 'Month'
      }
    },
    yaxis: {
      title: {
        text: 'Count'
      },
      min: 0,
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
          return val + " counts";
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
          <div className="linechart">
            <div>
              <Title level={5}>Requests and Results</Title>
              <Paragraph className="lastweek">
                than last week <span className="bnb2">+30%</span>
              </Paragraph>
            </div>
            <div className="sales">
              <ul>
                <li>{<MinusOutlined />} Requests</li>
                <li>{<MinusOutlined />} Results</li>
              </ul>
            </div>
          </div>

          <ReactApexChart
            className="full-width"
            options={chartOptions}
            series={chartData.series}
            type="line"
            height={350}
            width={"100%"}
          />
        </>
      )}
    </>
  );
}

export default LineChart;
