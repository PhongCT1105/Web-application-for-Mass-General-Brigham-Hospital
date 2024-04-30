import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  ChartType,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { radarRequestData } from "@/components/Graph/GraphInterface/radarRequestData.tsx";

ChartJS.register(LineElement, PointElement, Tooltip, Legend, RadialLinearScale);

interface Props {
  props: radarRequestData[];
}

function RadarChart({ props }: Props) {
  // Define a mapping object for label abbreviations
  const labelMappings: Record<string, string> = {
    F: "Flower Request",
    ME: "Medication Request",
    T: "Patient Transport Request",
    SA: "Sanitation Request",
    SE: "Security Request",
    MA: "Maintenance Request",
  };

  // Map the labels from data.service to the corresponding abbreviations
  const labels: string[] = props.map((data) => labelMappings[data.service]);

  const data = {
    labels: labels, // Provide labels directly here
    datasets: [
      {
        label: "Total Service Request Used", // Use label instead of labels
        data: props.map((data) => data.total),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };
  const options = {
    type: "radar" as ChartType, // Set chart type to "radar"
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    plugins: {
      title: {
        display: true,
        text: "Radar Chart of total service request used", // Update chart title
      },
    },
  };

  return (
    <>
      <Radar data={data} options={options} />
    </>
  );
}

export default RadarChart;
