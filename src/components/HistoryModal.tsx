import { Modal, Text } from "@create-figma-plugin/ui";
import { Fragment, h } from "preact";
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

  const handleOpenButtonClick = () => setOpen(true);
  const handleCloseButtonClick = () => setOpen(false);

  return (
    <Fragment>
      <button
        type="button"
        className="radio-group-label mb-4 bg-black dark:bg-blue-violet-600"
        onClick={handleOpenButtonClick}
        aria-label="Open history"
      >
        <span class="w-full cursor-pointer text-center text-white">
          Open History
        </span>
      </button>
      <Modal
        onCloseButtonClick={handleCloseButtonClick}
        onOverlayClick={handleCloseButtonClick}
        open={open}
        title="History"
        position="bottom"
      >
        <div
          style={{ maxHeight: "350px" }}
          className="h-full w-full max-w-[350px] overflow-auto pl-3 pr-1"
        >
          {history.length === 0 ? (
            <Text
              align="center"
              className="my-2 text-2xl font-semibold text-black dark:text-white"
            >
              No history
            </Text>
          ) : (
            <div class="py-4">
              <Table headers={["Node Name", "Aspect Ratio"]} data={history} />
              <button onClick={clearHistory} className="clear-button">
                Clear History
              </button>
            </div>
          )}
        </div>
      </Modal>
    </Fragment>
  );
}
