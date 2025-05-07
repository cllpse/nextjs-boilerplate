import { PageBounds } from "@new/PageBounds/PageBounds"
import Example from "../internal/Example"
import ExampleA from "./ExampleA"
import ResetStyles from "../internal/ResetStyles"
import LoadingDisabled from "../internal/LoadingDisabled"
import { useState } from "react"
import { Stack } from "@new/Stack/Stack"
import { Align } from "@new/Stack/Align"
import { Spacer } from "@new/Stack/Spacer"

export default () => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <>
      <PageBounds>
        <Stack vertical>
          <Align vertical>
            <LoadingDisabled
              loading={loading}
              disabled={disabled}
              onLoadingChange={setLoading}
              onDisabledChange={setDisabled}
            />

            <Spacer large />
          </Align>

          <Example title="ExampleA" description="Sizes" horizontal>
            <ExampleA />
          </Example>
        </Stack>
      </PageBounds>

      <ResetStyles />
    </>
  )
}
