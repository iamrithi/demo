import { TabData } from "@/types";
import { BsPeopleFill } from "react-icons/bs";
import { FaBasketShopping } from "react-icons/fa6";
import { PiListNumbersFill } from "react-icons/pi";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaQuora } from "react-icons/fa6";
import { RiQuestionnaireFill } from "react-icons/ri";

import { GiFiles } from "react-icons/gi";
import { RiTodoFill } from "react-icons/ri";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
export const STAFF_LOGIN_REDIRECT = "/user";
export const adminTabs: TabData[] = [
  {
    id: 1,
    label: "Dashboard",
    icon: TbLayoutDashboardFilled,
    link: "/dashboard",
    accessFor: ["ADMIN", "MANAGER"],
  },
  {
    id: 2,
    label: "User",
    icon: BsPeopleFill,
    link: "/user",
    accessFor: ["ADMIN", "MANAGER", "STAFF"],
  },
  {
    id: 3,
    label: "Canteen",
    icon: FaBasketShopping,
    link: "/canteen",
    accessFor: ["ADMIN"],
  },
  {
    id: 4,
    label: "Canteen Stock",
    icon: RiTodoFill,
    link: "/stock",
    accessFor: ["ADMIN", "MANAGER"],
  },
  {
    id: 5,
    label: "Documents",
    icon: GiFiles,
    link: "/docs",
    accessFor: ["ADMIN"],
  },
  {
    id: 6,
    label: "Grievance",
    icon: RiQuestionnaireFill,
    link: "/grievance",
    accessFor: ["ADMIN", "MANAGER"],
  },
  {
    id: 7,
    label: "Faq",
    icon: FaQuora,
    link: "/faq",
    accessFor: ["ADMIN"],
  },

  {
    id: 8,
    label: "Faq Types",
    icon: PiListNumbersFill,
    link: "/faq/type",
    accessFor: ["ADMIN"],
  },
  {
    id: 9,
    label: "Grievance Types",
    icon: PiListNumbersFill,
    link: "/grievance/type",
    accessFor: ["ADMIN"],
  },
];
export const roleBasedDropdown = {
  SUPER_ADMIN: ["SUPER_ADMIN", "ADMIN", "MANAGER", "STAFF", "USER"],
  ADMIN: ["ADMIN", "MANAGER", "STAFF", "USER"],
  MANAGER: ["STAFF", "USER"],
  STAFF: ["USER"],
};
export const role = ["ADMIN", "MANAGER", "STAFF", "USER"];
export const rank = [
  "Sep",
  "LNk",
  "Nk",
  "Hav",
  "Nb_Sub",
  "Sub",
  "Sub_Maj",
  "Lt2",
  "Lt",
  "Capt",
  "Maj",
  "Lt_Col",
  "Col",
  "Brig",
  "Maj_Gen",
  "Lt_Gen",
  "Gen",
  "Fd_Marshal",
];
export const docTypes = [
  "PENSION FORMS",
  "PENSION ADVISORIES",
  "SPARSH ADVISORIES",
  "ECHS ADVISORIES",
  "ECHS FORM",
];
export const faqTypes = ["SPARSH", "PENSION", "MISC"];
export const grievanceTypes = [
  "ECHS",
  "SPARSH",
  "Pension",
  "Misc",
  "General",
  "AWPO",
];
