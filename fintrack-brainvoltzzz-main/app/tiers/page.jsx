"use client";

import Link from "next/link";
import {
  ArrowLeftIcon,
  LockClosedIcon,
  LockOpen2Icon,
} from "@radix-ui/react-icons";
import { SettingsIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { TiersList } from "@/utils/Utils";
import Login from "@/components/Login";

const TierPage = () => {
  const { data: session } = useSession();

  if (!session) return <Login />;

  return (
    <>
      <div className="flex flex-col justify-start items-center p-5 bg-[url('/background1.jpg')] bg-cover min-h-screen">
        <div className="w-full flex flex-row justify-between items-center">
          <Link href="/">
            <ArrowLeftIcon className="h-5 w-5 m-2" />
          </Link>
          <p className="text-xs text-gray-300">Track & Milestones</p>
          <SettingsIcon className="h-5 w-5 m-2" />
        </div>
        <div className="w-full flex flex-col justify-center items-center mt-10 mb-5">
          <h2 className="text-xl font-semibold">
            Welcome to Milestone Unlocker
          </h2>
          <p className="text-sm text-gray-300">
            Tokens Present: {session?.user.currentTokens}
          </p>
        </div>
        <div className="w-full flex flex-col p-4">
          {TiersList.map((tier) => (
            <div
              key={tier.id}
              className="w-full flex flex-row justify-between items-center p-4 bg-gray-500/25 rounded-3xl my-1"
            >
              <p>{tier.name}</p>
              {session?.user.currentTier &&
                (TiersList.find(
                  (tierSes) => tierSes.key === session?.user.currentTier
                ).id >= tier.id ? (
                  <LockOpen2Icon className="w-5 h-5 m-1" />
                ) : (
                  <LockClosedIcon className="w-5 h-5 m-1" />
                ))}
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col items-center p-4">
          <Link
            href="/spends"
            className="w-full rounded-2xl items-center text-center p-4 my-2 gradient_btn"
          >
            Track Spends
          </Link>
          <Link
            href="/"
            className="w-2/5 bg-[#131313] rounded-3xl p-3 my-2 text-center text-sm text-gray-300"
          >
            Help?
          </Link>
        </div>
      </div>
    </>
  );
};

export default TierPage;
