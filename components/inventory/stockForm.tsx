"use client";
import { Button } from "@/components/ui/button";
import * as z from "zod";

import { Label } from "@/components/ui/label";
import { StockSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FcManager, FcPlus } from "react-icons/fc";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "../ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { createUser, updateUser } from "@/action-data/userAction";
import CustomInputField from "../common/customInputField";
import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";
import { ClockLoader, PuffLoader } from "react-spinners";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CanteenData, DocumentData, FaqTypeData, UserData } from "@/types";
import { FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { docTypes, rank, role } from "@/config/const";
import CustomMultiSelectDropDown from "../common/customMultiSelectDropDown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllUser } from "@/action-data/userAction";
import { createStock, updateStock } from "@/action-data/stockAction";
import { getAllFaqType } from "@/action-data/faqTypeAction";
import { createFaq, deleteFaq, updateFaq } from "@/action-data/faqAction";
import { Input } from "../ui/input";
import axios from "axios";
import { Axios } from "@/lib/axios";
import { getAllCanteen } from "@/action-data/canteenAction";
import { loggedInUserStore, userRoleStore } from "@/state/state";

interface StockFormProps {
  type?: string;
  lable?: boolean;
  documentData?: DocumentData;
}

export function StockForm({
  type = "Add",
  lable = false,
  documentData,
}: StockFormProps) {
  const queryClient = useQueryClient();
  const { role: userRole } = userRoleStore();
  const { user } = loggedInUserStore();
  const stockFormRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const stockForm = useForm<z.infer<typeof StockSchema>>({
    resolver: zodResolver(StockSchema),
    defaultValues: {
      file: null,
      canteen_id:
        userRole === "ADMIN"
          ? ""
          : userRole === "MANAGER"
          ? user?.manage_canteen?.id!
          : user?.canteen_id!,
    },
  });
  //For Canteen Fetch
  const { data } = useQuery({
    queryKey: ["canteen"],
    queryFn: async () => {
      const data = await getAllCanteen();
      return data.data as CanteenData[];
    },
    staleTime: 0,
  });

  const createStockData = useMutation({
    mutationFn: async (value: any) => {
      const formData: FormData = new FormData();
      formData.append("file", value.file as File);
      formData.append("canteen_id", value.canteen_id);

      const document = await createStock(formData);
      return document;
    },
    onSuccess: (value) => {
      setIsLoading(false);
      if (value.success) {
        toast.success(`${value.message}`, {
          position: "top-right",
          dismissible: true,
        });
        queryClient.invalidateQueries({ queryKey: ["stock"] });
        stockForm.reset();
        if (stockFormRef.current) {
          stockFormRef.current.click();
        }
      } else {
        toast.error(`${value.message}`, {
          position: "top-right",
          dismissible: true,
        });
      }
    },
    onError: (value) => {
      setIsLoading(false);

      toast.error(`${value.message}`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });
  const deleteItem = useMutation({
    mutationFn: async (value: DocumentData) => {
      const deleteCode: any = await deleteFaq(value.id);
      return deleteCode;
    },
    onSuccess: (value) => {
      if (value?.success) {
        toast.success(`${value.message}`, {
          position: "top-right",
          dismissible: true,
        });
      } else {
        toast.error(`${value.message}`, {
          position: "top-right",
          dismissible: true,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["faq"] });

      if (stockFormRef.current) {
        stockFormRef.current.click();
      }
    },
    onError: (value) => {
      toast.error(`${value.message}`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });

  const documentFormSubmit = (values: z.infer<typeof StockSchema>) => {
    setIsLoading(true);
    if (userRole === "ADMIN") {
      values.canteen_id?.trim() === "" &&
        stockForm.setError("canteen_id", { message: "Select a Canteen" });
    }
    if (userRole === "MANAGER") {
      values.canteen_id = user?.manage_canteen?.id!;
    }
    if (userRole === "STAFF") {
      values.canteen_id = user?.canteen_id!;
    }
    createStockData.mutate(values);
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      stockForm.setValue("file", selectedFile);
    }
  };

  return (
    <Sheet>
      <SheetTrigger ref={stockFormRef} asChild>
        <Button
          className={`p-1 px-3 rounded-lg group ${
            type === "Add" && "hover:bg-slate-100 "
          }`}
          variant={"ghost"}
        >
          {type == "Add" && (
            <>
              Add Stock{" "}
              <FaPlus className="ml-2 group-hover:rotate-45 duration-500" />
            </>
          )}{" "}
          {type === "Update" && <FaEdit size={12} />}
          {type === "View" && <FaEye size={12} />}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[525px] ">
        <SheetHeader className="w-full border-x-4 border-x-slate-600 bg-gray-50   my-4 p-2 rounded-md">
          <SheetTitle className="flex  text-black font-black  justify-center items-center">
            {type} CSD-Stock
          </SheetTitle>
        </SheetHeader>

        <Form {...stockForm}>
          <form
            onSubmit={stockForm.handleSubmit(documentFormSubmit)}
            className="p-2 w-full h-[85vh] rounded-lg flex flex-col justify-between items-center bg-gray-50 "
          >
            <div className="w-full grid grid-col-1  gap-2">
              <FormField
                control={stockForm.control}
                disabled={isPending}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <Label>File</Label>
                    <FormControl>
                      {/* <CustomInputField
                        type="file"
                        placeholder={""}
                        field={field}
                        className="rounded-[2px] "
                      /> */}
                      <Input type="file" onChange={handleFileChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {userRole === "ADMIN" && (
                <FormField
                  control={stockForm.control}
                  disabled={isPending}
                  name="canteen_id"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Canteen</Label>
                      <FormControl>
                        <Select
                          value={stockForm.watch("canteen_id") || ""}
                          onValueChange={(value) => {
                            stockForm.setValue("canteen_id", value);
                            stockForm.clearErrors("canteen_id");
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Canteen" />
                          </SelectTrigger>
                          <SelectContent>
                            {data?.map((info, index) => {
                              return (
                                <SelectItem key={index} value={info.id}>
                                  {info.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            {type !== "View" && (
              <div className="w-full flex flex-row  p-2 justify-end gap-3">
                <Button
                  className="flex-1"
                  variant={"outline"}
                  type="button"
                  onClick={() => {
                    if (stockFormRef.current) {
                      stockFormRef.current.click();
                    }
                  }}
                >
                  Cancel
                </Button>
                {type === "Update" && (
                  <Button
                    type="button"
                    className="flex-1"
                    variant={"destructive"}
                    onClick={() => {
                      deleteItem.mutate(documentData!);
                    }}
                  >
                    Delete
                  </Button>
                )}
                <Button type="submit" className=" flex-1 bg-slate-800 ">
                  {isLoading ? (
                    <PuffLoader
                      color="white"
                      className="text-white text-[4px]"
                      size={20}
                    />
                  ) : type === "Add" ? (
                    "Add Faq"
                  ) : (
                    "Update Faq"
                  )}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
