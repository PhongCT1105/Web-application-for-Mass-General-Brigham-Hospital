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
import { AnimationSpec } from "chart.js/auto";
import { lineRequestData } from "./GraphInterface/lineRequestData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function LineGraph({ props }: { props: lineRequestData[] }) {
  const lineChartData = {
    labels: props.map((map) => map.month),
    datasets: [
      {
        label: "Users",
        data: props.map((map) => map.request),
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    animations: {
      tension: {
        duration: 2500,
        easing: "linear" as AnimationSpec<never>["easing"],
        from: 1,
        to: 0,
        loop: false,
      },
    },
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    elements: {
      line: {
        tension: 0.5,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Total users by month",
      },
    },
  };
  return (
    <>
      <Line options={options} data={lineChartData} />
    </>
  );
}

export default LineGraph;
