import { InputCheckbox } from "@new/InputCheckbox/InputCheckbox"
import { Spacer } from "@new/Stack/Spacer"
import { Color } from "@new/Color"
import { Align } from "@new/Stack/Align"
import { Stack } from "@new/Stack/Stack"

export default ({
  loading,
  disabled,
  onLoadingChange,
  onDisabledChange,
}: {
  loading: boolean
  disabled: boolean
  onLoadingChange: (value: boolean) => void
  onDisabledChange: (value: boolean) => void
}) => {
  return (
    <>
      <Stack horizontal hug>
        <Align horizontal left>
          <InputCheckbox
            size="small"
            value={loading}
            color={Color.Neutral}
            onChange={value => onLoadingChange(value)}
            label="Loading"
          />

          <Spacer large />

          <InputCheckbox
            size="small"
            value={disabled}
            color={Color.Neutral}
            onChange={value => onDisabledChange(value)}
            label="Disabled"
          />
        </Align>
      </Stack>
    </>
  )
}
