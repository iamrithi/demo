import React from "react";
import { FcAddColumn, FcManager, FcPlus } from "react-icons/fc";
import { Button } from "../ui/button";
import { CanteenForm } from "./canteenForm";
import { Card } from "../ui/card";
import { FaBasketShopping } from "react-icons/fa6";

const CanteenHeader = () => {
  return (
    <Card
      className="w-full h-[7vh] flex justify-between items-center px-4 pl-2  rounded-xl mb-1
    "
    >
      <div className="flex flex-row justify-center items-center">
        <div className="w-[5vh] h-[5vh] rounded-lg bg-slate-400 mr-3 flex justify-center items-center">
          <FaBasketShopping size={30} className=" drop-shadow-lg text-white" />
        </div>
        <div>
          <p className="text-xl font-extrabold">Canteen</p>
          <p className="text-[12px] text-slate-500">
            Welcome to the Canteen Management screen. Here, you can efficiently
            manage canteen accounts:
          </p>
        </div>
      </div>
      <CanteenForm />
    </Card>
  );
};

export default CanteenHeader;
