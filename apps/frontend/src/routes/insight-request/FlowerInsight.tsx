import PieGraph from "@/components/Graph/PieGraph.tsx";
import { FlowerForm } from "@/interfaces/flowerReq.ts";
import { pieRequestData } from "@/components/Graph/GraphInterface/pieRequestData.tsx";
import { polarRequestDataPriority } from "@/components/Graph/GraphInterface/polarRequestDataPriority";
import PolarAreaChart from "@/components/Graph/PolarAreaGraphPriority";

function countPriority(arr: FlowerForm[]): polarRequestDataPriority[] {
  const countDictionary: Record<string, number> = {};

  arr.forEach((obj) => {
    let { priority } = obj;
    if (priority === "") priority = "None";
    else if (priority === "low") priority = "Low";
    else if (priority === "medium") priority = "Medium";
    else if (priority === "high") priority = "High";
    else if (priority === "urgent") priority = "Urgent";
    countDictionary[priority] = (countDictionary[priority] || 0) + 1;
  });

  const chartdata: polarRequestDataPriority[] = Object.entries(
    countDictionary,
  ).map(([priority, request]) => ({ priority, request }));
  return chartdata;
}

function countStatus(arr: FlowerForm[]): pieRequestData[] {
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

// function convertDateStringToMonth(dateString: string): string {
//   const date = new Date(dateString);
//   const monthIndex = date.getMonth();
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   return months[monthIndex];
// }
//
// function countMonth(arr: FlowerForm[]): lineRequestData[] {
//   const monthOrder = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//
//   const countDictionary: Record<string, number> = {};
//
//   arr.forEach((obj) => {
//     const dateString = obj.dateSubmitted.toString(); // Convert Date to string
//     const month = convertDateStringToMonth(dateString);
//     countDictionary[month] = (countDictionary[month] || 0) + 1;
//   });
//
//   // Sort the months based on the defined order
//   const sortedMonths = monthOrder.filter(
//     (month) => countDictionary[month] !== undefined,
//   );
//
//   // Create line data in the sorted order
//   const linedata: lineRequestData[] = sortedMonths.map((month) => ({
//     month,
//     request: countDictionary[month] || 0,
//   }));
//
//   return linedata;
// }

function FlowerInsight({ props }: { props: FlowerForm[] }) {
  console.log(props);
  const flowerPieData = countStatus(props);
  const flowerPolarData = countPriority(props);
  return (
    <>
      <div className="m-3 grid gap-4 grid-cols-2 outline-double outline-3 outline-offset-2 rounded-lg">
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <PieGraph props={flowerPieData} />
        </div>
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <PolarAreaChart props={flowerPolarData} />
        </div>
      </div>
    </>
  );
}

export default FlowerInsight;
