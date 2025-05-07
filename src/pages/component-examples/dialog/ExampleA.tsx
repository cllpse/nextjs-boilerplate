import { Stack } from "@new/Stack/Stack"
import { Align } from "@new/Stack/Align"
import { Dialog } from "@new/Dialog/Dialog"
import { Size } from "@new/Size"
import { Text } from "@new/Text/Text"
import { Color } from "@new/Color"
import { InputButtonPrimary } from "@new/InputButton/InputButtonPrimary"
import { InputButtonSecondary } from "@new/InputButton/InputButtonSecondary"
import { InputButtonTertiary } from "@new/InputButton/InputButtonTertiary"

export default () => (
  <>
    <Stack vertical>
      <Align vertical>
        <Dialog
          open={true}
          onOpenChange={() => {}}
          size={Size.Large}
          title={
            <Text small fill={[Color.Neutral, 700]}>
              Create certification
            </Text>
          }
          description={
            <Text small fill={[Color.Neutral, 700]}>
              Create certification
            </Text>
          }
          content={
            <Stack vertical>
              <Align vertical>
                <Text small fill={[Color.Neutral, 700]}>
                  Content
                </Text>
              </Align>
            </Stack>
          }
          message={["notice", "Error message"]}
          buttonPrimary={<InputButtonPrimary size="large" width="auto" label="Save" onClick={() => {}} />}
          buttonSecondary={
            <InputButtonSecondary size="large" width="auto" label="Dlete" onClick={() => {}} destructive />
          }
          buttonTertiary={<InputButtonTertiary size="large" width="auto" label="Dismiss" onClick={() => {}} />}
        />
      </Align>
    </Stack>
  </>
)
