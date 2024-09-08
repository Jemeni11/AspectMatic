import { getReducedRatio, decimalFormConverter } from "./";
import type { AllAspectRatioFormats } from "../types";

export default function formatAspectRatio(
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
