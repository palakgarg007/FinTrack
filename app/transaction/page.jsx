"use client";

import Link from "next/link";
import { ArrowLeftIcon, ReloadIcon } from "@radix-ui/react-icons";
import { CameraIcon, SettingsIcon, SwitchCamera } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useRef, useCallback } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionCategories } from "@/utils/Utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import Login from "@/components/Login";

const TransactionPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return <Login />;

  const [facingMode, setFacingMode] = useState("environment");
  const [transaction, setTransaction] = useState({
    title: "",
    amount: 0,
    category: "",
    image: "",
  });
  const webcamRef = useRef(null);

  const captureImg = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setTransaction({ ...transaction, image: imageSrc });
  }, [webcamRef]);

  const retakeImg = () => {
    setTransaction({ ...transaction, image: "" });
  };

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleCamChange = (e) => {
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/transaction/new`, {
        method: "POST",
        body: JSON.stringify({
          user: session?.user.id,
          title: transaction.title,
          amount: transaction.amount,
          category: transaction.category,
          image: transaction.image,
        }),
      });

      if (res.ok) {
        setTransaction({
          title: "",
          amount: 0,
          category: "",
        });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center p-5">
        <div className="w-full flex flex-row justify-between items-center">
          <Link href="/">
            <ArrowLeftIcon className="h-5 w-5 m-2" />
          </Link>
          <p className="text-xs text-gray-400">Save Transaction</p>
          <SettingsIcon className="h-5 w-5 m-2" />
        </div>
        <div className="w-full flex flex-col justify-center items-center mt-4">
          <h2 className="text-center text-lg font-semibold">New Transaction</h2>
          <div className="w-full flex flex-col my-2">
            <Label className="py-2" htmlFor="image">
              Upload a receipt
            </Label>
            {transaction.image ? (
              <img src={transaction.image} alt="webcam" />
            ) : (
              <Webcam
                height={600}
                width={600}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                screenshotQuality={0.9}
                videoConstraints={{ facingMode: facingMode }}
              />
            )}
            {transaction.image ? (
              <button
                onClick={retakeImg}
                className="gradient_btn rounded-md flex flex-row justify-center items-center p-2"
              >
                <ReloadIcon className="h-4 w-4 m-1" /> Retake photo
              </button>
            ) : (
              <div className="flex flex-row w-full justify-between items-center">
                <button
                  onClick={handleCamChange}
                  className="rounded-md flex flex-row justify-center items-center p-2"
                >
                  <SwitchCamera className="h-4 w-4 m-1" />
                </button>
                <button
                  onClick={captureImg}
                  className="gradient_btn rounded-md flex flex-row justify-center items-center p-2"
                >
                  <CameraIcon className="h-4 w-4 m-1" />
                  Capture
                </button>
              </div>
            )}
          </div>
          {transaction.image !== "" && (
            <div className="w-full flex flex-col my-2">
              <Label className="py-2" htmlFor="category">
                Select a category
              </Label>
              <Select
                onValueChange={(value) => {
                  setTransaction({ ...transaction, category: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {TransactionCategories.map((category) => (
                    <SelectItem key={category.key} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {transaction.category !== "" && (
            <div className="w-full flex flex-col my-2">
              <Label className="py-2" htmlFor="category">
                Enter a Title
              </Label>
              <Input
                placeholder="Title"
                type="text"
                name="title"
                onChange={handleChange}
              />
            </div>
          )}
          {transaction.title !== "" && (
            <div className="w-full flex flex-col my-2">
              <Label className="py-2" htmlFor="category">
                Enter Amount
              </Label>
              <Input
                placeholder="Amount"
                type="number"
                name="amount"
                onChange={handleChange}
              />
            </div>
          )}
          {transaction.amount > 0 && (
            <div className="w-full my-2 flex justify-center items-center">
              <Button onClick={handleSave}>Save Transaction</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionPage;
