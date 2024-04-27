import { ScheduleForm } from "@/interfaces/roomScheduleReq.ts";
// import "../styles/example.route.css";
// import "../styles/globals.css";
// import LineGraph from "@/components/Graph/LineGraph.tsx";
import BarGraph from "@/components/Graph/BarGraph.tsx";
import PieGraph from "@/components/Graph/PieGraph.tsx";
// import { patientLineData } from "@/data/patientData/lineChartData";
import { barRequestData } from "@/components/Graph/GraphInterface/barRequestData.tsx";
import { pieRequestData } from "@/components/Graph/GraphInterface/pieRequestData";
import PolarAreaChart from "@/components/Graph/PolarAreaGraphPriority.tsx";
import { polarRequestDataPriority } from "@/components/Graph/GraphInterface/polarRequestDataPriority.tsx";

function countEmployee(arr: ScheduleForm[]): barRequestData[] {
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

function countStatus(arr: ScheduleForm[]): pieRequestData[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    let { status } = obj;
    if (status === "") status = "None";
    else if (status === "done") status = "Done";
    else if (status === "backlog") status = "Backlog";
    else if (status === "InProgress") status = "In progress";
    else if (status === "canceled") status = "Canceled";
    else if (status === "todo") status = "To do";
    countDictionary[status] = (countDictionary[status] || 0) + 1;
  });

  const chartdata: pieRequestData[] = Object.entries(countDictionary).map(
    ([status, request]) => ({ status, request }),
  );
  return chartdata;
}

function countPriority(arr: ScheduleForm[]): polarRequestDataPriority[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    let { priority } = obj;
    if (priority === "") priority = "None";
    else if (priority === "low") priority = "Low";
    else if (priority === "medium") priority = "Medium";
    else if (priority === "high") priority = "High";
    countDictionary[priority] = (countDictionary[priority] || 0) + 1;
  });

  const chartdata: polarRequestDataPriority[] = Object.entries(
    countDictionary,
  ).map(([priority, request]) => ({ priority, request }));
  return chartdata;
}

function PatientInsight({ props }: { props: ScheduleForm[] }) {
  console.log(props);
  const patientChartData = countEmployee(props);
  const patientPieData = countStatus(props);
  const patientPolarData = countPriority(props);
  console.log(patientChartData);

  return (
    <>
      <div className="m-3 grid gap-4 grid-cols-2 outline-double outline-3 outline-offset-2 rounded-lg">
        {/*<div className="rounded-lg bg-gray-200">*/}
        {/*  <LineGraph props={patientLineData} />*/}
        {/*</div>*/}
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
