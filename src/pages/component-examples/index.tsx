import { InputButtonLink } from "@new/InputButton/InputButtonLink"
import { Align } from "@new/Stack/Align"
import { Spacer } from "@new/Stack/Spacer"
import { Stack } from "@new/Stack/Stack"
import ResetStyles from "./internal/ResetStyles"

export default () => (
  <>
    <Stack vertical>
      <Align vertical>
        <InputButtonLink size="large" label="Badge" href="/component-examples/badge" />

        <Spacer small />

        <InputButtonLink size="large" label="DataTable" href="/component-examples/datatable" />

        <Spacer small />

        <InputButtonLink size="large" label="InputButton" href="/component-examples/inputbutton" />

        <Spacer small />

        <InputButtonLink size="large" label="InputCheckbox" href="/component-examples/inputcheckbox" />

        <Spacer small />

        <InputButtonLink size="large" label="InputCombobox" href="/component-examples/inputcombobox" />

        <Spacer small />

        <InputButtonLink size="large" label="InputRadioGroup" href="/component-examples/inputradiogroup" />

        <Spacer small />

        <InputButtonLink size="large" label="InputText" href="/component-examples/inputtext" />

        <Spacer small />

        <InputButtonLink size="large" label="PageBounds" href="/component-examples/pagebounds" />

        <Spacer small />

        <InputButtonLink size="large" label="Stack" href="/component-examples/stack" />
      </Align>
    </Stack>

    <ResetStyles />
  </>
)
