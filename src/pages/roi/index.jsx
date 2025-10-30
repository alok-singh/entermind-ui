import MetricCards from '../../components/metric-cards';
import PageHeader from '../../components/page-header';
import data from '../../data/roi.json';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Card from '../../components/card';

const ROIStatusCard = ({ title, statusText, statusColor, progressLabel, currentValue, targetValue, progressPercent, progressColor, description }) => {
  return (
    <Card className="border border-[#e2e8f0] bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
        <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded border border-${statusColor} text-${statusColor}`}>
          <AlertTriangle size={14} className={`text-${statusColor}`} />
          {statusText}
        </span>
      </div>

      <div className="mt-6 mb-3 flex items-center justify-between">
        {/* Progress Label */}
        <p className="text-xs text-[#5c6370]">{progressLabel}</p>

        {/* Values */}
        <div className="text-right text-xs text-gray-800">
          {currentValue} / {targetValue}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-3 bg-gray-100 rounded-full mb-2">
        <div className={`absolute top-0 left-0 h-3 rounded-full ${progressColor}`} style={{ width: `${progressPercent}%` }}></div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500">{description}</p>
    </Card>
  );
};

const RoiPage = () => {
  return (
    <div className="bg-[#f5f5f7] min-h-screen">
      <div className="max-w-[1400px] mx-auto p-8 bg-white">
        <PageHeader {...data.metricSection} />
        <MetricCards cards={Object.values(data.metricSection.cards)} />
        <ROIStatusCard {...data.roiStatusSection} />
      </div>
    </div>
  );
};

export default RoiPage;
