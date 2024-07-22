"use client";
import { Button } from "@/components/ui/button";
import * as z from "zod";

import { Label } from "@/components/ui/label";
import { CanteenSchema, FaqSchema, FaqTypeSchema } from "@/schemas";
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
import { ClockLoader } from "react-spinners";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CanteenData, FaqData, FaqTypeData, UserData } from "@/types";
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
import { getAllFaqType } from "@/action-data/faqTypeAction";
import { createFaq, deleteFaq, updateFaq } from "@/action-data/faqAction";

interface FaqFormProps {
  type?: string;
  lable?: boolean;
  faqData?: FaqData;
}

export function FaqForm({
  type = "Add",
  lable = false,
  faqData,
}: FaqFormProps) {
  const queryClient = useQueryClient();
  const {
    data: faqTypes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["faqType"],
    queryFn: async () => {
      const data = await getAllFaqType();
      return data.data as FaqTypeData[];
    },
    staleTime: 0,
  });
  const faqFormRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const faqForm = useForm<z.infer<typeof FaqSchema>>({
    resolver: zodResolver(FaqSchema),
    defaultValues: {
      answer: "",
      question: "",
      type_id: "",
    },
  });

  const createFaqData = useMutation({
    mutationFn: async (value: any) => {
      const canteen =
        type === "Add"
          ? await createFaq(value)
          : await updateFaq(faqData?.id!, value);
      return canteen;
    },
    onSuccess: (value) => {
      if (value.success) {
        toast.success(`${value.message}`, {
          position: "top-right",
          dismissible: true,
        });
        queryClient.invalidateQueries({ queryKey: ["faq"] });
        faqForm.reset();
        if (faqFormRef.current) {
          faqFormRef.current.click();
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
  const deleteItem = useMutation({
    mutationFn: async (value: FaqData) => {
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

      if (faqFormRef.current) {
        faqFormRef.current.click();
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
    if (!faqData) return;
    if (faqData) {
      faqForm.setValue("question", faqData?.question);
      faqForm.setValue("answer", faqData?.answer);
      faqForm.setValue("type_id", faqData?.type_id);
    }
  }, [faqData]);

  const faqFormSubmit = (values: z.infer<typeof FaqSchema>) => {
    startTransition(async () => {
      createFaqData.mutate(values);
    });
  };

  return (
    <Sheet>
      <SheetTrigger ref={faqFormRef} asChild>
        <Button
          className={`p-1 px-3 rounded-lg group ${
            type === "Add" && "hover:bg-slate-100 "
          }`}
          variant={"ghost"}
        >
          {type == "Add" && (
            <>
              Add Faq{" "}
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
            {type} Faq
          </SheetTitle>
        </SheetHeader>

        <Form {...faqForm}>
          <form
            onSubmit={faqForm.handleSubmit(faqFormSubmit)}
            className="p-2 w-full h-[85vh] rounded-lg flex flex-col justify-between items-center bg-gray-50 "
          >
            <div className="w-full grid grid-col-1  gap-2">
              <FormField
                control={faqForm.control}
                disabled={isPending}
                name="type_id"
                render={({ field }) => (
                  <FormItem>
                    <Label>Manager</Label>
                    <FormControl>
                      <Select
                        value={faqForm.watch("type_id")}
                        onValueChange={(value) => {
                          faqForm.setValue("type_id", value);
                          faqForm.clearErrors("type_id");
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {faqTypes?.map((info, index) => {
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
                control={faqForm.control}
                disabled={isPending}
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
              <FormField
                control={faqForm.control}
                disabled={isPending}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <Label>Answer</Label>
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
            </div>
            {type !== "View" && (
              <div className="w-full flex flex-row  p-2 justify-end gap-3">
                <Button
                  className="flex-1"
                  variant={"outline"}
                  type="button"
                  onClick={() => {
                    if (faqFormRef.current) {
                      faqFormRef.current.click();
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
                      deleteItem.mutate(faqData!);
                    }}
                  >
                    Delete
                  </Button>
                )}
                <Button type="submit" className=" flex-1 bg-slate-800 ">
                  {isPending ? (
                    <ClockLoader color={"#ffffff"} size={20} />
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
