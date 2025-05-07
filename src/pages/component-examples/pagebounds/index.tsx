import { PageBounds } from "@new/PageBounds/PageBounds"
import { Stack } from "@new/Stack/Stack"
import { Align } from "@new/Stack/Align"
import { Spacer } from "@new/Stack/Spacer"
import ResetStyles from "../internal/ResetStyles"

export default () => (
  <>
    <PageBounds>
      <Stack vertical>
        <Align vertical center>
          <div style={{ width: "100%", height: "50vh", outline: "dashed 1px cyan" }} />
        </Align>
      </Stack>

      <Spacer huge />

      <Stack vertical>
        <Align vertical center>
          <div style={{ width: "100%", height: "50vh", outline: "dashed 1px magenta" }} />
        </Align>
      </Stack>

      <Spacer huge />

      <Stack vertical>
        <Align vertical center>
          <div style={{ width: "100%", height: "50vh", outline: "dashed 1px yellow" }} />
        </Align>
      </Stack>

      <Spacer huge />

      <Stack vertical>
        <Align vertical center>
          <div style={{ width: "100%", height: "50vh", outline: "dashed 1px black" }} />
        </Align>
      </Stack>
    </PageBounds>

    <ResetStyles />
  </>
)
