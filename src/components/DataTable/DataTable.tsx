"use client"

import { Stack } from "@new/Stack/Stack"
import { Align, AlignProps } from "@new/Stack/Align"
import { InsertRowPosition, SortDirection, SortingMode, Table, useTable, useTableInstance } from "ka-table"
import { ICellEditorProps, ICellTextProps } from "ka-table/props"
import { closeRowEditors, deleteRow, openRowEditors, saveRowEditors } from "ka-table/actionCreators"
import { InputButtonPrimary, InputButtonPrimaryProps } from "@new/InputButton/InputButtonPrimary"
import { Spacer } from "@new/Stack/Spacer"
import { InputButtonTertiary, InputButtonTertiaryProps } from "@new/InputButton/InputButtonTertiary"
import { InputTextSingle, InputTextSingleProps } from "@new/InputText/InputTextSingle"
import { adjustLightness, Color, ColorWithLightness, computeColor } from "@new/Color"
import { InputTextDate, InputTextDateProps } from "@new/InputText/InputTextDate"
import { InputCheckbox, InputCheckboxProps } from "@new/InputCheckbox/InputCheckbox"
import { StyleBodySmall, StyleFontFamily, Text } from "@new/Text/Text"
import { Icon } from "@new/Icon/Icon"
import styled from "@emotion/styled"
import { Children, PropsWithChildren, ReactElement, ReactNode, useId, useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"
import { InputButtonIconTertiary } from "@new/InputButton/InputButtonIconTertiary"
import { Divider } from "@new/Divider/Divider"
import { kaPropsUtils } from "ka-table/utils"
import { Alert } from "@new/Alert/Alert"
import { InputComboboxProps } from "@new/InputCombobox/InputCombobox"
import { ProgressIndicator } from "@new/ProgressIndicator/ProgressIndicator"
import { ProgressIndicatorSegment } from "@new/ProgressIndicator/ProgressIndicatorSegment"
import { useResizeObserver } from "usehooks-ts"
import { InputButtonIconPrimaryProps } from "@new/InputButton/InputButtonIconPrimary"
import { InputButtonSecondaryProps } from "@new/InputButton/InputButtonSecondary"
import { InputButtonIconSecondaryProps } from "@new/InputButton/InputButtonIconSecondary"
import { PopoverProps } from "@new/Popover/Popover"
import { Badge } from "@new/Badge/Badge"
import { Avatar } from "@new/Avatar/Avatar"
import Link from "next/link"
import { Tooltip } from "@new/Tooltip/Tooltip"

export { SortDirection } from "ka-table"

const KEY_DRAG = "DRAG"
const KEY_ACTIONS_EDIT = "ACTIONS_EDIT"
const KEY_ACTIONS = "ACTIONS"

const TABLE_CELL_EMPTY_STRING = "–"

const createNewRow = (data: DataTableProps["data"]): object => {
  return { id: Math.max(...data.map(d => d.id)) + 1 }
}

const dateFormatter = new Intl.DateTimeFormat(navigator?.language || "en-US")

const formatValue = (value: string, dataType: DataType): string => {
  switch (dataType) {
    case DataType.Number:
      return value
        ? new Intl.NumberFormat(undefined, {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(Number(value))
        : TABLE_CELL_EMPTY_STRING

    case DataType.Date:
      return value ? dateFormatter.format(new Date(value)) : TABLE_CELL_EMPTY_STRING

    case DataType.Boolean:
      return value ? (value === "true" ? "Yes" : "No") : TABLE_CELL_EMPTY_STRING

    case DataType.String:
      return value || TABLE_CELL_EMPTY_STRING

    default:
      return TABLE_CELL_EMPTY_STRING
  }
}

const csv = (data: DataTableProps["data"], columns: Column[]) => {
  const dataSanitized: DataTableProps["data"] = [columns.map(c => c.title)]

  data.forEach(row => {
    const rowSanitized: string[] = []

    columns.forEach(c => {
      const column = c as Column
      const value = (row[column.key] || "").toString()

      if (column.dataType === DataType.Boolean) {
        rowSanitized.push(value !== undefined ? (value ? "Yes" : "No") : "")
      } else if (column.dataType === DataType.String) {
        rowSanitized.push(value.lastIndexOf(";") !== -1 ? `"${value}"` : value)
      } else if (column.dataType === DataType.ProgressIndicator) {
        rowSanitized.push(row[column.key]?.["value"] || "")
      } else {
        rowSanitized.push(value)
      }
    })

    dataSanitized.push(rowSanitized)
  })

  if (window) {
    window.open("data:text/csv;charset=utf-8," + dataSanitized.map(ds => ds.join(";")).join("\n"))
  }
}

const ActionEdit = ({ dispatch, rowKeyValue, disabled }: ICellTextProps & { disabled: boolean }) => {
  return (
    <InputButtonIconTertiary
      size="small"
      iconName="edit"
      onClick={() => dispatch(openRowEditors(rowKeyValue))}
      disabled={disabled}
    />
  )
}

const ActionSaveCancel = ({ dispatch, rowKeyValue }: ICellEditorProps) => {
  return (
    <Stack horizontal hug>
      <Align horizontal hug>
        <InputButtonTertiary
          width="auto"
          size="small"
          label="Cancel"
          onClick={() => {
            dispatch(closeRowEditors(rowKeyValue))
          }}
        />

        <Spacer xsmall />

        <InputButtonPrimary
          width="auto"
          size="small"
          label="Save"
          onClick={() => {
            dispatch(
              saveRowEditors(rowKeyValue, {
                validate: true,
              }),
            )
          }}
        />
      </Align>
    </Stack>
  )
}

const CellInputTextSingle = ({ column, rowKeyValue, value }: ICellEditorProps) => {
  const table = useTableInstance()

  return (
    <InputTextSingle
      value={value}
      width="auto"
      size="small"
      color={Color.Neutral}
      onChange={v => {
        table.updateCellValue(rowKeyValue, column.key, v)
      }}
    />
  )
}

const CellInputTextDate = ({ column, rowKeyValue, value }: ICellEditorProps) => {
  const table = useTableInstance()

  return (
    <InputTextDate
      value={value ? new Date(value).toISOString().slice(0, 10) : ""}
      width="auto"
      size="small"
      onChange={v => {
        table.updateCellValue(rowKeyValue, column.key, v)
      }}
      color={Color.Neutral}
    />
  )
}

const CellInputCheckbox = ({ column, rowKeyValue, value }: ICellEditorProps) => {
  const table = useTableInstance()

  return (
    <InputCheckbox
      value={value || false}
      size="small"
      disabled
      onChange={v => {
        table.updateCellValue(rowKeyValue, column.key, v)
      }}
      color={Color.Neutral}
    />
  )
}

const CellProgressIndicator = (cellTextProps: ICellTextProps | ICellEditorProps) => {
  const progressIndicator = cellTextProps.column["progressIndicator"] as Column["progressIndicator"]
  const type = progressIndicator?.type || "bar"
  const { value, color } = progressIndicator?.configure(cellTextProps.rowData) || { value: 0, color: Color.Neutral }

  return (
    <Stack hug horizontal>
      <Align horizontal left={type === "bar"} center={type === "circle"}>
        <ProgressIndicator type={type} size="large" color={Color.Neutral}>
          <ProgressIndicatorSegment width={`${value}%`} color={color} />
        </ProgressIndicator>
      </Align>
    </Stack>
  )
}

const CellStatus = (cellTextProps: ICellTextProps | ICellEditorProps) => {
  const status = cellTextProps.column["status"] as Column["status"]

  const { color, label } = status?.configure(cellTextProps.rowData) || {
    color: undefined,
    label: undefined,
  }

  return (
    <Stack hug horizontal>
      <Align horizontal left>
        {color && label ? (
          <Badge size="large" variant="transparent" color={color} iconName="circle" label={label} />
        ) : (
          <Text fill={[Color.Neutral, 700]} small monospace>
            –
          </Text>
        )}
      </Align>
    </Stack>
  )
}

const CellHeadLink = styled.a({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
})

export enum DataType {
  Internal = "internal",
  Boolean = "boolean",
  Date = "date",
  Number = "number",
  Object = "object",
  String = "string",
  ProgressIndicator = "progressindicator",
  Status = "status",
}

export type Column = {
  key: string
  title: string
  dataType: DataType
  maxWidth?: `${number}${"%"}`
  minWidth?: `${number}${"%"}`
  explodeWidth?: boolean
  preventContentCollapse?: boolean
  sort?: (sortDirection: SortDirection) => (a: any, b: any) => number
  avatar?: (rowData: ICellTextProps["rowData"]) => string | undefined
  link?: (rowData: ICellTextProps["rowData"]) => string | (() => void) | undefined
  tooltip?: ((rowData: ICellTextProps["rowData"]) => ReactElement<AlignProps> | string | undefined) | boolean
  hidden?: boolean
  disableSort?: boolean

  progressIndicator?: {
    type: "bar" | "circle"

    configure: (rowData: ICellTextProps["rowData"]) =>
      | {
          value: number
          color: Color
        }
      | undefined
  }

  status?: {
    configure: (rowData: ICellTextProps["rowData"]) =>
      | {
          color: Color
          label: string
        }
      | undefined
  }
}

type Children =
  | ReactElement<InputCheckboxProps>
  | ReactElement<InputComboboxProps>
  | ReactElement<InputTextSingleProps>
  | ReactElement<InputTextDateProps>

type RowActionsElement =
  | ReactElement<InputButtonPrimaryProps>
  | ReactElement<InputButtonIconPrimaryProps>
  | ReactElement<InputButtonSecondaryProps>
  | ReactElement<InputButtonIconSecondaryProps>
  | ReactElement<InputButtonTertiaryProps>
  | ReactElement<InputButtonIconPrimaryProps>
  | ReactElement<InputButtonIconPrimaryProps>
  | ReactElement<PopoverProps>

export type DataTableProps = {
  mode: "simple" | "filter" | "edit"
  data: any[]
  columns: Column[]
  defaultSortColumn: string
  defaultSortDirection?: SortDirection
  rowKeyField: string
  exportName: string
  fixedKeyField?: string
  selectKeyField?: string
  selectDisabledField?: string
  virtualScrolling?: boolean
  loading?: boolean
  exportDisable?: boolean
  rowActions?: (rowData: ICellTextProps["rowData"]) => RowActionsElement[]
  onChange?: (value: DataTableProps["data"]) => void
  onChangeRow?: (value: object) => void
  fill?: ColorWithLightness
  stroke?: ColorWithLightness
  children?: Children | Children[]

  /**
   * @deprecated
   * See DataType enum and/or Column enum for available alternatives - tooltips, links, progress indicators, etc. are all possible using these.
   */
  DEPRICATED_customCellRenderer?: (cellProps: PropsWithChildren<ICellTextProps>) => ReactElement | null
}

export const DataTable = (p: DataTableProps) => {
  const cssScope = useId().replace(/:/g, "datatable")
  const referenceContainer = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  // TODO @cllpse: this seems super hacky, but this is to auto-adjust the height of the table to simplify use
  useResizeObserver({
    ref: referenceContainer,
    box: "border-box",
    onResize: size => {
      if (p.mode === "edit") {
        return
      }

      const containerWidth = size.width || 0
      const containerHeight = size.height || 0

      if (referenceContainer.current && containerWidth > 0) {
        setContainerWidth(Math.floor(containerWidth - 16 - 2))
      }

      if (referenceContainer.current && containerHeight > 0) {
        const filtersHeight = referenceContainer.current.querySelector(`#reference-filters`)?.clientHeight || 0
        const spacerHeight = referenceContainer.current.querySelector(`#reference-spacer`)?.clientHeight || 0

        referenceContainer.current.querySelectorAll(`#reference-target`).forEach(target => {
          const t = target as HTMLElement | undefined

          if (t) {
            t.style.height = `${Math.ceil(containerHeight - filtersHeight - spacerHeight)}px`
          }
        })
      }
    },
  })

  const [filter, setFilter] = useState("")
  const [editId, setEditId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [selectedFields, setSelectedFields] = useState<number>(
    p.data.filter(d => p.selectKeyField && d[p.selectKeyField]).length,
  )
  const [dataTemp, setDataTemp] = useState<DataTableProps["data"]>([])

  let nativeColumns: Column[] = []

  nativeColumns = p.columns.map(c => {
    const column = c as Column

    const sortDirection = p.mode !== "edit" && column.key === p.defaultSortColumn ? p.defaultSortDirection : undefined

    return {
      key: column.key,
      title: column.title,
      dataType: column.dataType,
      progressIndicator: column.progressIndicator,
      status: column.status,
      avatar: column.avatar,
      link: column.link,
      sort: column.sort,
      tooltip: column.tooltip,
      sortDirection: sortDirection,
      minWidth: column.minWidth,
      maxWidth: column.maxWidth,
      explodeWidth: column.explodeWidth,
      preventContentCollapse: column.preventContentCollapse,
      hidden: column.hidden,
      disableSort: column.disableSort,
    }
  })

  if (p.mode === "edit") {
    nativeColumns = [
      ...nativeColumns,
      {
        key: KEY_ACTIONS_EDIT,
        title: "",
        dataType: DataType.Internal,
      },
    ]
  } else if (p.rowActions) {
    nativeColumns = [
      ...nativeColumns,
      {
        key: KEY_ACTIONS,
        title: "",
        dataType: DataType.Internal,
      },
    ]
  }

  const updateSelectField = (index: number, value: boolean) => {
    if (p.selectKeyField === undefined) {
      return
    }

    const d = [...p.data]

    d[index][p.selectKeyField] = value

    if (p.onChange) {
      p.onChange(d)
    }

    if (p.onChangeRow) {
      p.onChangeRow(d[index])
    }

    setSelectedFields(d.filter(d => p.selectKeyField && d[p.selectKeyField]).length)
  }

  const updateSelectFieldAll = (value: boolean) => {
    if (p.selectKeyField === undefined) {
      return
    }

    const d = [...p.data]

    d.filter(d => p.selectDisabledField === undefined || !d[p.selectDisabledField]).forEach(row => {
      if (p.selectKeyField) {
        row[p.selectKeyField] = value
      }
    })

    if (p.onChange) {
      p.onChange(d)
    }

    setSelectedFields(d.filter(d => p.selectKeyField && d[p.selectKeyField]).length)
  }

  const table = useTable({
    onDispatch: d => {
      const rowKeyValue = d.rowKeyValue

      if (d.type === "ComponentDidMount") {
        if (p.data && p.data.length > 0 && !p.data.some(d => d[p.rowKeyField])) {
          throw new Error(
            `DataTable: data must contain key defined by property: "rowKeyField" (current value: '${p.rowKeyField}').`,
          )
        }
      }

      if (d.type === "OpenRowEditors") {
        setEditId(d.rowKeyValue)
        setDataTemp(p.data)
      }

      if (d.type === "ReorderRows") {
        setDataTemp(kaPropsUtils.getData(table.props))
      }

      if (d.type === "CloseRowEditors") {
        setEditId(null)

        if (p.onChange) {
          p.onChange(dataTemp)
        }

        table.updateData(dataTemp)
      }

      if (d.type === "SaveRowEditors" || d.type === "ReorderRows" || d.type === "InsertRow" || d.type === "DeleteRow") {
        const data = kaPropsUtils.getData(table.props)

        if (d.type !== "ReorderRows") {
          setEditId(null)
        }

        if (p.onChange) {
          p.onChange(data)
        }

        if (p.onChangeRow) {
          if (d.type === "InsertRow") {
            p.onChangeRow(data[data.length - 1])
          } else {
            p.onChangeRow(data.filter(d => d.id === rowKeyValue)?.[0])
          }
        }

        setDeleteId(null)
      }
    },
  })

  const referencePrint = useRef<HTMLDivElement>(null)
  const print = useReactToPrint({ contentRef: referencePrint, documentTitle: p.exportName })

  const css = `
    .${cssScope} .ka {
      background-color: unset;
      font-size: unset;
      width: 100%;
    }

    .${cssScope} .ka .ka-table-wrapper::-webkit-scrollbar-track {
      background: ${computeColor(p.fill || [Color.White])} !important;
    }

    .${cssScope} .ka .ka-table-wrapper::-webkit-scrollbar-thumb {
      border: 5px solid ${computeColor(p.fill || [Color.White])} !important;
    }

    .${cssScope} .ka .ka-table-wrapper:hover::-webkit-scrollbar-thumb {
      border: 4px solid ${computeColor(p.fill || [Color.White])} !important;
    }

    .${cssScope} .ka .ka-table-wrapper::-webkit-scrollbar-corner {
      background: ${computeColor(p.fill || [Color.White])} !important;
    }

    .${cssScope} .ka-table {
      table-layout: unset;
    }

    .${cssScope} .ka .ka-table-wrapper {
      background-color: unset;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      margin: 1px;
    }

    .${cssScope} .ka colgroup {
      display: none;
      visibility: hidden;
    }

    .${cssScope} .ka-thead {
      display: "table-header-group";
      position: relative;
    }

    .${cssScope} .ka-thead-background {
      background-color: ${computeColor(p.fill || [Color.White])};
    }

    .${cssScope} .ka-thead-cell-height {
      height: calc(var(--BU) * 10);
    }

    .${cssScope} .ka-thead-cell {
      padding: 0 calc(var(--BU) * 4);
      color: unset;
      z-index: 3;
    }

    .${cssScope} .ka-thead-row  {
      border-bottom: solid 1px transparent;
    }

    .${cssScope} .ka-thead-row .ka-thead-cell:first-child {
      padding-left: calc(var(--BU) * 2);
    }

    .${cssScope} .ka-thead-row .ka-thead-cell:last-child {
      padding-left: calc(var(--BU) * 2);
    }

    .${cssScope} .ka-cell {
      padding: 0 calc(var(--BU) * 4);
      height: calc(var(--BU) * 10);
      line-height: unset;
      color: unset;
    }

    .${cssScope} .ka-cell-text {
      display: flex;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }

    .${cssScope} .override-ka-prevent-content-collapse .ka-cell-text,
    .${cssScope} .override-ka-prevent-content-collapse .ka-cell-text p {
      overflow: visible;
    }

    .${cssScope} .ka-cell.override-ka-fixed-right {
      padding-left: calc(var(--BU) * 2);
    }

    .${cssScope} .ka-cell:first-child {
      padding-left: calc(var(--BU) * 2);
      z-index: 3;
    }

    .${cssScope} .ka-cell:last-child {
      padding-right: calc(var(--BU) * 2);
      z-index: 3;
    }

    .${cssScope} .ka-cell:not(:last-child) {
      border-right: dotted 1px ${computeColor(p.stroke || [Color.Neutral, 100])};
    }

    .${cssScope} .ka-cell:hover {
      background-color: unset;
    }

    .${cssScope} .ka-row {
      border-bottom: solid 1px ${computeColor(p.stroke || [Color.Neutral, 100])};
      border-top: solid 1px ${computeColor(p.stroke || [Color.Neutral, 100])};
    }

    .${cssScope} .ka-row:last-child {
      border-bottom: none;
    }

    .${cssScope} .ka-even {
      background-color: unset;
    }

    .${cssScope} .ka-row:hover,
    .${cssScope} .ka-row:hover .override-ka-fixed-left,
    .${cssScope} .ka-row:hover .override-ka-fixed-right {
      background-color: ${computeColor(p.fill ? adjustLightness(p.fill, 1) : [Color.Neutral, 50])};
    }

    .${cssScope} .ka-row:hover .override-ka-fixed-left:after,
    .${cssScope} .ka-row:hover .override-ka-fixed-right:after {
      background: transparent;
    }

    .${cssScope} .ka-row-selected {
      background-color: unset;
    }

    .${cssScope} .override-ka-fixed-left,
    .${cssScope} .override-ka-fixed-right {
      position: sticky;
      background-color: ${computeColor(p.fill || [Color.White])};
      z-index: 4;
    }

    .${cssScope} .override-ka-fixed-left {
      left: 0;
    }

    .${cssScope} .override-ka-fixed-right {
      right: 0;
    }

    .${cssScope} .override-ka-fixed-left:after,
    .${cssScope} .override-ka-fixed-right:after {
      content: "";
      position: absolute;
      top: 0;
      height: 100%;
      width: 8px;
    }

    .${cssScope} .ka-thead-row .ka-thead-cell:before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      height: 1px;
      background-color: ${computeColor(p.stroke || [Color.Neutral, 100])};
    }

    .${cssScope} .override-ka-virtual .ka-thead-row .ka-thead-cell:before {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 0;
      right: 0;
      height: 8px;
      width: 100%;
      border-top: solid 1px ${computeColor(p.stroke || [Color.Neutral, 100])};
      background: linear-gradient(to bottom, ${computeColor(p.fill || [Color.White])}, transparent);
    }

    .${cssScope} .override-ka-reorder .ka-row {
      cursor: move;
    }

    .${cssScope} .ka-thead-row .override-ka-fixed-left:after {
      width: 20px;
      right: -20px;
      border: none;
      background: linear-gradient(to right, ${computeColor(p.fill || [Color.White])}, transparent);
    }

    .${cssScope} .ka-thead-row .override-ka-fixed-right:after {
      width: 20px;
      left: -20px;
      border: none;
      background: linear-gradient(to left, ${computeColor(p.fill || [Color.White])}, transparent);
    }

    .${cssScope} .override-ka-fixed-left:after {
      right: -8px;
      border-left: solid 1px ${computeColor(p.stroke || [Color.Neutral, 100])};
      background: linear-gradient(to right, ${computeColor(p.fill || [Color.White])}, transparent);
    }

    .${cssScope} .override-ka-fixed-right:after {
      left: -8px;
      border-right: solid 1px ${computeColor(p.stroke || [Color.Neutral, 100])};
      background: linear-gradient(to left, ${computeColor(p.fill || [Color.White])}, transparent);
    }

    .${cssScope} .override-ka-editing-row,
    .${cssScope} .override-ka-editing-row:hover,
    .${cssScope} .override-ka-editing-row .override-ka-fixed-left,
    .${cssScope} .override-ka-editing-row:hover .override-ka-fixed-left,
    .${cssScope} .override-ka-editing-row .override-ka-fixed-right,
    .${cssScope} .override-ka-editing-row:hover .override-ka-fixed-right {
      background-color: ${computeColor([Color.Quarternary, 50])};
    }

    .${cssScope} .override-ka-editing-row .override-ka-fixed-left:after {
      background: linear-gradient(to right, ${computeColor([Color.Quarternary, 50])}, transparent);
    }

    .${cssScope} .override-ka-editing-row .override-ka-fixed-right:after {
      background: linear-gradient(to left, ${computeColor([Color.Quarternary, 50])}, transparent);
    }

    .${cssScope} .override-ka-editing-row {
      outline: solid 1px ${computeColor([Color.Quarternary, 100])};
      outline-offset: -1px;
    }

    .${cssScope} .ka-no-data-row {
      height: unset;
    }

    .${cssScope} .ka-no-data-cell {
      font-family: ${StyleFontFamily.fontFamily};
      font-style: ${StyleFontFamily.fontStyle};
      font-weight: ${StyleFontFamily.fontWeight};
      font-size: ${StyleBodySmall.fontSize};
      line-height: ${StyleBodySmall.lineHeight};
      height: calc(var(--BU) * 16);
      border-bottom: dotted 1px ${computeColor(p.stroke || [Color.Neutral, 100])};
    }

    .${cssScope} .ka-thead-cell-resize {
      left: unset;
    }

    .${cssScope} .ka-drag-over-row,
    .${cssScope} .ka-drag-over-row th,
    .${cssScope} .ka-drag-over-row td {
      box-shadow: inset 0 1px 0 0 ${computeColor([Color.Quarternary, 700])};
    }

    .${cssScope} .ka-dragged-row ~ .ka-drag-over-row {
      box-shadow: unset;
    }

    .${cssScope} #reference-target {
      display: flex;
      flexDirection: column;
      position: relative;
      width: inherit;
      height: inherit;
    }

    @media print {
      .ka {
        zoom: 0.5 !important;
        width: calc(100% - 8em) !important;
        margin: 4em !important;
      }

      .ka * {
        overflow: visible !important;
        position: static !important;
      }

      .ka p {
        white-space: normal !important;
      }

      .ka td,
      .ka th {
        width: auto !important;
        min-width: auto !important;
        background-color: unset !important;
      }
    }
  `

  return (
    <>
      <style suppressHydrationWarning>{css}</style>

      <div className={cssScope} style={{ display: "flex", width: "100%", height: "100%" }} ref={referenceContainer}>
        <Stack vertical hug loading={p.loading}>
          <Align left hug="height" horizontal id="reference-filters">
            <Stack hug horizontal>
              <Align left horizontal wrap>
                {p.mode === "filter" ? (
                  <InputTextSingle
                    iconNameLeft="search"
                    value={filter}
                    width="fixed"
                    size="large"
                    placeholder="Search"
                    onChange={v => setFilter(v)}
                    color={Color.Neutral}
                  />
                ) : (
                  <></>
                )}

                {Children.toArray(p.children).map(child => child)}
              </Align>

              <Spacer large />

              <Align bottomRight horizontal hug>
                {!p.exportDisable ? (
                  <>
                    <InputButtonIconTertiary
                      size="large"
                      iconName="csv"
                      title="Export to CSV"
                      onClick={() => csv(p.data, p.columns as Column[])}
                    />

                    <InputButtonIconTertiary
                      size="large"
                      iconName="print"
                      title="Print table contents"
                      onClick={() => print()}
                    />
                  </>
                ) : (
                  <></>
                )}
              </Align>
            </Stack>
          </Align>

          <Spacer medium id="reference-spacer" />

          <Align left vertical>
            <div id="reference-target" ref={referencePrint}>
              <Stack
                vertical
                hug
                stroke={p.stroke || [Color.Neutral, 100]}
                fill={p.fill || [Color.Transparent]}
                cornerRadius="large"
              >
                <Align topLeft vertical>
                  <Table
                    table={table}
                    columns={nativeColumns as any}
                    data={p.data}
                    rowKeyField={p.rowKeyField}
                    sortingMode={SortingMode.Single}
                    rowReordering={p.mode === "edit"}
                    noData={{ text: "Nothing found" }}
                    searchText={filter}
                    virtualScrolling={p.mode !== "edit" && p.virtualScrolling ? { enabled: true } : undefined}
                    search={({ searchText: searchTextValue, rowData, column }) => {
                      if (column.dataType === DataType.Boolean) {
                        const b = rowData[column.key]
                        const s = searchTextValue.toLowerCase()

                        return (s === "yes" && b === true) || (s === "no" && b === false)
                      }
                    }}
                    sort={({ column }) => {
                      if (column["sort"]) {
                        return column["sort"](column.sortDirection)
                      }
                    }}
                    childComponents={{
                      tableWrapper: {
                        elementAttributes: () => {
                          if (p.mode !== "edit" && p.virtualScrolling) {
                            return {
                              className: "override-ka-virtual",
                            }
                          }

                          if (p.mode === "edit") {
                            return {
                              className: "override-ka-reorder",
                            }
                          }
                        },
                      },

                      dataRow: {
                        elementAttributes: dataRowElementAttributes => {
                          if (dataRowElementAttributes.rowKeyValue === editId) {
                            return {
                              className: "override-ka-editing-row",
                            }
                          }
                        },
                      },

                      headCell: {
                        content: headCellContent => {
                          const headCellContentAsColumn = headCellContent.column as Column

                          if (
                            headCellContent.column.key === KEY_DRAG ||
                            headCellContent.column.key === KEY_ACTIONS_EDIT ||
                            headCellContent.column.key === KEY_ACTIONS ||
                            headCellContentAsColumn.hidden
                          ) {
                            return <></>
                          }

                          let iconName = ""

                          if (headCellContent.column.sortDirection === SortDirection.Ascend) {
                            iconName = "keyboard_arrow_up"
                          } else if (headCellContent.column.sortDirection === SortDirection.Descend) {
                            iconName = "keyboard_arrow_down"
                          } else {
                            iconName = "unfold_more"
                          }

                          const alignmentRight = headCellContent.column.dataType === DataType.Number
                          const firstColumn = headCellContent.column.key === nativeColumns[0].key

                          const totalSelectableFields = p.data.filter(d =>
                            p.selectDisabledField !== undefined && d[p.selectDisabledField]
                              ? d[p.selectKeyField!]
                              : true,
                          ).length

                          const allowSort =
                            p.mode !== "edit" &&
                            headCellContentAsColumn.dataType !== DataType.ProgressIndicator &&
                            headCellContentAsColumn.dataType !== DataType.Status &&
                            headCellContentAsColumn.disableSort !== true

                          const text = (
                            <Text fill={[Color.Neutral, 700]} xsmall>
                              <b>{headCellContent.column.title}</b>
                            </Text>
                          )

                          return (
                            <Stack hug horizontal>
                              {(p.mode === "simple" || p.mode === "filter") && p.selectKeyField && firstColumn ? (
                                <>
                                  <Align left horizontal hug>
                                    <InputCheckbox
                                      size="small"
                                      color={Color.Neutral}
                                      value={
                                        selectedFields === totalSelectableFields
                                          ? true
                                          : selectedFields === 0
                                            ? false
                                            : "indeterminate"
                                      }
                                      onChange={value => updateSelectFieldAll(value)}
                                    />
                                  </Align>

                                  <Spacer xsmall />
                                </>
                              ) : (
                                <></>
                              )}

                              <Align horizontal left={!alignmentRight} right={alignmentRight}>
                                {allowSort || headCellContentAsColumn.sort ? (
                                  <CellHeadLink onClick={() => table.updateSortDirection(headCellContent.column.key)}>
                                    {text}

                                    <Spacer tiny />

                                    <Icon medium name={iconName} fill={[Color.Neutral, 700]} />
                                  </CellHeadLink>
                                ) : (
                                  text
                                )}
                              </Align>
                            </Stack>
                          )
                        },

                        elementAttributes: headCellElementAttributes => {
                          const column = headCellElementAttributes.column as Column

                          if (p.fixedKeyField === column.key) {
                            return { className: "override-ka-fixed-left" }
                          }

                          if (
                            column.key === KEY_DRAG ||
                            column.key === KEY_ACTIONS_EDIT ||
                            column.key === KEY_ACTIONS
                          ) {
                            return { className: "override-ka-fixed-right" }
                          }
                        },
                      },

                      cellText: {
                        content: cellTextContent => {
                          if (cellTextContent.column.key === KEY_ACTIONS_EDIT) {
                            return (
                              <Stack horizontal hug>
                                <Align horizontal right>
                                  <InputButtonIconTertiary
                                    size="small"
                                    iconName="delete"
                                    onClick={() => setDeleteId(cellTextContent.rowKeyValue)}
                                    disabled={editId !== null}
                                    destructive
                                  />

                                  <ActionEdit {...cellTextContent} disabled={editId !== null} />
                                </Align>
                              </Stack>
                            )
                          } else if (cellTextContent.column.key === KEY_ACTIONS && p.rowActions) {
                            const actionElements: ReactNode[] = []

                            Children.toArray(p.rowActions(cellTextContent.rowData)).forEach(r => {
                              actionElements.push(r)
                              actionElements.push(<Spacer xsmall />)
                            })

                            actionElements.pop()

                            return (
                              <Stack horizontal hug>
                                <Align horizontal right>
                                  {actionElements}
                                </Align>
                              </Stack>
                            )
                          } else {
                            const column = cellTextContent.column as Column

                            let output = <></>

                            const alignmentRight = column.dataType === DataType.Number
                            const firstColumn = column.key === nativeColumns[0].key

                            const text = formatValue(
                              cellTextContent.value?.toString(),
                              column.dataType || DataType.String,
                            )

                            const tooltip = column.tooltip as Column["tooltip"]

                            let tooltipElement

                            if (typeof tooltip === "boolean" && text !== TABLE_CELL_EMPTY_STRING) {
                              tooltipElement = (
                                <Align horizontal left>
                                  <Text small fill={[Color.Neutral, 700]} wrap>
                                    {text}
                                  </Text>
                                </Align>
                              )
                            } else if (typeof tooltip === "function") {
                              tooltipElement = tooltip(cellTextContent.rowData)

                              if (typeof tooltipElement === "string") {
                                tooltipElement = (
                                  <Align horizontal left>
                                    <Text small fill={[Color.Neutral, 700]} wrap>
                                      {tooltipElement}
                                    </Text>
                                  </Align>
                                )
                              }
                            }

                            if (column.dataType === DataType.ProgressIndicator) {
                              output = <CellProgressIndicator {...cellTextContent} />
                            } else if (column.dataType === DataType.Status) {
                              output = <CellStatus {...cellTextContent} />
                            } else {
                              const monospace =
                                column.dataType === DataType.Date ||
                                column.dataType === DataType.Number ||
                                column.dataType === DataType.Boolean

                              const avatar = column.avatar as Column["avatar"]
                              const link = column.link as Column["link"]

                              let avatarSrc
                              let linkEffect

                              if (typeof avatar === "function") {
                                avatarSrc = avatar(cellTextContent.rowData)
                              }

                              if (typeof link === "function") {
                                linkEffect = link(cellTextContent.rowData)
                              }

                              const avatarElement = avatarSrc ? (
                                <>
                                  <Avatar size="small" src={avatarSrc} title={text} />

                                  <Spacer xsmall />
                                </>
                              ) : null

                              output =
                                linkEffect && text !== TABLE_CELL_EMPTY_STRING ? (
                                  <>
                                    {avatarElement}

                                    <Text
                                      fill={[Color.Neutral, 700]}
                                      small
                                      monospace={monospace}
                                      textOverflow={column.maxWidth !== undefined}
                                    >
                                      {typeof linkEffect === "string" ? (
                                        <Link href={linkEffect}>{text}</Link>
                                      ) : (
                                        <a href="javascript: void(0);" onClick={linkEffect}>
                                          {text}
                                        </a>
                                      )}
                                    </Text>
                                  </>
                                ) : (
                                  <>
                                    {avatarElement}

                                    <Text
                                      fill={[Color.Neutral, 700]}
                                      small
                                      monospace={monospace}
                                      textOverflow={column.maxWidth !== undefined}
                                    >
                                      {text}
                                    </Text>
                                  </>
                                )
                            }

                            const DEPRICATED_customCellRendererElement =
                              p.DEPRICATED_customCellRenderer && typeof p.DEPRICATED_customCellRenderer === "function"
                                ? p.DEPRICATED_customCellRenderer(cellTextContent)
                                : null

                            return (
                              <Stack hug horizontal>
                                {p.mode === "edit" && firstColumn ? (
                                  <Align left horizontal hug>
                                    <Icon name="drag_indicator" medium fill={[Color.Neutral, 700]} />

                                    <Spacer xsmall />
                                  </Align>
                                ) : (
                                  <></>
                                )}

                                {(p.mode === "simple" || p.mode === "filter") && p.selectKeyField && firstColumn ? (
                                  <>
                                    <Align left horizontal hug>
                                      <InputCheckbox
                                        size="small"
                                        color={Color.Neutral}
                                        disabled={
                                          p.selectDisabledField
                                            ? p.data[cellTextContent.rowKeyValue]?.[p.selectDisabledField]
                                            : false
                                        }
                                        value={p.data[cellTextContent.rowKeyValue]?.[p.selectKeyField] ?? false}
                                        onChange={value => {
                                          updateSelectField(cellTextContent.rowKeyValue, value)
                                        }}
                                      />
                                    </Align>

                                    <Spacer xsmall />
                                  </>
                                ) : (
                                  <></>
                                )}

                                <Align left={!alignmentRight} right={alignmentRight} horizontal>
                                  {DEPRICATED_customCellRendererElement ? (
                                    DEPRICATED_customCellRendererElement
                                  ) : tooltipElement ? (
                                    <Tooltip trigger={output}>{tooltipElement}</Tooltip>
                                  ) : (
                                    output
                                  )}
                                </Align>
                              </Stack>
                            )
                          }
                        },
                      },

                      cellEditor: {
                        content: cellEditorContent => {
                          const firstColumn = cellEditorContent.column.key === nativeColumns[0].key

                          return (
                            <Stack hug horizontal>
                              {p.mode === "edit" && firstColumn ? (
                                <Align left horizontal hug>
                                  <Icon name="drag_indicator" medium fill={[Color.Neutral, 700]} />

                                  <Spacer xsmall />
                                </Align>
                              ) : (
                                <></>
                              )}

                              {(cellEditorContent.column as Column).dataType === DataType.ProgressIndicator ? (
                                <Align left horizontal>
                                  <CellProgressIndicator {...cellEditorContent} />
                                </Align>
                              ) : (
                                <></>
                              )}

                              {(cellEditorContent.column as Column).dataType === DataType.Status ? (
                                <Align left horizontal>
                                  <CellStatus {...cellEditorContent} />
                                </Align>
                              ) : (
                                <></>
                              )}

                              {cellEditorContent.column.dataType === DataType.Boolean ? (
                                <Align left horizontal>
                                  <CellInputCheckbox {...cellEditorContent} />
                                </Align>
                              ) : (
                                <></>
                              )}

                              {cellEditorContent.column.dataType === DataType.Date ? (
                                <Align left horizontal>
                                  <CellInputTextDate {...cellEditorContent} />
                                </Align>
                              ) : (
                                <></>
                              )}

                              {cellEditorContent.column.dataType === DataType.Number ||
                              cellEditorContent.column.dataType === DataType.String ? (
                                <Align left horizontal>
                                  <CellInputTextSingle {...cellEditorContent} />
                                </Align>
                              ) : (
                                <></>
                              )}

                              {cellEditorContent.column.key === KEY_ACTIONS_EDIT ? (
                                <Align left horizontal>
                                  <ActionSaveCancel {...cellEditorContent} />
                                </Align>
                              ) : (
                                <></>
                              )}
                            </Stack>
                          )
                        },
                      },

                      cell: {
                        elementAttributes: cellElementAttributes => {
                          const column = cellElementAttributes.column as Column
                          const classNames: string[] = []

                          if (p.fixedKeyField === column.key) {
                            classNames.push("override-ka-fixed-left")
                          }

                          if (column.key === KEY_ACTIONS_EDIT || column.key === KEY_ACTIONS) {
                            classNames.push("override-ka-fixed-right")
                          }

                          let minWidth: number | string = "auto"
                          let maxWidth: number | string = "auto"

                          if (column.minWidth) {
                            minWidth = (containerWidth / 100) * parseFloat(column.minWidth)
                          }

                          if (column.maxWidth) {
                            maxWidth = (containerWidth / 100) * parseFloat(column.maxWidth)
                          }

                          if (column.preventContentCollapse) {
                            classNames.push("override-ka-prevent-content-collapse")
                          }

                          return {
                            className: classNames.join(" "),

                            style: {
                              width: column.explodeWidth ? "100%" : "auto",
                              "min-width": minWidth,
                              "max-width": maxWidth,
                            },
                          }
                        },
                      },
                    }}
                  />
                </Align>

                {p.mode === "edit" ? (
                  <Align center vertical>
                    <Divider fill={[Color.Neutral, 100]} />

                    <Spacer xsmall />

                    <InputButtonTertiary
                      width="auto"
                      size="small"
                      iconNameLeft="add"
                      label="Add row"
                      disabled={editId !== null}
                      onClick={() => {
                        table.insertRow(createNewRow(p.data), {
                          rowKeyValue: p.data[p.data.length - 1]?.key || 0,
                          insertRowPosition: InsertRowPosition.after,
                        })
                      }}
                    />

                    <Spacer xsmall />
                  </Align>
                ) : (
                  <></>
                )}
              </Stack>
            </div>
          </Align>
        </Stack>
      </div>

      <Alert
        open={deleteId !== null}
        title={
          <Text fill={[Color.Error, 700]} small>
            Delete row?
          </Text>
        }
        description={
          <Text fill={[Color.Neutral, 700]} xsmall wrap>
            Are you sure you want to delete this row?
          </Text>
        }
        buttonPrimary={
          <InputButtonPrimary
            size="small"
            width="auto"
            onClick={() => {
              table.dispatch(deleteRow(deleteId))
            }}
            label="Delete"
            destructive
          />
        }
        buttonSecondary={
          <InputButtonTertiary size="small" width="auto" onClick={() => setDeleteId(null)} label="Cancel" />
        }
      />
    </>
  )
}
