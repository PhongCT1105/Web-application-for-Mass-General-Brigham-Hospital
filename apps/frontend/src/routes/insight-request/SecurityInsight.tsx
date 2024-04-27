// import "../styles/example.route.css";
// import "../styles/globals.css";
import LineGraph from "@/components/Graph/LineGraph.tsx";
import BarGraph from "@/components/Graph/BarGraph.tsx";
// import PieGraph from "@/components/Graph/PieGraph.tsx";
// import PolarAreaChart from "@/components/Graph/PolorAreaGraph.tsx";
import { securityLineData } from "@/data/securityData/lineChartData.ts";
// import { securityPieData } from "@/data/securityData/pieChartData.ts";
// import { securityPolarData } from "@/data/securityData/polarAreaChartData.ts";
import { SecurityForm } from "@/interfaces/securityReq.ts";
import { barRequestData } from "@/components/Graph/GraphInterface/barRequestData.tsx";

function countEmployeeOccurrences(arr: SecurityForm[]): barRequestData[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    const { ename } = obj; // Assuming 'employee' property corresponds to 'employeeName'
    countDictionary[ename] = (countDictionary[ename] || 0) + 1;
  });

  const chartdata: barRequestData[] = Object.entries(countDictionary).map(
    ([employeeName, request]) => ({ employeeName, request }),
  );
  return chartdata;
}
function SecurityInsight({ props }: { props: SecurityForm[] }) {
  console.log(props);
  const securityChartData = countEmployeeOccurrences(props);
  return (
    <>
      <div className="m-3 grid gap-4 grid-cols-2 outline-double outline-3 outline-offset-2 rounded-lg">
        <div className="rounded-lg bg-gray-200">
          <LineGraph props={securityLineData} />
        </div>
        <div className="rounded-lg bg-gray-200">
          <BarGraph props={securityChartData} />
        </div>
        {/*<div className="rounded-lg bg-gray-200 scale-0.25">*/}
        {/*  <PieGraph props={securityPieData} />*/}
        {/*</div>*/}
        {/*<div className="rounded-lg bg-gray-200 scale-0.25">*/}
        {/*  <PolarAreaChart props={securityPolarData} />*/}
        {/*</div>*/}
      </div>
    </>
  );
}

export default SecurityInsight;
