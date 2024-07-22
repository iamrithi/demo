"use client";

import { InventoryData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const userColumn: ColumnDef<InventoryData>[] = [
  {
    accessorKey: "s_no",
    header: "S No",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "group_name",
    header: "Group Name",
  },
  {
    accessorKey: "index",
    header: "Index",
  },
  {
    accessorKey: "item_description",
    header: "Item Description",
  },
  {
    accessorKey: "mpp",
    header: "MPP",
  },
  {
    accessorKey: "pluno",
    header: "Pluno",
  },
  {
    accessorKey: "profit",
    header: "Profit",
  },
  {
    accessorKey: "r_amt",
    header: "R Amt",
  },
  {
    accessorKey: "r_rate",
    header: "R Rate",
  },
  {
    accessorKey: "vat_percent",
    header: "VAT Percent",
  },
  {
    accessorKey: "vat_r_amt",
    header: "VAT R Amt",
  },
  {
    accessorKey: "vat_rate",
    header: "VAT Rate",
  },
  {
    accessorKey: "vat_wrate",
    header: "VAT WRate",
  },
  {
    accessorKey: "vat_w_amt",
    header: "VAT W Amt",
  },
  {
    accessorKey: "w_amt",
    header: "W Amt",
  },
  {
    accessorKey: "w_rate",
    header: "W Rate",
  },
];
