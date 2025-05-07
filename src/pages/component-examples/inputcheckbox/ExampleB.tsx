import { useState } from "react"
import { Color } from "@new/Color"
import { InputCheckbox } from "@new/InputCheckbox/InputCheckbox"

export default () => {
  const [value, setValue] = useState(false)

  return (
    <InputCheckbox value={value} label="Label" onChange={v => setValue(v)} color={Color.Primary} size="small" />
  )
}
