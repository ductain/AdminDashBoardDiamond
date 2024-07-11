import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import MySpin from './MySpin';

const ConsultingStatistic = () => {
    const [loading, setLoading] = useState(false);
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
                    formatter: function (val) {
                        return val;
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Count'
                },
                labels: {
                    formatter: function (val) {
                        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                }
            },
            legend: {
                position: 'top'
            },
            colors: ['#1383ab', '#c52125']
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
                setLoading(true);
                const response = await axios.get('https://dvs-be-sooty.vercel.app/api/consultingStaff-static');
                const staffData = response.data.staff;
                setLoading(false);
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
    if (loading) {
        return <MySpin />
    }
    return (
        <div>
            <h2>Consulting Staff Requests and Completions</h2>
            {data.options && data.series ? (
                <Chart options={data.options} series={data.series} type="bar" height={400} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
export default ConsultingStatistic;
