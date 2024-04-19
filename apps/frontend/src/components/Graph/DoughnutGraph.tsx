import { Doughnut } from "react-chartjs-2";

const DoughnutChart = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dataValues = [100, 50, 80, 60, 70, 40, 90, 40, 80, 60, 70, 40];

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(53, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(201, 203, 207)",
          "rgb(53, 100, 200)",
          "rgb(100, 200, 255)",
          "rgb(200, 100, 100)",
          "rgb(100, 100, 100)",
          "rgb(300, 300, 200)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(53, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(201, 203, 207)",
          "rgb(53, 100, 200)",
          "rgb(100, 200, 255)",
          "rgb(200, 100, 100)",
          "rgb(100, 100, 100)",
          "rgb(300, 300, 200)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.1,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Doughnut Chart for all service requests done",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
