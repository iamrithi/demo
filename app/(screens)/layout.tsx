/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { checkRole } from "@/action-data/checkRole";
import { getSingleUser } from "@/action-data/userAction";
import SideBar from "@/components/common/SideBar";
import Topbar from "@/components/common/TopBar";
import { userRoleStore, loggedInUserStore } from "@/state/state";
import { UserData } from "@/types";
import type { Metadata } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const metadata: Metadata = {
  title: "Admin",
  description: "",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setRole, removeRole } = userRoleStore();
  const { setUser, removeUser } = loggedInUserStore();
  const session = useSession();
  const getUser = async (id: string) => {
    const user = await getSingleUser(id);
    setUser(user.data as UserData);
  };
  useEffect(() => {
    if (session.status === "authenticated") {
      const topRole = checkRole(session.data.user.role || []);
      setRole(topRole);
      getUser(session.data.user?.id);
    } else {
      removeRole(null);
      removeUser(null);
    }
  }, []);
  return (
    <main className="w-full h-full flex flex-row items-center justify-center">
      <SideBar />
      <div className="flex-1 h-full">
        <Topbar />
        <div className="w-full h-[93vh]  bg-slate-100 p-10">
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    </main>
  );
}
