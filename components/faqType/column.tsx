"use client";

import { FaqTypeData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { FaTrash } from "react-icons/fa";
import { FaqTypeForm } from "./faqTypeForm";
import { toast } from "sonner";
import { useTransition } from "react";
import { deleteFaqType } from "@/action-data/faqTypeAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const CellFunction = ({ row }: any) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const user = row.original;
  const deleteItem = useMutation({
    mutationFn: async (value: FaqTypeData) => {
      const deleteCode: any = await deleteFaqType(value.id);
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
      queryClient.invalidateQueries({ queryKey: ["faqType"] });
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
      <FaqTypeForm
        lable={false}
        type="View"
        faqTypeData={row.original as FaqTypeData}
      />

      <FaqTypeForm
        lable={false}
        type="Update"
        faqTypeData={row.original as FaqTypeData}
      />

      <Button
        className="p-1 px-3"
        variant={"ghost"}
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            deleteItem.mutate(user);
          });
        }}
      >
        <FaTrash size={12} />
      </Button>
    </main>
  );
};

export const userColumn: ColumnDef<FaqTypeData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      return <CellFunction row={row} />;
    },
  },
];
