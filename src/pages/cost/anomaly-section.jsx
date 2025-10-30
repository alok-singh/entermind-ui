import React, { useState } from "react";
import { AlertTriangle, DollarSign, CheckCircle } from "lucide-react";
import Button from "../../components/button";

const AlertCard = (props) => {
  const {
    title,
    severity,
    detectedAt,
    description,
    subDescription,
    normalValue,
    currentValue,
    impact,
    recommendation,
  } = props;
  const [acknowledged, setAcknowledged] = useState(false);

  const bgColor = severity === "high" ? "bg-[#fb2c360d]" : "bg-[#ff69000d]";
  const borderColor =
    severity === "high" ? "border-[#fb2c3680]" : "border-[#ff690080]";

  return (
    <div className={`rounded-lg p-4 mb-4 ${bgColor} border ${borderColor}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <AlertTriangle color="#f36" width="17.5px" height="17.5px" />
          <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${
            severity === "high"
              ? "bg-[#f36] text-white"
              : "bg-[#06f] text-white"
          }`}
        >
          {severity}
        </span>
      </div>

      {/* Detected Time */}
      <p className="text-xs text-gray-600 mb-6">Detected {detectedAt}</p>

      {/* Description */}
      <p className="text-xs mb-2">{description}</p>
      <p className="text-xs text-gray-600 mb-2">{subDescription}</p>

      {/* Values */}
      <div className="grid grid-cols-2 gap-4 my-4 bg-white rounded p-3">
        <div>
          <p className="text-xs text-gray-500">Normal Value</p>
          <p className="text-xs font-medium mt-2">{normalValue}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Current Value</p>
          <p className="text-red-600 text-xs font-medium mt-2">{currentValue}</p>
        </div>
      </div>

      {/* Impact */}
      <div className="flex items-center gap-2 mb-4 bg-white rounded p-3">
        <DollarSign width="14px" height="14px" className="text-gray-500" />
        <p className="text-gray-700 font-medium text-xs">{impact}</p>
      </div>

      <div className="flex items-center justify-between">
        {/* Recommendation */}
        <p className="text-xs text-gray-600">
          Recommended action:{" "}
          <span className="font-semibold">{recommendation}</span>
        </p>

        {/* Acknowledge Button */}
        <Button
          onClick={() => setAcknowledged(true)}
          className={`flex items-center gap-2 px-4 py-1 rounded font-medium transition text-xs ${
            acknowledged
              ? "bg-transparent text-[#00d68f] border border-[#00d68f]"
              : "bg-[#06f] text-white"
          }`}
        >
          {acknowledged ? "Acknowledged" : (<><CheckCircle size={14} /> Acknowledge</>)}
        </Button>

      </div>
    </div>
  );
};

const AnomalySection = (props) => {
  return (
    <div className="mt-6">
      {props.alertCard.map((item) => {
        return <AlertCard {...item} />;
      })}
    </div>
  );
};

export default AnomalySection;
