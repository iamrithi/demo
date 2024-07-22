import FaqTypeDataList from "@/components/faqType/faqTypeDataList";
import FaqTypeHeader from "@/components/faqType/faqTypeHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col p-3">
      <FaqTypeHeader />
      <FaqTypeDataList />
    </div>
  );
};

export default page;
