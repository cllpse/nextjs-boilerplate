import { css, Global } from "@emotion/react"

export default () => (
  <Global
    styles={css`
      html > body footer#footer {
        display: none !important;
      }

      html > body {
        margin: 0;
        padding: 0;
      }

      html > body > div > div > div {
        min-height: 0 !important;
      }
    `}
  />
)
