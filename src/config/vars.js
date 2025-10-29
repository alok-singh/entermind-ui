export const USER_NAME = 'cfo@integrity.ai';
export const USER_SECRET = 'demo123';

export const LOGIN_KEY = 'LOGIN_KEY';
export const SESSION_TIME = 3600;

export const BASE_URL = 'http://localhost:3000/dev';
export const CLIENT_ID = 'client-1';

export const GET_ROI_URL = `${BASE_URL}/v1/get-roi?client=${CLIENT_ID}`;
export const GET_COST_URL = `${BASE_URL}/v1/get-cost?client=${CLIENT_ID}`;
export const GET_USAGE_URL = `${BASE_URL}/v1/get-usage?client=${CLIENT_ID}`;
export const GET_TRANSACTIONS_URL = `${BASE_URL}/v1/get-transactions?client=${CLIENT_ID}`;

export const POST_ROI_URL = `${BASE_URL}/v1/create-roi`;
export const POST_COST_URL = `${BASE_URL}/v1/create-cost`;
export const POST_USAGE_URL = `${BASE_URL}/v1/create-usage`;

export const GENERIC_HEADERS = { 'Content-Type': 'application/json' };

export const TEMPLATES = {
  COST: { FIELDS: ['date', 'vendor', 'category', 'subcategory', 'amount', 'units', 'project', 'tags', 'notes'], POST_API: POST_COST_URL },
  ROI: { FIELDS: ['date', 'initiative', 'category', 'valueType', 'amount', 'kpi', 'confidence', 'mechanism', 'agents', 'notes'], POST_API: POST_ROI_URL },
  USAGE: { FIELDS: ['date', 'platform', 'metricType', 'quantity', 'unitCost', 'totalCost', 'agentOrProject', 'environment'], POST_API: POST_USAGE_URL }
};

export const CATEGORIES = ['AI Model Costs', 'Infrastructure & Compute', 'Agent Platform Licenses', 'Talent Costs', 'Data & Integration', 'Revenue Growth', 'Cost Reduction', 'Operational Efficiency'];