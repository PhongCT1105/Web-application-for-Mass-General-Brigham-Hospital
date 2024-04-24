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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface requestData {
  request: string;
  total: number;
}
function BarGraph({ props }: { props: requestData[] }) {
  const barChartData = {
    labels: props.map((map) => map.request),
    datasets: [
      {
        label: "Total Used",
        data: props.map((map) => map.total),
        backgroundColor: [
          "rgba(255, 99, 13, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
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
        text: "Bar Chart of total service request used",
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
