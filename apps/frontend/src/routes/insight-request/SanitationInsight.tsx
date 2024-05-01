import LineGraph from "@/components/Graph/LineGraph.tsx";
import BarGraph from "@/components/Graph/BarGraph.tsx";
import PieGraph from "@/components/Graph/PieGraph.tsx";
import PolarAreaChart from "@/components/Graph/PolorAreaGraphSeverity.tsx";
import { SanitationForm } from "@/interfaces/sanitationReq.ts";
import { barRequestData } from "@/components/Graph/GraphInterface/barRequestData.tsx";
import { pieRequestData } from "@/components/Graph/GraphInterface/pieRequestData";
import { polarRequestDataSeverity } from "@/components/Graph/GraphInterface/polarRequestDataSeverity.tsx";
import { lineRequestData } from "@/components/Graph/GraphInterface/lineRequestData";

function countEmployee(arr: SanitationForm[]): barRequestData[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    const { name } = obj;
    countDictionary[name] = (countDictionary[name] || 0) + 1;
  });

  const chartdata: barRequestData[] = Object.entries(countDictionary).map(
    ([employeeName, request]) => ({ employeeName, request }),
  );
  return chartdata;
}

function countStatus(arr: SanitationForm[]): pieRequestData[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    const { status } = obj;
    countDictionary[status] = (countDictionary[status] || 0) + 1;
  });

  const piedata: pieRequestData[] = Object.entries(countDictionary).map(
    ([status, request]) => ({ status, request }),
  );
  return piedata;
}

function countPriority(arr: SanitationForm[]): polarRequestDataSeverity[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    const { severity } = obj;
    countDictionary[severity] = (countDictionary[severity] || 0) + 1;
  });

  const polardata: polarRequestDataSeverity[] = Object.entries(
    countDictionary,
  ).map(([severity, request]) => ({ severity, request }));
  return polardata;
}

function headerChange(arr: SanitationForm[]): SanitationForm[] {
  return arr.map((obj) => ({
    ...obj,
    status:
      obj.status === ""
        ? "None"
        : obj.status === "backlog"
          ? "Backlog"
          : obj.status === "todo"
            ? "Todo"
            : obj.status === "in progress"
              ? "In progress"
              : obj.status === "canceled"
                ? "Canceled"
                : obj.status === "done"
                  ? "Done"
                  : obj.status,
    severity:
      obj.severity === "high"
        ? "High"
        : obj.severity === "low"
          ? "Low"
          : obj.severity === "urgent"
            ? "Urgent"
            : obj.severity === "medium"
              ? "Medium"
              : obj.severity === ""
                ? "None"
                : obj.severity,
  }));
}

function convertTimestampToMonth(timestamp: string): string {
  const date = new Date(parseInt(timestamp));
  const month = date.toLocaleString("default", { month: "long" });
  return month;
}

function convertTimeToMonth(arr: SanitationForm[]): SanitationForm[] {
  return arr.map((obj) => ({
    ...obj,
    timestamp: convertTimestampToMonth(obj.time),
  }));
}

function countMonth(arr: SanitationForm[]): lineRequestData[] {
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
    const month = convertTimestampToMonth(obj.time);
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

function SanitationInsight({ props }: { props: SanitationForm[] }) {
  const headdata = headerChange(props);
  const data = convertTimeToMonth(headdata); // Convert timestamps to months
  const sanitationChartData = countEmployee(data);
  const sanitationPieData = countStatus(data);
  const sanitationPolarData = countPriority(data);
  const sanitationLineData = countMonth(data);

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
