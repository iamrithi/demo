/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { loggedInUserStore, userRoleStore } from "@/state/state";
import { getAllUserBasedFilter } from "@/action-data/userAction";
import { useQuery } from "@tanstack/react-query";
import {
  CanteenData,
  DocumentData,
  FaqData,
  GrievanceData,
  UserData,
} from "@/types";
import { BsPeopleFill } from "react-icons/bs";
import { FaBasketShopping } from "react-icons/fa6";

import { getAllCanteen } from "@/action-data/canteenAction";
import { getAllFaq } from "@/action-data/faqAction";
import { getAllDocument } from "@/action-data/documents";
import { GiFiles } from "react-icons/gi";
import { FaQuora } from "react-icons/fa6";
import { getAllGrievance } from "@/action-data/grievance";
import { RiQuestionnaireFill } from "react-icons/ri";

const DashBoardScreen = () => {
  const { role, setRole, removeRole } = userRoleStore();
  const { user: loggedInUser, setUser, removeUser } = loggedInUserStore();
  const [userData, setUserData] = useState<UserData[]>();
  const [userGrievance, setGrievanceData] = useState<GrievanceData[]>();

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getAllUserBasedFilter({});
      return data.data as UserData[];
    },
    staleTime: 0,
  });
  const { data: canteen } = useQuery({
    queryKey: ["canteen"],
    queryFn: async () => {
      const data = await getAllCanteen();
      return data.data as CanteenData[];
    },
    staleTime: 0,
  });
  const { data: faq } = useQuery({
    queryKey: ["faq"],
    queryFn: async () => {
      const data = await getAllFaq();
      return data.data as FaqData[];
    },
    staleTime: 0,
  });
  const { data: docs } = useQuery({
    queryKey: ["document"],
    queryFn: async () => {
      const data = await getAllDocument();
      return data.data as DocumentData[];
    },
    staleTime: 0,
  });

  const {
    data: grievance,
    isLoading,
    isError,
  } = useQuery({
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
      setUserData(data);
      setGrievanceData(grievance);
    } else {
      if (role && role === "MANAGER") {
        const users = data?.filter(
          (value: UserData) =>
            value.canteen_id === loggedInUser?.manage_canteen?.id
        );
        setUserData(users);
        const gri = grievance?.filter(
          (value: GrievanceData) =>
            value.canteen_id === loggedInUser?.manage_canteen?.id
        );
        setGrievanceData(gri);
      }
      if (role && role === "STAFF") {
        const users = data?.filter(
          (value: UserData) => value.canteen_id === loggedInUser?.canteen_id
        );
        setUserData(users);
        const gri = grievance?.filter(
          (value: GrievanceData) =>
            value.canteen_id === loggedInUser?.canteen_id
        );
        setGrievanceData(gri);
      }
    }
  }, [loggedInUser, data]);
  return (
    <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 grid-rows-6">
      <Card className="h-[120px] rounded-xl px-2">
        <div className="flex w-full p-3 px-5 justify-between items-center">
          <h1 className="text-[20px] font-black"> Total Users</h1>{" "}
          <BsPeopleFill className="" size={25} />
        </div>
        <div className="flex w-full p-3 px-5 justify-center items-center bg-slate-50 rounded-lg">
          <h1 className="text-[24px] font-black"> {userData?.length}</h1>{" "}
        </div>
      </Card>
      {role === "ADMIN" && (
        <Card className="h-[120px] rounded-xl px-2">
          <div className="flex w-full p-3 px-5 justify-between items-center">
            <h1 className="text-[20px] font-black"> Total Canteen</h1>{" "}
            <FaBasketShopping className="" size={25} />
          </div>
          <div className="flex w-full p-3 px-5 justify-center items-center bg-slate-50 rounded-lg">
            <h1 className="text-[24px] font-black"> {canteen?.length}</h1>{" "}
          </div>
        </Card>
      )}
      <Card className="h-[120px] rounded-xl px-2">
        <div className="flex w-full p-3 px-5 justify-between items-center">
          <h1 className="text-[20px] font-black"> Total Grievance</h1>{" "}
          <RiQuestionnaireFill className="" size={25} />
        </div>
        <div className="flex w-full p-3 px-5 justify-center items-center bg-slate-50 rounded-lg">
          <h1 className="text-[24px] font-black"> {grievance?.length}</h1>{" "}
        </div>
      </Card>
      {role === "ADMIN" && (
        <Card className="h-[120px] rounded-xl px-2">
          <div className="flex w-full p-3 px-5 justify-between items-center">
            <h1 className="text-[20px] font-black"> Total Faq</h1>{" "}
            <FaQuora className="" size={25} />
          </div>
          <div className="flex w-full p-3 px-5 justify-center items-center bg-slate-50 rounded-lg">
            <h1 className="text-[24px] font-black"> {faq?.length}</h1>{" "}
          </div>
        </Card>
      )}
      {role === "ADMIN" && (
        <Card className="h-[120px] rounded-xl px-2">
          <div className="flex w-full p-3 px-5 justify-between items-center">
            <h1 className="text-[20px] font-black"> Total Documents</h1>{" "}
            <GiFiles className="" size={25} />
          </div>
          <div className="flex w-full p-3 px-5 justify-center items-center bg-slate-50 rounded-lg">
            <h1 className="text-[24px] font-black"> {docs?.length}</h1>{" "}
          </div>
        </Card>
      )}
    </div>
  );
};

export default DashBoardScreen;
