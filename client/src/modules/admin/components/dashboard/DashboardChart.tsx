import "chart.js/auto";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65, 34],
      fill: false,
      backgroundColor: "rgb(75, 192, 192)",
      borderColor: "rgba(75, 192, 192, 0.2)",
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76, 34],
      fill: false,
      backgroundColor: "rgb(75, 192, 192)",
      borderColor: "rgba(75, 192, 192, 0.2)",
    },
  ],
};

export const DashboardChart = () => {
  return (
    <div>
      <Bar data={data} />
    </div>
  );
};
