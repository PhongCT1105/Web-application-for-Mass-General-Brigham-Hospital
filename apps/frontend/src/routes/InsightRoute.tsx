import "../styles/example.route.css";
import "../styles/globals.css";
import LineGraph from "@/components/Graph/LineGraph.tsx";
import BarGraph from "@/components/Graph/BarGraph.tsx";

function InsightRoute() {
  return (
    <>
      <div>
        <h1>Line Graph of website usage in last year</h1>
        <LineGraph />
      </div>
      <div>
        <h1>Bar Chart of usage of every Service Requests</h1>
        <BarGraph />
      </div>
      {/*<div>*/}
      {/*  <h1>Bar Chart of usage of every Service Requests</h1>*/}
      {/*  <PieGraph />*/}
      {/*</div>*/}
    </>
  );
}

export default InsightRoute;
