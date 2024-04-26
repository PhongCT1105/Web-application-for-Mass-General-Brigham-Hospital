// import "../styles/example.route.css";
// import "../styles/globals.css";
import LineGraph from "@/components/Graph/LineGraph.tsx";
import BarGraph from "@/components/Graph/BarGraph.tsx";
import PieGraph from "@/components/Graph/PieGraph.tsx";
import PolarAreaChart from "@/components/Graph/PolorAreaGraph.tsx";
import { sanitationLineData } from "@/data/sanitationData/lineChartData";
import { sanitationChartData } from "@/data/sanitationData/barChartData";
import { sanitationPieData } from "@/data/sanitationData/pieChartData.ts";
import { sanitationPolarData } from "@/data/sanitationData/polarAreaChartData.ts";
import { useEffect, useState } from "react";
import axios from "axios";

interface sanitationData {
  severity: string;
  comments: string;
  name: string;
  description: string;
  location: string;
  time: string;
  typeOfIssue: string;
  reqId: number;
  status: string;
}
function SanitationInsight() {
  const [data, setData] = useState<sanitationData>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/insight/sanitation");
        const rawData = response.data;
        console.log(rawData);
        setData(rawData);
        console.log("Successfully fetched data from the API.");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <div className="m-3 grid gap-4 grid-cols-2 outline-double outline-3 outline-offset-2 rounded-lg">
        <div className="rounded-lg bg-gray-200">
          <LineGraph props={sanitationLineData} />
        </div>
        <div className="rounded-lg bg-gray-200">
          <BarGraph props={sanitationChartData} />
        </div>
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <PieGraph props={sanitationPieData} />
        </div>
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <PolarAreaChart props={sanitationPolarData} />
        </div>
      </div>
    </>
  );
}

export default SanitationInsight;
