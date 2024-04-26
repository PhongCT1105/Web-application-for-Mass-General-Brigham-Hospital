// import "../styles/example.route.css";
// import "../styles/globals.css";
import LineGraph from "@/components/Graph/LineGraph.tsx";
import BarGraph from "@/components/Graph/BarGraph.tsx";
import PieGraph from "@/components/Graph/PieGraph.tsx";
import { flowerChartData } from "@/data/flowerData/barChartData";
import { flowerLineData } from "@/data/flowerData/lineChartData.ts";
import { flowerPieData } from "@/data/flowerData/pieChartData";
import PolarAreaChart from "@/components/Graph/PolorAreaGraph.tsx";
import { flowerPolarData } from "@/data/flowerData/polarAreaChartData";
import { FlowerForm } from "@/interfaces/flowerReq.ts";

function FlowerInsight({ props }: { props: FlowerForm[] }) {
  console.log(props);
  return (
    <>
      <div className="m-3 grid gap-4 grid-cols-2 outline-double outline-3 outline-offset-2 rounded-lg">
        <div className="rounded-lg bg-gray-200">
          <LineGraph props={flowerLineData} />
        </div>
        <div className="rounded-lg bg-gray-200">
          <BarGraph props={flowerChartData} />
        </div>
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
