import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import '../css/ConsultingStatistic.css';

const ConsultingStatistic = () => {
    const [data, setData] = useState({
        options: {
            chart: {
                stacked: false,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [],
                labels: {
                    style: {
                        colors: '#ffffff'
                    },
                    formatter: function (val) {
                        return val;
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Count',
                    style: {
                        color: '#ffffff'
                    }
                },
                labels: {
                    formatter: function (val) {
                        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    },
                    style: {
                        colors: '#ffffff'
                    }
                }
            },
            legend: {
                position: 'top',
                labels: {
                    colors: '#ffffff'
                }
            },
            colors: ['#00BFFF', '#FF6347'],
            tooltip: {
                theme: 'dark',
                style: {
                    fontSize: '14px',
                    fontFamily: undefined
                },
                onDatasetHover: {
                    highlightDataSeries: true,
                },
                marker: {
                    show: false,
                },
                y: {
                    formatter: function (val) {
                        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    },
                    title: {
                        formatter: (seriesName) => seriesName,
                    },
                },
            }
        },
        series: [
            {
                name: 'Total Requests',
                data: []
            },
            {
                name: 'Completed Requests',
                data: []
            }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dvs-be-sooty.vercel.app/api/consultingStaff-static', { withCredentials: true });
                const staffData = response.data.staff;

                // Format data for ApexCharts
                const labels = staffData.map(staff => staff.StaffName);
                const totalRequests = staffData.map(staff => staff.TotalRequests);
                const completedRequests = staffData.map(staff => staff.CompletedRequests);

                setData(prevData => ({
                    ...prevData,
                    options: {
                        ...prevData.options,
                        xaxis: {
                            ...prevData.options.xaxis,
                            categories: labels
                        }
                    },
                    series: [
                        { name: 'Total Requests', data: totalRequests },
                        { name: 'Completed Requests', data: completedRequests }
                    ]
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="consulting-statistic-container">
            <h2 className="chart-title">Consulting Staff Requests and Completions</h2>
            {data.options && data.series.length > 0 ? (
                <Chart options={data.options} series={data.series} type="bar" height={400} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ConsultingStatistic;
