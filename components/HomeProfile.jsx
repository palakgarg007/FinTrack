"use client";

import { DreamProductCategories, TiersList } from "@/utils/Utils";
import Image from "next/image";
import { ArrowRightIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { CheckCircle, ScanLine } from "lucide-react";
import { Progress } from "./ui/progress";
import Link from "next/link";

const HomeProfile = ({ session }) => {
  const progressValue = () => {
    let total = 0;

    session.user.transactions.forEach((transaction) => {
      if (transaction.narration?.toLowerCase().includes("policybazaar")) {
        total += transaction.amount;
      }
    });

    return (
      (total /
        DreamProductCategories.find(
          (category) => category.key === session.user.dreamProductType
        ).products.find((product) => product.key === session.user.dreamProduct)
          .investAmount) *
      100
    );
  };

  const dreamProduct = DreamProductCategories.find(
    (cat) => cat.key === session?.user.dreamProductType
  ).products.find((prod) => prod.key === session?.user.dreamProduct);

  return (
    <>
      <div className="flex flex-col w-full p-5 bg-[url('/background3.jpg')] bg-cover min-h-screen">
        <div className="flex flex-row w-full justify-between mt-5">
          <div className="w-1/2">
            <p className="text-sm">Welcome back,</p>
            <p className="text-xl font-semibold">
              <Link href="/profile">{session?.user.name}</Link>
            </p>
          </div>
          <div className="flex flex-row w-1/3 items-center justify-end">
            <Link href="/tiers">
              {session ? (
                <Image
                  priority
                  src={
                    TiersList.find(
                      (tier) => tier.key === session?.user.currentTier
                    ).image
                  }
                  alt={session?.user.currentTier}
                  width={30}
                  height={30}
                />
              ) : null}
            </Link>
            <Link href="/transaction">
              <ScanLine className="w-6 h-6 ml-2" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col text-center items-center mt-20">
          <h2 className="text-lg text-gray-300 font-semibold">
            Dream Product Selected
          </h2>
          <p className="text-4xl font-semibold my-4">{dreamProduct.name}</p>
          <p className="text-lg text-gray-300">
            {session?.user.currentTokens} Tokens Present
          </p>
          <div className="relative">
            <Image
              priority
              src={dreamProduct.image}
              alt={dreamProduct.name}
              width={200}
              height={200}
              className={`mt-16 block ${
                progressValue() < 100 ? "opacity-20" : ""
              }`}
            />
            {progressValue() < 100 ? (
              <LockClosedIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-16 h-16" />
            ) : null}
          </div>
          <p className="text-sm text-gray-400">
            {progressValue() < 100 ? "Product Locked" : "Product Unlocked"}
          </p>
        </div>
        <div className="w-full flex flex-col items-center mt-5">
          <Progress value={progressValue()} className="h-5 w-4/5 m-2" />
          <Link
            href="/spends"
            className="rounded-full py-3 m-5 gradient_btn flex flex-row justify-between"
          >
            <CheckCircle className="h-4 w-4 my-1 mx-3" />
            Track Spends
            <ArrowRightIcon className="h-4 w-4 my-1 mx-5" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeProfile;
