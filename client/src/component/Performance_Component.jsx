import React, { useState } from "react";
import Chart_Component from "./Chart_Component";
import { getPerformanceData } from "../service/PerformanceService";

function Performance_Component() {
  // States for the user's inputs.
  const [timePeriod, setTimePeriod] = useState("");
  const [period, setPeriod] = useState(0);
  const [ipAddress, setIpAddress] = useState("");

  // State for the data we receive from the server.
  const [data, setData] = useState({});

  // Fetch the data on clicking the button.
  const fetchData = async () => {
    // Check if period is valid, if not - alert the user.
    if (!(period % 60 === 0)) {
      return alert("Period must be a multiple of 60");
    }

    // Send the data to server and check if data is valid, if not - alert the user.
    const resp = await getPerformanceData(timePeriod, period, ipAddress);
    return resp.sucsses ? setData(resp.data) : alert(resp.msg);
  };

  // Return div with inputs, update states with input data, and pass server data to the chart component.
  return (
    <div>
      <h2>Aws Instance CPU Usage:</h2>
      <div>
        <span>Time Period: </span>
        <select defaultValue="" onChange={(e) => setTimePeriod(e.target.value)}>
          <option disabled value="">
            Choose time period
          </option>
          <option value="24h">Last Day</option>
          <option value="12h">Last 12 hours</option>
          <option value="6h">Last 6 hours</option>
          <option value="60m">Last hour</option>
          <option value="30m">Last 30 minutes</option>
          <option value="10m">Last 10 minutes</option>
        </select>
        <br />
        <span>Period: </span>
        <input type="number" onChange={(e) => setPeriod(e.target.value)} />
        <br />
        <span>IP Address: </span>
        <input type="text" onChange={(e) => setIpAddress(e.target.value)} />
        <br />
        <button onClick={fetchData}>Load</button>
      </div>
      <Chart_Component data={data} />
    </div>
  );
}

export default Performance_Component;
