import { Database, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button";
import Card from "../../components/card";
import Table from "../../components/table";
import { setHistoryLoading, uploadHistory } from "../../reducers/data-page-reducer";

const EntryHistorySection = () => {
  const dispatch = useDispatch();

  const { uploadHistoryEntries, isLoading } = useSelector(
    (state) => state.uploadPage.value.history
  );

  const onRefresh = async () => {
    dispatch(setHistoryLoading(true));
    const data = await fetchUploadHistory();
    dispatch(uploadHistory(data));
    dispatch(setHistoryLoading(false));
  };

  const fetchUploadHistory = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          new Array(10).fill(0).map((item, index) => {
            return [
              new Date().toString(),
              `Test ${index}.csv`,
              index > 3 ? "Completed" : "In progress",
            ];
          })
        );
      }, 300);
    });
  };

  return (
    <Card className="border border-[#e2e8f0] mt-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Entries
          </h2>
          <p className="text-sm text-gray-500">
            Latest cost and ROI entries added to Integrity
          </p>
        </div>
        <div>
          <Button
            onClick={onRefresh}
            className="w-fit flex items-center justify-between gap-2 text-xs border border-[#e2e8f0] px-[8.25px] py-1"
          >
            <RefreshCw size={16} /> Refresh
          </Button>
        </div>
      </div>

      {/* Content */}
      <Table
        isLoading={isLoading}
        emptyTitle="No entries yet"
        columns={["Uploaded On", "File Name", "Status"]}
        emptyDescription="Create your first entry using the tabs above"
        icon={<Database size={48} className="text-gray-400 mb-4" />}
        rows={uploadHistoryEntries}
      />
    </Card>
  );
};

export default EntryHistorySection;
