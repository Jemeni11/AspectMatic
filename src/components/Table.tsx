import { h } from "preact";
import { copyToClipboard } from "../helpers";
import { CopySVG } from "../svg-icons";
import type { HistoryAspectRatio } from "../types";

interface TableProps {
  headers: string[];
  data: HistoryAspectRatio[];
}

interface TableHeaderProps {
  headers: string[];
}

const TableHeader = ({ headers }: TableHeaderProps) => (
  <thead className="text-left">
    <tr class="dark:bg-white">
      {headers.map((header, index) => (
        <th
          key={header}
          colspan={index === headers.length - 1 ? 2 : 1}
          className="whitespace-nowrap p-2 text-center font-medium text-black"
        >
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

const Table = ({ headers, data }: TableProps) => {
  return (
    <div className="overflow-auto">
      <table className="min-w-full divide-y-2 text-sm dark:divide-gray-700 dark:bg-gray-900">
        <TableHeader headers={headers} />
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:bg-white">
          {data.map((aspectRatioObject, index) => {
            function copyToClipboardHandler() {
              copyToClipboard(aspectRatioObject.aspectRatio);
            }

            return (
              <tr key={`${aspectRatioObject.nodeName}-${index}`}>
                <td className="whitespace-nowrap p-2 text-center font-medium text-black">
                  {aspectRatioObject.nodeName}
                </td>
                <td className="whitespace-nowrap break-words p-2 text-right text-gray-700">
                  {aspectRatioObject.aspectRatio}
                </td>
                <td
                  className="whitespace-nowrap p-2"
                  style={{
                    width: "2rem",
                    height: "2rem",
                  }}
                >
                  <button
                    onClick={copyToClipboardHandler}
                    style={{
                      width: "2rem",
                      height: "2rem",
                    }}
                    className="text-blue-violet-600 hover:text-blue-violet-700"
                    aria-label={`Copy ${aspectRatioObject.aspectRatio}`}
                  >
                    <CopySVG />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
