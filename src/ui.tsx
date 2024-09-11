import { h } from "preact";
import { useState, useCallback, useEffect } from "preact/hooks";
import { emit } from "@create-figma-plugin/utilities";
import { render, Text } from "@create-figma-plugin/ui";
import { RadioGroup, HistoryModal, Table } from "./components/";
import { copyToClipboard, convertToHistoryAspectRatios } from "./helpers/";
import { useAspectRatioHistory } from "./hooks";
import { AspectRatioSVG, CloseSVG, CopySVG } from "./svg-icons";
import type {
  AspectRatioWithFormats,
  Separator,
  RatioForm,
  OptionsObject,
} from "./types";
import "!./output.css";

const separatorForms: OptionsObject<Separator>[] = [
  {
    title: "Colon",
    subtitle: "300:9",
  },
  {
    title: "Slash",
    subtitle: "300/9",
  },
];

const ratioForms: OptionsObject<RatioForm>[] = [
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
  {
    title: "Rounded Decimal",
    subtitle: "33",
  },
];

function Plugin() {
  const [separator, setSeparator] = useState<Separator>(
    separatorForms[0].title,
  );
  const [ratioForm, setRatioForm] = useState<RatioForm>(ratioForms[0].title);

  const { history, addRatio, clearHistory } = useAspectRatioHistory();

  const [aspectRatios, setAspectRatios] = useState<AspectRatioWithFormats[]>(
    [],
  );

  function getAspectRatio() {
    emit("ASPECT_RATIO_CALCULATION");
  }

  function closePlugin() {
    emit("CLOSE_UI");
  }

  const copyToClipboardHandler = useCallback(
    (index: number) => {
      const formattedAspectRatio =
        ratioForm === "Decimal" || ratioForm === "Rounded Decimal"
          ? aspectRatios[index][ratioForm]
          : aspectRatios[index][ratioForm][separator];
      copyToClipboard(formattedAspectRatio);
      figma.notify("Aspect ratio copied to clipboard");
    },
    [aspectRatios, ratioForm, separator],
  );

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const message: { type: string; data: AspectRatioWithFormats[] } =
        event.data.pluginMessage;

      if (message.type === "SUCCESS") {
        setAspectRatios(message.data);

        message.data.forEach((i) => {
          const newRatio = {
            nodeName: i.nodeName,
            aspectRatio:
              ratioForm === "Decimal" || ratioForm === "Rounded Decimal"
                ? i[ratioForm]
                : i[ratioForm][separator],
          };
          addRatio(newRatio);
        });
      }
    },
    [ratioForm, separator, addRatio],
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  return (
    <div class="px-4">
      <Text className="my-2 text-lg font-semibold text-black dark:text-white">
        Click on a Node
      </Text>
      <div class="my-6">
        <Text className="mb-4 font-bold text-black dark:text-white">
          Separator
        </Text>
        <RadioGroup
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
        <RadioGroup
          title="Ratios"
          values={ratioForms}
          valueState={ratioForm}
          setValueState={setRatioForm}
        />
      </div>
      <div class="my-6 flex gap-x-4">
        <button onClick={getAspectRatio} className="calculate-button">
          <AspectRatioSVG />
          <span>Get AR</span>
        </button>
        <button onClick={closePlugin} className="close-button">
          <CloseSVG />
          <span>Close</span>
        </button>
      </div>
      <div class="mt-6">
        <Text className="mb-4 font-bold text-black dark:text-white">
          Aspect Ratio
        </Text>
        {aspectRatios.length === 0 ? (
          <div class="mb-6 text-black dark:text-white">
            Click <kbd>Get AR</kbd> to get an aspect ratio.
          </div>
        ) : aspectRatios.length === 1 ? (
          <div class="mb-2 grid w-full grid-cols-1 gap-4">
            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-2 gap-4 p-3">
                  <dt className="font-black text-gray-900 dark:text-white">
                    Node Name
                  </dt>
                  <dd className="font-black text-gray-900 dark:text-white">
                    Aspect Ratio
                  </dd>
                </div>

                <div className="grid grid-cols-2 gap-4 p-3">
                  <dt className="break-words text-gray-700 dark:text-white">
                    {aspectRatios[0].nodeName}
                  </dt>
                  <dd className="break-words text-gray-700 dark:text-white">
                    {ratioForm === "Decimal" || ratioForm === "Rounded Decimal"
                      ? aspectRatios[0][ratioForm]
                      : aspectRatios[0][ratioForm][separator]}
                  </dd>
                </div>
              </dl>
            </div>
            <div
              onClick={() => copyToClipboardHandler(0)}
              className="radio-group-label cursor-pointer bg-black dark:bg-blue-violet-600"
            >
              <span className="w-full cursor-pointer text-center text-white">
                Click to copy
              </span>
            </div>
          </div>
        ) : (
          <div>
            <Table
              headers={["Node Name", "Aspect Ratio"]}
              data={convertToHistoryAspectRatios(
                aspectRatios,
                ratioForm,
                separator,
              )}
            />
            <button
              onClick={() => setAspectRatios([])}
              className="clear-button"
            >
              Clear Table
            </button>
          </div>
        )}
      </div>
      <HistoryModal history={history} clearHistory={clearHistory} />
    </div>
  );
}

export default render(Plugin);
