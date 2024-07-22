import React from "react";
import { Button } from "../ui/button";
import { StockForm } from "./stockForm";
import { Card } from "../ui/card";
import { RiTodoFill } from "react-icons/ri";

const StockHeader = () => {
  return (
    <Card
      className="w-full h-[7vh] flex justify-between items-center px-4 pl-2  rounded-xl mb-1
    "
    >
      <div className="flex flex-row justify-center items-center">
        <div className="w-[5vh] h-[5vh] rounded-lg bg-slate-400 mr-3 flex justify-center items-center">
          <RiTodoFill size={30} className=" drop-shadow-lg text-white" />
        </div>
        <div>
          <p className="text-xl font-extrabold">CSD-Stock</p>
          <p className="text-[12px] text-slate-500">
            Welcome to the CSD-Stock Management screen. Here, you can
            efficiently manage csd stocks:
          </p>
        </div>
      </div>
      <StockForm />
    </Card>
  );
};

export default StockHeader;
