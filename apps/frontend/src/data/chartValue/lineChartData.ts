const data = [
  { months: "January", user: 150, staff: 200 },
  { months: "February", user: 150, staff: 200 },
  { months: "March", user: 150, staff: 200 },
  { months: "April", user: 150, staff: 200 },
  { months: "May", user: 150, staff: 200 },
  { months: "June", user: 150, staff: 200 },
  { months: "July", user: 150, staff: 200 },
  { months: "August", user: 150, staff: 200 },
  { months: "September", user: 150, staff: 200 },
  { months: "October", user: 150, staff: 200 },
  { months: "November", user: 150, staff: 200 },
  { months: "December", user: 150, staff: 200 },
];
export const lineChartData = {
  labels: data.map((map) => map.months),
  datasets: [
    {
      label: "Users",
      data: data.map((map) => map.user),
      borderColor: "rgb(75, 192, 192)",
    },
    {
      label: "Staff",
      data: data.map((map) => map.staff),
      borderColor: "red",
    },
  ],
};
