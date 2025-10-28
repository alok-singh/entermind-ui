import { Loader } from "lucide-react";

const Table = (props) => {
  const { isLoading, rows, columns, icon, emptyTitle, emptyDescription } =
    props;
  return isLoading ? (
    <div className="w-full flex items-center justify-center p-9">
      <Loader className="animate-spin"/>
    </div>
  ) : rows?.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
      {icon ? icon : null}
      <p className="text-lg font-medium">{emptyTitle}</p>
      <p className="text-sm">{emptyDescription}</p>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-700 text-sm border-[#e2e8f0]">
            {columns.map((column) => {
              return <th className="text-xs text-left px-4 py-2">{column}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-t text-sm hover:bg-gray-50 border-[#e2e8f0]"
            >
              {columns.map((column, columnIndex) => {
                return (
                  <td className="text-xs text-left px-4 py-2" key={columnIndex}>
                    {row[columnIndex]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
