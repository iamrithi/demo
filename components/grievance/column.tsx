"use client";

import { GrievanceData, UserData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { FaTrash } from "react-icons/fa";
import { GrievanceForm } from "./grievanceForm";
import { toast } from "sonner";
import { useTransition } from "react";
import { deleteGrievance } from "@/action-data/grievance";
import { Badge } from "../ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const CellFunction = ({ row }: any) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const user = row.original;
  const deleteItem = useMutation({
    mutationFn: async (value: GrievanceData) => {
      const deleteCode: any = await deleteGrievance(value.id);
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
      queryClient.invalidateQueries({ queryKey: ["grievance"] });
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
      {/* <GrievanceForm
        lable={false}
        type="View"
        grievanceData={row.original as GrievanceData}
      /> */}

      <GrievanceForm
        grievanceData={row.original as GrievanceData}
        lable={false}
        type="Update"
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
        <FaTrash size={14} className="text-destructive" />
      </Button>
    </main>
  );
};

export const userColumn: ColumnDef<GrievanceData>[] = [
  {
    accessorKey: "question",
    header: "Question",
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return <p>{row.original.user?.name}</p>;
    },
  },
  {
    accessorKey: "canteen",
    header: "Canteen",
    cell: ({ row }) => {
      return <p>{row.original.canteen?.name}</p>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return <p>{row.original.type}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <Badge>{row.original.status}</Badge>;
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
