// import "../styles/example.route.css";
// import "../styles/globals.css";
import LineGraph from "@/components/Graph/LineGraph.tsx";
import BarGraph from "@/components/Graph/BarGraph.tsx";
import PieGraph from "@/components/Graph/PieGraph.tsx";
import PolarAreaChart from "@/components/Graph/PolorAreaGraph.tsx";
import { patientLineData } from "@/data/patientData/lineChartData";
import { patientChartData } from "@/data/patientData/barChartData.ts";
import { patientPieData } from "@/data/patientData/pieChartData.ts";
import { patientPolarData } from "@/data/patientData/polarAreaChartData";

function PatientInsight() {
  return (
    <>
      <div className="m-3 grid gap-4 grid-cols-2 outline-double outline-3 outline-offset-2 rounded-lg">
        <div className="rounded-lg bg-gray-200">
          <LineGraph props={patientLineData} />
        </div>
        <div className="rounded-lg bg-gray-200">
          <BarGraph props={patientChartData} />
        </div>
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <PieGraph props={patientPieData} />
        </div>
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <PolarAreaChart props={patientPolarData} />
        </div>
      </div>
    </>
  );
}

export default PatientInsight;
