import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { pieChartData } from "@/data/chartValue/pieChartData.ts";
import { AnimationSpec } from "chart.js/auto";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieGraph() {
  const options = {
    animation: {
      easing: "easeInOutSine" as AnimationSpec<never>["easing"], // Corrected easing value
      loop: true,
      duration: 3000,
    },
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.3,
    plugins: {
      title: {
        display: true,
        text: "Pie Chart of proportion request used",
      },
    },
  };
  return (
    <>
      <Pie options={options} data={pieChartData} />
    </>
  );
}

export default PieGraph;
