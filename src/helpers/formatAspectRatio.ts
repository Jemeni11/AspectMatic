import { getReducedRatio, decimalFormConverter } from "./";
import type { RatioForm, Separator, AllAspectRatioFormats } from "../types";

/**
 * Formats an aspect ratio based on user-selected options.
 * @param width - The width of the aspect ratio
 * @param height - The height of the aspect ratio
 * @param ratioForm - "Regular Ratio" | "Reduced Ratio" | "Decimal"
 * @param separatorForm - "Colon" | "Slash"
 * @returns A string representation of the formatted aspect ratio
 */
export default function formatAspectRatio(
  width: number,
  height: number,
  ratioForm: RatioForm,
  separatorForm: Separator,
): string {
  const separator = separatorForm === "Colon" ? ":" : "/";

  switch (ratioForm) {
    case "Regular Ratio":
      return `${width}${separator}${height}`;

    case "Reduced Ratio":
      const [reducedWidth, reducedHeight] = getReducedRatio(width, height);
      return `${reducedWidth}${separator}${reducedHeight}`;

    case "Decimal":
      return decimalFormConverter(width, height).toString();

    case "Rounded Decimal":
      return decimalFormConverter(width, height, true).toString();

    default:
      throw new Error("Invalid ratio form selected");
  }
}

export function allAspectRatioFormats(
  width: number,
  height: number,
): AllAspectRatioFormats {
  const regularRatioColon = `${width}:${height}`;
  const regularRatioSlash = `${width}/${height}`;

  const [reducedWidth, reducedHeight] = getReducedRatio(width, height);
  const reducedRatioColon = `${reducedWidth}:${reducedHeight}`;
  const reducedRatioSlash = `${reducedWidth}/${reducedHeight}`;

  const Decimal = decimalFormConverter(width, height).toString();
  const roundedDecimal = decimalFormConverter(width, height, true).toString();

  return {
    "Regular Ratio": {
      Colon: regularRatioColon,
      Slash: regularRatioSlash,
    },
    "Reduced Ratio": {
      Colon: reducedRatioColon,
      Slash: reducedRatioSlash,
    },
    Decimal,
    "Rounded Decimal": roundedDecimal,
  };
}
