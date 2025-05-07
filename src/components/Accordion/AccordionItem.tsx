import styled from "@emotion/styled"
import { ReactElement } from "react"
import * as Accordion from "@radix-ui/react-accordion"
import { keyframes } from "@emotion/react"
import { Composition } from "@new/Composition/Composition"
import { LayoutSingle } from "@new/Composition/LayoutSingle"
import { TextProps } from "@new/Text/Text"
import { ColorWithLightness } from "@new/Color"
import { BackgroundCard } from "@new/Composition/BackgroundCard"
import { IconProps } from "@new/Icon/Icon"
import { EDirection } from "@new/EDirection"
import { PlaywrightProps } from "@new/Playwright"

type TContainerProperties = Omit<TAccordionItem, "content" | "label" | "colorHead" | "colorContent">

const Item = styled(Accordion.Item)<TContainerProperties>({
  width: "100%",
  overflow: "hidden",
})

const Header = styled(Accordion.Header)({
  all: "unset",
  display: "flex",
})

const Trigger = styled(Accordion.Trigger)({
  all: "unset",
  width: "100%",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
})

const Label = styled.div({
  display: "flex",
  alignItems: "center",
})

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
})

const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
})

const Content = styled(Accordion.Content)({
  width: "100%",
  overflow: "hidden",

  "&[data-state='open']": {
    animation: `${slideDown} 250ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },

  "&[data-state='closed']": {
    animation: `${slideUp} 250ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
})

export type TAccordionItem = PlaywrightProps & {
  label: ReactElement<TextProps> | ReactElement<IconProps>
  value: string
  content: ReactElement | ReactElement[] | undefined
  colorHead: ColorWithLightness
  colorContent: ColorWithLightness
}

export const AccordionItem = (p: TAccordionItem) => (
  <Item value={p.value} data-playwright-testid={p["data-playwright-testid"]}>
    <Header>
      <Trigger>
        <Composition>
          <BackgroundCard colorBackground={p.colorHead} />

          <LayoutSingle
            direction={EDirection.Vertical}
            content={[<Label key="accordion-item-label">{p.label}</Label>]}
          />
        </Composition>
      </Trigger>
    </Header>

    <Content>
      <Composition>
        <BackgroundCard colorBackground={p.colorContent} />

        <LayoutSingle direction={EDirection.Vertical} content={p.content} />
      </Composition>
    </Content>
  </Item>
)
