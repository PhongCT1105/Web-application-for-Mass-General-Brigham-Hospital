// import "../styles/example.route.css";
// import "../styles/globals.css";
import LineGraph from "@/components/Graph/LineGraph.tsx";
import BarGraph from "@/components/Graph/BarGraph.tsx";
// import PieGraph from "@/components/Graph/PieGraph.tsx";
import { medicationLineData } from "@/data/medicationData/lineChartData.ts";
// import { medicationPieData } from "@/data/medicationData/pieChartData";
// import { medicationPolarData } from "@/data/medicationData/polarAreaChartData";
// import PolarAreaChart from "@/components/Graph/PolorAreaGraph.tsx";
import { MedicationForm } from "@/interfaces/medicationReq.ts";
import { barRequestData } from "@/components/Graph/GraphInterface/barRequestData.tsx";
function countEmployee(arr: MedicationForm[]): barRequestData[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    const { employee } = obj;
    countDictionary[employee] = (countDictionary[employee] || 0) + 1;
  });

  const chartdata: barRequestData[] = Object.entries(countDictionary).map(
    ([employeeName, request]) => ({ employeeName, request }),
  );
  return chartdata;
}

function MedicationInsight({ props }: { props: MedicationForm[] }) {
  console.log(props);
  const medicationChartData = countEmployee(props);
  console.log(medicationChartData);

  return (
    <>
      <div className="m-3 grid gap-4 grid-cols-2 outline-double outline-3 outline-offset-2 rounded-lg">
        <div className="rounded-lg bg-gray-200">
          <LineGraph props={medicationLineData} />
        </div>
        <div className="rounded-lg bg-gray-200">
          <BarGraph props={medicationChartData} />
        </div>
        {/*<div className="rounded-lg bg-gray-200 scale-0.25">*/}
        {/*  <PieGraph props={medicationPieData} />*/}
        {/*</div>*/}
        {/*<div className="rounded-lg bg-gray-200 scale-0.25">*/}
        {/*  <PolarAreaChart props={medicationPolarData} />*/}
        {/*</div>*/}
      </div>
    </>
  );
}

export default MedicationInsight;
