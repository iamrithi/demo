"use client";

import { CanteenData, FaqData, UserData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FaqForm } from "./faqForm";
import { deleteUser } from "@/action-data/userAction";
import { toast } from "sonner";
import { useTransition } from "react";
import { deleteFaq } from "@/action-data/faqAction";
import { Badge } from "../ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const CellFunction = ({ row }: any) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const user = row.original;
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
    },
    onError: (value) => {
      toast.error(`${value.message}`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });

  return (
    <main className="w-auto flex justify-start items-center gap-2">
      <FaqForm lable={false} type="View" faqData={row.original as FaqData} />

      <FaqForm lable={false} type="Update" faqData={row.original as FaqData} />

      <Button
        className=" p-1 px-3"
        variant={"ghost"}
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            deleteItem.mutate(user);
          });
        }}
      >
        <FaTrash size={14} className="text-destructive" />
      </Button>
    </main>
  );
};

export const userColumn: ColumnDef<FaqData>[] = [
  {
    accessorKey: "question",
    header: "Question",
  },
  {
    accessorKey: "answer",
    header: "Answer",
    cell: ({ row }) => {
      return (
        <div className="w-[400px] flex flex-wrap text-[13px] tracking-widest text-slate-600 font-bold p-2">
          {row.original.answer || "--"}
        </div>
      );
    },
  },
  {
    accessorKey: "type_id",
    header: "type",
    cell: ({ row }) => {
      return (
        <Badge className="text-[12px] rounded-sm">
          {row.original.type?.name || "--"}
        </Badge>
      );
    },
  },

  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      return <CellFunction row={row} />;
    },
  },
];
