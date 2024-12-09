import axios from "axios";

// Server URL
const url = "http://localhost:8080/performance";

// Fetch the data with axios and pass the user's choices via URL.
const getPerformanceData = async (timePeriod, period, ipAddress) => {
  const { data } = await axios.get(
    `${url}?timePeriod=${timePeriod}&period=${period}&ipAddress=${ipAddress}`
  );
  return data;
};

export { getPerformanceData };
