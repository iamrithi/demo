"use client";
import InventoryDataList from "@/components/inventory/inventoryDataList";
import InventoryHeader from "@/components/inventory/inventoryHeader";
import StockHeader from "@/components/stock/stockHeader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const Dashboard = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex justify-start items-start flex-col p-3">
      <Button
        variant={"secondary"}
        className="hover:bg-white rounded-lg"
        onClick={() => {
          router.back();
        }}
      >
        <IoMdArrowRoundBack className="mr-2" /> Back
      </Button>
      <InventoryHeader />
      <InventoryDataList />
    </div>
  );
};

export default Dashboard;
