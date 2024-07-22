import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUploadDialog from "./FileUploadDialog";
import { Button } from "@/components/ui/button";

interface Stock {
  id: string;
  fileUrl: string;
  fileType: string;
  date: string;
  processed: boolean;
}

const StockManager: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get("/api/canteen/stock");
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleFileSubmit = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("canteenId", "your-canteen-id"); // Replace with actual canteenId from context or state

    try {
      await axios.post("/api/canteen/stock", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchStocks();
    } catch (error) {
      console.error("Error saving stock:", error);
    }
  };

  const deleteStock = async (id: string) => {
    try {
      await axios.delete(`/api/canteen/stock/${id}`);
      fetchStocks();
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Stock Management</h1>
      <Button
        onClick={() => setModalOpen(true)}
        variant="outline"
        className="mb-4"
      >
        Add Stock
      </Button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">File URL</th>
            <th className="py-2">File Type</th>
            <th className="py-2">Date</th>
            <th className="py-2">Processed</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td className="py-2">{stock.id}</td>
              <td className="py-2">{stock.fileUrl}</td>
              <td className="py-2">{stock.fileType}</td>
              <td className="py-2">
                {new Date(stock.date).toLocaleDateString()}
              </td>
              <td className="py-2">{stock.processed ? "Yes" : "No"}</td>
              <td className="py-2">
                <Button
                  variant="destructive"
                  onClick={() => deleteStock(stock.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <FileUploadDialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onFileSubmit={handleFileSubmit}
      />
    </div>
  );
};

export default StockManager;
