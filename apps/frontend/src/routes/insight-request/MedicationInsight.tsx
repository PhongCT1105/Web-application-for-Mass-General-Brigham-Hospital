// import "../styles/example.route.css";
// import "../styles/globals.css";
// import LineGraph from "@/components/Graph/LineGraph.tsx";
import BarGraph from "@/components/Graph/BarGraph.tsx";
import PieGraph from "@/components/Graph/PieGraph.tsx";
// import { medicationLineData } from "@/data/medicationData/lineChartData.ts";
import { MedicationForm } from "@/interfaces/medicationReq.ts";
import { barRequestData } from "@/components/Graph/GraphInterface/barRequestData.tsx";
import { pieRequestData } from "@/components/Graph/GraphInterface/pieRequestData";
import PolarAreaChart from "@/components/Graph/PolarAreaGraphPriority";
import { polarRequestDataPriority } from "@/components/Graph/GraphInterface/polarRequestDataPriority.tsx";
import { lineRequestData } from "@/components/Graph/GraphInterface/lineRequestData.tsx";
import LineGraph from "@/components/Graph/LineGraph";
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

function countMedicationStatus(arr: MedicationForm[]): pieRequestData[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    const { medication } = obj;
    if (medication.length > 0) {
      const { status } = medication[0];
      let normalizedStatus = status.toLowerCase().trim();
      if (normalizedStatus === "") normalizedStatus = "None";
      else if (normalizedStatus === "done") normalizedStatus = "Done";
      else if (normalizedStatus === "backlog") normalizedStatus = "Backlog";
      else if (normalizedStatus === "in progress")
        normalizedStatus = "In progress";
      else if (normalizedStatus === "canceled") normalizedStatus = "Canceled";
      else if (normalizedStatus === "todo") normalizedStatus = "To do";
      countDictionary[normalizedStatus] =
        (countDictionary[normalizedStatus] || 0) + 1;
    }
  });

  const chartdata: pieRequestData[] = Object.entries(countDictionary).map(
    ([status, request]) => ({ status, request }),
  );
  return chartdata;
}

function countMedicationPriority(
  arr: MedicationForm[],
): polarRequestDataPriority[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    const { medication } = obj;
    if (medication.length > 0) {
      const { priority } = medication[0];
      let normalizedStatus = priority.toLowerCase().trim();
      if (normalizedStatus === "") normalizedStatus = "None";
      else if (normalizedStatus === "urgent") normalizedStatus = "Urgent";
      else if (normalizedStatus === "low") normalizedStatus = "Low";
      else if (normalizedStatus === "medium") normalizedStatus = "Medium";
      else if (normalizedStatus === "high") normalizedStatus = "High";
      countDictionary[normalizedStatus] =
        (countDictionary[normalizedStatus] || 0) + 1;
    }
  });

  const chartdata: polarRequestDataPriority[] = Object.entries(
    countDictionary,
  ).map(([priority, request]) => ({ priority, request }));
  return chartdata;
}

function convertTimestampToMonth(timestamp: string): string {
  const date = new Date(parseInt(timestamp));
  const month = date.toLocaleString("default", { month: "long" });
  return month;
}

function convertTimeToMonth(arr: MedicationForm[]): MedicationForm[] {
  return arr.map((obj) => ({
    ...obj,
    timestamp: convertTimestampToMonth(obj.dateSubmitted),
  }));
}

function countMonth(arr: MedicationForm[]): lineRequestData[] {
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

function MedicationInsight({ props }: { props: MedicationForm[] }) {
  const data = convertTimeToMonth(props);
  const medicationChartData = countEmployee(data);
  const medicationPieData = countMedicationStatus(data);
  const medicationPolarData = countMedicationPriority(data);
  const medicationLineData = countMonth(data);
  return (
    <>
      <div className="m-3 grid gap-4 grid-cols-2 outline-double outline-3 outline-offset-2 rounded-lg">
        <div className="rounded-lg bg-gray-200">
          <LineGraph props={medicationLineData} />
        </div>
        <div className="rounded-lg bg-gray-200">
          <BarGraph props={medicationChartData} />
        </div>
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <PieGraph props={medicationPieData} />
        </div>
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <PolarAreaChart props={medicationPolarData} />
        </div>
      </div>
    </>
  );
}

export default MedicationInsight;
