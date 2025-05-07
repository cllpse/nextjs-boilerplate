import { PageBounds } from "@new/PageBounds/PageBounds"
import Example from "../internal/Example"
import ExampleA from "./ExampleA"
import { Stack } from "@new/Stack/Stack"
import ResetStyles from "../internal/ResetStyles"

export default () => (
  <>
    <PageBounds>
      <Stack vertical>
        <Example title="ExampleA" description="Horizontal">
          <ExampleA />
        </Example>
      </Stack>
    </PageBounds>

    <ResetStyles />
  </>
)
