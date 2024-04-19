export const barChartData = {
  labels: [
    "FlowerRequest",
    "Medication Request",
    "Patient Transport Request",
    "Sanitation Request",
    "Security Request",
  ],
  datasets: [
    {
      label: "Total Used",
      data: [1200, 300, 150, 180, 100],
      backgroundColor: [
        "rgba(255, 99, 13, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
