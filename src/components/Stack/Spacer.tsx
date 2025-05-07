import styled from "@emotion/styled"
import { ComponentBaseProps } from "@new/ComponentBaseProps"
import { Size } from "@new/Size"

export type SpacerProps = ComponentBaseProps & {
  /**
   * Only one of "tiny" or "xsmall" or "small" {...} or "huge" can be true
   */
  tiny?: boolean
  xsmall?: boolean
  small?: boolean
  medium?: boolean
  large?: boolean
  xLarge?: boolean
  xxLarge?: boolean
  huge?: boolean

  /**
   * WARNING: internal property - only to be used within /components
   */
  explodeHeight?: boolean
  /**
   * WARNING: internal property - only to be used within /components
   */
  overflowHidden?: boolean
  /**
   * WARNING: internal property - only to be used within /components
   */
  aspectRatio?: "auto" | "1"
}

const Container = styled.div<{ size: string }>(p => ({
  display: "flex",
  flexShrink: 0,
  width: p.size,
  height: p.size,
}))

export const Spacer = (p: SpacerProps) => {
  let size = "0"

  if (p.tiny) {
    size = Size.Tiny
  }

  if (p.xsmall) {
    size = Size.Xsmall
  }

  if (p.small) {
    size = Size.Small
  }

  if (p.medium) {
    size = Size.Medium
  }

  if (p.large) {
    size = Size.Large
  }

  if (p.xLarge) {
    size = Size.XLarge
  }

  if (p.xxLarge) {
    size = Size.XXLarge
  }

  if (p.huge) {
    size = Size.Huge
  }

  return <Container id={p.id} className={`<Spacer />`} size={size} />
}
