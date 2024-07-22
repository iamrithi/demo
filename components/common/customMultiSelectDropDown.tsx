"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface DropdownMenuProps {
  dropDownData: string[];
  selectedData: string[];
  onChange: (selectedData: string) => void;
}
const CustomMultiSelectDropDown = ({
  dropDownData = [],
  selectedData = [],
  onChange,
}: DropdownMenuProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValuse, setValuse] = useState<string[]>([]);

  useEffect(() => {
    setValuse((e) => [...selectedData]);
  }, [selectedData]);
  const handleCheckboxChange = (info: any) => {
    onChange(info);
  };
  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger
        className="w-full h-[38px] px-3 mr-1 ring-1 ring-theme rounded-sm bg-white flex justify-start items-center text-[13px]"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {selectedData.length < 1 ? (
          "Select Role"
        ) : (
          <div className="w-full flex justify-start items-center p-2 space-x-3">
            {selectedData.map((info, index) => (
              <Badge variant="default" key={index} className="rounded-sm">
                {info}
              </Badge>
            ))}
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[450px] bg-white ring-1 ring-white">
        {dropDownData.length < 1 ? (
          <DropdownMenuItem>No Data Found</DropdownMenuItem>
        ) : (
          dropDownData.map((info: any, index) => {
            return (
              <DropdownMenuCheckboxItem
                checked={selectedValuse.includes(info)}
                onCheckedChange={(e) => {
                  handleCheckboxChange(info);
                }}
                key={index}
                className="w-full"
              >
                <p className="text-sm text-gray-600 font-bold"> {info}</p>
              </DropdownMenuCheckboxItem>
            );
          })
        )}
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem className="w-full flex justify-end items-center">
          <Button
            onClick={() => {
              setOpen(!open);
            }}
          >
            Ok
          </Button>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomMultiSelectDropDown;
