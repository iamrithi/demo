import CanteenDataList from "@/components/canteen/canteenDataList";
import CanteenHeader from "@/components/canteen/canteenHeader";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import UserHeader from "@/components/user/userHeader";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col p-3">
      <CanteenHeader />
      <CanteenDataList />
    </div>
  );
};

export default page;
