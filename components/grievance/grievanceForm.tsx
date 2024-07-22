"use client";
import { Button } from "@/components/ui/button";
import * as z from "zod";

import { Label } from "@/components/ui/label";
import { GrievanceSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import CustomInputField from "../common/customInputField";
import { useEffect, useRef, useState, useTransition } from "react";
import { ClockLoader } from "react-spinners";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CanteenData, GrievanceData, UserData } from "@/types";
import { FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { grievanceTypes, rank, role } from "@/config/const";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllUser } from "@/action-data/userAction";
import { createGrievance, updateGrievance } from "@/action-data/grievance";
import { getAllCanteen } from "@/action-data/canteenAction";
import { Terminal } from "lucide-react";
import { FaInfo } from "react-icons/fa6";

interface GrievanceFormProps {
  type?: string;
  lable?: boolean;
  grievanceData?: GrievanceData;
}

export function GrievanceForm({
  type = "Add",
  lable = false,
  grievanceData,
}: GrievanceFormProps) {
  const [managers, setManager] = useState<UserData[] | null>([]);
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getAllUser();
      return data.data as UserData[];
    },
    staleTime: 0,
  });
  const { data: canteen } = useQuery({
    queryKey: ["canteen"],
    queryFn: async () => {
      const data = await getAllCanteen();
      return data.data as CanteenData[];
    },
    staleTime: 0,
  });

  const GrivanceFormRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const grievanceForm = useForm<z.infer<typeof GrievanceSchema>>({
    resolver: zodResolver(GrievanceSchema),
    defaultValues: {
      type: "",
      question: "",
      canteen_id: "",
      user_id: "",
      answer: "",
    },
  });

  const createGrievanceData = useMutation({
    mutationFn: async (value: any) => {
      console.log(value);
      const canteen =
        type === "Add"
          ? await createGrievance(value)
          : await updateGrievance(grievanceData?.id!, {
              ...value,
              status: "RESOLVED",
            });
      return canteen;
    },
    onSuccess: (value) => {
      if (value.success) {
        toast.success(`${value.message}`, {
          position: "top-right",
          dismissible: true,
        });
        queryClient.invalidateQueries({ queryKey: ["grievance"] });
        grievanceForm.reset();
        if (GrivanceFormRef.current) {
          GrivanceFormRef.current.click();
        }
      } else {
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

  const statusChange = async () => {
    grievanceData?.status === "PENDING" &&
      (await updateGrievance(grievanceData?.id!, { status: "INPROGRESS" }));
  };

  useEffect(() => {
    if (!grievanceData) return;
    if (grievanceData) {
      grievanceForm.setValue("canteen_id", grievanceData?.canteen?.id!);
      grievanceForm.setValue("user_id", grievanceData?.user_id);
      grievanceForm.setValue("type", grievanceData?.type);
      grievanceForm.setValue("question", grievanceData?.question);
      grievanceForm.setValue("answer", grievanceData?.answer);
    }
  }, [grievanceData]);

  const grievanceFormSubmit = (values: z.infer<typeof GrievanceSchema>) => {
    if (values.answer?.trim() === "")
      return grievanceForm.setError("answer", {
        message: "Please enter the  answer",
      });
    values.user_id = grievanceData?.user_id;
    values.canteen_id = grievanceData?.canteen_id;
    values.question = grievanceData?.question;
    values.type = grievanceData?.type!;

    createGrievanceData.mutate(values);
    queryClient.invalidateQueries({ queryKey: ["grievance"] });
  };

  return (
    <Sheet>
      <SheetTrigger
        ref={GrivanceFormRef}
        asChild
        onClick={() => {
          statusChange();
        }}
      >
        <Button
          className={`p-1 px-3 rounded-lg group ${
            type === "Add" && "hover:bg-slate-100 "
          }`}
          variant={"ghost"}
        >
          {type == "Add" && (
            <>
              Add Grievance{" "}
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
            {type} Grievance
          </SheetTitle>
        </SheetHeader>

        <Form {...grievanceForm}>
          <form
            onSubmit={grievanceForm.handleSubmit(grievanceFormSubmit)}
            className="p-2 w-full h-[85vh] rounded-lg flex flex-col justify-between items-center bg-gray-50 "
          >
            <div className="w-full grid grid-col-1  gap-2">
              <FormField
                control={grievanceForm.control}
                disabled={isPending}
                name="user_id"
                render={({ field }) => (
                  <FormItem>
                    <Label>User</Label>
                    <FormControl>
                      <Select
                        disabled={type !== "Add"}
                        value={grievanceForm.watch("user_id")!}
                        onValueChange={(value) => {
                          grievanceForm.setValue("user_id", value);
                          grievanceForm.clearErrors("user_id");
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select User" />
                        </SelectTrigger>
                        <SelectContent>
                          {user?.map((info, index) => {
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
              <FormField
                disabled={type !== "Add"}
                control={grievanceForm.control}
                name="canteen_id"
                render={({ field }) => (
                  <FormItem>
                    <Label>Canteen</Label>
                    <FormControl>
                      <Select
                        disabled={type !== "Add"}
                        value={grievanceForm.watch("canteen_id")!}
                        onValueChange={(value) => {
                          grievanceForm.setValue("canteen_id", value);
                          grievanceForm.clearErrors("canteen_id");
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Canteen" />
                        </SelectTrigger>
                        <SelectContent>
                          {canteen?.map((info, index) => {
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
              <FormField
                control={grievanceForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <Label>Grievance Type</Label>
                    <FormControl>
                      <Select
                        disabled={type !== "Add"}
                        value={grievanceForm.watch("type")}
                        onValueChange={(value) => {
                          grievanceForm.setValue("type", value);
                          grievanceForm.clearErrors("type");
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {grievanceTypes?.map((info, index) => {
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
              <FormField
                control={grievanceForm.control}
                disabled={type !== "Add"}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <Label>Question</Label>
                    <FormControl>
                      <CustomInputField
                        isTextArea={true}
                        placeholder={""}
                        field={field}
                        className="rounded-[2px] "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <hr />
              {type !== "Add" && (
                <FormField
                  control={grievanceForm.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Resolving Answer</Label>
                      <FormControl>
                        <CustomInputField
                          isTextArea={true}
                          placeholder={""}
                          field={field}
                          className="rounded-[2px] "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            {grievanceData?.status !== "RESOLVED" && (
              <Alert
                variant={"default"}
                className="bg-blue-50 border-1 border-blue-500"
              >
                <FaInfo className="h-4 w-4 text-blue-500" color="blue" />
                <AlertTitle className="text-blue-500">Alert</AlertTitle>
                <AlertDescription className="text-black">
                  The status of the grievance has changed. The grievance has
                  been Inprogress.
                </AlertDescription>
              </Alert>
            )}
            {type !== "View" && (
              <div className="w-full flex flex-row  p-2 justify-end gap-3">
                <Button
                  className="flex-1"
                  variant={"outline"}
                  onClick={() => {
                    grievanceForm.reset();
                    if (GrivanceFormRef.current) {
                      GrivanceFormRef.current.click();
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className=" flex-1 bg-slate-800 ">
                  {isPending ? (
                    <ClockLoader color={"#ffffff"} size={20} />
                  ) : type === "Add" ? (
                    "Add Grievance"
                  ) : (
                    "Resolve Grievance"
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
