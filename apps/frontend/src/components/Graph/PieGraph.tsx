import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { barChartData } from "@/data/barChartData";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieGraph() {
  const options = {};
  return (
    <>
      <Bar options={options} data={barChartData} />
    </>
  );
}

export default PieGraph;
