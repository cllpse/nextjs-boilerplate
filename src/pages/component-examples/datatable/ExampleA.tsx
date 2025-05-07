import { Stack } from "@new/Stack/Stack"
import { Column, DataTable, DataType } from "@new/DataTable/DataTable"
import { useState } from "react"
import { Align } from "@new/Stack/Align"
import { InputCombobox } from "@new/InputCombobox/InputCombobox"
import { InputComboboxItem } from "@new/InputCombobox/InputComboboxItem"
import { Color } from "@new/Color"
import { Spacer } from "@new/Stack/Spacer"
import { InputCheckbox } from "@new/InputCheckbox/InputCheckbox"
import { InputButtonPrimary } from "@new/InputButton/InputButtonPrimary"
import { InputButtonSecondary } from "@new/InputButton/InputButtonSecondary"
import { InputButtonTertiary } from "@new/InputButton/InputButtonTertiary"
import { OverflowContainer } from "@new/OverflowContainer/OverflowContainer"

export default () => {
  const [mode, setMode] = useState("filter-fixed-select")
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [comboboxValue, setComboboxValue] = useState("a")

  const someData = Array(1000)
    .fill(undefined)
    .map((_, index) => ({
      id: index,
      guid: crypto.randomUUID(),
      rowIndex: index,
      columnIndex: 2,
    }))

  const alotOfData = Array(10000)
    .fill(undefined)
    .map((_, index) => {
      let longString: string | undefined = undefined

      if (index === 25) {
        longString =
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
      }

      if (index === 50) {
        longString =
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
      }

      if (index === 75) {
        longString =
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
      }

      return {
        id: index,
        guid: crypto.randomUUID(),
        longString: longString,
        rowIndex: index,
        columnIndex: 2,
      }
    })

  const alotOfAndSomeColumns: Column[] = [
    { key: "guid", title: "GUID", dataType: DataType.String, explodeWidth: true },
    { key: "longString", title: "Lorem Ipsum", dataType: DataType.String, minWidth: "15%", maxWidth: "15%" },
    { key: "rowIndex", title: "Row index", dataType: DataType.Number },
    { key: "columnIndex", title: "Column index", dataType: DataType.Number },
  ]

  const [data, setData] = useState([
    {
      id: 0,
      selected: true,
      name: "Mike Wazowski",
      netWorth: 1500000.75,
      cashOnHand: 30000.75,
      bool: true,
      lorem:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },

    {
      id: 1,
      selected: false,
      bool: false,
      date: new Date(1964, 10, 2),
    },

    {
      id: 2,
      selected: false,
      name: "Tom Williams",
      netWorth: 45000,
      cashOnHand: 36000,
      date: new Date(1982, 11, 8),
    },

    {
      id: 3,
      selected: false,
      name: "Kurt Cobain",
      netWorth: 75534.66,
      cashOnHand: 35000.75,
      bool: true,
    },

    {
      id: 4,
      selected: false,
      name: "Marshall Bruce",
      netWorth: 7700,
      cashOnHand: 1500.75,
      bool: true,
    },

    {
      id: 5,
      selected: false,
      name: "Matas",
      netWorth: 666,
      cashOnHand: 66.66,
    },

    { id: 6, selected: true, name: "Thomas Angelbo Christensen", bool: false, date: new Date(1982, 5, 8) },

    { id: 7, name: "Test Data" },
    { id: 8, name: "Test Data" },
    { id: 9, name: "Test Data" },
    { id: 10, name: "Test Data" },
    { id: 11, name: "Test Data" },
    { id: 12, name: "Test Data" },
    { id: 13, name: "Test Data" },
    { id: 14, name: "Test Data" },
    { id: 15, name: "Test Data" },
    { id: 16, name: "Test Data" },
    { id: 17, name: "Test Data" },
    { id: 18, name: "Test Data" },
    { id: 19, name: "Test Data" },
    { id: 20, name: "Test Data" },
  ])

  const [dataEditable, setDataEditable] = useState([
    {
      id: 0,
      selected: true,
      name: "Mike Wazowski",
      netWorth: 1500000.75,
      cashOnHand: 30000.75,
      bool: true,
      lorem:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },

    {
      id: 1,
      selected: false,
      bool: false,
      date: new Date(1964, 10, 2),
    },

    {
      id: 2,
      selected: false,
      name: "Tom Williams",
      netWorth: 45000,
      cashOnHand: 36000,
      date: new Date(1982, 11, 8),
    },

    {
      id: 3,
      selected: false,
      name: "Kurt Cobain",
      netWorth: 75534.66,
      cashOnHand: 35000.75,
      bool: true,
    },

    {
      id: 4,
      selected: false,
      name: "Marshall Bruce",
      netWorth: 7700,
      cashOnHand: 1500.75,
      bool: true,
    },

    {
      id: 5,
      selected: false,
      name: "Matas",
      netWorth: 666,
      cashOnHand: 66.66,
    },

    { id: 6, selected: true, name: "Thomas Angelbo Christensen", bool: false, date: new Date(1982, 5, 8) },
  ])

  const dataColumns: Column[] = [
    {
      key: "name",
      title: "Name",
      dataType: DataType.String,
      link: rowData => (rowData.id > 6 ? undefined : `#${rowData.id}`),
      avatar: rowData =>
        rowData.id < 6
          ? undefined
          : "https://res.cloudinary.com/hoodheroes-prod/image/upload/c_scale,f_auto/v1636925492/static/placeholders/defaultImageCompany_a5ru0l.png",
    },
    {
      key: "netWorth",
      title: "NET worth (USD)",
      dataType: DataType.Number,
      tooltip: rowData => (rowData.id < 2 ? undefined : `Tooltip for id "${rowData.id}"`),
    },
    {
      key: "cashOnHand",
      title: "Liquidity (USD)",
      dataType: DataType.Number,
    },
    {
      key: "liquidityPercentage",
      title: "Liquidity %",
      dataType: DataType.ProgressIndicator,
      minWidth: "10%",
      tooltip: rowData => {
        const n = Math.round(Math.ceil((rowData.cashOnHand / rowData.netWorth) * 100))

        return n ? `${n}%` : "0%"
      },
      progressIndicator: {
        type: "bar",
        configure: rowData => {
          let value = 0
          let color = Color.Neutral

          if (!rowData.netWorth || !rowData.cashOnHand) {
            return {
              value,
              color,
            }
          }

          value = Math.round(Math.ceil((rowData.cashOnHand / rowData.netWorth) * 100))

          if (value < 25) {
            color = Color.Quinary
          } else {
            color = Color.Secondary
          }

          return {
            value,
            color,
          }
        },
      },
    },
    {
      key: "debtPercentage",
      title: "Debt %",
      dataType: DataType.ProgressIndicator,
      progressIndicator: {
        type: "circle",
        configure: rowData => {
          let value = 0
          let color = Color.Neutral

          if (!rowData.netWorth || !rowData.cashOnHand) {
            return {
              value,
              color,
            }
          }

          value = Math.round(Math.ceil(100 - (rowData.cashOnHand / rowData.netWorth) * 100))
          color = Color.Quinary

          return {
            value,
            color,
          }
        },
      },
    },
    {
      key: "bool",
      title: "Status",
      dataType: DataType.Status,
      status: {
        configure: rowData => {
          if (rowData.bool === true) {
            return {
              color: Color.Neutral,
              label: "Derp",
            }
          } else if (rowData.bool === false) {
            return {
              color: Color.Secondary,
              label: "Derp",
            }
          } else {
            return undefined
          }
        },
      },
    },
    { key: "bool", title: "Owns yacht", dataType: DataType.Boolean },
    { key: "date", title: "D.O.B.", dataType: DataType.Date },
    { key: "lorem", title: "Lorem ipsum", dataType: DataType.String, minWidth: "30%", maxWidth: "30%", tooltip: true },
  ]

  return (
    <Stack vertical>
      <Align vertical left>
        <InputCombobox
          size="large"
          width="fixed"
          textNoSelection=""
          color={Color.Neutral}
          value={mode}
          onChange={value => {
            setMode(value as string)
          }}
        >
          <InputComboboxItem value="simple" label="Simple" />
          <InputComboboxItem value="simple-actions" label="Simple, actions" />
          <InputComboboxItem value="simple-fixed" label="Simple, fixed first column" />
          <InputComboboxItem value="simple-fixed-select" label="Simple, fixed first column, selectable" />
          <InputComboboxItem
            value="filter-fixed-select"
            label="Filtering, extra filters, fixed first column, selectable"
          />
          <InputComboboxItem value="edit" label="Editable" />
          <InputComboboxItem value="someData" label="1000 rows" />
          <InputComboboxItem value="alotOfData" label="10.000 rows, virtual scrolling" />
        </InputCombobox>
      </Align>

      <Spacer huge />

      <Align vertical left>
        {mode === "simple" ? (
          <OverflowContainer
            axes="vertical"
            hug
            colorBackground={[Color.White]}
            colorForeground={Color.Neutral}
            maxHeight="600px"
          >
            <DataTable
              mode="simple"
              columns={dataColumns}
              data={data}
              rowKeyField="id"
              defaultSortColumn="name"
              exportName="table-people"
              onChange={value => {
                setData(value)
              }}
              onChangeRow={value => {
                console.log("onChangeRow", value)
              }}
            />
          </OverflowContainer>
        ) : (
          <></>
        )}

        {mode === "simple-actions" ? (
          <OverflowContainer
            axes="vertical"
            hug
            colorBackground={[Color.White]}
            colorForeground={Color.Neutral}
            maxHeight="600px"
          >
            <DataTable
              mode="simple"
              columns={dataColumns}
              data={data}
              rowKeyField="id"
              defaultSortColumn="name"
              exportName="table-people"
              rowActions={rowData => [
                <InputButtonTertiary
                  key="kek_2"
                  size="small"
                  width="auto"
                  label="Action"
                  onClick={() => {
                    console.log(rowData)
                  }}
                />,

                <InputButtonSecondary
                  key="kek_2"
                  size="small"
                  width="auto"
                  label="Action"
                  onClick={() => {
                    console.log(rowData)
                  }}
                />,

                <InputButtonPrimary
                  key="kek_1"
                  size="small"
                  width="auto"
                  label="Action"
                  onClick={() => {
                    console.log(rowData)
                  }}
                />,
              ]}
              onChange={value => {
                setData(value)
              }}
              onChangeRow={value => {
                console.log("onChangeRow", value)
              }}
            />
          </OverflowContainer>
        ) : (
          <></>
        )}

        {mode === "simple-fixed" ? (
          <OverflowContainer
            axes="vertical"
            hug
            colorBackground={[Color.White]}
            colorForeground={Color.Neutral}
            maxHeight="600px"
          >
            <DataTable
              mode="simple"
              columns={dataColumns}
              data={data}
              rowKeyField="id"
              fixedKeyField="name"
              defaultSortColumn="name"
              exportName="table-people"
              onChange={value => {
                setData(value)
              }}
              onChangeRow={value => {
                console.log("onChangeRow", value)
              }}
            />
          </OverflowContainer>
        ) : (
          <></>
        )}

        {mode === "simple-fixed-select" ? (
          <OverflowContainer
            axes="vertical"
            hug
            colorBackground={[Color.White]}
            colorForeground={Color.Neutral}
            maxHeight="600px"
          >
            <DataTable
              mode="simple"
              columns={dataColumns}
              data={data}
              rowKeyField="id"
              selectKeyField="selected"
              fixedKeyField="name"
              defaultSortColumn="name"
              exportName="table-people"
              onChange={value => {
                setData(value)
              }}
              onChangeRow={value => {
                console.log("onChangeRow", value)
              }}
            />
          </OverflowContainer>
        ) : (
          <></>
        )}

        {mode === "filter-fixed-select" ? (
          <OverflowContainer
            axes="vertical"
            hug
            colorBackground={[Color.White]}
            colorForeground={Color.Neutral}
            maxHeight="600px"
          >
            <DataTable
              mode="filter"
              columns={dataColumns}
              data={data}
              rowKeyField="id"
              selectKeyField="selected"
              fixedKeyField="name"
              defaultSortColumn="name"
              exportName="table-people"
              onChange={value => {
                setData(value)
              }}
              onChangeRow={value => {
                console.log("onChangeRow", value)
              }}
            >
              <InputCombobox
                size="large"
                width="fixed"
                textNoSelection=""
                color={Color.Neutral}
                value={comboboxValue}
                label={["inside", "Extra filtering option"]}
                onChange={value => {
                  setComboboxValue(value as string)
                }}
              >
                <InputComboboxItem value="a" label="Option A" />
                <InputComboboxItem value="b" label="Option B" />
                <InputComboboxItem value="c" label="Option C" />
              </InputCombobox>

              <InputCheckbox
                size="large"
                color={Color.Neutral}
                value={checkboxValue}
                onChange={value => setCheckboxValue(value)}
                label="Extra filtering option"
              />
            </DataTable>
          </OverflowContainer>
        ) : (
          <></>
        )}

        {mode === "edit" ? (
          <DataTable
            mode="edit"
            columns={dataColumns}
            data={dataEditable}
            rowKeyField="id"
            fixedKeyField="name"
            defaultSortColumn="name"
            exportName="table-people"
            onChange={value => {
              setDataEditable(value)
            }}
            onChangeRow={value => {
              console.log("onChangeRow", value)
            }}
          />
        ) : (
          <></>
        )}

        {mode === "someData" ? (
          <DataTable
            mode="filter"
            columns={alotOfAndSomeColumns}
            data={someData}
            rowKeyField="id"
            defaultSortColumn="guid"
            exportName="table-people"
            onChange={value => {
              setData(value)
            }}
            onChangeRow={value => {
              console.log("onChangeRow", value)
            }}
          />
        ) : (
          <></>
        )}

        {mode === "alotOfData" ? (
          <OverflowContainer
            axes="vertical"
            hug
            colorBackground={[Color.White]}
            colorForeground={Color.Neutral}
            maxHeight="600px"
          >
            <DataTable
              mode="filter"
              columns={alotOfAndSomeColumns}
              data={alotOfData}
              rowKeyField="id"
              defaultSortColumn="guid"
              virtualScrolling
              exportName="table-people"
              onChange={value => {
                setData(value)
              }}
              onChangeRow={value => {
                console.log("onChangeRow", value)
              }}
            />
          </OverflowContainer>
        ) : (
          <></>
        )}
      </Align>

      {mode !== "alotOfData" && mode !== "someData" ? (
        <>
          <Spacer huge />

          <Align vertical left>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Align>
        </>
      ) : (
        <></>
      )}
    </Stack>
  )
}
