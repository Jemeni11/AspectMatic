import { render, Text } from "@create-figma-plugin/ui";
import { Fragment, h, JSX } from "preact";
import { useState } from "preact/hooks";
import getReducedRatio from "./helpers/getReducedRatio";
import RadioGroupUI from "./components/RadioGroup";
import "!./output.css";
import type { OptionsObject } from "./types";

// Ratio Form: Division, in this case, 40 / 20.
// Reduced Ratio Form: This is reduced fraction, in this case, 2:1.
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
    title: "Regular Ratio",
    subtitle: "300:9, 300/9",
  },
  {
    title: "Reduced Ratio",
    subtitle: "100:3, 100/3",
  },
  {
    title: "Decimal",
    subtitle: "33.3",
  },
];

function Plugin() {
  const [separator, setSeparator] = useState(separatorForms[0].title);
  const [ratioForm, setRatioForm] = useState(ratioForms[0].title);

  return (
    <div class="px-4">
      <Text className="my-2 text-lg font-semibold text-black dark:text-white">
        Click on a Node
      </Text>
      <div class="my-6">
        <Text className="mb-4 font-bold text-black dark:text-white">
          Separator
        </Text>
        <RadioGroupUI
          title="Separator"
          values={separatorForms}
          valueState={separator}
          setValueState={setSeparator}
        />
      </div>
      <div class="my-6">
        <Text className="mb-4 font-bold text-black dark:text-white">
          Ratio Form
        </Text>
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
