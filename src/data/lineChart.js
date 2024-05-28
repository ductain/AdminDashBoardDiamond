import axios from "axios";

export const fetchRequestsAndResultsData = async () => {
  try {
    const [requestsRes, resultsRes] = await Promise.all([
      axios.get('http://localhost:8080/api/requests', { withCredentials: true }),
      axios.get('http://localhost:8080/api/results', { withCredentials: true }),
    ]);

    return {
      requests: requestsRes.data.requests,
      results: resultsRes.data.results
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const processApiData = (data, dateField) => {
  const monthlyCounts = {};

  data.forEach(item => {
    const date = new Date(item[dateField]);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!monthlyCounts[monthYear]) {
      monthlyCounts[monthYear] = 0;
    }
    monthlyCounts[monthYear]++;
  });

  return monthlyCounts;
};
