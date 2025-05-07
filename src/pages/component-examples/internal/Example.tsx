import { Align } from "@new/Stack/Align"
import { Color } from "@new/Color"
import { PropsWithChildren } from "react"
import { Text } from "@new/Text/Text"
import { Spacer } from "@new/Stack/Spacer"
import { Stack } from "@new/Stack/Stack"

type TExample = {
  title?: string
  description?: string
  horizontal?: boolean
}

export default ({ title, description, horizontal, children }: PropsWithChildren<TExample>) => {
  return (
    <>
      <Stack vertical stroke={[Color.Neutral, 100]} cornerRadius="small">
        <Align vertical left>
          <Text xsmall fill={[Color.Neutral, 300]}>
            {title}
          </Text>

          {description && (
            <>
              <Spacer xsmall />

              <Text tiny fill={[Color.Neutral, 300]}>
                {description}
              </Text>
            </>
          )}
        </Align>

        <Spacer medium />

        <Align vertical left>
          <Stack vertical={!horizontal} horizontal={horizontal} hug>
            <Align vertical={!horizontal} horizontal={horizontal} left>
              {children}
            </Align>
          </Stack>
        </Align>
      </Stack>
    </>
  )
}
