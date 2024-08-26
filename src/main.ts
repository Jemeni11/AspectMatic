import { showUI, on } from "@create-figma-plugin/utilities";
import handleAspectRatioCalculation from "./helpers/getAspectRatio";

export default function () {
  on("ASPECT_RATIO_CALCULATION", handleAspectRatioCalculation);

  on("CLOSE_UI", function () {
    figma.closePlugin();
  });

  showUI({
    height: 550,
    width: 350,
  });
}
