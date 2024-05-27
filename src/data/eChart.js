import axios from "axios";

export const fetchUserData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/users');
    return response.data.users;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const processUserData = (data) => {
  const monthlyCounts = {};
  const years = new Set();

  data.forEach(user => {
    const date = new Date(user.createdAt);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const monthYear = `${month}-${year}`;

    if (!monthlyCounts[monthYear]) {
      monthlyCounts[monthYear] = 0;
    }
    monthlyCounts[monthYear]++;
    years.add(year);
  });

  const sortedYears = Array.from(years).sort();
  const series = sortedYears.map(year => {
    const yearData = [];
    for (let i = 0; i < 12; i++) {
      const month = new Date(2020, i).toLocaleString('en-US', { month: 'short' });
      const key = `${month}-${year}`;
      yearData.push(monthlyCounts[key] || 0);
    }
    return { name: year, data: yearData };
  });

  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return { series, categories, years: sortedYears };
};
