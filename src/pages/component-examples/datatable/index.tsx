import { PageBounds } from "@new/PageBounds/PageBounds"
import ExampleA from "./ExampleA"
import ResetStyles from "../internal/ResetStyles"

export default () => (
  <>
    <PageBounds>
      <ExampleA />
    </PageBounds>

    <ResetStyles />
  </>
)
