const data = [
  { request: "Flower Request", total: 500 },
  { request: "MedicationRequest", total: 300 },
  { request: "Patient Transport Request", total: 150 },
  { request: "Sanitation Request", total: 180 },
  { request: "Security Request", total: 100 },
];
export const polarAreaChartData = {
  labels: data.map((map) => map.request),
  datasets: [
    {
      label: "My First Dataset",
      data: data.map((map) => map.total),
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(75, 192, 192)",
        "rgb(255, 205, 86)",
        "rgb(201, 203, 207)",
        "rgb(54, 162, 235)",
      ],
    },
  ],
};
