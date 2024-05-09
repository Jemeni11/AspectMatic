import { render, Stack } from "@create-figma-plugin/ui";
import { Fragment, h, JSX } from "preact";
import { useState } from "preact/hooks";
import getReducedRatio from "./helpers/getReducedRatio";
import RadioGroupUI from "./components/RadioGroupUI";
import "!./output.css";
import style from "./input.css";
import type { OptionsObject } from "./types";

// Ratio Form: Division, in this case, 40 / 20.
// Reduced Ratio Form: This is  reduced fraction, in this case, 2:1.
// Decimal Form: This is the ratio of the width to the height expressed as a decimal number, in this case, 2.0.

const separatorForms: OptionsObject[] = [
  {
    title: "Colon",
    subtitle: "300:9",
  },
  {
    title: "Slash",
    subtitle: "300/9",
  },
];

const ratioForms: OptionsObject[] = [
  {
    title: "Ratio Form",
    subtitle: "300:9, 300/9",
  },
  {
    title: "Reduced Ratio Form",
    subtitle: "100:3, 100/3",
  },
  {
    title: "Decimal Form",
    subtitle: "33.3",
  },
];

function Plugin() {
  const [separator, setSeparator] = useState(separatorForms[0].title);
  const [ratioForm, setRatioForm] = useState(ratioForms[0].title);

  return (
    <div class="px-4">
      <p class="my-2 font-semibold text-lg">Click on a Node</p>
      <div class="my-6">
        <p class="mb-4 font-bold">Separator</p>
        <RadioGroupUI
          title="Separator"
          values={separatorForms}
          valueState={separator}
          setValueState={setSeparator}
          variant="block"
        />
      </div>
      <div class="my-6">
        <p class="mb-4 font-bold">Aspect Ratio</p>
        <RadioGroupUI
          title="Ratios"
          values={ratioForms}
          valueState={ratioForm}
          setValueState={setRatioForm}
        />
      </div>
    </div>
  );
}

export default render(Plugin);
