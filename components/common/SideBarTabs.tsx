/* trunk-ignore-all(prettier) */
"use client";
import React from "react";
import { TabData } from "@/types/index";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "../ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { checkRole } from "@/action-data/checkRole";
import { LayoutGridIcon } from "lucide-react";
import { userRoleStore } from "@/state/state";

interface SideBarTabProps {
  isToggles: boolean;
  tabs: TabData[];
  onMouseOver: Function;
}

const SideBarTabs = (datas: SideBarTabProps) => {
  const { isToggles, tabs, onMouseOver } = datas;
  const { role } = userRoleStore();
  const path = usePathname();
  ("");

  return (
    <nav
      className="flex flex-col "
      onMouseDown={() => {
        onMouseOver();
      }}
      onMouseLeave={() => {
        onMouseOver();
      }}
    >
      {tabs?.map(({ icon: Icon, ...value }, index: number) => {
        if (value.accessFor?.includes(role!))
          return (
            <Link
              key={index}
              href={value.link}
              className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm font-black transition-colors hover:bg-muted hover:text-foreground ${
                path === value.link && "  bg-muted shadow-sm "
              }`}
              prefetch={false}
            >
              <div
                className={`p-1 ${
                  path === value.link && " bg-white rounded-sm shadow-sm"
                } duration-500`}
              >
                <Icon size={20} />
              </div>

              <p className="text-[14px] font-black"> {value.label}</p>
            </Link>
          );
      })}
    </nav>
  );
};

export default SideBarTabs;
