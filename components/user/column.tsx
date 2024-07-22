"use client";

import { UserData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { UserForm } from "./userAddForm";
import { deleteUser } from "@/action-data/userAction";
import { toast } from "sonner";
import { useTransition } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const CellFunction = ({ row }: any) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const user = row.original;
  const deleteItem = useMutation({
    mutationFn: async (value: UserData) => {
      const deleteCode: any = await deleteUser(value.id);
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
      queryClient.invalidateQueries({ queryKey: ["user"] });
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
      <UserForm lable={false} type="View" userData={row.original} />
      <UserForm lable={false} type="Update" userData={row.original} />
      <Button
        className=" p-0 m-0 px-3 rounded-lg"
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

export const userColumn: ColumnDef<UserData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone_no",
    header: "Phone No",
  },
  {
    accessorKey: "role",
    header: "Role",
  },

  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      return <CellFunction row={row} />;
    },
  },
];
