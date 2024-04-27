import { PolarArea } from "react-chartjs-2";
import { AnimationSpec } from "chart.js/auto";
import { polarRequestDataPriority } from "./GraphInterface/polarRequestDataPriority";
const PolarAreaChart = ({ props }: { props: polarRequestDataPriority[] }) => {
  const polarAreaChartData = {
    labels: props.map((map) => map.priority),
    datasets: [
      {
        label: "My First Dataset",
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
      easing: "easeInBounce" as AnimationSpec<never>["easing"], // Corrected easing value
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
        text: "Doughnut Chart for all service requests done",
      },
    },
  };

  return <PolarArea data={polarAreaChartData} options={options} />;
};

export default PolarAreaChart;
