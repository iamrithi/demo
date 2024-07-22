/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "../common/customDataTable";
import { userColumn } from "./column";
import { InventoryData, StockData } from "@/types";
import { getAllUser } from "@/action-data/userAction";
import { useQuery } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";

import { Card } from "../ui/card";
import { getAllDocument } from "@/action-data/documents";
import { getAllStock } from "@/action-data/stockAction";
import { loggedInUserStore, userRoleStore } from "@/state/state";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllInventoryItems } from "@/action-data/inventoryAction";
const InventoryDataList = () => {
  const path = useSearchParams();
  const router = useRouter();
  const canteen_id = path.get("canteen") || "";
  const stock_id = path.get("stock") || "";
  const { user: loggedInUser } = loggedInUserStore();
  const [inventory, setInventory] = useState<InventoryData[]>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const data = await getAllInventoryItems({
        csd_id: canteen_id,
        stock_id: stock_id,
      });
      setInventory(data.data);
      return data.data as InventoryData[];
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (canteen_id == "" || stock_id == "") {
      return router.replace("/stock");
    }
  }, [canteen_id, stock_id]);

  if (isLoading) {
    return (
      <div className="overflow-auto w-full h-[60vh] flex justify-center items-center">
        <PuffLoader className="text-theme text-[4px]" size={30} />
      </div>
    );
  }

  return (
    <div className=" w-full h-[75vh] overflow-x-scroll">
      <DataTable
        searchName="item_description"
        data={inventory || []}
        columns={userColumn}
      />
    </div>
  );
};

export default InventoryDataList;
