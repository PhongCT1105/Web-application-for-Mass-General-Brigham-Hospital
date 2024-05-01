import { PolarArea } from "react-chartjs-2";
import { AnimationSpec } from "chart.js/auto";
import { polarRequestDataSeverity } from "./GraphInterface/polarRequestDataSeverity";

const severityOrder = ["None", "Low", "Medium", "High", "Urgent"];

const PolarAreaChart = ({ props }: { props: polarRequestDataSeverity[] }) => {
  // Sort the severity labels according to the custom order
  const sortedSeverityLabels = severityOrder.filter((severity) =>
    props.some((data) => data.severity === severity),
  );

  const polarAreaChartData = {
    labels: sortedSeverityLabels,
    datasets: [
      {
        label: "Priority of Service Requests",
        data: props.map((map) => map.request),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };

  const options = {
    animation: {
      easing: "easeInBounce" as AnimationSpec<never>["easing"],
      loop: false,
      duration: 2500,
    },
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.3,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Priority of Service Requests",
      },
    },
  };

  return <PolarArea data={polarAreaChartData} options={options} />;
};

export default PolarAreaChart;
