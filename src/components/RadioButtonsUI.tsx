import { RadioButtons, RadioButtonsOption } from "@create-figma-plugin/ui";
import { h, JSX } from "preact";
import { Dispatch, StateUpdater } from "preact/hooks";

export default function RadioButtonsUI({
  values,
  valueState,
  setValueState,
}: {
  values: string[];
  valueState: string;
  setValueState: Dispatch<StateUpdater<string>>;
}) {
  const options: Array<RadioButtonsOption> = [];

  for (const value of values) {
    options.push({
      value,
    });
  }

  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setValueState(newValue);
  }

  return (
    <RadioButtons
      onChange={handleChange}
      options={options}
      space="medium"
      value={valueState}
    />
  );
}
