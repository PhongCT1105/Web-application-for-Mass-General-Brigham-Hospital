import "../styles/example.route.css";
import "../styles/globals.css";
import React from "react";
import { Bar } from "react-chartjs-2";

const Graph = () => {
  return (
    <div className="App">
      <div className="dataCard revenueCard">Chart1</div>
      <div className="dataCard revenueCard">
        <Bar
          data={{
            labels: ["A", "B", "C"],
            datasets: [
              {
                label: "Revenue",
                data: [200, 300, 400],
              },
            ],
          }}
        />
      </div>
      <div className="dataCard revenueCard">Chart3</div>
    </div>
  );
};
export default Graph;
