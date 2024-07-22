"use client";

import { FaqTypeData, GrievanceTypeData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { FaTrash } from "react-icons/fa";
import { GrievanceTypeForm } from "./grievanceTypeForm";
import { toast } from "sonner";
import { useTransition } from "react";
import { deleteFaqType } from "@/action-data/faqTypeAction";
import { deleteGrievanceType } from "@/action-data/grievanceTypeAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const CellFunction = ({ row }: any) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const user = row.original;
  const deleteItem = useMutation({
    mutationFn: async (value: GrievanceTypeData) => {
      const deleteCode: any = await deleteGrievanceType(value.id);
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
      queryClient.invalidateQueries({ queryKey: ["grievanceType"] });
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
      <GrievanceTypeForm
        lable={false}
        type="View"
        grievanceTypeData={row.original as GrievanceTypeData}
      />

      <GrievanceTypeForm
        lable={false}
        type="Update"
        grievanceTypeData={row.original as GrievanceTypeData}
      />

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
        <FaTrash size={12} />
      </Button>
    </main>
  );
};

export const userColumn: ColumnDef<GrievanceTypeData>[] = [
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
