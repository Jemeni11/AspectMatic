import type { AspectRatio } from "../types";

export default function handleAspectRatioCalculation() {
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    figma.notify("No object selected");
  } else {
    const aspectRatiosArray: AspectRatio[] = [];

    for (const selectedObj of selection) {
      aspectRatiosArray.push({
        nodeName:
          selectedObj.name.length > 12
            ? selectedObj.name.substring(0, 12) + "..."
            : selectedObj.name,
        aspectRatio: {
          width: selectedObj.width,
          height: selectedObj.height,
        },
      });
    }
    figma.ui.postMessage({ type: "SUCCESS", data: aspectRatiosArray });
  }
}
