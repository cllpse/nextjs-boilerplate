import { PageBounds } from "@new/PageBounds/PageBounds"
import Example from "../internal/Example"
import { Spacer } from "@new/Stack/Spacer"
import ExampleA from "./ExampleA"
import ExampleB from "./ExampleB"
import ExampleC from "./ExampleC"
import { Stack } from "@new/Stack/Stack"
import ResetStyles from "../internal/ResetStyles"

export default () => (
  <>
    <PageBounds>
      <Stack vertical>
        <Example title="ExampleA" description="Without label">
          <ExampleA />
        </Example>

        <Spacer huge />

        <Example title="ExampleB" description="With label">
          <ExampleB />
        </Example>

        <Spacer huge />

        <Example title="ExampleC" description="Large, with label, alternate color, indeterminate">
          <ExampleC />
        </Example>
      </Stack>
    </PageBounds>

    <ResetStyles />
  </>
)
