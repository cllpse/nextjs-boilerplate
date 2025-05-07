import { createTheme } from "@mui/material/styles"
import { Theme, ButtonTheme, HeaderTheme } from "@emotion/react"

export const HEADER_THEME_LIGHT: HeaderTheme = {
  colors: {
    background: "#FAFBFF",
    text: "#000",
    textLight: "#4C4072",
  },
}

export const BUTTON_THEME_TEAL: ButtonTheme = {
  colors: {
    primary: {
      main: "#28BBB0",
      hover: "#2ACABF",
      hoverTransparent: "rgba(0, 0, 0, 0.04)",
      shadow: "rgba(33, 169, 159, 0.27)",
      contrastText: "#FFFFFF",
      disabled: "#e6e6e6",
      disabledShadow: "rgba(230, 230, 230, 0.87)",
      disabledText: "#525252",
    },
  },
}

export const TYPOGRAPHY = {
  heading1: "700 48px/65px Segoe UI, sans-serif",
  heading2: "700 40px/55px Segoe UI, sans-serif",
  heading3: "700 36px/50px Segoe UI, sans-serif",
  heading4: "700 32px/44px Segoe UI, sans-serif",
  heading5: "600 24px/33px Segoe UI, sans-serif",
  heading6: "500 20px/30px Segoe UI, sans-serif",
  bodyLarge: "400 20px/28px Segoe UI, sans-serif",
  bodyMedium: "400 18px/25px Segoe UI, sans-serif",
  bodyNormal: "400 16px/23px Segoe UI, sans-serif",
  bodySmall: "400 14px/20px Segoe UI, sans-serif",
  bodyExtraSmall: "400 12px/18px Segoe UI, sans-serif",
}

export const SDG_COLORS = {
  //TODO
}

const CHART_COLORS = {
  active: "#D0EAE6",
  inProgress: "#C6C2D4",
  soonToExpire: "#FEF2D7",
  expired: "#FACAC8",
}

export const STATE_COLORS = {
  info: "#725EA8",
  success: "#28BBB0",
  warning: "#F8A640",
  error: "#D7444F",
  disabled: "#ADB5BD",
  inProgress: "#20B8DC",
  ready: "#A0D6CE",
  done: "#57BAAF",
  rejected: "#E46F71",
}
export const DARK_COLORS = {
  textBlack: "#1C1C1E",
  greyWolf: "#9B9FAA",
  greyText: "#6c757d",
  xxxGrey: "#D9D9D9",
}
export const LIGHT_COLORS = {
  neutralTint: "#CED4DA",
  moonLily: "#E6E6E6",
  athensGrey: "#EDECF1",
  pearlWhite: "#F8F8F8",
  alabaster: "#FAFAFC",
  zircon: "#FAFAFF",
  whisper: "#F1EEF6",
  titanWhite: "#F5F5FF",
  lightGrey: "#939393",
  lavender: "#E3E4F6",
  whiteIris: "#E0E2E7",
  warmGrey: "#ADB5BD",
  aquaSpring: "#E9F8F7",
  extraPurple: "#F5F5FF",
}
export const CUSTOM_COLORS = {
  blue: "#5056E7",
}
export const ICON_COLORS = {
  //TODO
}

export const XXX = {
  typography: TYPOGRAPHY,
  colors: {
    brand: {
      lightPurple: "#7E6DAD",
      purple: "#655590",
      darkPurple: "#4E4073",
      lightCyan: "#3DDDD1",
      cyan: "#28BBB0",
      darkCyan: "#17998F",
      turquoise: "#c0e4de",
      lightRed: "#F95B67",
      red: "#D7444F",
      darkRed: "#B5303A",
      redTint: "#f7b8b6",
      white: "#FFFFFF",
    },
    system: {
      sdgColors: SDG_COLORS,
      stateColors: STATE_COLORS,
      darkColors: DARK_COLORS,
      lightColors: LIGHT_COLORS,
      customColors: CUSTOM_COLORS,
      iconColors: ICON_COLORS,
      chartColors: CHART_COLORS,
    },
    gradients: {
      purple: "linear-gradient(348.29deg, #4E4073 -1.56%, #6750A4 41.9%, #4E4073 99.51%);",
      teal: "linear-gradient(180deg, #4C4072 0%, #25BCB1 100%);",
    },
  },
  border: `1px solid ${DARK_COLORS.greyWolf}`,
  borderRadiusLarge: "10px",
  borderRadiusSmall: "6px",
  borderRadiusMedium: "20px",
}

export const THEME: Theme = {
  pageWidth: "1190px",
  colors: {
    primary: "#7E6DAD",
    secondary: "#28BBB0",
    info: STATE_COLORS.info,
    success: STATE_COLORS.success,
    warning: STATE_COLORS.warning,
    error: STATE_COLORS.error,
    secondaryShadow: "rgba(33, 169, 159, 0.50)",
    light: {
      primary: "#e2deed",
      // TODO add light secondary
    },
    dark: {
      // TODO add dark primary
      primary: "#4e4072",
      secondary: "#1f9c92",
    },
    plainWhite: "#fff",
    text: {
      primaryBody: "#000",
      black: "#1C1C1E",
      lightBody: "#9B9FAA",
      selectedText: "#725EA8",
    },
    system: {
      stateColors: STATE_COLORS,
      darkColors: DARK_COLORS,
      lightColors: LIGHT_COLORS,
      customColors: CUSTOM_COLORS,
      chartColors: CHART_COLORS,
    },
    containerBackground: "#FAFBFF",
    secondaryContainerBackground: "#F5F5FF",
    background: "#fff",
  },
  header: HEADER_THEME_LIGHT,
  buttons: BUTTON_THEME_TEAL,
  xxx: XXX,
}

export const MUI_THEME = createTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#7E6DAD",
      contrastText: "#fff",
    },
    secondary: {
      main: "#25bcb1",
      contrastText: "#fff",
    },
    success: {
      main: STATE_COLORS.success,
      contrastText: "#fff",
    },
    error: {
      main: STATE_COLORS.error,
      contrastText: "#fff",
    },
    info: {
      main: STATE_COLORS.info,
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 980,
      lg: 1280,
      xl: 1900,
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "14px",
        },
      },
    },
  },
})

export const DEFAULT_XXX_LOGO_WHITE = "/assets/logos/xxx.svg"
export const DEFAULT_XXX_LOGO_WHITE_SQUARE = "/assets/logos/xxx_logo_white_no_text.svg"
