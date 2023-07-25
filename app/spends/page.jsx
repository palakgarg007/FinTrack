"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { SettingsIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Chart,
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import TransactionsChart from "@/components/TransactionsChart";
import CategoriesChart from "@/components/CategoriesChart";
Chart.register(CategoryScale);
Chart.register(ArcElement);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
import Login from "@/components/Login";

const SpendsPage = () => {
  const { data: session } = useSession();

  if (!session) return <Login />;

  const getExpenses = () => {
    let expenses = 0;

    session?.user.transactions
      .filter((transaction) => transaction.type !== "CREDIT")
      .forEach((transaction) => {
        transaction;
        expenses += transaction.amount;
      });

    return expenses;
  };

  const getIncome = () => {
    let income = 0;

    session?.user.transactions
      .filter((transaction) => transaction.type === "CREDIT")
      .forEach((transaction) => {
        transaction;
        income += transaction.amount;
      });

    return income;
  };

  return (
    <>
      <div className="flex flex-col justify-start items-center p-5 bg-[url('/background1.jpg')] bg-cover min-h-screen">
        <div className="w-full flex flex-row justify-between items-center">
          <Link href="/">
            <ArrowLeftIcon className="h-5 w-5 m-2" />
          </Link>
          <p className="text-xs text-gray-400">Track Spends</p>
          <SettingsIcon className="h-5 w-5 m-2" />
        </div>
        <div className="w-full flex flex-row my-5">
          <div className="w-1/2 text-left">
            <p className="text-sm text-gray-400">Your Total Expenses</p>
            {session?.user.transactions.length > 0 && (
              <h2 className="text-xl font-semibold">{getExpenses()}</h2>
            )}
          </div>
          <div className="w-1/2 text-right">
            <p className="text-sm text-gray-400">Your Total Income</p>
            {session?.user.transactions.length > 0 && (
              <h2 className="text-xl font-semibold">{getIncome()}</h2>
            )}
          </div>
        </div>
        {session?.user.transactions.length === 0 && (
          <>
            <div className="flex items-center justify-center">
              <h2 className="text-lg font-semibold">
                No Transactions Recorded
              </h2>
            </div>
          </>
        )}
        {session?.user.transactions.length > 0 && (
          <>
            <TransactionsChart
              transactions={session?.user.transactions}
              className="backdrop-blur-lg rounded-lg"
            />
            <CategoriesChart transactions={session?.user.transactions} />
            <div className="w-full flex flex-col my-5 p-2 bg-black/20 rounded-lg h-[30vh]">
              <h2 className="text-lg p-1 font-semibold">Latest Transactions</h2>
              <div className="w-full flex flex-col mt-3 p-1 overflow-y-scroll">
                {session?.user.transactions
                  .filter((transaction) => transaction.type !== "CREDIT")
                  .reverse()
                  .map((transaction, index) => (
                    <div
                      key={index}
                      className="w-full flex flex-row justify-between items-center py-2 px-4 bg-black/20 rounded-lg mb-2"
                    >
                      <div className="flex flex-col">
                        <p className="text-lg font-normal">
                          <Link href={`/spends/${transaction._id}`}>
                            {transaction.title.slice(0, 20)}...
                          </Link>
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(transaction.date).toLocaleDateString()} |{" "}
                          {new Date(transaction.date).toLocaleTimeString()}
                        </p>
                      </div>
                      <h2 className="text-green-500 text-xl">
                        {transaction.amount}
                      </h2>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SpendsPage;
