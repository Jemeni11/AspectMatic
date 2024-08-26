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
        const textColor = isChecked ? "text-white" : "text-gray-900";

        return (
          <div key={value.title} className="cursor-pointer">
            <input
              type="radio"
              name={title}
              value={value.title}
              id={inputId}
              className="sr-only"
              checked={isChecked}
              onInput={() => handleChange(value.title)}
            />
            <label
              htmlFor={inputId}
              className={`radio-group-label ${isChecked ? "bg-black dark:bg-blue-violet-600" : "border border-solid border-black dark:border-none dark:bg-white"}`}
            >
              <Text className={textColor}>{value.title}</Text>

              <Text numeric className={`${textColor} text-xs`}>
                {value.subtitle}
              </Text>
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
