import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserDataList from "@/components/user/userDataList";
import UserHeader from "@/components/user/userHeader";
import { loggedInUserStore, userRoleStore } from "@/state/state";
import React, { useEffect } from "react";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex flex-col p-3">
      <UserHeader />
      <UserDataList />
    </div>
  );
};

export default Dashboard;
