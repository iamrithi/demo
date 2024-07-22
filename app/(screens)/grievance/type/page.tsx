import GrievanceTypeDataList from "@/components/grievanceType/grievanceTypeDataList";
import GrievanceTypeHeader from "@/components/grievanceType/grievanceTypeHeader";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col p-3">
      <GrievanceTypeHeader />
      <GrievanceTypeDataList />
    </div>
  );
};

export default page;
