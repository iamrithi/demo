import GrievanceDataList from "@/components/grievance/grievanceDataList";
import GrievanceHeader from "@/components/grievance/grievanceHeader";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col p-3">
      <GrievanceHeader />
      <GrievanceDataList />
    </div>
  );
};

export default page;
