import React from "react";
import { FcAddColumn, FcManager, FcPlus } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaqTypeForm } from "./faqTypeForm";
import { Card } from "../ui/card";
import { PiListNumbersFill } from "react-icons/pi";

const FaqTypeHeader = () => {
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
          <p className="text-xl font-extrabold">Faq Types</p>
          <p className="text-[12px] text-slate-500">
            Welcome to the Faq Type Management screen. Here, you can efficiently
            manage faq type:
          </p>
        </div>
      </div>
      <FaqTypeForm />
    </Card>
  );
};

export default FaqTypeHeader;
