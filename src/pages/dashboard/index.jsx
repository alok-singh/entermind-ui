import data from "../../data/dashboard.json";
import CommandCenterSection from "./command-center-section";
import OpportunitySection from "./opportunity-section";
import PromotionalWidgetSection from "./promotional-widget-section";
import ChartSection from "./chart-section";

const Dashboard = () => {
  return (
    <div className="bg-[#f5f5f7] min-h-screen">
      <CommandCenterSection {...data.commandCenterSection} />
      <PromotionalWidgetSection {...data.promotionalWidgetSection} />
      <ChartSection {...data.chartSection} />
      <OpportunitySection {...data.opportunitySection} />
    </div>
  );
};

export default Dashboard;
