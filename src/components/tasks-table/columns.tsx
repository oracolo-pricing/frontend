import { ColumnDef } from "@tanstack/react-table";
import { Task } from "types/entities";
import { getTimeDistance } from "utility/timeDistance";

export const columns: ColumnDef<Task>[] = [
   {
      accessorKey: "title",
      header: "Task",
   },
   {
      accessorKey: "ended_at",
      header: "Status",
      accessorFn: (row) => (row.ended_at ? "Completed" : "Running…"),
   },
   {
      accessorKey: "error_count",
      header: "Errors",
      accessorFn: (row) => (row.error_count ? `${row.error_count} errors` : "No errors"),
   },
   {
      accessorKey: "started_at",
      header: "Started",
      accessorFn: (row) => (row.started_at ? getTimeDistance(new Date(row.started_at)) : null),
   },
];
