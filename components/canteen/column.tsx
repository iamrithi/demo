"use client";

import { CanteenData, UserData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { CanteenForm } from "./canteenForm";
import { deleteUser } from "@/action-data/userAction";
import { toast } from "sonner";
import { useTransition } from "react";
import { deleteCanteen } from "@/action-data/canteenAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const CellFunction = ({ row }: any) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const user = row.original;
  const deleteItem = useMutation({
    mutationFn: async (value: CanteenData) => {
      const deleteCode: any = await deleteCanteen(value.id);
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
      queryClient.invalidateQueries({ queryKey: ["canteen"] });
    },
    onError: (value) => {
      toast.error(`${value.message}`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });

  return (
    <main className="w-auto flex justify-start items-start gap-2">
      <CanteenForm
        lable={false}
        type="View"
        canteenData={row.original as CanteenData}
      />

      <CanteenForm
        lable={false}
        type="Update"
        canteenData={row.original as CanteenData}
      />

      <Button
        className=" p-1 px-3 "
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

export const userColumn: ColumnDef<CanteenData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "unique_id",
    header: "Unique ID",
    cell: ({ row }) => {
      return <p>{row.original.unique_id}</p>;
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
