"use client";

import SelectProduct from "@/components/SelectProduct";
import HomeProfile from "@/components/HomeProfile";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";

export default function Home() {
  const { data: session } = useSession();
  if (!session) return <Login />;
  if (!session?.user.dreamProduct) return <SelectProduct session={session} />;
  return <HomeProfile session={session} />;
}
