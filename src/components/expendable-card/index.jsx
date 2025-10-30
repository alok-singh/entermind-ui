import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import iconMap from '../../icons/lucid-icons';
import Card from '../card';

const ExpendableCard = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={`rounded-lg border transition ${props.className} ${expanded ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
      {/* Header */}
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between w-full mr-6">
          <div className="flex items-center gap-3">
            {props.icon ? iconMap[props.icon](props.iconProps) : null}
            <div>
              <h2 className="text-gray-800 text-sm mb-1">{props.textLeftTop}</h2>
              <p className="text-xs text-gray-500">{props.textLeftBottom}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#00d68f] text-sm">{props.textRightTop}</p>
            <p className="text-xs text-gray-500">{props.textRightBottom}</p>
          </div>
        </div>
        {expanded ? <ChevronDown className="text-gray-500" /> : <ChevronRight className="text-gray-500" />}
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-gray-200 mt-6">
          {props.details.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 bg-gray-100 text-sm my-2">
              <div className="flex items-center gap-3">
                <span className="text-gray-700">{item.name}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    item.status === 'increasing' ? 'bg-red-100 text-[#f36]' : item.status === 'decreasing' ? 'text-[#00d68f]' : 'bg-blue-100 text-[#06f]'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <span className="text-gray-800 font-medium">{item.amount}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ExpendableCard;
