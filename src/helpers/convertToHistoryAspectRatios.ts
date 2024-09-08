import type {
  AspectRatioWithFormats,
  RatioForm,
  Separator,
  HistoryAspectRatio,
} from "../types";

export default function convertToHistoryAspectRatios(
  aspectRatios: AspectRatioWithFormats[],
  ratioForm: RatioForm,
  separator: Separator,
): HistoryAspectRatio[] {
  return aspectRatios.map((ratio) => {
    let aspectRatio: string;

    switch (ratioForm) {
      case "Regular Ratio":
      case "Reduced Ratio":
        aspectRatio = ratio[ratioForm][separator];
        break;
      case "Decimal":
      case "Rounded Decimal":
        aspectRatio = ratio[ratioForm];
        break;
      default:
        throw new Error("Invalid RatioForm provided");
    }

    return {
      nodeName: ratio.nodeName,
      aspectRatio,
    };
  });
}
