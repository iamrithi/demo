import DocumentDataList from "@/components/documents/documentsDataList";
import DocumentHeader from "@/components/documents/documetnHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserDataList from "@/components/user/userDataList";
import UserHeader from "@/components/user/userHeader";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col p-3">
      <DocumentHeader />
      <DocumentDataList />
    </div>
  );
};

export default page;
