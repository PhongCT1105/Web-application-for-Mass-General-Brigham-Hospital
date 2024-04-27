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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface requestData {
  months: string;
  user: number;
  staff: number;
}

function LineGraph({ props }: { props: requestData[] }) {
  const lineChartData = {
    labels: props.map((map) => map.months),
    datasets: [
      {
        label: "Users",
        data: props.map((map) => map.user),
        borderColor: "rgb(75, 192, 192)",
      },
      {
        label: "Staff",
        data: props.map((map) => map.staff),
        borderColor: "red",
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
        text: "Line Graph of total users",
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
