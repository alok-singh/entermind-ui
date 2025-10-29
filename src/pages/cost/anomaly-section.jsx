import React, { useState } from "react";
import { AlertTriangle, DollarSign, CheckCircle } from "lucide-react";
import Button from "../../components/button";

const AlertCard = (props) => {
  const {
    title,
    severity,
    detectedAt,
    description,
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
          <AlertTriangle className="text-red-600" />
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${
            severity === "high"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {severity}
        </span>
      </div>

      {/* Detected Time */}
      <p className="text-sm text-gray-600 mb-3">Detected {detectedAt}</p>

      {/* Description */}
      <p className="text-gray-700 mb-4">{description}</p>

      {/* Values */}
      <div className="grid grid-cols-2 gap-4 mb-4 bg-white rounded p-3">
        <div>
          <p className="text-xs text-gray-500">Normal Value</p>
          <p className="text-gray-700 font-medium">{normalValue}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Current Value</p>
          <p className="text-red-600 font-medium">{currentValue}</p>
        </div>
      </div>

      {/* Impact */}
      <div className="flex items-center gap-2 mb-4 bg-white rounded p-3">
        <DollarSign className="text-gray-500" />
        <p className="text-gray-700 font-medium">{impact}</p>
      </div>

      <div className="flex items-center justify-between">
        {/* Recommendation */}
        <p className="text-sm text-gray-600">
          Recommended action:{" "}
          <span className="font-semibold">{recommendation}</span>
        </p>

        {/* Acknowledge Button */}
        <Button
          onClick={() => setAcknowledged(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded font-medium transition ${
            acknowledged
              ? "bg-green-100 text-green-700 border border-green-500"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {acknowledged ? (
            <>
              <CheckCircle size={18} /> Acknowledged
            </>
          ) : (
            "Acknowledge"
          )}
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
