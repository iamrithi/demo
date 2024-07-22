"use client";

import classNames from "classnames";
import React, { useState, useMemo } from "react";

import { Button } from "../ui/button";
import Image from "next/image";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import SideBarTabs from "./SideBarTabs";
import { adminTabs } from "@/config/const";
import { TabData } from "@/types";
import { MountainIcon } from "lucide-react";

interface SidebarTabs {
  tabs?: TabData[];
  role?: string;
}

const SideBar = ({ role, tabs }: SidebarTabs) => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const wrapperClasses = classNames(
    "h-screen bg-white px-4 pt-2 pb-4 hidden justify-start flex-col lg:flex overflow-auto border-r-[1px] ",
    {
      "w-[230px]": !toggleCollapse,
      "w-[85px]": toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-theme absolute right-0 hover:bg-secondary",
    {
      "rotate-180": toggleCollapse,
      "rotate-0": !toggleCollapse,
    }
  );

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      {/* <div className="w-full h-[6.3vh] flex justify-end items-center ">
        {!toggleCollapse && <h1 className="text-black text-xl">VOrA</h1>}

        <div
          className={`w-full flex justify-end pl-4 items-center  ml-auto mb-2  ${
            toggleCollapse ? "rotate-180  " : "rotate-0"
          }`}
        >
          {isCollapsible && (
            <Button
              variant={"outline"}
              className="duration-500 group"
              onClick={handleSidebarToggle}
            >
              <FaAngleDoubleLeft className="text-neutral-300  group-hover:text-neutral-600" />
            </Button>
          )}
        </div>
      </div> */}
      <div className="flex justify-center items-center gap-2 px-4 py-6 border-b mb-1 rounded-sm shadow-sm ">
        <MountainIcon className="h-6 w-6" />
        <span className="text-red-500 font-black">VOrA</span>
      </div>
      <div className="overflow-y-auto flex-grow">
        <SideBarTabs
          tabs={adminTabs}
          isToggles={toggleCollapse}
          onMouseOver={() => setIsCollapsible(isCollapsible)}
        />
      </div>
    </div>
  );
};

export default SideBar;
