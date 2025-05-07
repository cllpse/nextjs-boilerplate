import { Color } from "@new/Color"
import { FilteredList } from "@new/FilteredList/FilteredList"
import { FilteredListItem } from "@new/FilteredList/FilteredListItem"
import { useState } from "react"

export default () => {
  const [value, setValue] = useState<string>("A")

  return (
    <>
      <FilteredList color={Color.Neutral} value={value} onChange={v => setValue(v)} maxHeight="100px">
        <FilteredListItem value="A" label="a" src="" size="small" title="" />
        <FilteredListItem value="B" label="b" src="" size="small" title="" />
        <FilteredListItem value="C" label="c" src="" size="small" title="" />

        <FilteredListItem value="0" label="0" src="" size="small" title="" />
        <FilteredListItem value="1" label="1" src="" size="small" title="" />
        <FilteredListItem value="2" label="2" src="" size="small" title="" />
        <FilteredListItem value="3" label="3" src="" size="small" title="" />
        <FilteredListItem value="4" label="4" src="" size="small" title="" />
        <FilteredListItem value="5" label="5" src="" size="small" title="" />
        <FilteredListItem value="6" label="6" src="" size="small" title="" />
        <FilteredListItem value="7" label="7" src="" size="small" title="" />
        <FilteredListItem value="8" label="8" src="" size="small" title="" />
        <FilteredListItem value="9" label="9" src="" size="small" title="" />
      </FilteredList>

      <br />
      <br />

      <pre>{value}</pre>
    </>
  )
}
