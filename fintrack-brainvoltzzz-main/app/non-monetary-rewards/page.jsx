"use client";

import {
  ArrowLeftIcon,
  StarFilledIcon,
  LockClosedIcon,
  LockOpen2Icon,
} from "@radix-ui/react-icons";
import { SettingsIcon } from "lucide-react";
import { TiersList, DreamProductCategories } from "@/utils/Utils";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import Login from "@/components/Login";

const NonMonetaryRewards = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return <Login />;

  const [showPopup, setShowPopup] = useState(false);
  const [rewardKey, setRewardKey] = useState("");
  const hideElementRef = useRef(null);

  const handleShowPopup = (text) => () => {
    setShowPopup(true);
    setRewardKey(session.user.referKey.slice(0, 3) + text);
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
              Congrats on unlocking the reward:
            </div>
            <div className="text-pink-700 text-3xl font-bold">
              {rewardKey.toUpperCase()}
            </div>
            <button className="bg-pink-500 shadow-inner shadow-black-950 text-white font-medium rounded-3xl p-2 w-24 h-10">
              Copy
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-start items-center p-5 bg-[url('/background2.jpg')] bg-cover min-h-screen">
        <div className="w-full flex flex-row justify-between items-center">
          <button onClick={() => router.back()}>
            <ArrowLeftIcon className="h-5 w-5 m-2" />
          </button>
          <p className="text-xs text-gray-400">Rewards</p>
          <SettingsIcon className="h-5 w-5 m-2" />
        </div>
        <div className="w-full">
          <h2 className="text-center my-4">Non-Monetary Rewards</h2>
          {TiersList.map((tier) => (
            <div key={tier.id}>
              {tier.nonmonetaryRewards.map((reward) => (
                <div key={reward.id}>
                  {DreamProductCategories.find(
                    (category) => category.key === session.user.dreamProductType
                  ).type === reward.type ? (
                    <div
                      key={reward.id}
                      className="w-full flex flex-row justify-between items-center p-4 bg-gray-500/25 rounded-lg my-1"
                      onClick={
                        tier.id <=
                        TiersList.find(
                          (tier) => tier.key === session.user.currentTier
                        ).id
                          ? handleShowPopup(reward.key.slice(0, 5))
                          : null
                      }
                    >
                      <div className="flex flex-row items-center">
                        <StarFilledIcon className="w-5 h-5 m-1" />
                        <p>{reward.name}</p>
                      </div>
                      {tier.id <=
                      TiersList.find(
                        (tier) => tier.key === session.user.currentTier
                      ).id ? (
                        <LockOpen2Icon className="w-5 h-5 m-1" />
                      ) : (
                        <LockClosedIcon className="w-5 h-5 m-1" />
                      )}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NonMonetaryRewards;
