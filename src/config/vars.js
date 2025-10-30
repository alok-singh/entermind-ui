export const USER_NAME = 'cfo@integrity.ai';
export const USER_SECRET = 'demo123';

export const LOGIN_KEY = 'LOGIN_KEY';
export const SESSION_TIME = 3600;

export const BASE_URL = 'http://localhost:3000/dev';
export const CLIENT_ID = 'client-3';

export const GET_ROI_URL = `${BASE_URL}/v1/get-roi?client=${CLIENT_ID}`;
export const GET_COST_URL = `${BASE_URL}/v1/get-cost?client=${CLIENT_ID}`;
export const GET_USAGE_URL = `${BASE_URL}/v1/get-usage?client=${CLIENT_ID}`;
export const GET_TRANSACTIONS_URL = `${BASE_URL}/v1/get-transactions?client=${CLIENT_ID}`;

export const POST_ROI_URL = `${BASE_URL}/v1/create-roi`;
export const POST_COST_URL = `${BASE_URL}/v1/create-cost`;
export const POST_USAGE_URL = `${BASE_URL}/v1/create-usage`;

export const GENERIC_HEADERS = { 'Content-Type': 'application/json' };

export const TEMPLATES = {
  COST: {
    FIELDS: ['date', 'vendor', 'category', 'subcategory', 'amount', 'units', 'project', 'tags', 'notes'],
    FIELDS_LABELS: ['Date', 'Vendor/Provider', 'Category', 'Subcategory/Service', 'Amount (USD)', 'Usage Units', 'Project/Department', 'Tags (comma-separated)', 'Notes'],
    PLACEHOLDER: ['Date when cost incurred', 'Vendor/Provider', 'Category', 'e.g., GPT-4 API Calls, Lambda Functions', '0.00', 'e.g., 2.5M tokens, 850 hours', 'e.g., Customer Service, Sales AI', 'e.g., production, Q1-2025, high-priority', 'Additional context, invoice numbers, or observations...'],
    MANDATORY: [true, true, true, true, true, false, false, false, false],
    TYPES: ['date', 'string', 'string', 'string', 'number', 'number', 'string', 'string', 'string'],
    LABEL: 'Cost',
    POST_API: POST_COST_URL
  },
  ROI: {
    FIELDS: ['date', 'initiative', 'category', 'valueType', 'amount', 'kpi', 'confidence', 'mechanism', 'agents', 'notes'],
    LABEL: 'ROI',
    FIELDS_LABELS: ['Date', 'Initiative', 'Category', 'Value Type', 'Amount', 'KPI(Key performance index)', 'Confidence(%)', 'Mechanism', 'Agents', 'Notes'],
    PLACEHOLDER: ['Date', 'Initiative', 'Category', 'Value Type', 'Amount', 'KPI(Key performance index)', 'Confidence(%)', 'Mechanism', 'Agents', 'Additional context, invoice numbers, or observations...'],
    MANDATORY: [true, true, true, true, true, false, false, false, false, false],
    TYPES: ['date', 'string', 'string', 'string', 'number', 'string', 'string', 'string', 'string', 'string'],
    POST_API: POST_ROI_URL
  },
  USAGE: {
    FIELDS: ['date', 'platform', 'metricType', 'quantity', 'unitCost', 'totalCost', 'agentOrProject', 'environment'],
    FIELDS_LABELS: ['Date', 'Platform', 'Metric Type', 'Quantity', 'Unit Cost', 'Total Amount (USD)', 'Project/Agent', 'Environment'],
    PLACEHOLDER: ['Date when cost incurred', 'Platform', 'Metric Type', 'Quantity', '100', 'Total amount in USD', 'e.g., Project PSU, Sales AI', 'e.g., production'],
    MANDATORY: [true, true, true, true, true, true, true, true],
    TYPES: ['date', 'string', 'string', 'number', 'number', 'number', 'string', 'string'],
    LABEL: 'Usage',
    POST_API: POST_USAGE_URL
  }
};

export const CATEGORIES = ['AI Model Costs', 'Infrastructure & Compute', 'Agent Platform Licenses', 'Talent Costs', 'Data & Integration', 'Revenue Growth', 'Cost Reduction', 'Operational Efficiency'];
export const CATEGORIES_ICONS = ['brain', 'database', 'cpu', 'users', 'layers', 'trendingUp', 'dollar', 'zap'];