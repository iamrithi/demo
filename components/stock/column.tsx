"use client";

import { CanteenData, StockData, UserData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { FaEye, FaTrash } from "react-icons/fa";
import { StockForm } from "./stockForm";
import { toast } from "sonner";
import { useTransition } from "react";
import { deleteStock } from "@/action-data/stockAction";
import { format } from "date-fns";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const CellFunction = ({ row }: { row: StockData }) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const stock = row;
  const deleteItem = useMutation({
    mutationFn: async (value: StockData) => {
      const deleteCode: any = await deleteStock(value.id);
      return deleteCode;
    },
    onSuccess: (value) => {
      console.log(value);
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
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
    onError: (value) => {
      console.log(value);
      toast.error(`${value.message}`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });
  return (
    <main className="w-auto flex justify-start items-center gap-2">
      <Link
        href={`/stock/inventory?canteen=${stock.canteen.id}&stock=${stock.id}`}
        className=" p-1 px-3"
        onClick={() => {}}
      >
        <FaEye size={14} className="" />
      </Link>

      {/* <DocumentForm
        lable={false}
        type="Update"
        documentData={row.original as StockData}
      /> */}

      <Button
        className=" p-1 px-3"
        variant={"ghost"}
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            deleteItem.mutate(stock);
          });
        }}
      >
        <FaTrash size={14} className="text-destructive" />
      </Button>
    </main>
  );
};

export const userColumn: ColumnDef<StockData>[] = [
  {
    accessorKey: "canteen",
    header: "Name",
    cell: ({ row }) => {
      // console.log(row.original);
      return <p>{`${row.original?.canteen?.name ?? ""}`}</p>;
    },
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  // },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <p>{`${format(row.original.date, "MMM-dd-yyyy / hh:mm:ss")}`}</p>;
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      return <CellFunction row={row.original} />;
    },
  },
];
