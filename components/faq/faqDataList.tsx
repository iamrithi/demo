/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "../common/customDataTable";
import { userColumn } from "./column";
import { CanteenData, FaqData, FaqTypeData, UserData } from "@/types";
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
import { FaqForm } from "./faqForm";
import { getAllFaqType } from "@/action-data/faqTypeAction";

const FaqDataList = () => {
  const [faqType, setFaqType] = useState<String>("PENSION FORMS");
  const [faqs, setFaqs] = useState<FaqData[]>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["faq"],
    queryFn: async () => {
      const data = await getAllFaq();
      return data.data as FaqData[];
    },
    staleTime: 0,
  });
  const { data: faqTypes } = useQuery({
    queryKey: ["faqType"],
    queryFn: async () => {
      const data = await getAllFaqType();
      return data.data as FaqTypeData[];
    },
    staleTime: 0,
  });
  useEffect(() => {
    const docs = data?.filter((info: FaqData) => info.type_id === faqType);
    setFaqs(docs);
  }, [faqType, data, faqTypes]);
  useEffect(() => {
    faqTypes && setFaqType(faqTypes![0]?.id);
  }, [data]);

  if (isLoading) {
    return (
      <div className="overflow-auto w-full h-[60vh] flex justify-center items-center">
        <PuffLoader className="text-theme text-[4px]" size={30} />
      </div>
    );
  }

  return (
    <div className=" w-full h-[75vh]">
      <div className=" bg-white   my-1 rounded-md  p-1 flex justify-start items-center">
        {faqTypes?.map((info: FaqTypeData, index) => (
          <Button
            onClick={() => {
              setFaqType(info.id);
            }}
            className={`h-[40px] text-[13px]  first-letter:capitalize font-bold rounded-md  duration-500 ${
              faqType === info.id && "bg-slate-100 "
            }`}
            key={index}
            variant={"ghost"}
          >
            {info.name}
          </Button>
        ))}
      </div>
      <DataTable searchName="question" data={faqs || []} columns={userColumn} />
    </div>
    //  <Card className=" w-full min-h-[60vh] max-h-[85vh] flex justify-center items-start p-4  rounded-xl">
    // {data?.length! < 1 && (
    //     <div className="w-full h-full flex justify-center items-center">
    //       No results.
    //     </div>
    //   )}
    //   {data?.length! > 0 && (
    //     <Accordion type="single" collapsible className="w-full gap-1">
    //       {data?.map((info: FaqData, index: number) => {
    //         return (
    //           <Card
    //             className="p-4 w-full flex justify-start items-start mb-1 group "
    //             key={index}
    //           >
    //             <AccordionItem
    //               key={index}
    //               value={`${index}`}
    //               className="border-0 p-0 flex-1"
    //             >
    //               <AccordionTrigger>
    //                 <div className="flex justify-center items-center">
    //                   <IoHelpCircleOutline size={24} />
    //                   <p className="text-black text-[14px] font-extrabold">
    //                     {info.question}
    //                   </p>
    //                 </div>
    //               </AccordionTrigger>
    //               <AccordionContent className="text-gray-600">
    //                 {info.answer}
    //               </AccordionContent>
    //             </AccordionItem>
    //             <div className="w-[50px] flex gap-1 mt-2 ml-2">
    //               <FaqForm
    //                 lable={false}
    //                 type="Update"
    //                 faqData={info as FaqData}
    //               />
    //             </div>
    //           </Card>
    //         );
    //       })}
    //     </Accordion>
    //   )} */}
    // </Card>
  );
};

export default FaqDataList;
