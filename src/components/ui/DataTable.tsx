import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import {
   ColumnDef,
   Row,
   RowData,
   TableMeta,
   flexRender,
   getCoreRowModel,
   useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   onRowClick?: (row: Row<TData>) => void;
   meta?: TableMeta<TData>;
}

declare module "@tanstack/react-table" {
   interface TableMeta<TData extends RowData> {
      toggleActive: (productId: string) => void;
   }
}

export function DataTable<TData, TValue>({
   columns,
   data,
   onRowClick,
   meta,
}: DataTableProps<TData, TValue>) {
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      meta,
   });

   return (
      <Table>
         <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
               <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                     return (
                        <TableHead key={header.id} className="whitespace-nowrap">
                           {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                     );
                  })}
               </TableRow>
            ))}
         </TableHeader>
         <TableBody>
            {table.getRowModel().rows?.length
               ? table.getRowModel().rows.map((row, rowIndex) => (
                    <TableRow
                       key={row.id}
                       onClick={() => onRowClick?.(row)}
                       data-state={row.getIsSelected() && "selected"}
                       className={`border-none`}
                    >
                       {row.getVisibleCells().map((cell, columnIndex) => (
                          <TableCell key={cell.id}>
                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                       ))}
                    </TableRow>
                 ))
               : null}
         </TableBody>
      </Table>
   );
}
