import { MaintenanceForm } from "@/interfaces/maintenanceReq.ts";
// import "../styles/example.route.css";
// import "../styles/globals.css";
// import LineGraph from "@/components/Graph/LineGraph.tsx";
import BarGraph from "@/components/Graph/BarGraph.tsx";
import PieGraph from "@/components/Graph/PieGraph.tsx";
// import { securityLineData } from "@/data/securityData/lineChartData.ts";
import { barRequestData } from "@/components/Graph/GraphInterface/barRequestData.tsx";
import { polarRequestDataSeverity } from "@/components/Graph/GraphInterface/polarRequestDataSeverity";
import { pieRequestData } from "@/components/Graph/GraphInterface/pieRequestData.tsx";
import PolarAreaChart from "@/components/Graph/PolorAreaGraphSeverity";
import { lineRequestData } from "@/components/Graph/GraphInterface/lineRequestData.tsx";
import LineGraph from "@/components/Graph/LineGraph";

function countEmployee(arr: MaintenanceForm[]): barRequestData[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    const { name } = obj; // Assuming 'employee' property corresponds to 'employeeName'
    countDictionary[name] = (countDictionary[name] || 0) + 1;
  });

  const chartdata: barRequestData[] = Object.entries(countDictionary).map(
    ([employeeName, request]) => ({ employeeName, request }),
  );
  return chartdata;
}

function countSeverity(arr: MaintenanceForm[]): polarRequestDataSeverity[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    let { severity } = obj;
    if (severity === "") severity = "None";
    else if (severity === "low") severity = "Low";
    else if (severity === "medium") severity = "Medium";
    else if (severity === "high") severity = "High";
    else if (severity === "urgent") severity = "Urgent";
    countDictionary[severity] = (countDictionary[severity] || 0) + 1;
  });

  const chartdata: polarRequestDataSeverity[] = Object.entries(
    countDictionary,
  ).map(([severity, request]) => ({ severity, request }));
  return chartdata;
}

function countStatus(arr: MaintenanceForm[]): pieRequestData[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    let { status } = obj;
    if (status === "") status = "None";
    else if (status === "done") status = "Done";
    else if (status === "backlog") status = "Backlog";
    else if (status === "todo") status = "Todo";
    else if (status === "in progress") status = "In progress";
    else if (status === "canceled") status = "Canceled";
    countDictionary[status] = (countDictionary[status] || 0) + 1;
  });

  const chartdata: pieRequestData[] = Object.entries(countDictionary).map(
    ([status, request]) => ({ status, request }),
  );
  return chartdata;
}

function convertTimestampToMonth(timestamp: string): string {
  const date = new Date(parseInt(timestamp));
  const month = date.toLocaleString("default", { month: "long" });
  return month;
}

function convertTimeToMonth(arr: MaintenanceForm[]): MaintenanceForm[] {
  return arr.map((obj) => ({
    ...obj,
    timestamp: convertTimestampToMonth(obj.dateSubmitted),
  }));
}

function countMonth(arr: MaintenanceForm[]): lineRequestData[] {
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    const month = convertTimestampToMonth(obj.dateSubmitted);
    countDictionary[month] = (countDictionary[month] || 0) + 1;
  });

  // Sort the months based on the defined order
  const sortedMonths = monthOrder.filter(
    (month) => countDictionary[month] !== undefined,
  );

  // Create line data in the sorted order
  const linedata: lineRequestData[] = sortedMonths.map((month) => ({
    month,
    request: countDictionary[month] || 0,
  }));

  return linedata;
}

function MaintenanceInsight({ props }: { props: MaintenanceForm[] }) {
  const data = convertTimeToMonth(props);
  const maintenanceChartData = countEmployee(data);
  const maintenancePolarData = countSeverity(data);
  const maintenancePieData = countStatus(data);
  const maintenanceLineData = countMonth(data);
  console.log(props);
  return (
    <>
      <div className="w-5/6 mx-auto m-3 grid gap-4 grid-cols-2 outline-double outline-3 outline-offset-2 rounded-lg">
        <div className="rounded-lg bg-gray-200">
          <LineGraph props={maintenanceLineData} />
        </div>
        <div className="rounded-lg bg-gray-200">
          <BarGraph props={maintenanceChartData} />
        </div>
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <PieGraph props={maintenancePieData} />
        </div>
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <PolarAreaChart props={maintenancePolarData} />
        </div>
      </div>
    </>
  );
}

export default MaintenanceInsight;
