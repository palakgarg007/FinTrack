"use client";

import { useEffect, useState } from "react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { TransactionCategories } from "@/utils/Utils";
import { Doughnut } from "react-chartjs-2";
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

const CategoriesChart = ({ transactions }) => {
  const [categoryData, setCategoryData] = useState();

  transactions = transactions.filter(
    (transaction) => transaction.type === "DEBIT"
  );

  useEffect(() => {
    const getCategoryData = async () => {
      let map = new Map();
      for (let i = 0; i < transactions.length; i++) {
        const s = transactions[i].category;
        if (!map.has(s)) {
          map.set(s, {
            category: transactions[i].category,
            color: TransactionCategories.find(
              (category) =>
                category.name.toLocaleLowerCase() ===
                transactions[i].category.toLocaleLowerCase()
            ).color,
            count: 1,
          });
        } else {
          map.get(s).count++;
        }
      }
      const res = Array.from(map.values());

      const chartCategories = [];
      const chartCount = [];
      const chartColors = [];

      res.forEach((category) => {
        chartCategories.push(category.category);
        chartCount.push(category.count);
        chartColors.push(category.color);
      });

      setCategoryData({
        labels: chartCategories.slice(0, 5),
        datasets: [
          {
            data: chartCount,
            backgroundColor: chartColors.slice(0, 5),
          },
        ],
      });
    };
    getCategoryData();
  }, []);

  return (
    <>
      {categoryData && (
        <div className="w-full flex flex-row p-2 justify-between items-center">
          <div className="w-2/5">
            {TransactionCategories.slice(0, 5).map((category, index) => (
              <div
                key={index}
                className="flex flex-row justify-start items-center text-sm"
              >
                <StarFilledIcon
                  className="h-3 w-3 m-2"
                  color={category.color}
                />{" "}
                {category.name}
              </div>
            ))}
          </div>
          <div className="w-2/5">
            <Doughnut data={categoryData} width={200} height={200} />
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriesChart;
