import FaqDataList from "@/components/faq/faqDataList";
import FaqHeader from "@/components/faq/faqHeader";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col p-3">
      <FaqHeader />
      <FaqDataList />
    </div>
  );
};

export default page;
