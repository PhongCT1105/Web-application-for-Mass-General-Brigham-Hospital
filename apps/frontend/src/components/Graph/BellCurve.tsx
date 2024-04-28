import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BellCurveChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    if (!ctx) return;

    const data = [];
    for (let x = -3; x <= 3; x += 0.1) {
      const y = Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI);
      data.push({ x, y });
    }

    new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Bell Curve",
            data: data,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            ticks: {
              stepSize: 1,
            },
          },
          y: {
            ticks: {
              stepSize: 0.1,
            },
          },
        },
      },
    });
  }, []);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BellCurveChart;
