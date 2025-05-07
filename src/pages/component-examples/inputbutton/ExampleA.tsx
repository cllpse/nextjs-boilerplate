import { InputButtonPrimary } from "@new/InputButton/InputButtonPrimary"
import { InputButtonSecondary } from "@new/InputButton/InputButtonSecondary"
import { InputButtonTertiary } from "@new/InputButton/InputButtonTertiary"
import { Spacer } from "@new/Stack/Spacer"
import { Stack } from "@new/Stack/Stack"
import { Align } from "@new/Stack/Align"
import { InputButtonLink } from "@new/InputButton/InputButtonLink"
import { InputButtonIconPrimary } from "@new/InputButton/InputButtonIconPrimary"
import { InputButtonIconSecondary } from "@new/InputButton/InputButtonIconSecondary"
import { InputButtonIconTertiary } from "@new/InputButton/InputButtonIconTertiary"

export default ({ loading, disabled }: { loading: boolean; disabled: boolean }) => (
  <>
    <Stack vertical>
      <Align horizontal>
        <InputButtonPrimary label="Click me!" size="small" width="auto" loading={loading} disabled={disabled} />

        <Spacer small />

        <InputButtonPrimary
          label="Click me!"
          size="small"
          width="auto"
          iconNameLeft="science"
          loading={loading}
          disabled={disabled}
        />

        <Spacer small />

        <InputButtonPrimary
          label="Click me!"
          size="small"
          width="auto"
          iconNameRight="science"
          loading={loading}
          disabled={disabled}
        />

        <Spacer small />

        <InputButtonPrimary
          label="Click me! (d)"
          size="small"
          width="auto"
          iconNameRight="science"
          loading={loading}
          disabled={disabled}
          destructive
        />
      </Align>

      <Spacer small />

      <Align horizontal>
        <InputButtonPrimary label="Click me!" size="large" width="auto" loading={loading} disabled={disabled} />

        <Spacer small />

        <InputButtonPrimary
          label="Click me!"
          size="large"
          width="auto"
          iconNameLeft="science"
          loading={loading}
          disabled={disabled}
        />

        <Spacer small />

        <InputButtonPrimary
          label="Click me!"
          size="large"
          width="auto"
          iconNameRight="science"
          loading={loading}
          disabled={disabled}
        />
      </Align>

      <Spacer small />

      <Align horizontal>
        <InputButtonSecondary label="Click me!" size="small" width="auto" loading={loading} disabled={disabled} />

        <Spacer small />

        <InputButtonSecondary
          label="Click me!"
          size="small"
          width="auto"
          iconNameLeft="science"
          loading={loading}
          disabled={disabled}
        />

        <Spacer small />

        <InputButtonSecondary
          label="Click me!"
          size="small"
          width="auto"
          iconNameRight="science"
          loading={loading}
          disabled={disabled}
        />
      </Align>

      <Spacer small />

      <Align horizontal>
        <InputButtonSecondary label="Click me!" size="large" width="auto" loading={loading} disabled={disabled} />

        <Spacer small />

        <InputButtonSecondary
          label="Click me!"
          size="large"
          width="auto"
          iconNameLeft="science"
          loading={loading}
          disabled={disabled}
        />

        <Spacer small />

        <InputButtonSecondary
          label="Click me!"
          size="large"
          width="auto"
          iconNameRight="science"
          loading={loading}
          disabled={disabled}
        />
      </Align>

      <Spacer small />

      <Align horizontal>
        <InputButtonTertiary label="Click me!" size="small" width="auto" loading={loading} disabled={disabled} />

        <Spacer small />

        <InputButtonTertiary
          label="Click me!"
          size="small"
          width="auto"
          iconNameLeft="science"
          loading={loading}
          disabled={disabled}
        />

        <Spacer small />

        <InputButtonTertiary
          label="Click me!"
          size="small"
          width="auto"
          iconNameRight="science"
          loading={loading}
          disabled={disabled}
        />
      </Align>

      <Spacer small />

      <Align horizontal>
        <InputButtonTertiary label="Click me!" size="large" width="auto" loading={loading} disabled={disabled} />

        <Spacer small />

        <InputButtonTertiary
          label="Click me!"
          size="large"
          width="auto"
          iconNameLeft="science"
          loading={loading}
          disabled={disabled}
        />

        <Spacer small />

        <InputButtonTertiary
          label="Click me!"
          size="large"
          width="auto"
          iconNameRight="science"
          loading={loading}
          disabled={disabled}
        />
      </Align>

      <Spacer small />

      <Align horizontal>
        <InputButtonLink
          label="Click me!"
          href="/components-examples"
          size="small"
          iconNameLeft="close"
          loading={loading}
          disabled={disabled}
        />

        <Spacer small />

        <InputButtonLink
          label="Click me!"
          href="/components-examples"
          size="large"
          loading={loading}
          disabled={disabled}
        />
      </Align>

      <Spacer small />

      <Align horizontal>
        <InputButtonIconPrimary iconName="science" size="small" loading={loading} disabled={disabled} />

        <Spacer small />

        <InputButtonIconSecondary iconName="science" size="small" loading={loading} disabled={disabled} />

        <Spacer small />

        <InputButtonIconTertiary iconName="science" size="small" loading={loading} disabled={disabled} />
      </Align>

      <Spacer small />

      <Align horizontal>
        <InputButtonIconPrimary iconName="science" size="large" loading={loading} disabled={disabled} />

        <Spacer small />

        <InputButtonIconSecondary iconName="science" size="large" loading={loading} disabled={disabled} />

        <Spacer small />

        <InputButtonIconTertiary iconName="science" size="large" loading={loading} disabled={disabled} />
      </Align>
    </Stack>
  </>
)
