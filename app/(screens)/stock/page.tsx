import StockHeader from "@/components/stock/stockHeader";
import StockDataList from "@/components/stock/stocksDataList";
import React, { useEffect } from "react";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex flex-col p-3">
      <StockHeader />
      <StockDataList />
    </div>
  );
};

export default Dashboard;
