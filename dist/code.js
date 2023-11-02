"use strict";
figma.showUI(__html__, {
    width: 400,
    height: 800,
});
figma.ui.onmessage = (msg) => {
    if (msg.type === "get-aspect-ratio") {
        const selectionLength = figma.currentPage.selection.length;
        if (selectionLength === 0) {
            figma.notify("No object selected");
        }
        else {
            const aspectRatiosArray = [];
            for (const i of figma.currentPage.selection) {
                const selectedObj = i;
                const aspectRatio = selectedObj.width / selectedObj.height;
                let aspectRatioString = aspectRatio.toString();
                if (msg.truncate) {
                    aspectRatioString = aspectRatio.toFixed(0);
                }
                aspectRatiosArray.push({
                    name: selectedObj.name,
                    aspectRatio: aspectRatioString,
                });
            }
            figma.ui.postMessage({ type: "success", data: aspectRatiosArray });
        }
    }
    else if (msg.type === "cancel") {
        figma.closePlugin();
    }
};
