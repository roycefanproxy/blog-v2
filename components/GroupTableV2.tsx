'use client'

import { useState } from 'react'
import {
  useReactTable,
  ColumnDef,
  ExpandedState,
  getExpandedRowModel,
  getCoreRowModel,
  flexRender,
  CellContext,
} from '@tanstack/react-table'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'


type TableGroupColumn<Data extends Record<string, unknown> & { subRows?: Data[]}> = ColumnDef<Data> & {
  className?: string
}

interface TableGroupProps<Data extends Record<string, unknown> & { subRows?: Data[]}> {
  data: Data[]
  columns: TableGroupColumn<Data>[]
  header?: boolean
}

const GroupTableV2 = <T extends Record<string, unknown> & { subRows?: T[]}>({
  data,
  columns,
  header,
}: TableGroupProps<T>) => {
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    getSubRows: (row) => row.subRows,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  })

  return (
    <table className="table-fixed break-words">
      {header ? (
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
      ) : null}
      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell, j) => {
                return (
                  <td key={cell.id} className={columns[j].className}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const RenderCell = <Data extends Record<string, unknown>, TValue>({
  getValue,
  row,
}: CellContext<Data, TValue>) =>
  row.getCanExpand() ? <b>{getValue<React.ReactNode>()}</b> : getValue<TValue>()

const RenderExpandableCell = <Data extends Record<string, unknown>, TValue>({
  row,
}: CellContext<Data, TValue>) =>
  // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
  // to build the toggle for expanding a row
  row.getCanExpand() ? (
    <div
      onClick={row.getToggleExpandedHandler()}
      style={{ cursor: 'pointer' }}
      role="button"
      aria-hidden
    >
      {row.getIsExpanded() ? (
        <ChevronUpIcon className="h-3 w-3" />
      ) : (
        <ChevronDownIcon className="h-3 w-3" />
      )}
    </div>
  ) : null

export type { TableGroupColumn }

export { RenderExpandableCell, RenderCell }

export default GroupTableV2
