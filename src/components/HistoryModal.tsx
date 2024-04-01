import { Button, Modal } from "@create-figma-plugin/ui";
import { Fragment, h, JSX } from "preact";
import { useState } from "preact/hooks";

export default function HistoryModal() {
  const [open, setOpen] = useState<boolean>(false);
  function handleOpenButtonClick(
    event: JSX.TargetedMouseEvent<HTMLButtonElement>
  ) {
    console.log(event);
    setOpen(true);
  }
  function handleCloseButtonClick(
    event: JSX.TargetedMouseEvent<HTMLButtonElement>
  ) {
    console.log(event);
    setOpen(false);
  }
  const style = {
    height: "160px",
    padding: "12px",
    width: "240px",
  };
  return (
    <Fragment>
      <Button onClick={handleOpenButtonClick}>Open</Button>
      <Modal
        onCloseButtonClick={handleCloseButtonClick}
        open={open}
        title="History"
      >
        <div style={style}>bar</div>
      </Modal>
    </Fragment>
  );
}
