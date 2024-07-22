"use client";
import { Button } from "@/components/ui/button";
import * as z from "zod";

import { Label } from "@/components/ui/label";
import { UserSchema } from "@/schemas";
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
import { rank, role, roleBasedDropdown } from "@/config/const";
import CustomMultiSelectDropDown from "../common/customMultiSelectDropDown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCanteen } from "@/action-data/canteenAction";
import { devNull } from "os";
import { loggedInUserStore, userRoleStore } from "@/state/state";

interface UserFormProps {
  type?: string;
  userData?: UserData;
  lable?: boolean;
}

export function UserForm({
  type = "Add",
  lable = false,
  userData,
}: UserFormProps) {
  const queryClient = useQueryClient();
  const userFormRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const { role: userRole } = userRoleStore();
  const { user } = loggedInUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userForm = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone_no: "",
      rank: "Sep",
      role: [],
      canteen_id:
        userRole === "ADMIN"
          ? null
          : user?.manage_canteen
          ? user?.manage_canteen?.id
          : user?.canteen_id,
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

  // For Create and Update Update
  const createUserData = useMutation({
    mutationFn: async (value: any) => {
      const user =
        type === "Add"
          ? await createUser(value)
          : await updateUser(userData?.id!, value);
      return user;
    },
    onSuccess: (value) => {
      setIsLoading(false);
      if (value.success) {
        toast.success(`${value.message}`, {
          position: "top-right",
          dismissible: true,
        });
        queryClient.invalidateQueries({ queryKey: ["user"] });
        userForm.reset();
        if (userFormRef.current) {
          userFormRef.current.click();
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
  const userFormSubmit = (values: z.infer<typeof UserSchema>) => {
    setIsLoading(true);
    if (userRole === "MANAGER") {
      values.canteen_id = user?.manage_canteen?.id;
    }
    if (userRole === "STAFF") {
      values.canteen_id = user?.canteen_id;
    }
    createUserData.mutate(values);
  };

  useEffect(() => {
    if (userData) {
      userForm.setValue("email", userData?.email);
      userForm.setValue("name", userData?.name);
      userForm.setValue("phone_no", userData?.phone_no);
      userForm.setValue("rank", userData?.rank);
      userForm.setValue("role", userData?.role);
      userForm.setValue("canteen_id", userData?.canteen_id);
    }
  }, [userData]);

  return (
    <Sheet>
      <SheetTrigger ref={userFormRef} asChild>
        <Button
          className={`p-1 px-3 rounded-lg  group ${
            type === "Add" && "hover:bg-slate-100 "
          }`}
          variant={"ghost"}
        >
          {type == "Add" && (
            <>
              Add User{" "}
              <FaPlus className="ml-2  group-hover:rotate-45 duration-500" />
            </>
          )}{" "}
          {type === "Update" && <FaEdit size={12} />}
          {type === "View" && <FaEye size={12} />}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[525px] ">
        <SheetHeader className="w-full border-x-4 border-x-slate-600 bg-gray-50   my-4 p-2 rounded-md">
          <SheetTitle className="flex  text-black font-black  justify-center items-center">
            {type} User <FcManager className="ml-2" />
          </SheetTitle>
        </SheetHeader>
        <Form {...userForm}>
          <form
            onSubmit={userForm.handleSubmit(userFormSubmit)}
            className="p-2 w-full h-[85vh] rounded-lg flex flex-col justify-between items-center bg-slate-100"
          >
            <div className="w-full grid grid-col-1  gap-2">
              <FormField
                control={userForm.control}
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
                control={userForm.control}
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
                control={userForm.control}
                disabled={isPending}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>Email</Label>
                    <FormControl>
                      <CustomInputField
                        placeholder={""}
                        field={field}
                        className="rounded-[2px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!userData && (
                <FormField
                  control={userForm.control}
                  disabled={isPending}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Password</Label>
                      <FormControl>
                        <CustomInputField
                          placeholder={""}
                          field={field}
                          className="rounded-[2px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={userForm.control}
                disabled={isPending}
                name="role"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full justify-start items-start">
                    <Label>Roles</Label>
                    <FormControl>
                      <CustomMultiSelectDropDown
                        dropDownData={
                          roleBasedDropdown[
                            userRole === "ADMIN"
                              ? "ADMIN"
                              : userRole === "MANAGER"
                              ? "MANAGER"
                              : "STAFF"
                          ]
                        }
                        selectedData={userForm.watch("role")!}
                        onChange={(data: string) => {
                          const selectedData = userForm.watch("role");
                          if (selectedData?.includes(data)) {
                            const filteredData = selectedData.filter(
                              (role) => role !== data
                            );
                            userForm.setValue("role", filteredData);
                          } else {
                            selectedData!.push(data);
                            userForm.setValue("role", selectedData);
                          }

                          if (userForm.watch("role")?.includes("MANAGER")) {
                            userForm.setValue("canteen_id", null);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                disabled={isPending}
                name="rank"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full justify-start items-start">
                    <Label>Rank</Label>
                    <FormControl>
                      <Select
                        value={userForm.watch("rank")}
                        onValueChange={(value) => {
                          userForm.setValue("rank", value);
                          userForm.clearErrors("rank");
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Rank" />
                        </SelectTrigger>
                        <SelectContent>
                          {rank.map((info, index) => {
                            return (
                              <SelectItem key={index} value={info}>
                                {info}
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
              {!userForm.watch("role")?.includes("MANAGER") &&
                userRole === "ADMIN" && (
                  <FormField
                    control={userForm.control}
                    disabled={isPending}
                    name="canteen_id"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Canteen</Label>
                        <FormControl>
                          <Select
                            value={userForm.watch("canteen_id") || ""}
                            onValueChange={(value) => {
                              userForm.setValue("canteen_id", value);
                              userForm.clearErrors("canteen_id");
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
                  type="button"
                  variant={"outline"}
                  onClick={() => {
                    if (userFormRef.current) {
                      userFormRef.current.click();
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
                    "Add User"
                  ) : (
                    "Update User"
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
