import { Dropdown, DropdownOption } from "@create-figma-plugin/ui";
import { h, JSX } from "preact";
import { Dispatch, StateUpdater } from "preact/hooks";

export default function DropdownUI({
  values,
  valueState,
  setValueState,
}: {
  values: string[];
  valueState: string;
  setValueState: Dispatch<StateUpdater<string>>;
}) {
  const options: Array<DropdownOption> = [];

  for (const value of values) {
    options.push({ value });
  }

  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    setValueState(event.currentTarget.value);
  }

  return (
    <Dropdown onChange={handleChange} options={options} value={valueState} />
  );
}
