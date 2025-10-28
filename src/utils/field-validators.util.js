const CATEGORIES = ['AI Model Costs', 'Infrastructure & Compute', 'Agent Platform Licenses', 'Talent Costs', 'Data & Integration'];

const formats = {
  cost: [
    'date',
    'vendor',
    'category',
    'subcategory',
    'amount',
    'units',
    'project',
    'tags',
    'notes',
  ],
  roi: [
    'date',
    'initiative',
    'category',
    'value_type',
    'amount',
    'kpi',
    'confidence',
    'mechanism',
    'agents',
    'notes',
  ],
  usage: [
    'date',
    'platform',
    'metric_type',
    'quantity',
    'unit_cost',
    'total_cost',
    'agent_or_project',
    'environment',
  ]
};

export const getFileTemplate = (columns) => {
  const templateString = columns.sort().join('-');
  const isCostTemplate = formats.cost.sort().join('-') === templateString;
  const isRoiTemplate = formats.roi.sort().join('-') === templateString;
  const isUsageTemplate = formats.usage.sort().join('-') === templateString;
  const name = isCostTemplate ? 'Cost Template' : isRoiTemplate ? 'ROI Template' : isUsageTemplate ? 'Usage Template' : 'Invalid';
  return { name, isValid: (isCostTemplate || isRoiTemplate || isUsageTemplate) };
}

export const validators = {
  date: (value) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (regex.test(value)) {
      return { isValid: true };
    }
    return { isValid: false, error: 'date must be a valid date (YYYY-MM-DD)' };
  },
  vendor: () => {
    return { isValid: true };
  },
  category: (value) => {
    if (CATEGORIES.includes(value)) {
      return { isValid: true };
    }
    return { isValid: false, error: `category must be one of: ${CATEGORIES.join(', ')}` };
  },
  subcategory: () => {
    return { isValid: true };
  },
  amount: () => {
    return { isValid: true };
  },
  units: () => {
    return { isValid: true };
  },
  project: () => {
    return { isValid: true };
  },
  tags: () => {
    return { isValid: true };
  },
  notes: () => {
    return { isValid: true };
  },
  initiative: () => {
    return { isValid: true };
  },
  value_type: () => {
    return { isValid: true };
  },
  kpi: () => {
    return { isValid: true };
  },
  confidence: () => {
    return { isValid: true };
  },
  mechanism: () => {
    return { isValid: true };
  },
  agents: () => {
    return { isValid: true };
  },
  platform: () => {
    return { isValid: true };
  },
  metric_type: () => {
    return { isValid: true };
  },
  quantity: () => {
    return { isValid: true };
  },
  unit_cost: () => {
    return { isValid: true };
  },
  total_cost: () => {
    return { isValid: true };
  },
  agent_or_project: () => {
    return { isValid: true };
  },
  environment: () => {
    return { isValid: true };
  },
}