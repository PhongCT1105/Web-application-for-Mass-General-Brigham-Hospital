import { Bar } from "react-chartjs-2";
import ChartJS, { AnimationSpec } from "chart.js/auto";
import {
  ChartType,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { IntervalData } from "./IntervalData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function BarGraph({ props }: { props: IntervalData[] }) {
  const barChartData = {
    labels: props.map((map) => map.interval),
    datasets: [
      {
        label: "Interval",
        data: props.map((map) => map.request),
        backgroundColor: [
          "rgba(255, 99, 13, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(100, 150, 13, 0.2)",
          "rgba(150, 150, 150, 0.2)",
          "rgba(130, 50, 50, 0.2)",
          "rgba(30, 40, 192, 0.2)",
          "rgba(90, 200, 150, 0.2)",
          "rgba(200, 200, 150, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 13, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(100, 150, 13, 1)",
          "rgba(150, 150, 150, 1)",
          "rgba(130, 50, 50, 1)",
          "rgba(30, 40, 192, 1)",
          "rgba(90, 200, 150, 1)",
          "rgba(200, 200, 150, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    type: "bar" as ChartType,
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    animation: {
      easing: "easeOutCubic" as AnimationSpec<never>["easing"], // Corrected easing value
      loop: false,
      duration: 2500,
    },
    plugins: {
      title: {
        display: true,
        text: "The intervals of the money for each flower request",
      },
    },
  };
  return (
    <>
      <Bar options={options} data={barChartData} />
    </>
  );
}

export default BarGraph;
