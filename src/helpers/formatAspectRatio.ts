import { getReducedRatio, decimalFormConverter } from "./";
import type { RatioForm, Separator } from "../types";

/**
 * Formats an aspect ratio based on user-selected options.
 * @param width - The width of the aspect ratio
 * @param height - The height of the aspect ratio
 * @param options - The formatting options selected by the user
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

    default:
      throw new Error("Invalid ratio form selected");
  }
}
