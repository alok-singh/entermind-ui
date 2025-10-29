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
  Brain,
  Cpu,
  Users,
  Layers
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
  brain: (props) => <Brain {...props} />,
  cpu: (props) => <Cpu {...props} />,
  users: (props) => <Users {...props} />,
  layers: (props) => <Layers {...props} />
};

export default iconMap;
