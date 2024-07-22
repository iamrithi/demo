import React from "react";
import { Button } from "../ui/button";
import { CiMenuKebab } from "react-icons/ci";
import { Ghost } from "lucide-react";

const SideBarFooter = ({ isCollapse }: { isCollapse: boolean }) => {
  return (
    <div className="w-full h-full justify-center items-center flex border-t-[1px] ">
      {!isCollapse && (
        <p className="text-[12px] text-neutral-500  font-bold text-center">
          © 2024 VOrA. All rights reserved.
        </p>
      )}
      <Button variant={"outline"} className="p-1 px-3">
        <CiMenuKebab />
      </Button>
    </div>
  );
};

export default SideBarFooter;
