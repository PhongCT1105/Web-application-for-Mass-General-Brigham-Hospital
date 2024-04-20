const data = [
  { request: "Flower Request", total: 500 },
  { request: "MedicationRequest", total: 300 },
  { request: "Patient Transport Request", total: 150 },
  { request: "Sanitation Request", total: 180 },
  { request: "Security Request", total: 100 },
];

export const barChartData = {
  labels: data.map((map) => map.request),
  datasets: [
    {
      label: "Total Used",
      data: data.map((map) => map.total),
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
