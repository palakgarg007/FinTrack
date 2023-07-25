"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
Chart.register(CategoryScale);
Chart.register(ArcElement);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

const TransactionsChart = ({ transactions }) => {
  const [lineData, setLineData] = useState();

  useEffect(() => {
    const getCategoryData = async () => {
      const lineLables = [];
      const lineAmount = [];

      transactions.slice(0, 10).forEach((transaction) => {
        lineLables.push(new Date(transaction.date).toLocaleDateString());
        lineAmount.push(transaction.amount);
      });

      setLineData({
        labels: lineLables,
        datasets: [
          {
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: lineAmount,
          },
        ],
      });
    };
    getCategoryData();
  }, []);
  return (
    <>
      {lineData && (
        <div className="w-full my-2 py-4 px-2 bg-black/30 rounded-lg">
          <Line data={lineData} options={{ maintainAspectRatio: false }} />
        </div>
      )}
    </>
  );
};

export default TransactionsChart;
