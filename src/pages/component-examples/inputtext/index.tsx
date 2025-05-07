import { PageBounds } from "@new/PageBounds/PageBounds"
import Example from "../internal/Example"
import ExampleA from "./ExampleA"
import ResetStyles from "../internal/ResetStyles"
import { Stack } from "@new/Stack/Stack"
import { useState } from "react"
import { Align } from "@new/Stack/Align"
import LoadingDisabled from "../internal/LoadingDisabled"
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
            <ExampleA loading={loading} disabled={disabled} />
          </Example>
        </Stack>
      </PageBounds>

      <ResetStyles />
    </>
  )
}
