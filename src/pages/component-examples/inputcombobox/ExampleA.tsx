import { Spacer } from "@new/Stack/Spacer"
import { Stack } from "@new/Stack/Stack"
import { Align } from "@new/Stack/Align"
import { InputCombobox } from "@new/InputCombobox/InputCombobox"
import { InputComboboxItem } from "@new/InputCombobox/InputComboboxItem"
import { useState } from "react"
import { Color } from "@new/Color"

export default ({ loading, disabled }: { loading: boolean; disabled: boolean }) => {
  const [valueMultiple, setValueMultiple] = useState(["1"])
  const [valueSingle, setValueSingle] = useState("1")

  const [items] = useState([
    { value: "1", label: "One One One One One One One One AAA One One One One One One One One BBB" },
    { value: "2", label: "Two Two Two Two Two Two Two Two" },
    { value: "3", label: "Three Three Three Three Three Three" },
    { value: "4", label: "Four" },
    { value: "5", label: "Five" },
    { value: "6", label: "Six" },
    { value: "7", label: "Seven" },
    { value: "8", label: "Eight" },
    { value: "9", label: "Nine" },
    { value: "10", label: "Ten" },
    { value: "6661", label: "Devil 1" },
    { value: "6662", label: "Devil 2" },
    { value: "6663", label: "Devil 3" },
    { value: "6664", label: "Devil 4" },
    { value: "6665", label: "Devil 5" },
    { value: "6666", label: "Devil 6" },
    { value: "6667", label: "Devil 7" },
    { value: "6668", label: "Devil 8" },
    { value: "6669", label: "Devil 9" },
    { value: "66610", label: "Devil 10" },
    { value: "66611", label: "Devil 11" },
    { value: "66612", label: "Devil 12" },
    { value: "66613", label: "Devil 13" },
    { value: "66614", label: "Devil 14" },
    { value: "66615", label: "Devil 15" },
    { value: "66616", label: "Devil 16" },
    { value: "66617", label: "Devil 17" },
    { value: "66618", label: "Devil 18" },
    { value: "66619", label: "Devil 19" },
    { value: "66620", label: "Devil 20" },
  ])

  return (
    <>
      <Stack vertical>
        <Align vertical>
          <InputCombobox
            size="small"
            width="fixed"
            color={Color.Neutral}
            label={["inside", "Label"]}
            textNoSelection="Select..."
            filterOptions={{
              textFilterNoResults: "No results",
              textFilterPlaceholder: "Filter...",
            }}
            value={valueMultiple}
            onChange={v => setValueMultiple(v as string[])}
            disabled={disabled}
            hint="Hint text goes here!"
            error="Error text goes here!"
            loading={loading}
            resettable
          >
            {items.map((item, index) => (
              <InputComboboxItem key={index} label={item.label} value={item.value} />
            ))}
          </InputCombobox>
        </Align>

        <Spacer huge />

        <Align vertical>
          <InputCombobox
            size="small"
            width="fixed"
            color={Color.Neutral}
            label={["outside", "Label"]}
            textNoSelection="Select..."
            filterOptions={{
              textFilterNoResults: "No results",
              textFilterPlaceholder: "Filter...",
            }}
            value={valueMultiple}
            onChange={v => setValueMultiple(v as string[])}
            disabled={disabled}
            loading={loading}
            hint="Hint text goes here!"
            error="Error text goes here!"
            multiple
            clearable
          >
            {items.map((item, index) => (
              <InputComboboxItem key={index} label={item.label} value={item.value} />
            ))}
          </InputCombobox>
        </Align>

        <Spacer huge />

        <Align vertical>
          <InputCombobox
            size="large"
            width="auto"
            color={Color.Neutral}
            label={["outside", "Label"]}
            textNoSelection="Select..."
            filterOptions={{
              textFilterNoResults: "No results",
              textFilterPlaceholder: "Filter...",
            }}
            value={valueMultiple}
            onChange={v => setValueMultiple(v as string[])}
            disabled={disabled}
            loading={loading}
            multiple
            clearable
          >
            {items.map((item, index) => (
              <InputComboboxItem key={index} label={item.label} value={item.value} />
            ))}
          </InputCombobox>
        </Align>

        <Spacer huge />

        <Align vertical>
          <InputCombobox
            size="small"
            width="auto"
            color={Color.Neutral}
            label={["inside", "Label"]}
            textNoSelection="Select..."
            filterOptions={{
              textFilterNoResults: "No results",
              textFilterPlaceholder: "Filter...",
            }}
            value={valueSingle}
            onChange={v => setValueSingle(v as string)}
            disabled={disabled}
            loading={loading}
          >
            {items.map((item, index) => (
              <InputComboboxItem key={index} label={item.label} value={item.value} />
            ))}
          </InputCombobox>
        </Align>

        <Spacer huge />

        <Align vertical>
          <InputCombobox
            size="large"
            width="auto"
            color={Color.Neutral}
            label={["inside", "Label"]}
            textNoSelection="Select..."
            filterOptions={{
              textFilterNoResults: "No results",
              textFilterPlaceholder: "Filter...",
            }}
            value={valueSingle}
            onChange={v => setValueSingle(v as string)}
            disabled={disabled}
            loading={loading}
          >
            {items.map((item, index) => (
              <InputComboboxItem key={index} label={item.label} value={item.value} />
            ))}
          </InputCombobox>
        </Align>

        <Spacer huge />

        <Align vertical>
          <InputCombobox
            size="large"
            width="auto"
            color={Color.Neutral}
            label={["inside", "Label"]}
            textNoSelection="Select..."
            filterOptions={{
              textFilterNoResults: "No results",
              textFilterPlaceholder: "Filter...",
            }}
            value={valueSingle}
            onChange={v => setValueSingle(v as string)}
            disabled={disabled}
            loading={loading}
            clearable
            enableVirtuoso
          >
            {items.map((item, index) => (
              <InputComboboxItem key={index} label={item.label} value={item.value} />
            ))}
          </InputCombobox>
        </Align>
      </Stack>
    </>
  )
}
