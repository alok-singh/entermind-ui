import { CATEGORIES, TEMPLATES } from "../config/vars";

export const getFileTemplate = (columns) => {
  const templateString = columns.sort().join('-');
  const templateType = Object.keys(TEMPLATES).find(templateName => {
    return TEMPLATES[templateName].FIELDS.sort().join('-') === templateString;
  });

  return { name: templateType, isValid: !!(templateType) };
}

export const fieldValidators = {
  date: (value) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (regex.test(value)) {
      const [year, month, date] = value.split('-').map(item => parseInt(item));
      return { isValid: true, value: (new Date(year, month, date)).getTime() };
    }
    return { isValid: false, error: 'date must be a valid date (YYYY-MM-DD)' };
  },
  vendor: (value) => {
    return { isValid: true, value: value };
  },
  category: (value) => {
    if (CATEGORIES.includes(value)) {
      return { isValid: true, value: value };
    }
    return { isValid: false, error: `category must be one of: ${CATEGORIES.join(', ')}` };
  },
  subcategory: (value) => {
    return { isValid: true, value: value };
  },
  amount: (value) => {
    return { isValid: true, value: parseInt(value) };
  },
  units: (value) => {
    return { isValid: true, value: parseInt(value) };
  },
  project: (value) => {
    return { isValid: true, value: value };
  },
  tags: (value) => {
    return { isValid: true, value: value };
  },
  notes: (value) => {
    return { isValid: true, value: value };
  },
  initiative: (value) => {
    return { isValid: true, value: value };
  },
  valueType: (value) => {
    return { isValid: true, value: value };
  },
  kpi: (value) => {
    return { isValid: true, value: value };
  },
  confidence: (value) => {
    return { isValid: true, value: value };
  },
  mechanism: (value) => {
    return { isValid: true, value: value };
  },
  agents: (value) => {
    return { isValid: true, value: value };
  },
  platform: (value) => {
    return { isValid: true, value: value };
  },
  metricType: (value) => {
    return { isValid: true, value: value };
  },
  quantity: (value) => {
    return { isValid: true, value: parseInt(value) };
  },
  unitCost: (value) => {
    return { isValid: true, value: parseInt(value) };
  },
  totalCost: (value) => {
    return { isValid: true, value: parseInt(value) };
  },
  agentOrProject: (value) => {
    return { isValid: true, value: value };
  },
  environment: (value) => {
    return { isValid: true, value: value };
  },
}