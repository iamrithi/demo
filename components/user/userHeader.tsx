import React from "react";
import { FcAddColumn, FcManager, FcPlus } from "react-icons/fc";
import { Button } from "../ui/button";
import { UserForm } from "./userAddForm";
import { Card } from "../ui/card";
import { BsPeopleFill } from "react-icons/bs";

const UserHeader = () => {
  return (
    <Card
      className="w-full h-[7vh] flex justify-between items-center px-4 pl-2 rounded-xl mb-1
    "
    >
      <div className="flex flex-row justify-center items-center">
        <div className="w-[5vh] h-[5vh] rounded-lg bg-slate-400 mr-3 flex justify-center items-center">
          <BsPeopleFill size={30} className=" drop-shadow-lg text-white" />
        </div>
        <div>
          <p className="text-xl font-extrabold">Users</p>
          <p className="text-[12px] text-slate-500">
            Welcome to the User Management screen. Here, you can efficiently
            manage user accounts:
          </p>
        </div>
      </div>
      <UserForm />
    </Card>
  );
};

export default UserHeader;
