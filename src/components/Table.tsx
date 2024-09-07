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
    <tr>
      {headers.map((header, index) => (
        <th
          key={index}
          className="whitespace-nowrap p-2 font-medium text-black dark:text-white"
        >
          {header}
        </th>
      ))}
      <th className="p-2"></th>
    </tr>
  </thead>
);

const Table = ({ headers, data }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
        <TableHeader headers={headers} />
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((aspectRatioObject) => {
            function copyToClipboardHandler() {
              copyToClipboard(aspectRatioObject.aspectRatio);
            }

            return (
              <tr>
                <td className="whitespace-nowrap p-2 font-medium text-black dark:text-white">
                  {aspectRatioObject.nodeName}
                </td>
                <td className="whitespace-nowrap p-2 text-gray-700 dark:text-gray-200">
                  {aspectRatioObject.aspectRatio}
                </td>
                <td className="whitespace-nowrap p-2">
                  <button
                    onClick={copyToClipboardHandler}
                    className="text-blue-violet-600 hover:text-blue-violet-700"
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
