// import "../styles/example.route.css";
// import "../styles/globals.css";
// import LineGraph from "@/components/Graph/LineGraph.tsx";
// import BarGraph from "@/components/Graph/BarGraph.tsx";
// import PieGraph from "@/components/Graph/PieGraph.tsx";
// import { overallChartData } from "@/data/overallData/barChartData.ts";
// import { overallLineData } from "@/data/overallData/lineChartData.ts";
// import PolarAreaChart from "@/components/Graph/PolorAreaGraph.tsx";
// import { overallPolarData } from "@/data/overallData/polarAreaChartData.ts";
// import { overallPieData } from "@/data/overallData/pieChartData.ts";
import RadarChart from "@/components/Graph/RadarChart";
import { GenericForm } from "@/interfaces/genericReq";
import { radarRequestData } from "@/components/Graph/GraphInterface/radarRequestData";

function countService(arr: GenericForm[]): radarRequestData[] {
  const countDictionary: Record<string, number> = {
    F: 0,
    ME: 0,
    T: 0,
    SA: 0,
    SE: 0,
    MA: 0,
  };

  arr.forEach((obj) => {
    const { reqId } = obj;
    let key: string;
    switch (reqId[0]) {
      case "T":
        key = "T";
        break;
      default:
        switch (reqId.substring(0, 2)) {
          case "ME":
          case "SA":
          case "SE":
          case "MA":
            key = reqId.substring(0, 2); // Use the first two characters as key
            break;
          default:
            key = "F"; // Assign "F" for any other cases
            break;
        }
        break;
    }
    countDictionary[key] = (countDictionary[key] || 0) + 1;
  });

  // Convert the count dictionary to an array of radarRequestData
  const radardata: radarRequestData[] = Object.entries(countDictionary).map(
    ([service, total]) => ({ service, total }),
  );
  return radardata;
}

function OverallInsight({ props }: { props: GenericForm[] }) {
  const overallRadardata = countService(props);
  console.log(overallRadardata);
  return (
    <>
      <div className="w-5/6 mx-auto rounded-lg bg-gray-200 outline-double outline-3 outline-offset-2 rounded-lg">
        <RadarChart props={overallRadardata} />
      </div>
    </>
  );
}

export default OverallInsight;
