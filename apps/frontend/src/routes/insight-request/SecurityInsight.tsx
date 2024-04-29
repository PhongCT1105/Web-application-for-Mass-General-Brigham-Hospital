// import LineGraph from "@/components/Graph/LineGraph.tsx";
import BarGraph from "@/components/Graph/BarGraph.tsx";
import PieGraph from "@/components/Graph/PieGraph.tsx";
// import { securityLineData } from "@/data/securityData/lineChartData.ts";
import { SecurityForm } from "@/interfaces/securityReq.ts";
import { barRequestData } from "@/components/Graph/GraphInterface/barRequestData.tsx";
import PolarAreaChart from "@/components/Graph/PolarAreaGraphPriority";
import { polarRequestDataPriority } from "@/components/Graph/GraphInterface/polarRequestDataPriority.tsx";
import { pieRequestData } from "@/components/Graph/GraphInterface/pieRequestData";
import { lineRequestData } from "@/components/Graph/GraphInterface/lineRequestData.tsx";
import LineGraph from "@/components/Graph/LineGraph";

function countEmployee(arr: SecurityForm[]): barRequestData[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    const { employee } = obj; // Assuming 'employee' property corresponds to 'employeeName'
    countDictionary[employee] = (countDictionary[employee] || 0) + 1;
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

function convertTimestampToMonth(timestamp: string): string {
  const date = new Date(parseInt(timestamp));
  const month = date.toLocaleString("default", { month: "long" });
  return month;
}

function convertTimeToMonth(arr: SecurityForm[]): SecurityForm[] {
  return arr.map((obj) => ({
    ...obj,
    timestamp: convertTimestampToMonth(obj.dateSubmitted),
  }));
}

function countMonth(arr: SecurityForm[]): lineRequestData[] {
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

function SecurityInsight({ props }: { props: SecurityForm[] }) {
  console.log(props);
  const data = convertTimeToMonth(props);

  const securityChartData = countEmployee(data);
  const securityPolarData = countPriority(data);
  const securityPieData = countStatus(data);
  const securityLineData = countMonth(data);
  return (
    <>
      <div className="m-3 grid gap-4 grid-cols-2 outline-double outline-3 outline-offset-2 rounded-lg">
        <div className="rounded-lg bg-gray-200">
          <LineGraph props={securityLineData} />
        </div>
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
