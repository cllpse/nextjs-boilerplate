import { useState } from "react"
import { InputRadioGroup } from "@new/InputRadioGroup/InputRadioGroup"
import { InputRadioGroupItem } from "@new/InputRadioGroup/InputRadioGroupItem"
import { Color } from "@new/Color"
import { Spacer } from "@new/Stack/Spacer"

export default () => {
  const [value, setValue] = useState("a")

  return (
    <>
      <InputRadioGroup
        color={Color.Primary}
        size="small"
        defaultValue={value}
        value={value}
        onChange={v => setValue(v)}
      >
        <InputRadioGroupItem value="a" label="Label A" />
        <InputRadioGroupItem value="b" label="Label B" />
        <InputRadioGroupItem value="c" label="Label C" />
      </InputRadioGroup>

      <Spacer medium />

      <InputRadioGroup
        color={Color.Primary}
        size="large"
        defaultValue={value}
        value={value}
        onChange={v => setValue(v)}
      >
        <InputRadioGroupItem value="a" label="Label A" />
        <InputRadioGroupItem value="b" label="Label B" />
        <InputRadioGroupItem value="c" label="Label C" />
      </InputRadioGroup>

      <Spacer medium />

      <InputRadioGroup
        color={Color.Primary}
        size="large"
        label="Label"
        defaultValue={value}
        value={value}
        onChange={v => setValue(v)}
      >
        <InputRadioGroupItem value="a" label="Label A" />
        <InputRadioGroupItem value="b" label="Label B" />
        <InputRadioGroupItem value="c" label="Label C" />
      </InputRadioGroup>
    </>
  )
}
