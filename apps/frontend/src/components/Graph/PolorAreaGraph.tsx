import { PolarArea } from "react-chartjs-2";
import { AnimationSpec } from "chart.js/auto";
import { data } from "@/data/chartValue/polarAreaChartData.ts";

const PolarAreaChart = () => {
  const options = {
    animation: {
      easing: "easeInBounce" as AnimationSpec<never>["easing"], // Corrected easing value
      loop: true,
      duration: 3000,
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

  return <PolarArea data={data} options={options} />;
};

export default PolarAreaChart;
