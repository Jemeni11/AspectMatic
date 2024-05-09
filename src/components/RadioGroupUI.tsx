import { Text } from "@create-figma-plugin/ui";
import { h, JSX } from "preact";
import { Dispatch, StateUpdater } from "preact/hooks";
import type { OptionsObject } from "../types";

function RadioGroupUI({
  values,
  valueState,
  setValueState,
  title,
  variant,
}: {
  title: string;
  values: OptionsObject[];
  valueState: string;
  setValueState: Dispatch<StateUpdater<string>>;
  variant?: "block" | "list";
}) {
  const renderListVariant = (
    <fieldset className="space-y-4">
      <legend className="sr-only">{title}</legend>
      {values.map((value) => {
        return (
          <div key={value}>
            <label
              htmlFor={`${title}_${value.title}`}
              className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <div>
                <Text className="text-gray-700">{value.title}</Text>

                <Text numeric className="mt-1 text-gray-900 text-xs">
                  {value.subtitle}
                </Text>
              </div>

              <input
                type="radio"
                name="DeliveryOption"
                value={value.title}
                id={`${title}_${value.title}`}
                className="size-5 border-gray-300 text-blue-500"
                checked={valueState === value.title}
                onChange={(event: JSX.TargetedEvent<HTMLInputElement>) => {
                  setValueState(event.currentTarget.value);
                }}
              />
            </label>
          </div>
        );
      })}
    </fieldset>
  );

  const renderBlockVariant = (
    <fieldset className="grid grid-cols-2 gap-4">
      <legend className="sr-only">{title}</legend>

      {values.map((value) => {
        return (
          <div key={value.title}>
            <label
              htmlFor={`${title}_${value.title}`}
              className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <div>
                <Text className="text-gray-700">{value.title}</Text>

                <Text numeric className="mt-1 text-gray-900 text-xs">
                  {value.subtitle}
                </Text>
              </div>

              <input
                type="radio"
                name={`${title}_${value.title}`}
                value={value.title}
                id={`${title}_${value.title}`}
                className="sr-only"
                checked={valueState === value.title}
                onChange={(event: JSX.TargetedEvent<HTMLInputElement>) => {
                  setValueState(event.currentTarget.value);
                }}
              />
            </label>
          </div>
        );
      })}
    </fieldset>
  );

  return variant === "block" ? renderBlockVariant : renderListVariant;
}

export default RadioGroupUI;
