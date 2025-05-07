import { Color } from "@new/Color"
import { InputCheckbox } from "@new/InputCheckbox/InputCheckbox"
import { useEffect, useState } from "react"

export default () => {
  type T = boolean | "indeterminate"

  const [values] = useState<T[]>([true, "indeterminate", false])
  const [index, setIndex] = useState(0)
  const [value, setValue] = useState<T>(values[index])

  const cycleValues = () => {
    if (index > 1) {
      setIndex(0)
    } else {
      setIndex(index + 1)
    }

    setValue(values[index])
  }

  useEffect(() => {
    cycleValues()
  }, [])

  return (
    <InputCheckbox value={value} onChange={cycleValues} color={Color.Secondary} size="large" label="Label" />
  )
}
