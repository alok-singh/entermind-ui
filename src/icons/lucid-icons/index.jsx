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
  Layers,
  RefreshCcw,
  Download,
  Activity,
  AlertTriangle,
  GlobeLock,
  Webhook
} from 'lucide-react';

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
  layers: (props) => <Layers {...props} />,
  refresh: (props) => <RefreshCcw {...props} />,
  download: (props) => <Download {...props} />,
  activity: (props) => <Activity {...props} />,
  alertTriangle: (props) => <AlertTriangle {...props} />,
  network: (props) => <GlobeLock {...props} />,
  webhook: (props) => <Webhook {...props} />
};

export default iconMap;
