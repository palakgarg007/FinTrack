"use client";

import {
  ArrowLeftIcon,
  LightningBoltIcon,
  LockOpen1Icon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";
import {
  CheckCircle,
  SettingsIcon,
  ShieldCheckIcon,
  WholeWordIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import Login from "@/components/Login";

const ReferralsPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return <Login />;

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
      <div className="flex flex-col justify-start items-center p-5 bg-[url('/background5.jpg')] bg-cover min-h-screen">
        <div className="w-full flex flex-row justify-between items-center">
          <button onClick={() => router.back()}>
            <ArrowLeftIcon className="h-5 w-5 m-2" />
          </button>
          <p className="text-xs text-gray-200">Referral Tree</p>
          <SettingsIcon className="h-5 w-5 m-2" />
        </div>
        <div className="w-ful my-4">
          <h2 className="text-center text-xl">Check your Referral Tree</h2>
          <p className="text-center text-xs text-gray-200">
            All rewards at your tip
          </p>
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-row justify-between items-start mb-4">
            <div className="w-1/2 flex flex-col justify-center items-center text-center m-2">
              <div className="flex flex-row items-center justify-center">
                <LightningBoltIcon className="h-5 w-5 m-2" />
                <p className="text-xl font-semibold">Easy Gain</p>
              </div>
              <p className="text-xs text-gray-200">
                Quickly gain more tokens with each referral
              </p>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-start text-center m-2">
              <div className="flex flex-row items-center justify-center">
                <LockOpen1Icon className="h-5 w-5 m-2" />
                <p className="text-xl font-semibold">No Limit</p>
              </div>
              <p className="text-xs text-gray-200">
                You can create as many referral trees as you want
              </p>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between items-center mb-4">
            <div className="w-1/2 flex flex-col justify-center items-start text-center m-2">
              <div className="flex flex-row items-center justify-center">
                <ShieldCheckIcon className="h-5 w-5 m-2" />
                <p className="text-xl font-semibold">Prevention</p>
              </div>
              <p className="text-xs text-gray-200">
                Only successful converted referrals are counted for reward i.e.
                minimum 3 activities to be done.
              </p>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-start text-center m-2">
              <div className="flex flex-row items-center justify-center">
                <WholeWordIcon className="h-5 w-5 m-2" />
                <p className="text-xl font-semibold">Capped at 50</p>
              </div>
              <p className="text-xs text-gray-200">
                The referral money is capped at 50 referrals. Therefore maximum
                earning per tree is 1500 Tokens
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center my-2">
          <div className="w-full flex flex-col justify-between items-center p-4 my-1">
            <div className="w-full flex flex-row items-center p-3 m-2 bg-gray-500/25 rounded-lg">
              <div className="w-1/2 flex flex-col">
                <h3 className="text-xl font-semibold">Vedang</h3>
                <p className="text-sm text-gray-300">Your first referral</p>
              </div>
              <div className="w-1/2 flex flex-col">
                <h3 className="text-xl font-semibold">900T</h3>
                <p className="text-sm text-gray-300">30 Referrals</p>
              </div>
            </div>
            <div className="w-full flex flex-row items-center p-3 m-2 bg-gray-500/25 rounded-lg">
              <div className="w-1/2 flex flex-col">
                <h3 className="text-xl font-semibold">Palak</h3>
                <p className="text-sm text-gray-300">Your second referral</p>
              </div>
              <div className="w-1/2 flex flex-col">
                <h3 className="text-xl font-semibold">1500T</h3>
                <p className="text-sm text-gray-300">80 Referrals</p>
              </div>
            </div>
            <div className="w-full flex flex-row items-center p-3 m-2 bg-gray-500/25 rounded-lg">
              <div className="w-1/2 flex flex-col">
                <h3 className="text-xl font-semibold">Ashish</h3>
                <p className="text-sm text-gray-300">Your Third referral</p>
              </div>
              <div className="w-1/2 flex flex-col">
                <h3 className="text-xl font-semibold">1200T</h3>
                <p className="text-sm text-gray-300">55 Referrals</p>
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </>
  );
};

export default ReferralsPage;
