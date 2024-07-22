"use client";

import { CanteenData, DocumentData, UserData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { FaEdit, FaEye, FaFilePdf, FaPage4, FaTrash } from "react-icons/fa";
import { DocumentForm } from "./documentForm";
import { deleteUser } from "@/action-data/userAction";
import { toast } from "sonner";
import { useTransition } from "react";
import { deleteFaq } from "@/action-data/faqAction";
import { deleteDocument } from "@/action-data/documents";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const CellFunction = ({ row }: any) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const user = row.original;
  const deleteItem = useMutation({
    mutationFn: async (value: DocumentData) => {
      const deleteCode: any = await deleteDocument(value.id);
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
      queryClient.invalidateQueries({ queryKey: ["document"] });
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
      {/* <DocumentForm
        lable={false}
        type="View"
        documentData={row.original as DocumentData}
      />

      <DocumentForm
        lable={false}
        type="Update"
        documentData={row.original as DocumentData}
      /> */}

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

export const userColumn: ColumnDef<DocumentData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return (
        <Badge className="text-[12px] rounded-sm">
          {row.original.type || "--"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "url",
    header: "Document",
    cell: ({ row }) => {
      return (
        <Link href={row.original.url} target="_blank">
          {" "}
          <FaFilePdf size={30} className="text-red-500" />
        </Link>
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
