import React from "react";
import { Button } from "../ui/button";
import { DocumentForm } from "./documentForm";
import { Card } from "../ui/card";
import { GiFiles } from "react-icons/gi";

const DocumentHeader = () => {
  return (
    <Card
      className="w-full h-[7vh] flex justify-between items-center px-4 pl-2  rounded-xl mb-1
    "
    >
      <div className="flex flex-row justify-center items-center">
        <div className="w-[5vh] h-[5vh] rounded-lg bg-slate-400 mr-3 flex justify-center items-center">
          <GiFiles size={30} className=" drop-shadow-lg text-white" />
        </div>
        <div>
          <p className="text-xl font-extrabold">Documets</p>
          <p className="text-[12px] text-slate-500">
            Welcome to the Documents Management screen. Here, you can
            efficiently manage documents:
          </p>
        </div>
      </div>
      <DocumentForm />
    </Card>
  );
};

export default DocumentHeader;
