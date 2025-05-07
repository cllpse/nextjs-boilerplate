import { Stack } from "@new/Stack/Stack"
import { Align } from "@new/Stack/Align"
import { Badge } from "@new/Badge/Badge"
import { Color } from "@new/Color"
import { Spacer } from "@new/Stack/Spacer"
import { Text } from "@new/Text/Text"

export default () => (
  <>
    <Stack vertical>
      <Align vertical>
        <Text xsmall fill={[Color.Neutral, 400]}>
          Small badges
        </Text>

        <Spacer small />

        <Align horizontal>
          <Badge size="small" variant="solid" color={Color.Primary} label="Solid" />

          <Spacer small />

          <Badge size="small" variant="outlined" color={Color.Secondary} label="Outlined" iconName="cake" />

          <Spacer small />

          <Badge
            size="small"
            variant="transparent"
            color={Color.Tertiary}
            label="Transparent"
            iconName="cake"
            onClear={() => {}}
          />

          <Spacer small />

          <Badge size="small" variant="opaque" color={Color.Neutral} label="Opaque" onClear={() => {}} />
        </Align>
      </Align>
    </Stack>

    <Spacer medium />

    <Stack vertical>
      <Align vertical>
        <Text xsmall fill={[Color.Neutral, 400]}>
          Large badges
        </Text>

        <Spacer small />

        <Align horizontal>
          <Badge size="large" variant="solid" color={Color.Primary} label="Solid" />

          <Spacer small />

          <Badge size="large" variant="opaque" color={Color.Secondary} label="Opaque" iconName="cake" />

          <Spacer small />

          <Badge
            size="large"
            variant="outlined"
            color={Color.Tertiary}
            label="Outlined"
            iconName="cake"
            onClear={() => {}}
          />

          <Spacer small />

          <Badge size="large" variant="transparent" color={Color.Neutral} label="Transparent" onClear={() => {}} />
        </Align>
      </Align>
    </Stack>
  </>
)
