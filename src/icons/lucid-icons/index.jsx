import {
  ChartColumn,
  Cloud,
  Database,
  DollarSign,
  FileSpreadsheet,
  FileText,
  Plus,
  Sparkles,
  TrendingUp,
  Upload,
  Zap,
} from "lucide-react";

const iconMap = {
  database: (props) => <Database {...props} />,
  cloud: (props) => <Cloud {...props} />,
  file: (props) => <FileSpreadsheet {...props} />,
  sparkles: (props) => <Sparkles {...props} />,
  upload: (props) => <Upload {...props} />,
  fileText: (props) => <FileText {...props} />,
  plus: (props) => <Plus {...props} />,
  zap: (props) => <Zap {...props} />,
  dollar: (props) => <DollarSign {...props} />,
  trendingUp: (props) => <TrendingUp {...props} />,
  chart: (props) => <ChartColumn {...props} />,
};

export default iconMap;
