import { Text } from "@create-figma-plugin/ui";
import { h } from "preact";
import { Dispatch, StateUpdater, useCallback } from "preact/hooks";
import type { OptionsObject, RatioForm, Separator } from "../types";

interface RadioGroupProps<T extends RatioForm | Separator> {
  title: string;
  values: OptionsObject<T>[];
  valueState: T;
  setValueState: Dispatch<StateUpdater<T>>;
}

export default function RadioGroup<T extends RatioForm | Separator>({
  values,
  valueState,
  setValueState,
  title,
}: RadioGroupProps<T>) {
  const handleChange = useCallback(
    (text: T) => setValueState(text),
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
          <div key={value.title} className="radio-option">
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
