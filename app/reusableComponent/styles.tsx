import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type TextStylesType = {
  headerTextSize: string;
  normalTextSize: string;
  textFontFamily: string;
  textFontWeight: number;
  textTransform: "capitalize" | "uppercase" | "lowercase" | "none";
};

export const Colors = () => {
  if (typeof window === "undefined") {
    return {
      themeRed: "#FF6363", // Default fallback values for SSR
      buttonsFill: "#FF6363",
      headerText: "#6D6777",
      normalText: "#A8A8A8",
      darkThemeMode: "#282C34",
      white: "#FFFFFF",
      grey: "#F4F4F4",
      iconGray: "#E4E4E4",
      border: "#ccc",
      boxshadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    };
  }

  const selectedColor = useSelector((state: RootState) => state.color.color);
  const selectedBorder = useSelector((state: RootState) => state.color.border);
  const selectedShadow = useSelector((state: RootState) => state.color.shadow);

  return {
    themeRed: selectedColor,
    buttonsFill: "#FF6363",
    headerText: "#6D6777",
    normalText: "#A8A8A8",
    darkThemeMode: "#282C34",
    white: "#FFFFFF",
    grey: "#F4F4F4",
    iconGray: "#E4E4E4",
    border: selectedBorder,
    boxshadow: selectedShadow,
  };
};


export const TextStyles: TextStylesType = {
  headerTextSize: "14px",
  normalTextSize: "12px",
  textFontFamily: "Inter",
  textFontWeight: 500,
  textTransform: "capitalize", // Valid TextTransform value
};
