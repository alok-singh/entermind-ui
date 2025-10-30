import { Clock, Play, DollarSign, Lightbulb } from 'lucide-react';
import Badge from '../../components/badge';
import Card from '../../components/card';
import Button from '../../components/button';

const Recommendation = (props) => {
  const {
    tags = [],
    status = 'pending',
    title,
    description,
    annualSavings,
    npv,
    paybackPeriod,
    confidence,
    duration,
    cost,
    effort,
    primaryColor = '#06f',
    secondaryColor = 'gray-700',
    onStart,
    onReject
  } = props;

  return (
    <Card className="border border-red-300 rounded-lg p-4 mt-4 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-2 mb-4">
        <Lightbulb className={`text-${primaryColor} bg-linear-to-br from-[#0066ff]/20 to-[#00d68f]/20 rounded-lg p-1.5`} size={28} />
        <div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <Badge text={tag} key={idx} className="border border-[#e2e8f0]" />
            ))}
            <Badge text={status} className="text-xs border border-[#e2e8f0]" />
          </div>
          {/* Title & Description */}
          <h2 className={`text-${secondaryColor} text-sm my-2`}>{title}</h2>
          <p className="text-[#5c6370] text-xs">{description}</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="bg-linear-to-br from-[#00d68f]/10 to-transparent rounded-lg border border-[#00d68f]/20 p-3">
          <p className="text-xs text-gray-500">Annual Savings</p>
          <p className="text-[#00d68f] font-normal mt-2">{annualSavings}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-xs text-gray-500">3-Year NPV</p>
          <p className="text-gray-700 font-normal mt-2">{npv}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-xs text-gray-500">Payback Period</p>
          <p className="text-gray-700 font-normal mt-2">{paybackPeriod}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-xs text-gray-500">Confidence</p>
          <p className="text-gray-700 font-normal mt-2">{confidence}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <Clock size={16} /> {duration}
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={16} /> {cost}
        </div>
        <Badge text={effort} className="text-xs border border-[#e2e8f0]" />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={onStart} className={`bg-${primaryColor} text-white px-3 text-xs py-2 rounded flex items-center gap-2`}>
          <Play size={16} /> Start Implementation
        </Button>
        <Button onClick={onReject} className="bg-white text-gray-700 px-3 text-xs py-2 rounded border border-[#e2e8f0]">
          Reject
        </Button>
      </div>
    </Card>
  );
};

const RecommendationSection = (props) => {
  return (
    <div className="mt-6">
      {props.recommendations.map((recommendation) => {
        return <Recommendation {...recommendation} onStart={() => handleClickImplement(true)} onReject={() => handleClickImplement(false)} />;
      })}
    </div>
  );
};

export default RecommendationSection;
