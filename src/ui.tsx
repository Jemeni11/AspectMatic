import { render, Text, Stack, Columns } from "@create-figma-plugin/ui";
import { Fragment, h, JSX } from "preact";
import { useState } from "preact/hooks";
import getReducedRatio from "./helpers/getReducedRatio";
import DropdownUI from "./components/DropdownUI";
import "!./output.css";

// Ratio Form: Division, in this case, 40 / 20.
// Reduced Ratio Form: This is  reduced fraction, in this case, 2:1.
// Decimal Form: This is the ratio of the width to the height expressed as a decimal number, in this case, 2.0.

function Plugin() {
  const separatorForms = [":", "/"];
  const [separator, setSeparator] = useState(separatorForms[0]);

  const ratioForms = [
    "Ratio Form (300/9, 300:9)",
    "Reduced Ratio Form (100/3, 100:3)",
    "Decimal Form (33.3)",
  ];
  const [ratioForm, setRatioForm] = useState(ratioForms[0]);

  return (
    <Stack space="large">
      <p class="text-bold text-4xl text-center">AspectMatic</p>
      <p class="text-center text-[#4f46e5]">Click on a Node</p>
      <div class="flex">
        <p class="flex-[2_2_0]">Separator</p>
        <div class="flex-1">
          <DropdownUI
            values={separatorForms}
            valueState={separator}
            setValueState={setSeparator}
          />
        </div>
      </div>
      <div class="flex">
        <p class="flex-[2_2_0]">Ratio Form</p>
        <div class="flex-1">
          <DropdownUI
            values={ratioForms}
            valueState={ratioForm}
            setValueState={setRatioForm}
          />
        </div>
      </div>
    </Stack>
  );
}

export default render(Plugin);
