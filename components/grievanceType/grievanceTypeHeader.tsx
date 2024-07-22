import React from "react";
import { FcAddColumn, FcManager, FcPlus } from "react-icons/fc";
import { Button } from "../ui/button";
import { GrievanceTypeForm } from "./grievanceTypeForm";
import { Card } from "../ui/card";
import { PiListNumbersFill } from "react-icons/pi";

const GrievanceTypeHeader = () => {
  return (
    <Card
      className="w-full h-[7vh] flex justify-between items-center px-4 pl-2  rounded-xl mb-1
    "
    >
      <div className="flex flex-row justify-center items-center">
        <div className="w-[5vh] h-[5vh] rounded-lg bg-slate-400 mr-3 flex justify-center items-center">
          <PiListNumbersFill size={30} className=" drop-shadow-lg text-white" />
        </div>
        <div>
          <p className="text-xl font-extrabold">Grievance Types</p>
          <p className="text-[12px] text-slate-500">
            Welcome to the Grievace Type Management screen. Here, you can
            efficiently manage grievance type:
          </p>
        </div>
      </div>
      <GrievanceTypeForm />
    </Card>
  );
};

export default GrievanceTypeHeader;
