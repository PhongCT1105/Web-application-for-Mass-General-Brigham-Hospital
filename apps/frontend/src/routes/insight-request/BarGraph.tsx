import { Bar } from "react-chartjs-2";
import {
  Chart,
  ChartType,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { barRequestData } from "@/components/Graph/GraphInterface/barRequestData.tsx";

// Register necessary chart elements
Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend);

function SideBySideBarGraph({
  data1,
  data2,
}: {
  data1: barRequestData[];
  data2: barRequestData[];
}) {
  // Extract labels and datasets for each dataset
  const labels = data1.map((data) => data.employeeName);
  const dataset1 = data1.map((data) => data.request);
  const dataset2 = data2.map((data) => data.request);

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dataset1,
        backgroundColor: "rgba(255, 99, 132, 0.5)", // Adjust colors as needed
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Dataset 2",
        data: dataset2,
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Adjust colors as needed
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    type: "bar" as ChartType,
    responsive: true,
    maintainAspectRatio: false, // Adjust as needed
    plugins: {
      title: {
        display: true,
        text: "Side-by-Side Bar Graph",
      },
    },
  };

  return <Bar data={barChartData} options={options} />;
}

export default SideBySideBarGraph;
