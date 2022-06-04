import { Platform } from "react-native";

const theme = {
  colors: {
    primary: "#0366d6",
    secondary: "#999",
    danger: "#d73a4a",
    white: "#FFF",
  },
  bgColors: {
    primary: "#e1e4e8",
    secondary: "#0366d6",
    header: "#333",
    white: "#FFF",
  },
  fontSize: {
    body: 14,
    subheading: 16,
    heading: 20,
    large: 26,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeighs: {
    noraml: "400",
    bold: "700",
  },
};

export default theme;
