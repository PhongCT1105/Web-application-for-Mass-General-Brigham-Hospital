import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Interval {
  start: Date;
  end: Date;
}

interface Props {
  data: Interval[];
}

// Function to generate random dates within a range

const IntervalGraph: React.FC<Props> = ({ data }) => {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current && chartContainer.current && data) {
      const ctx = chartContainer.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            datasets: [
              {
                label: "Intervals",
                data: data.map((item: Interval) => ({
                  x: item.start,
                  y: item.end,
                })),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 1,
                pointRadius: 0, // Hide points
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day", // Adjust the time unit as needed
                },
                title: {
                  display: true,
                  text: "Date",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Value",
                },
              },
            },
          },
        });
      }
    }
  }, [data]);

  return (
    <div>
      <canvas ref={chartContainer}>
        <p>Your browser doesn't support canvas</p>
      </canvas>
    </div>
  );
};

export default IntervalGraph;
