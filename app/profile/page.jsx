"use client";

import { useState, useRef } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import { CheckCircle } from "lucide-react";
import { DollarSign, ListTreeIcon, SettingsIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Login from "@/components/Login";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [showPopup, setShowPopup] = useState(false);
  const hideElementRef = useRef(null);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = (event) => {
    if (
      !hideElementRef.current ||
      !hideElementRef.current.contains(event.target)
    ) {
      setShowPopup(false);
    }
  };

  if (!session) return <Login />;

  return (
    <>
      {showPopup && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50"
          id="popupContainer"
          onClick={handleClosePopup}
        >
          <div
            className="h-72 w-72 p-5 bg-no-repeat flex flex-col justify-between items-center bg-center bg-contain bg-[url('/rocket.png')]"
            ref={hideElementRef}
          >
            <div className="text-pink-600 text-base font-bold">
              Your Referral Code:
            </div>
            <div className="text-pink-700 text-3xl font-bold">
              {session.user.referKey.toUpperCase()}
            </div>
            <button className="bg-pink-500 shadow-inner shadow-black-950 text-white font-medium rounded-3xl p-2 w-24 h-10">
              Copy
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-between items-center p-5">
        <div className="w-full flex flex-row justify-between items-center">
          <Link href="/">
            <ArrowLeftIcon className="h-5 w-5 m-2" />
          </Link>
          <SettingsIcon className="h-5 w-5 m-2" />
        </div>
        <Image
          priority
          src={session?.user.image}
          width={150}
          height={150}
          className="rounded-full"
          alt={session?.user.name}
        />
        <p className="text-2xl font-semibold">{session?.user.name}</p>
        <p className="text-sm text-gray-500">Time till birthday: 250 day(s)</p>
        <div>
          <button
            className="rounded-full py-3 m-5 gradient_btn flex flex-row justify-between"
            onClick={handleShowPopup}
          >
            <CheckCircle className="h-4 w-4 my-1 mx-3" />
            Refer Someone Now!
            <ArrowRightIcon className="h-4 w-4 my-1 mx-5" />
          </button>
        </div>
        <div className="w-full flex flex-col p-4">
          <p className="text-md font-light text-gray-500 my-2">
            Archive History
          </p>
          <Link
            href="/monetary-rewards"
            className="w-full bg-[#131313] rounded-3xl p-5 my-1 flex flex-row justify-between items-center"
          >
            <p className="text-sm text-gray-300">See All Monetary Rewards</p>
            <DollarSign className="w-4 h-4" />
          </Link>
          <Link
            href="/non-monetary-rewards"
            className="w-full bg-[#131313] rounded-3xl p-5 my-1 flex flex-row justify-between items-center"
          >
            <p className="text-sm text-gray-300">
              See All Non-Monetary Rewards
            </p>
            <StarFilledIcon className="w-4 h-4" />
          </Link>
          <Link
            href="/referrals"
            className="w-full bg-[#131313] rounded-3xl p-5 my-1 flex flex-row justify-between items-center"
          >
            <p className="text-sm text-gray-300">Check Referral Tree</p>
            <ListTreeIcon className="w-4 h-4" />
          </Link>
        </div>
        <div className="w-full flex flex-col p-4">
          <p className="text-md font-light text-gray-500 my-2">Options</p>
          <div className="w-full flex flex-row justify-between items-center">
            <button
              onClick={() => signOut()}
              className="w-2/5 bg-[#131313] rounded-3xl p-3 my-1 text-center text-sm text-gray-300"
            >
              Logout
            </button>
            <Link
              href="/"
              className="w-2/5 bg-[#131313] rounded-3xl p-3 my-1 text-center text-sm text-gray-300"
            >
              Help?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
