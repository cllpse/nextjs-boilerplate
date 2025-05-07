import { Spacer } from "@new/Stack/Spacer"
import { Stack } from "@new/Stack/Stack"
import { Align } from "@new/Stack/Align"
import { InputTextSingle } from "@new/InputText/InputTextSingle"
import { InputTextMultiple } from "@new/InputText/InputTextMultiple"
import { InputTextDate } from "@new/InputText/InputTextDate"
import { useState } from "react"
import { Color } from "@new/Color"

export default ({ loading, disabled }: { loading: boolean; disabled: boolean }) => {
  const [value, setValue] = useState("")

  return (
    <>
      <Stack vertical hug>
        <Align vertical hug>
          <Stack vertical hug>
            <Align vertical hug topLeft>
              <InputTextDate
                placeholder="Placeholder"
                size="small"
                width="fixed"
                loading={loading}
                disabled={disabled}
                hint="Hint hinting hintering"
                color={Color.Neutral}
                value={value}
                onChange={v => setValue(v)}
                required
              />

              <Spacer large />

              <InputTextSingle
                placeholder="Placeholder"
                size="small"
                width="fixed"
                loading={loading}
                disabled={disabled}
                hint="Hint hinting hintering"
                color={Color.Primary}
                value={value}
                onChange={v => setValue(v)}
              />

              <Spacer large />

              <InputTextSingle
                placeholder="Placeholder"
                size="small"
                width="fixed"
                loading={loading}
                disabled={disabled}
                iconNameLeft="search"
                color={Color.Secondary}
                value={value}
                onChange={v => setValue(v)}
              />

              <Spacer large />

              <InputTextSingle
                label={["inside", "Label"]}
                placeholder="Placeholder"
                size="small"
                width="fixed"
                loading={loading}
                disabled={disabled}
                color={Color.Tertiary}
                value={value}
                onChange={v => setValue(v)}
              />

              <Spacer large />

              <InputTextSingle
                label={["inside", "Label"]}
                placeholder="Placeholder"
                size="small"
                width="fixed"
                loading={loading}
                disabled={disabled}
                color={Color.Neutral}
                value={value}
                error="Error erroring erroring"
                onChange={v => setValue(v)}
              />

              <Spacer large />

              <InputTextSingle
                label={["outside", "Label"]}
                placeholder="Placeholder"
                hint="Hint hinting hintering"
                size="small"
                width="fixed"
                loading={loading}
                disabled={disabled}
                color={Color.Neutral}
                value={value}
                onChange={v => setValue(v)}
                required
              />

              <Spacer large />

              <InputTextSingle
                label={["outside", "Label"]}
                placeholder="Placeholder"
                hint="Hint hinting hintering"
                size="small"
                width="fixed"
                loading={loading}
                disabled={disabled}
                iconNameLeft="search"
                iconNameRight="percent"
                color={Color.Neutral}
                value={value}
                onChange={v => setValue(v)}
              />
            </Align>
          </Stack>
        </Align>

        <Spacer large />

        <Align vertical hug>
          <Stack vertical hug>
            <Align vertical topLeft hug>
              <InputTextDate
                placeholder="Placeholder"
                size="large"
                width="fixed"
                loading={loading}
                disabled={disabled}
                hint="Hint hinting hintering"
                color={Color.Neutral}
                value={value}
                onChange={v => setValue(v)}
              />

              <Spacer large />

              <InputTextSingle
                placeholder="Placeholder"
                size="large"
                width="fixed"
                loading={loading}
                disabled={disabled}
                hint="Hint hinting hintering"
                color={Color.Neutral}
                value={value}
                onChange={v => setValue(v)}
              />

              <Spacer large />

              <InputTextSingle
                placeholder="Placeholder"
                size="large"
                width="fixed"
                loading={loading}
                disabled={disabled}
                iconNameLeft="search"
                color={Color.Neutral}
                value={value}
                onChange={v => setValue(v)}
              />

              <Spacer large />

              <InputTextSingle
                label={["inside", "Label"]}
                placeholder="Placeholder"
                size="large"
                width="fixed"
                loading={loading}
                disabled={disabled}
                color={Color.Neutral}
                value={value}
                onChange={v => setValue(v)}
                required
              />

              <Spacer large />

              <InputTextSingle
                label={["inside", "Label"]}
                placeholder="Placeholder"
                hint="Hint hinting hintering"
                size="large"
                width="fixed"
                loading={loading}
                disabled={disabled}
                color={Color.Neutral}
                value={value}
                onChange={v => setValue(v)}
              />

              <Spacer large />

              <InputTextSingle
                label={["outside", "Label"]}
                placeholder="Placeholder"
                size="large"
                width="fixed"
                loading={loading}
                disabled={disabled}
                color={Color.Neutral}
                value={value}
                onChange={v => setValue(v)}
              />

              <Spacer large />

              <InputTextSingle
                label={["outside", "Label"]}
                placeholder="Placeholder"
                hint="Hint hinting hintering"
                size="large"
                width="fixed"
                loading={loading}
                disabled={disabled}
                iconNameLeft="search"
                iconNameRight="percent"
                color={Color.Neutral}
                value={value}
                onChange={v => setValue(v)}
              />

              <Spacer large />

              <InputTextMultiple
                label={["outside", "Label"]}
                placeholder="Placeholder"
                hint="Hint hinting hintering"
                size="large"
                width="fixed"
                loading={loading}
                disabled={disabled}
                color={Color.Neutral}
                value={value}
                onChange={v => setValue(v)}
              />

              <Spacer large />

              <InputTextMultiple
                label={["outside", "Label"]}
                placeholder="Placeholder"
                hint="Hint hinting hintering"
                size="large"
                width="fixed"
                error="Error erroring erroring"
                loading={loading}
                disabled={disabled}
                color={Color.Neutral}
                value={value}
                onChange={v => setValue(v)}
              />
            </Align>
          </Stack>
        </Align>
      </Stack>
    </>
  )
}
