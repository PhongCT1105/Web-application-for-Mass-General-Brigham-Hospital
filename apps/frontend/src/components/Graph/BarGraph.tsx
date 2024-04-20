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
import { barChartData } from "@/data/chartValue/barChartData.ts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function BarGraph() {
  const options = {
    type: "bar" as ChartType,
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    animation: {
      easing: "easeOutCubic" as AnimationSpec<never>["easing"], // Corrected easing value
      loop: true,
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
