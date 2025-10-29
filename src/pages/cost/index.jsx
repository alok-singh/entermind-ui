import { Activity, DollarSign, Download, RefreshCcw } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Button from '../../components/button';
import Card from '../../components/card';
import Tabs from '../../components/tabs';
import data from '../../data/cost.json';
import { setCostData, setSelectedTabIndex } from '../../reducers/cost-reducer';
import CostOverviewSection from './cost-overview-section';
import CostBreakdownSection from './cost-breakdown-section';
import AnomalySection from './anomaly-section';
import { getResource } from '../../utils/http.util';
import { GET_COST_URL } from '../../config/vars';
import { useEffect } from 'react';
import { getCostBreakDown, getCostOverview, getMetricCardsData } from './cost.util';

const MetricTopSection = (props) => {
  return (
    <div className="flex items-start justify-between mb-[21px]">
      <div className="left-section">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-linear-to-br from-[#0066ff]/20 to-[#00d68f]/20 rounded-xl backdrop-blur-sm border border-[#0066ff]/30">
            <DollarSign height="21px" width="21px" color="#06f" />
          </div>
          <div className="text-wrapper">
            <h1 className="text-[#0066ff] text-[14px]">{props.sectionTitle}</h1>
            <div className="text-sm text-muted-foreground mt-1">{props.sectionDescription}</div>
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
    <div className="grid gap-6 grid-cols-4 mb-6">
      {props.cards.map((card) => {
        return (
          <Card key={card.id} className={card.cardClassName}>
            <h3 className={card.titleClassName}>{card.title}</h3>
            <div className={card.valueClassName}>{card.value}</div>
            <p className={card.descriptionClassName}>{card.description}</p>
          </Card>
        );
      })}
    </div>
  );
};

const CostExplorer = () => {
  const dispatch = useDispatch();
  const { selectedTabIndex, costData } = useSelector((state) => state.costPage.value);

  useEffect(() => {
    const innerFunction = async () => {
      const result = await getResource(GET_COST_URL);
      dispatch(setCostData(result?.response?.data));
    };
    innerFunction();
  }, []);

  return (
    <div className="bg-[#f5f5f7] min-h-screen">
      <div className="max-w-[1400px] mx-auto p-8 bg-white">
        <MetricTopSection {...data.metricSection} />
        <MetricCards cards={getMetricCardsData(data, costData)} />
        <Tabs tabs={data.tabsSection} selectedTabIndex={selectedTabIndex} setSelectedTabIndex={(index) => dispatch(setSelectedTabIndex(index))} />
        {selectedTabIndex === 0 ? <CostOverviewSection {...getCostOverview(data.costOverview, costData)} /> : null}
        {selectedTabIndex === 1 ? <CostBreakdownSection {...getCostBreakDown(data.costBreakdown, costData)} /> : null}
        {selectedTabIndex === 2 ? <AnomalySection {...data.anomalySection} /> : null}
      </div>
    </div>
  );
};

export default CostExplorer;
