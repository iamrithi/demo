"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "../common/customDataTable";
import { userColumn } from "./column";
import { GrievanceData } from "@/types";
import { getAllUser } from "@/action-data/userAction";
import { useQuery } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";
import { getAllFaq } from "@/action-data/faqAction";
import { getAllGrievance } from "@/action-data/grievance";
import { loggedInUserStore, userRoleStore } from "@/state/state";

const GrievanceDataList = () => {
  const { role, setRole, removeRole } = userRoleStore();
  const { user: loggedInUser, setUser, removeUser } = loggedInUserStore();
  const [userGrievance, setGrievanceData] = useState<GrievanceData[]>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["grievance"],
    queryFn: async () => {
      const data = await getAllGrievance();
      return data.data as GrievanceData[];
    },
    staleTime: 0,
  });
  useEffect(() => {
    if (!role) return;
    if (role && role === "ADMIN") {
      setGrievanceData(data);
    } else {
      if (role && role === "MANAGER") {
        const users = data?.filter(
          (value: GrievanceData) =>
            value.canteen_id === loggedInUser?.manage_canteen?.id
        );
        setGrievanceData(users);
      }
      if (role && role === "STAFF") {
        const users = data?.filter(
          (value: GrievanceData) =>
            value.canteen_id === loggedInUser?.canteen_id
        );
        setGrievanceData(users);
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
      <DataTable
        searchName="name"
        data={userGrievance || []}
        columns={userColumn}
      />
    </div>
  );
};

export default GrievanceDataList;
