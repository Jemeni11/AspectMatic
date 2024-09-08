import { showUI, on } from "@create-figma-plugin/utilities";
import { getAspectRatio } from "./helpers";

export default function () {
  on("ASPECT_RATIO_CALCULATION", getAspectRatio);

  on("CLOSE_UI", function () {
    figma.closePlugin();
  });

  showUI({
    height: 550,
    width: 350,
  });
}
