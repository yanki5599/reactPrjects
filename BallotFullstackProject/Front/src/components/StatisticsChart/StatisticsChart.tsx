import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./StatisticsChart.css";
import { ICandidate } from "../../types/candidate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StatisticsChartProps {
  candidates: ICandidate[];
  usersCount: number;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({
  usersCount,
  candidates,
}) => {
  const data = {
    labels: candidates.map((candidate) => candidate.name),
    datasets: [
      {
        label: "Votes (%)",
        data: candidates.map(
          (candidate) => (candidate.votes / usersCount) * 100
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        minBarLength: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Set y-axis max to 100 to represent percentages
        ticks: {
          callback: (value: any) => `${Number(value)}%`, // Display '%' symbol on the y-axis
        },
      },
    },
  };

  return (
    <div className="StatisticsChart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default StatisticsChart;
