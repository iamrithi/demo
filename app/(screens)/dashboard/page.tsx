"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import DashBoardScreen from "@/components/dashboard/dashBoardScreen";

const Dashboard = () => {
  const session = useSession();

  useEffect(() => {}, []);
  return (
    <div className="w-full h-full flex justify-start items-start">
      <DashBoardScreen />
    </div>
  );
};

export default Dashboard;
