import { Text } from "@create-figma-plugin/ui";
import { h, JSX } from "preact";
import { Dispatch, StateUpdater, useCallback } from "preact/hooks";
import type { OptionsObject } from "../types";

interface RadioGroupProps {
  title: string;
  values: OptionsObject[];
  valueState: string;
  setValueState: Dispatch<StateUpdater<string>>;
}

export default function RadioGroup({
  values,
  valueState,
  setValueState,
  title,
}: RadioGroupProps) {
  const handleChange = useCallback(
    (title: string) => setValueState(title),
    [setValueState],
  );

  return (
    <fieldset className="grid grid-cols-1 gap-4">
      <legend className="sr-only">{title}</legend>
      {values.map((value) => {
        const isChecked = valueState === value.title;
        const inputId = `${title}_${value.title}`;

        return (
          <div key={value.title} className="cursor-pointer">
            <input
              type="radio"
              name={title}
              value={value.title}
              id={inputId}
              className="sr-only"
              checked={isChecked}
              onChange={() => handleChange(value.title)}
            />
            <label
              htmlFor={inputId}
              className={`radio-group-label ${isChecked ? "bg-blue-violet-600" : "bg-white"}`}
            >
              <Text className={isChecked ? "text-white" : "text-gray-700"}>
                {value.title}
              </Text>

              <Text
                numeric
                className={`${isChecked ? "text-white" : "text-gray-900"} mt-1 text-xs`}
              >
                {value.subtitle}
              </Text>
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
