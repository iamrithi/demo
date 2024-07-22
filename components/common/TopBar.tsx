"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { FaUserShield } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../ui/badge";
import { loggedInUserStore, userRoleStore } from "@/state/state";
import { IoMdLogOut } from "react-icons/io";
import SideBarTabs from "./SideBarTabs";
import { adminTabs } from "@/config/const";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TopBar = () => {
  const { role, setRole, removeRole } = userRoleStore();
  const { user } = loggedInUserStore();
  const path = usePathname();

  const session = useSession();
  return (
    <div className="w-full border-b-[1px] border-b-neutral-200 h-[6.8vh] bg-white flex justify-between items-center pr-6 ">
      <div className="px-4">
        <div className="block md:hidden w-[50px] h-full flx justify-center items-center">
          <Sheet>
            <SheetTrigger>
              <GiHamburgerMenu />
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]" side={"left"}>
              {/* <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader> */}
              <div className="overflow-y-auto flex-grow">
                {/* <SideBarTabs
                  tabs={adminTabs}
                  isToggles={false}
                  onMouseOver={() => {}}
                /> */}
                {adminTabs?.map(({ icon: Icon, ...value }, index: number) => {
                  if (value.accessFor?.includes(role!))
                    return (
                      <SheetClose key={index} className="w-full">
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
                              path === value.link &&
                              " bg-white rounded-sm shadow-sm"
                            } duration-500`}
                          >
                            <Icon size={20} />
                          </div>

                          <p className="text-[14px] font-black">
                            {" "}
                            {value.label}
                          </p>
                        </Link>
                      </SheetClose>
                    );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {role !== "ADMIN" && (
          <p className="text-2xl font-black ml-6">
            {user?.manage_canteen
              ? user?.manage_canteen.name
              : user?.canteen?.name}
          </p>
        )}
      </div>
      <div>
        <Badge className="mr-6">{role}</Badge>
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarFallback>
                <FaUserShield className="shadow-sm" />
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            className="shadow-3xl h-1/4 rounded-xl shadow-xl mr-4 bg-white/30 backdrop-blur-[7px] cursor-pointer"
          >
            <div className="w-full h-auto flex flex-row justify-start items-start p-1">
              <div className="w-[50px] h-full border-r flex flex-col justify-start items-center">
                <div className="w-[40px] h-[40px]  rounded-sm flex justify-center items-center ">
                  <FaUserShield size={20} />
                </div>
                <div className="w-[40px] h-[40px]  rounded-sm flex justify-center items-center ">
                  <SiGmail size={20} />
                </div>
              </div>
              <div className="flex-1 h-full ">
                <div className="w-full h-[40px] rounded-sm flex justify-start items-center  pl-2 first-letter:capitalize text-slate-700">
                  {session.data?.user.name}
                </div>
                <div className="w-full h-[40px] rounded-sm flex justify-start items-center  pl-2 first-letter:capitalize text-slate-700">
                  {session.data?.user.email}
                </div>
              </div>
            </div>

            <hr />
            <div className="py-2 font-black ">Roles :)</div>

            <div className="w-full h-auto flex flex-wrap mb-2">
              {session &&
                session.data?.user?.role?.length > 0 &&
                session.data?.user?.role?.map((info: any, index: any) => (
                  <Badge key={index}>{info}</Badge>
                ))}
            </div>
            <hr />
            <Button
              className="my-3 w-full flex justify-center items-center space-x-3"
              variant={"outline"}
              onClick={() => {
                signOut();
              }}
            >
              <IoMdLogOut />{" "}
              <div className=" group-hover:block duration-700">Log Out</div>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TopBar;
