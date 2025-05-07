import { PageBounds } from "@new/PageBounds/PageBounds"
import Example from "../internal/Example"
import ExampleA from "./ExampleA"
import ResetStyles from "../internal/ResetStyles"

export default () => (
  <>
    <PageBounds>
      <Example title="ExampleA" description="Sizes">
        <ExampleA />
      </Example>
    </PageBounds>

    <ResetStyles />
  </>
)
