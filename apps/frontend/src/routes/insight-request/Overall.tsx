// import "../styles/example.route.css";
// import "../styles/globals.css";
import LineGraph from "@/components/Graph/LineGraph.tsx";
import BarGraph from "@/components/Graph/BarGraph.tsx";
import PieGraph from "@/components/Graph/PieGraph.tsx";
import DoughnutChart from "@/components/Graph/DoughnutGraph.tsx";

function OverallInsight() {
  return (
    <>
      <div className="m-3 grid gap-4 grid-cols-2">
        <div className="rounded-lg bg-gray-200">
          <LineGraph />
        </div>
        <div className="rounded-lg bg-gray-200">
          <BarGraph />
        </div>
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <PieGraph />
        </div>
        <div className="rounded-lg bg-gray-200 scale-0.25">
          <DoughnutChart />
        </div>
      </div>
    </>
  );
}

export default OverallInsight;
