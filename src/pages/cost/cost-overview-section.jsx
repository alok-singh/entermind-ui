import { TrendingDown, TrendingUp, TrendingUpDown } from 'lucide-react';
import CombinedChart from '../../components/combined-chart';
import Card from '../../components/card';

const CostTrends = ({ trends }) => {
  return (
    <Card className="border border-[#e2e8f0] p-6 mt-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <TrendingUpDown width="14px" height="14px" color="#06f" />
        <h2 className="text-[14px] text-[#0f1419]">Cost Trends</h2>
      </div>

      {/* Trend Items */}
      <div className="grid grid-cols-3">
        {trends.map((item, idx) => (
          <div key={idx}>
            <p className="text-sm text-[#5c6370] mb-2">{item.label}</p>
            <p className={`text-xs flex items-center gap-2 ${item.value >= 0 ? 'text-[#fb2c36]' : 'text-[#00c951]'}`}>
              {item.value >= 0 ? (
                <>
                  <TrendingUp width="12px" height="12px" />
                  {item.value}%<span className="text-xs text-[#5c6370]">change</span>
                </>
              ) : (
                <>
                  <TrendingDown width="12px" height="12px" />
                  {Math.abs(item.value)}%<span className="text-xs text-[#5c6370]">change</span>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

const ChartSection = (props) => {
  return (
    <div className="mt-6 grid gap-3.5 grid-cols-2">
      {Object.values(props).map((chart) => {
        return <CombinedChart key={chart.id} {...chart} />;
      })}
    </div>
  );
};

const CostOverviewSection = (props) => {
  return (
    <>
      <ChartSection {...props.chartSection} />
      <CostTrends {...props.costTrendSection} />
    </>
  );
};

export default CostOverviewSection;
