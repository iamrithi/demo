"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "../common/customDataTable";
import { userColumn } from "./column";
import { CanteenData, DocumentData, FaqData, UserData } from "@/types";
import { getAllUser } from "@/action-data/userAction";
import { useQuery } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";
import { getAllFaq } from "@/action-data/faqAction";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "../ui/card";
import { IoHelpCircleOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { FaEdit } from "react-icons/fa";
import { DocumentForm } from "./documentForm";
import { getAllDocument } from "@/action-data/documents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { docTypes } from "@/config/const";
const DocumentDataList = () => {
  const [docType, setDocType] = useState<String>("PENSION FORMS");
  const [documents, setDocumets] = useState<DocumentData[]>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["document"],
    queryFn: async () => {
      const data = await getAllDocument();
      return data.data as DocumentData[];
    },
    staleTime: 0,
  });

  useEffect(() => {
    const docs = data?.filter((info: DocumentData) => info.type === docType);
    setDocumets(docs);
  }, [docType, data]);
  if (isLoading) {
    return (
      <div className="overflow-auto w-full h-[60vh] flex justify-center items-center">
        <PuffLoader className="text-theme text-[4px]" size={30} />
      </div>
    );
  }

  return (
    <div className=" w-full flex flex-col  h-[75vh]">
      <div className=" bg-white   my-1 rounded-lg shadow-lg p-1 flex justify-start items-center">
        {docTypes.map((info, index) => (
          <Button
            onClick={() => {
              setDocType(info);
            }}
            className={`h-[40px] text-[13px]  text-slate-700 first-letter:capitalize font-bold rounded-md duration-700 ${
              docType === info && "bg-slate-100 shadow-sm "
            }`}
            key={index}
            variant={"ghost"}
          >
            {info}
          </Button>
        ))}
      </div>
      <DataTable
        searchName="name"
        data={documents || []}
        columns={userColumn}
      />
    </div>
  );
};

export default DocumentDataList;
