import axios from "axios";

export const fetchRequestsAndResultsData = async () => {
  try {
    const [requestsRes, resultsRes] = await Promise.all([
      axios.get('https://dvs-be-sooty.vercel.app/api/requests', { withCredentials: true }),
      axios.get('https://dvs-be-sooty.vercel.app/api/results', { withCredentials: true }),
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
