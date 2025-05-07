import { useState } from "react"
import { Color } from "@new/Color"
import { InputCheckbox } from "@new/InputCheckbox/InputCheckbox"

export default () => {
  const [value, setValue] = useState(false)

  return (
    <InputCheckbox value={value} onChange={v => setValue(v)} color={Color.Neutral} size="small" />
  )
}
