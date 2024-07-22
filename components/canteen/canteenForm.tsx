"use client";
import { Button } from "@/components/ui/button";
import * as z from "zod";

import { Label } from "@/components/ui/label";
import { CanteenSchema } from "@/schemas";
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
import { useEffect, useRef, useState, useTransition } from "react";
import { ClockLoader, PuffLoader } from "react-spinners";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CanteenData, UserData } from "@/types";
import { FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { rank, role } from "@/config/const";
import CustomMultiSelectDropDown from "../common/customMultiSelectDropDown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllUser } from "@/action-data/userAction";
import { createCanteen, updateCanteen } from "@/action-data/canteenAction";

interface UserFormProps {
  type?: string;
  lable?: boolean;
  canteenData?: CanteenData;
}

export function CanteenForm({
  type = "Add",
  lable = false,
  canteenData,
}: UserFormProps) {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getAllUser();
      const manager = data.data.filter(
        (user: UserData) =>
          user.manage_canteen === null && user.role.includes("MANAGER")
      );
      setManager(manager);
      return data.data as UserData[];
    },
    staleTime: 0,
  });
  const [managers, setManager] = useState<UserData[] | null>([]);
  const queryClient = useQueryClient();

  const canteenFormRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const canteenForm = useForm<z.infer<typeof CanteenSchema>>({
    resolver: zodResolver(CanteenSchema),
    defaultValues: {
      address: "",
      name: "",
      phone_no: "",
      pincode: "",
      unique_id: "",
      manager_id: "",
    },
  });

  const createCanteenData = useMutation({
    mutationFn: async (value: any) => {
      const canteen =
        type === "Add"
          ? await createCanteen(value)
          : await updateCanteen(canteenData?.id!, value);
      return canteen;
    },
    onSuccess: (value) => {
      setIsLoading(false);
      if (value.success) {
        toast.success(`${value.message}`, {
          position: "top-right",
          dismissible: true,
        });
        queryClient.invalidateQueries({ queryKey: ["canteen"] });
        queryClient.invalidateQueries({ queryKey: ["user"] });
        canteenForm.reset();
        if (canteenFormRef.current) {
          canteenFormRef.current.click();
        }
      } else {
        setIsLoading(false);
        toast.error(`${value.message}`, {
          position: "top-right",
          dismissible: true,
        });
      }
    },
    onError: (value) => {
      toast.error(`${value.message}`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });

  useEffect(() => {
    if (!canteenData) return;
    if (canteenData) {
      canteenForm.setValue("name", canteenData?.name);
      canteenForm.setValue("address", canteenData?.address);
      canteenForm.setValue("phone_no", canteenData?.phone_no);
      canteenForm.setValue("pincode", canteenData?.pincode);
      canteenForm.setValue("unique_id", canteenData?.unique_id);
      canteenForm.setValue("manager_id", canteenData?.manager_id!);
    }
    if (canteenData.manager_id) {
      const canteen_manager = data?.find((manager: UserData) => {
        return manager.id === canteenData.manager_id;
      });

      if (data) {
        setManager((e) => [
          ...data?.filter(
            (user: UserData) =>
              user.manage_canteen === null && user.role.includes("MANAGER")
          )!,
          canteen_manager!,
        ]);
      }
    }
  }, [canteenData]);
  const userFormSubmit = (values: z.infer<typeof CanteenSchema>) => {
    setIsLoading(true);
    createCanteenData.mutate(values);
  };

  return (
    <Sheet>
      <SheetTrigger ref={canteenFormRef} asChild>
        <Button
          className={`p-1 px-3 rounded-lg group ${
            type === "Add" && "hover:bg-slate-100 "
          }`}
          variant={"ghost"}
        >
          {type == "Add" && (
            <>
              Add Canteen{" "}
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
            {type} Canteen
          </SheetTitle>
        </SheetHeader>

        <Form {...canteenForm}>
          <form
            onSubmit={canteenForm.handleSubmit(userFormSubmit)}
            className="p-2 w-full h-[85vh] rounded-lg flex flex-col justify-between items-center bg-gray-50 "
          >
            <div className="w-full grid grid-col-1  gap-2">
              <FormField
                control={canteenForm.control}
                disabled={isPending}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label>Name</Label>
                    <FormControl>
                      <CustomInputField
                        placeholder={""}
                        field={field}
                        className="rounded-[2px] "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={canteenForm.control}
                disabled={isPending}
                name="unique_id"
                render={({ field }) => (
                  <FormItem>
                    <Label>Unique ID</Label>
                    <FormControl>
                      <CustomInputField
                        placeholder={""}
                        field={field}
                        className="rounded-[2px] "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={canteenForm.control}
                disabled={isPending}
                name="phone_no"
                render={({ field }) => (
                  <FormItem>
                    <Label>Phone Number</Label>
                    <FormControl>
                      <CustomInputField
                        placeholder={""}
                        field={field}
                        className="rounded-[2px] "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={canteenForm.control}
                disabled={isPending}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <Label>Pin Code</Label>
                    <FormControl>
                      <CustomInputField
                        placeholder={""}
                        field={field}
                        className="rounded-[2px] "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={canteenForm.control}
                disabled={isPending}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <Label>Address</Label>
                    <FormControl>
                      <CustomInputField
                        placeholder={""}
                        field={field}
                        className="rounded-[2px] "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={canteenForm.control}
                disabled={isPending}
                name="manager_id"
                render={({ field }) => (
                  <FormItem>
                    <Label>Manager</Label>
                    <FormControl>
                      <Select
                        value={canteenForm.watch("manager_id")}
                        onValueChange={(value) => {
                          canteenForm.setValue("manager_id", value);
                          canteenForm.clearErrors("manager_id");
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Manager" />
                        </SelectTrigger>
                        <SelectContent>
                          {managers?.map((info, index) => {
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
            </div>
            {type !== "View" && (
              <div className="w-full flex flex-row  p-2 justify-end gap-3">
                <Button
                  className="flex-1"
                  variant={"outline"}
                  type="button"
                  onClick={() => {
                    if (canteenFormRef.current) {
                      canteenFormRef.current.click();
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className=" flex-1 bg-slate-800 ">
                  {isLoading ? (
                    <PuffLoader
                      color="white"
                      className="text-white text-[4px]"
                      size={20}
                    />
                  ) : type === "Add" ? (
                    "Add Canteen"
                  ) : (
                    "Update Canteen"
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
