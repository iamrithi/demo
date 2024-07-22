"use client";
import { Button } from "@/components/ui/button";
import * as z from "zod";

import { Label } from "@/components/ui/label";
import {
  CanteenSchema,
  DocumentSchema,
  FaqSchema,
  FaqTypeSchema,
} from "@/schemas";
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
import { createDocument, updateDocument } from "@/action-data/documents";
import { getAllFaqType } from "@/action-data/faqTypeAction";
import { createFaq, deleteFaq, updateFaq } from "@/action-data/faqAction";
import { Input } from "../ui/input";
import axios from "axios";
import { Axios } from "@/lib/axios";

interface DocumentFormProps {
  type?: string;
  lable?: boolean;
  documentData?: DocumentData;
}

export function DocumentForm({
  type = "Add",
  lable = false,
  documentData,
}: DocumentFormProps) {
  const queryClient = useQueryClient();

  const documentFormRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const documentForm = useForm<z.infer<typeof DocumentSchema>>({
    resolver: zodResolver(DocumentSchema),
    defaultValues: {
      file: null,
      description: "",
      name: "",
      type: "",
    },
  });

  const createDocumetData = useMutation({
    mutationFn: async (value: any) => {
      const formData: FormData = new FormData();
      formData.append("file", value.file as File);
      formData.append("description", value.description);
      formData.append("name", value.name);
      formData.append("type", value.type);
      const document =
        type === "Add"
          ? await createDocument(formData)
          : await updateDocument(documentData?.id!, formData);
      return document;
    },
    onSuccess: (value) => {
      setIsLoading(false);
      if (value.success) {
        toast.success(`${value.message}`, {
          position: "top-right",
          dismissible: true,
        });
        queryClient.invalidateQueries({ queryKey: ["document"] });
        documentForm.reset();
        if (documentFormRef.current) {
          documentFormRef.current.click();
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

      if (documentFormRef.current) {
        documentFormRef.current.click();
      }
    },
    onError: (value) => {
      toast.error(`${value.message}`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });

  const documentFormSubmit = (values: z.infer<typeof DocumentSchema>) => {
    setIsLoading(true);
    createDocumetData.mutate(values);
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      documentForm.setValue("file", selectedFile);
    }
  };

  return (
    <Sheet>
      <SheetTrigger ref={documentFormRef} asChild>
        <Button
          className={`p-1 px-3 rounded-lg group ${
            type === "Add" && "hover:bg-slate-100 "
          }`}
          variant={"ghost"}
        >
          {type == "Add" && (
            <>
              Add Documets{" "}
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
            {type} Documents
          </SheetTitle>
        </SheetHeader>
        <Form {...documentForm}>
          <form
            onSubmit={documentForm.handleSubmit(documentFormSubmit)}
            className="p-2 w-full h-[85vh] rounded-lg flex flex-col justify-between items-center bg-gray-50 "
          >
            <div className="w-full grid grid-col-1  gap-2">
              <FormField
                control={documentForm.control}
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
                control={documentForm.control}
                disabled={isPending}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full justify-start items-start">
                    <Label>Type</Label>
                    <FormControl>
                      <Select
                        value={documentForm.watch("type")}
                        onValueChange={(value) => {
                          documentForm.setValue("type", value);
                          documentForm.clearErrors("type");
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {docTypes.map((info, index) => {
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
                control={documentForm.control}
                disabled={isPending}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label>Description</Label>
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
                control={documentForm.control}
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
            </div>
            {type !== "View" && (
              <div className="w-full flex flex-row  p-2 justify-end gap-3">
                <Button
                  className="flex-1"
                  variant={"outline"}
                  type="button"
                  onClick={() => {
                    if (documentFormRef.current) {
                      documentFormRef.current.click();
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
                    "Add Document"
                  ) : (
                    "Update Document"
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
