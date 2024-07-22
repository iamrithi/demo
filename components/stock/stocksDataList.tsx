"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "../common/customDataTable";
import { userColumn } from "./column";
import { StockData } from "@/types";
import { getAllUser } from "@/action-data/userAction";
import { useQuery } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";

import { Card } from "../ui/card";
import { getAllDocument } from "@/action-data/documents";
import { getAllStock } from "@/action-data/stockAction";
import { loggedInUserStore, userRoleStore } from "@/state/state";
const StockDataList = () => {
  const { role } = userRoleStore();
  const { user: loggedInUser } = loggedInUserStore();
  const [stocks, setStocks] = useState<StockData[]>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stock"],
    queryFn: async () => {
      const data = await getAllStock();
      return data.data as StockData[];
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (!role) return;
    if (role && role === "ADMIN") {
      setStocks(data);
    } else {
      if (role && role === "MANAGER") {
        const users = data?.filter(
          (value: StockData) =>
            value.canteen.id === loggedInUser?.manage_canteen?.id
        );
        setStocks(users);
      }
      if (role && role === "STAFF") {
        const users = data?.filter(
          (value: StockData) => value.canteen.id === loggedInUser?.canteen_id
        );
        setStocks(users);
      }
    }
  }, [loggedInUser, data]);

  if (isLoading) {
    return (
      <div className="overflow-auto w-full h-[60vh] flex justify-center items-center">
        <PuffLoader className="text-theme text-[4px]" size={30} />
      </div>
    );
  }

  return (
    <div className=" w-full h-[75vh]">
      <DataTable searchName="name" data={stocks || []} columns={userColumn} />
    </div>
  );
};

export default StockDataList;
