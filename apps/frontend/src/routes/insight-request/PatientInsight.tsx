// import "../styles/example.route.css";
// import "../styles/globals.css";
import LineGraph from "@/components/Graph/LineGraph.tsx";
// import BarGraph from "@/components/Graph/BarGraph.tsx";
// import PieGraph from "@/components/Graph/PieGraph.tsx";
// import PolarAreaChart from "@/components/Graph/PolorAreaGraph.tsx";
import { patientLineData } from "@/data/patientData/lineChartData";
// import { patientPieData } from "@/data/patientData/pieChartData.ts";
// import { patientPolarData } from "@/data/patientData/polarAreaChartData";
import { ScheduleForm } from "@/interfaces/roomScheduleReq.ts";
import { barRequestData } from "@/components/Graph/GraphInterface/barRequestData.tsx";
import BarGraph from "@/components/Graph/BarGraph.tsx";
function countEmployeeOccurrences(arr: ScheduleForm[]): barRequestData[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    const { employeeName } = obj;
    countDictionary[employeeName] = (countDictionary[employeeName] || 0) + 1;
  });

  const chartdata: barRequestData[] = Object.entries(countDictionary).map(
    ([employeeName, request]) => ({ employeeName, request }),
  );
  return chartdata;
}
function PatientInsight({ props }: { props: ScheduleForm[] }) {
  console.log(props);
  const patientChartData = countEmployeeOccurrences(props);
  console.log(patientChartData);

  return (
    <>
      <div className="m-3 grid gap-4 grid-cols-2 outline-double outline-3 outline-offset-2 rounded-lg">
        <div className="rounded-lg bg-gray-200">
          <LineGraph props={patientLineData} />
        </div>
        <div className="rounded-lg bg-gray-200">
          <BarGraph props={patientChartData} />
        </div>
        {/*<div className="rounded-lg bg-gray-200 scale-0.25">*/}
        {/*  <PieGraph props={patientPieData} />*/}
        {/*</div>*/}
        {/*<div className="rounded-lg bg-gray-200 scale-0.25">*/}
        {/*  <PolarAreaChart props={patientPolarData} />*/}
        {/*</div>*/}
      </div>
    </>
  );
}

export default PatientInsight;
