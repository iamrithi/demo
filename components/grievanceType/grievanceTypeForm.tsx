"use client";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { GrievanceTypeSchema } from "@/schemas";
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
import { toast } from "sonner";
import { createUser, updateUser } from "@/action-data/userAction";
import CustomInputField from "../common/customInputField";
import { useEffect, useRef, useState, useTransition } from "react";
import { ClockLoader } from "react-spinners";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaqTypeData, GrievanceTypeData, UserData } from "@/types";
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
import { createFaqType, updateFaqType } from "@/action-data/faqTypeAction";
import {
  createGrievanceType,
  updateGrievanceType,
} from "@/action-data/grievanceTypeAction";

interface UserFormProps {
  type?: string;
  lable?: boolean;
  grievanceTypeData?: GrievanceTypeData;
}

export function GrievanceTypeForm({
  type = "Add",
  lable = false,
  grievanceTypeData,
}: UserFormProps) {
  const [managers, setManager] = useState<UserData[] | null>([]);
  const queryClient = useQueryClient();

  const FaqTypeFormRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const grievanceTypeForm = useForm<z.infer<typeof GrievanceTypeSchema>>({
    resolver: zodResolver(GrievanceTypeSchema),
    defaultValues: {
      name: "",
    },
  });

  const createGrievanceData = useMutation({
    mutationFn: async (value: any) => {
      const canteen =
        type === "Add"
          ? await createGrievanceType(value)
          : await updateGrievanceType(grievanceTypeData?.id!, value);
      return canteen;
    },
    onSuccess: (value) => {
      if (value.success) {
        toast.success(`${value.message}`, {
          position: "top-right",
          dismissible: true,
        });
        queryClient.invalidateQueries({ queryKey: ["grievanceType"] });
        grievanceTypeForm.reset();
        if (FaqTypeFormRef.current) {
          FaqTypeFormRef.current.click();
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

  useEffect(() => {
    if (!grievanceTypeData) return;
    if (grievanceTypeData) {
      grievanceTypeForm.setValue("name", grievanceTypeData?.name);
    }
  }, [grievanceTypeData]);
  const FaqTypeFormSubmit = (values: z.infer<typeof GrievanceTypeSchema>) => {
    startTransition(async () => {
      createGrievanceData.mutate(values);
    });
  };

  return (
    <Sheet>
      <SheetTrigger ref={FaqTypeFormRef} asChild>
        <Button
          className={`p-1 px-3 rounded-lg group ${
            type === "Add" && "hover:bg-slate-100 "
          }`}
          variant={"ghost"}
        >
          {type == "Add" && (
            <>
              Add Grievance Type{" "}
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
            {type} Grievance Type
          </SheetTitle>
        </SheetHeader>

        <Form {...grievanceTypeForm}>
          <form
            onSubmit={grievanceTypeForm.handleSubmit(FaqTypeFormSubmit)}
            className="p-2 w-full h-[85vh] rounded-lg flex flex-col justify-between items-center bg-gray-50 "
          >
            <div className="w-full grid grid-col-1  gap-2">
              <FormField
                control={grievanceTypeForm.control}
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
            </div>
            {type !== "View" && (
              <div className="w-full flex flex-row  p-2 justify-end gap-3">
                <Button
                  className="flex-1"
                  variant={"outline"}
                  type="button"
                  onClick={() => {
                    if (FaqTypeFormRef.current) {
                      FaqTypeFormRef.current.click();
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className=" flex-1 bg-slate-800 ">
                  {isPending ? (
                    <ClockLoader color={"#ffffff"} size={20} />
                  ) : type === "Add" ? (
                    "Add Grievance Type"
                  ) : (
                    "Update Grievance Type"
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
