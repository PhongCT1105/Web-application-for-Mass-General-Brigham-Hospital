import "../styles/example.route.css";
import "../styles/globals.css";
import React from "react";
import { Bar } from "react-chartjs-2";

const Graph = () => {
  return (
    <div className="App">
      <div>
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
    </div>
  );
};
export default Graph;
