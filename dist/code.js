"use strict";
figma.showUI(__html__, {
    width: 400,
    height: 300,
});
figma.ui.onmessage = (msg) => {
    if (msg.type === "get-aspect-ratio") {
        figma.notify(`${msg.truncate}`);
        const selectionLength = figma.currentPage.selection.length;
        if (selectionLength === 0) {
            figma.notify("No object selected");
        }
        else {
            for (const i of figma.currentPage.selection) {
                const selectedObj = i;
                const aspectRatio = selectedObj.width / selectedObj.height;
                // figma.notify(`Before: ${aspectRatio}`);
                let aspectRatioString = aspectRatio.toString();
                if (msg.truncate) {
                    aspectRatioString = aspectRatio.toFixed(0);
                    // figma.notify(`After: ${aspectRatioString}`);
                }
                figma.notify(`Aspect ratio of ${selectedObj.name} : ${aspectRatioString}`);
            }
        }
    }
    figma.closePlugin();
};
