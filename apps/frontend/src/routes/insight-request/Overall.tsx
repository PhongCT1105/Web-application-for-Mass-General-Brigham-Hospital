// import "../styles/example.route.css";
// import "../styles/globals.css";
import LineGraph from "@/components/Graph/LineGraph.tsx";
import BarGraph from "@/components/Graph/BarGraph.tsx";
import PieGraph from "@/components/Graph/PieGraph.tsx";
import { overallChartData } from "@/data/overallData/barChartData.ts";
import { overallLineData } from "@/data/overallData/lineChartData.ts";
import PolarAreaChart from "@/components/Graph/PolorAreaGraph.tsx";
import { overallPolarData } from "@/data/overallData/polarAreaChartData.ts";
import { overallPieData } from "@/data/overallData/pieChartData.ts";
function OverallInsight() {
  return (
    <>
      <div className="m-3 grid gap-4 grid-cols-2 outline-double outline-3 outline-offset-2 rounded-lg">
        <div className="rounded-lg bg-gray-200">
          <LineGraph props={overallLineData} />
        </div>
        <div className="rounded-lg bg-gray-200">
          <BarGraph props={overallChartData} />
        </div>
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <PieGraph props={overallPieData} />
        </div>
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <PolarAreaChart props={overallPolarData} />
        </div>
      </div>
    </>
  );
}

export default OverallInsight;
