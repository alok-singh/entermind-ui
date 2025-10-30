import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetricCards from '../../components/metric-cards';
import PageHeader from '../../components/page-header';
import Tabs from '../../components/tabs';
import { GET_COST_URL } from '../../config/vars';
import data from '../../data/cost.json';
import { setCostData, setSelectedTabIndex } from '../../reducers/cost-reducer';
import { getResource } from '../../utils/http.util';
import AnomalySection from './anomaly-section';
import CostBreakdownSection from './cost-breakdown-section';
import CostOverviewSection from './cost-overview-section';
import { getCostBreakDown, getCostOverview, getMetricCardsData } from './cost.util';
import RecommendationSection from './recommandation-section';

const CostExplorer = () => {
  const dispatch = useDispatch();
  const { selectedTabIndex, costData } = useSelector((state) => state.costPage.value);

  useEffect(() => {
    const innerFunction = async () => {
      const result = await getResource(GET_COST_URL);
      dispatch(setCostData(result?.response?.data || []));
    };
    innerFunction();
  }, []);

  return (
    <div className="bg-[#f5f5f7] min-h-screen">
      <div className="max-w-[1400px] mx-auto p-8 bg-white">
        <PageHeader {...data.metricSection} />
        <MetricCards cards={getMetricCardsData(data, costData)} />
        <Tabs tabs={data.tabsSection} selectedTabIndex={selectedTabIndex} setSelectedTabIndex={(index) => dispatch(setSelectedTabIndex(index))} />
        {selectedTabIndex === 0 ? <CostOverviewSection {...getCostOverview(data.costOverview, costData)} /> : null}
        {selectedTabIndex === 1 ? <CostBreakdownSection {...getCostBreakDown(data.costBreakdown, costData)} /> : null}
        {selectedTabIndex === 2 ? <AnomalySection {...data.anomalySection} /> : null}
        {selectedTabIndex === 3 ? <RecommendationSection {...data.recommendationSection} /> : null}
      </div>
    </div>
  );
};

export default CostExplorer;
