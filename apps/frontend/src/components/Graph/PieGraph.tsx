import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { pieChartData } from "@/data/pieChartData.ts";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieGraph() {
  const options = {
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
