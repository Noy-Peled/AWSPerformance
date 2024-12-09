import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components, for compatibility with react.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart_Component(props) {
  // State to hold the configuration of the chart.
  const [chartConfig, setChartConfig] = useState({
    data: {
      labels: "",
      datasets: [
        {
          label: "Metrics Data",
          data: "",
          borderColor: "red",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "hours" } },
        y: { title: { display: true, text: "percentage" } },
      },
    },
  });

  // Effect hook to update only xValues and yValues of the chart config when the props change.
  useEffect(() => {
    setChartConfig((prevConfig) => ({
      ...prevConfig,
      data: {
        ...prevConfig.data,
        labels: props.data.xValues,
        datasets: [
          {
            ...prevConfig.data.datasets[0],
            data: props.data.yValues,
          },
        ],
      },
    }));
  }, [props]);

  // Return the Line chart with the updated data and options.
  return <Line data={chartConfig.data} options={chartConfig.options} />;
}

export default Chart_Component;
