/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "../common/customDataTable";
import { userColumn } from "./column";
import { UserData } from "@/types";
import { getAllUserBasedFilter } from "@/action-data/userAction";
import { useQuery } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { loggedInUserStore, userRoleStore } from "@/state/state";

const UserDataList = () => {
  // const session = useSession();
  const { role, setRole, removeRole } = userRoleStore();
  const { user: loggedInUser, setUser, removeUser } = loggedInUserStore();
  const [userData, setUserData] = useState<UserData[]>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getAllUserBasedFilter({});
      return data.data as UserData[];
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (!role) return;
    if (role && role === "ADMIN") {
      setUserData(data);
    } else {
      if (role && role === "MANAGER") {
        const users = data?.filter(
          (value: UserData) =>
            value.canteen_id === loggedInUser?.manage_canteen?.id
        );
        setUserData(users);
      }
      if (role && role === "STAFF") {
        const users = data?.filter(
          (value: UserData) => value.canteen_id === loggedInUser?.canteen_id
        );
        setUserData(users);
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
        searchName="phone_no"
        data={userData || []}
        columns={userColumn}
      />
    </div>
  );
};

export default UserDataList;
