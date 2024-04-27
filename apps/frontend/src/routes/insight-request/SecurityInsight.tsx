// import LineGraph from "@/components/Graph/LineGraph.tsx";
import BarGraph from "@/components/Graph/BarGraph.tsx";
import PieGraph from "@/components/Graph/PieGraph.tsx";
// import { securityLineData } from "@/data/securityData/lineChartData.ts";
import { SecurityForm } from "@/interfaces/securityReq.ts";
import { barRequestData } from "@/components/Graph/GraphInterface/barRequestData.tsx";
import PolarAreaChart from "@/components/Graph/PolarAreaGraphPriority";
import { polarRequestDataPriority } from "@/components/Graph/GraphInterface/polarRequestDataPriority.tsx";
import { pieRequestData } from "@/components/Graph/GraphInterface/pieRequestData";

function countEmployee(arr: SecurityForm[]): barRequestData[] {
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

function countPriority(arr: SecurityForm[]): polarRequestDataPriority[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    let { priority } = obj;
    if (priority === "") priority = "None";
    else if (priority === "high") priority = "High";
    else if (priority === "low") priority = "Low";
    else if (priority === "urgent") priority = "Urgent";
    else if (priority === "medium") priority = "Medium";
    countDictionary[priority] = (countDictionary[priority] || 0) + 1;
  });

  const polardata: polarRequestDataPriority[] = Object.entries(
    countDictionary,
  ).map(([priority, request]) => ({ priority, request }));
  return polardata;
}

function countStatus(arr: SecurityForm[]): pieRequestData[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    let { status } = obj;
    if (status === "") status = "None";
    else if (status === "canceled") status = "Canceled";
    else if (status === "backlog") status = "Backlog";
    else if (status === "in progress") status = "In progress";
    else if (status === "todo") status = "To do";
    else if (status === "done") status = "Done";
    countDictionary[status] = (countDictionary[status] || 0) + 1;
  });

  const piedata: pieRequestData[] = Object.entries(countDictionary).map(
    ([status, request]) => ({ status, request }),
  );
  return piedata;
}

function SecurityInsight({ props }: { props: SecurityForm[] }) {
  const securityChartData = countEmployee(props);
  const securityPolarData = countPriority(props);
  const securityPieData = countStatus(props);
  return (
    <>
      <div className="m-3 grid gap-4 grid-cols-2 outline-double outline-3 outline-offset-2 rounded-lg">
        {/*<div className="rounded-lg bg-gray-200">*/}
        {/*  <LineGraph props={securityLineData} />*/}
        {/*</div>*/}
        <div className="rounded-lg bg-gray-200">
          <BarGraph props={securityChartData} />
        </div>
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <PieGraph props={securityPieData} />
        </div>
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <PolarAreaChart props={securityPolarData} />
        </div>
      </div>
    </>
  );
}

export default SecurityInsight;
