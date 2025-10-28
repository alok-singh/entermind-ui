import { toast } from "sonner";
import { Activity, DollarSign, Download, RefreshCcw } from "lucide-react";
import data from "../../data/cost.json";
import Button from "../../components/button";
import Card from "../../components/card";

const MetricTopSection = (props) => {
  return (
    <div className="flex items-start justify-between">
      <div className="left-section">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-linear-to-br from-[#0066ff]/20 to-[#00d68f]/20 rounded-xl backdrop-blur-sm border border-[#0066ff]/30">
            <DollarSign height="21px" width="21px" color="#06f" />
          </div>
          <div className="text-wrapper">
            <h1 className="text-[#0066ff] text-[14px]">{props.sectionTitle}</h1>
            <div className="text-sm text-muted-foreground mt-1">
              {props.sectionDescription}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[#00d68f] border border-[#00d68f4d] w-fit px-2 text-[10.5px] rounded-[7px]">
          <Activity color="#00d68f" height="10.5px" width="10.5px" />
          <span>{props.badgeTitle}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button className="w-full flex items-center gap-[5px] border border-[#e2e8f0] px-2 py-1 text-[12px] rounded-[7px] hover:bg-[#00d68f] hover:text-white">
          <RefreshCcw height="14px" width="14px" /> Refresh
        </Button>
        <Button className="w-full flex items-center gap-[5px] border border-[#e2e8f0] px-2 py-1 text-[12px] rounded-[7px] hover:bg-[#00d68f] hover:text-white">
          <Download height="14px" width="14px" /> Export
        </Button>
      </div>
    </div>
  );
};

const MetricCards = (props) => {
  return (
    <div className="grid gap-6 grid-cols-4">
      {props.cards.map((card) => {
        return <Card></Card>;
      })}
    </div>
  );
};

const showToast = () => {
  console.log('showToast');
  toast("Event has been created", {
    description: "Sunday, December 03, 2023 at 9:00 AM",
    action: {
      label: "Undo",
      onClick: () => console.log("Undo"),
    },
  });
};

const CostExplorer = () => {
  return (
    <div className="bg-[#f5f5f7]" onClick={() => showToast()}>
      <div className="max-w-[1400px] mx-auto p-8 bg-white">
        <MetricTopSection {...data.metricSection} />
        <MetricCards cards={data.metricSection.cards} />
      </div>
    </div>
  );
};

export default CostExplorer;
