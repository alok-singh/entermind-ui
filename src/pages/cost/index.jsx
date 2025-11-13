import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetricCards from '../../components/metric-cards';
import PageHeader from '../../components/page-header';
import Tabs from '../../components/tabs';
import { GET_COST_ANOMALIES_URL, GET_COST_URL } from '../../config/vars';
import { getCostPageData } from '../../data/cost.parser';
import { setAnomaliesData, setCostData, setSelectedTabIndex } from '../../reducers/cost-reducer';
import { getResource } from '../../utils/http.util';
import AnomalySection from './anomaly-section';
import CostBreakdownSection from './cost-breakdown-section';
import CostOverviewSection from './cost-overview-section';
import RecommendationSection from './recommendation-section';

const CostExplorer = () => {
  const dispatch = useDispatch();
  const costPageState = useSelector((state) => state.costPage.value);
  const { selectedTabIndex } = costPageState;

  useEffect(() => {
    const innerFunction = async () => {
      const [costResult, anomaliesResult] = await Promise.all([getResource(GET_COST_URL), getResource(GET_COST_ANOMALIES_URL)]);
      dispatch(setCostData(costResult?.response?.data || []));
      dispatch(setAnomaliesData(anomaliesResult?.response?.data || []));
    };
    innerFunction();
  }, []);

  const data = getCostPageData(costPageState);

  return (
    <div className="bg-[#f5f5f7] min-h-screen">
      <div className="max-w-[1400px] mx-auto p-8 bg-white">
        <PageHeader {...data.metricSection} />
        <MetricCards cards={Object.values(data.metricSection.cards)} />
        <Tabs tabs={data.tabsSection} selectedTabIndex={selectedTabIndex} setSelectedTabIndex={(index) => dispatch(setSelectedTabIndex(index))} />
        {selectedTabIndex === 0 ? <CostOverviewSection {...data.costOverview} /> : null}
        {selectedTabIndex === 1 ? <CostBreakdownSection {...data.costBreakdown} /> : null}
        {selectedTabIndex === 2 ? <AnomalySection {...data.anomalySection} /> : null}
        {selectedTabIndex === 3 ? <RecommendationSection {...data.recommendationSection} /> : null}
      </div>
    </div>
  );
};

export default CostExplorer;
