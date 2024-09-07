import { Button, Modal, Text } from "@create-figma-plugin/ui";
import { Fragment, h, JSX } from "preact";
import { useState } from "preact/hooks";
import Table from "./Table";
import type { HistoryAspectRatio } from "../types";

type HistoryModalProps = {
  history: HistoryAspectRatio[];
  clearHistory: () => void;
};

export default function HistoryModal({
  history,
  clearHistory,
}: HistoryModalProps) {
  const [open, setOpen] = useState<boolean>(false);

  function handleOpenButtonClick(
    _event: JSX.TargetedMouseEvent<HTMLButtonElement>,
  ) {
    setOpen(true);
  }

  function handleCloseButtonClick(
    _event:
      | JSX.TargetedMouseEvent<HTMLButtonElement>
      | JSX.TargetedMouseEvent<HTMLDivElement>,
  ) {
    setOpen(false);
  }

  function handleClearButtonClick(
    _event: JSX.TargetedMouseEvent<HTMLButtonElement>,
  ) {
    clearHistory();
  }

  return (
    <Fragment>
      <Button onClick={handleOpenButtonClick}>Open</Button>
      <Modal
        onCloseButtonClick={handleCloseButtonClick}
        onOverlayClick={handleCloseButtonClick}
        open={open}
        title="History"
        position="bottom"
      >
        <div className="h-[250px] w-[350px] pl-3 pr-1">
          {history.length === 0 ? (
            <Text
              align="center"
              className="my-2 text-2xl font-semibold text-black dark:text-white"
            >
              No history
            </Text>
          ) : (
            <div>
              <Table headers={["Node Name", "Aspect Ratio"]} data={history} />
              <button onClick={handleClearButtonClick} className="clear-button">
                Clear History
              </button>
            </div>
          )}
        </div>
      </Modal>
    </Fragment>
  );
}
