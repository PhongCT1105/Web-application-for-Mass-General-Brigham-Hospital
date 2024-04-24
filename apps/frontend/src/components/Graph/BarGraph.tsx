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
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function BarGraph() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/insight");
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData().then(() => console.log("Success"));
  }, []);

  console.log(data);

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
